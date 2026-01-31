'use server'

import { revalidatePath } from 'next/cache'
import { sanityWriteClient } from '@/lib/sanity/client'
import { generateContent, generateShortText } from '@/lib/ai/gemini'
import {
  SYSTEM_PROMPT,
  CONTENT_GENERATION_PROMPT,
  EXCERPT_GENERATION_PROMPT,
  CATEGORY_SUGGESTION_PROMPT,
} from '@/lib/ai/prompts'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export interface GenerateBlogResult {
  success: boolean
  message: string
  postId?: string
  error?: string
}

/**
 * Convert markdown to Portable Text blocks
 */
function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  
  let currentParagraph: string[] = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // H2
    if (trimmed.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: trimmed.replace('## ', '') }],
      })
    }
    // H3
    else if (trimmed.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: trimmed.replace('### ', '') }],
      })
    }
    // Empty line - end paragraph
    else if (trimmed === '') {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
    }
    // Regular text
    else {
      currentParagraph.push(trimmed)
    }
  }
  
  // Add remaining paragraph
  if (currentParagraph.length > 0) {
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: currentParagraph.join(' ') }],
    })
  }
  
  return blocks
}

/**
 * Generate a blog post using AI and save to Sanity + Supabase
 */
export async function generateBlog(
  sanityId: string,
  topic: string
): Promise<GenerateBlogResult> {
  try {
    console.log(`[AI Blog] Starting generation for topic: "${topic}"`)

    // 1. Generate main content
    const contentResult = await generateContent(
      SYSTEM_PROMPT,
      CONTENT_GENERATION_PROMPT(topic)
    )

    if (contentResult.error || !contentResult.content) {
      return {
        success: false,
        message: 'Failed to generate content',
        error: contentResult.error || 'Empty response from AI',
      }
    }

    console.log(`[AI Blog] Content generated (${contentResult.tokensUsed} tokens)`)

    // 2. Generate excerpt
    const excerpt = await generateShortText(
      EXCERPT_GENERATION_PROMPT(contentResult.content)
    )

    // 3. Suggest category
    const category = await generateShortText(
      CATEGORY_SUGGESTION_PROMPT(topic)
    )

    // 4. Convert markdown to Portable Text
    const portableTextBlocks = markdownToPortableText(contentResult.content)

    // 5. Update Sanity document
    await sanityWriteClient
      .patch(sanityId)
      .set({
        content: portableTextBlocks,
        excerpt: excerpt || topic.substring(0, 150),
        category: category || 'nootropicos',
        aiGenerated: true,
      })
      .commit()

    console.log(`[AI Blog] Sanity document updated: ${sanityId}`)

    // 6. Fetch the updated document to get all fields
    const sanityPost = await sanityWriteClient.getDocument(sanityId)

    if (!sanityPost) {
      throw new Error('Failed to fetch updated Sanity document')
    }

    // 7. Sync to Supabase
    const slug = sanityPost.slug?.current

    if (slug) {
      // Check if post already exists in Supabase
      const existingPost = await db
        .select()
        .from(posts)
        .where(eq(posts.sanityId, sanityId))
        .limit(1)

      if (existingPost.length > 0) {
        // Update existing
        await db
          .update(posts)
          .set({
            title: sanityPost.title,
            slug,
            excerpt: sanityPost.excerpt,
            content: JSON.stringify(portableTextBlocks),
            category: sanityPost.category,
            aiGenerated: true,
            publishedAt: sanityPost.publishedAt ? new Date(sanityPost.publishedAt) : null,
            updatedAt: new Date(),
          })
          .where(eq(posts.sanityId, sanityId))
      } else {
        // Insert new
        await db.insert(posts).values({
          sanityId,
          slug,
          title: sanityPost.title,
          excerpt: sanityPost.excerpt,
          content: JSON.stringify(portableTextBlocks),
          category: sanityPost.category,
          aiGenerated: true,
          publishedAt: sanityPost.publishedAt ? new Date(sanityPost.publishedAt) : null,
        })
      }

      console.log(`[AI Blog] Supabase synced for slug: ${slug}`)
    }

    // 8. Revalidate pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)

    return {
      success: true,
      message: 'Blog post generated successfully!',
      postId: sanityId,
    }
  } catch (error) {
    console.error('[AI Blog] Generation error:', error)
    return {
      success: false,
      message: 'Failed to generate blog post',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
