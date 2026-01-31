'use server'

import { revalidatePath } from 'next/cache'
import { sanityWriteClient } from '@/lib/sanity/client'
import { generateContent, generateShortText } from '@/lib/ai/gemini'
import {
  CONTENT_GENERATION_PROMPT,
  EXCERPT_GENERATION_PROMPT,
  CATEGORY_SUGGESTION_PROMPT,
} from '@/lib/ai/prompts'
import { db } from '@/db'
import { posts } from '@/db/schema'

// Helper to convert markdown to Portable Text
function markdownToPortableText(markdown: string) {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  
  let currentBlock: any = null
  
  for (const line of lines) {
    if (line.trim() === '') {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      continue
    }
    
    // H2
    if (line.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '') }],
      })
      currentBlock = null
      continue
    }
    
    // H3
    if (line.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.replace('### ', '') }],
      })
      currentBlock = null
      continue
    }
    
    // Bold text
    const processedLine = line.replace(/\*\*(.*?)\*\*/g, (_, text) => text)
    
    if (!currentBlock) {
      currentBlock = {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: processedLine }],
      }
    } else {
      currentBlock.children[0].text += ' ' + processedLine
    }
  }
  
  if (currentBlock) blocks.push(currentBlock)
  
  return blocks
}

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
}

/**
 * Generate a complete blog post from a topic
 * This creates a new Sanity document with all fields populated
 */
export async function generateBlogFromTopic(
  topic: string,
  additionalPrompt?: string
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    // 1. Generate title
    const titlePrompt = `Genera un título viral y optimizado para SEO sobre: "${topic}". 
    El título debe:
    - Prometer un beneficio claro o resolver un dolor
    - Ser atractivo y clickeable
    - Máximo 60 caracteres
    - En español
    
    Responde SOLO con el título, sin comillas ni explicaciones.`
    
    const title = await generateShortText(titlePrompt)
    if (!title) {
      throw new Error('Failed to generate title')
    }

    // 2. Generate slug
    const slug = generateSlug(title)

    // 3. Generate content
    const contentResult = await generateContent(
      'Eres un experto en Biohacking, Longevidad y Optimización del Rendimiento Humano.',
      CONTENT_GENERATION_PROMPT(topic, additionalPrompt)
    )
    if (!contentResult.content) {
      throw new Error('Failed to generate content')
    }
    const contentMarkdown = contentResult.content

    // 4. Convert to Portable Text
    const portableTextContent = markdownToPortableText(contentMarkdown)

    // 5. Generate excerpt
    const excerpt = await generateShortText(
      EXCERPT_GENERATION_PROMPT(contentMarkdown)
    )

    // 6. Suggest category
    const categoryRaw = await generateShortText(
      CATEGORY_SUGGESTION_PROMPT(topic)
    )
    const category = categoryRaw?.toLowerCase() || 'longevidad'

    // 7. Create Sanity document
    const sanityDoc = await sanityWriteClient.create({
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      content: portableTextContent,
      excerpt,
      category,
      aiGenerated: true,
      publishedAt: new Date().toISOString(),
    })

    // 8. Sync to Supabase
    try {
      await db.insert(posts).values({
        slug,
        title,
        excerpt: excerpt || '',
        content: JSON.stringify(portableTextContent),
        category,
        sanityId: sanityDoc._id,
        aiGenerated: true,
        publishedAt: new Date(),
      })
    } catch (dbError) {
      console.error('Supabase sync error:', dbError)
      // Don't fail the whole operation if Supabase sync fails
    }

    // 9. Revalidate pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)

    return {
      success: true,
      data: {
        id: sanityDoc._id,
        title,
        slug,
        category,
      },
    }
  } catch (error) {
    console.error('Generate blog error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Keep the old function for backwards compatibility
export async function generateBlog(documentId: string, topic: string) {
  // This is deprecated but kept for any existing references
  return generateBlogFromTopic(topic)
}
