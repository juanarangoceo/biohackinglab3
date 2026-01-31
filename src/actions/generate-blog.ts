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

// Helper to generate a random key
function generateKey() {
  return Math.random().toString(36).substring(2, 9)
}

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
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('## ', '') }],
      })
      currentBlock = null
      continue
    }
    
    // H3
    if (line.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('### ', '') }],
      })
      currentBlock = null
      continue
    }
    
    // Bold text
    const processedLine = line.replace(/\*\*(.*?)\*\*/g, (_, text) => text)
    
    if (!currentBlock) {
      currentBlock = {
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: generateKey(), _type: 'span', text: processedLine }],
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
import { SINGLE_SHOT_BLOG_PROMPT } from '@/lib/ai/prompts-v2'

// ... (keep helper functions: generateKey, markdownToPortableText, generateSlug)

export async function generateBlogFromTopic(
  topic: string,
  additionalPrompt?: string
): Promise<{ success: boolean; error?: string; data?: any; generatedContent?: any }> {
  try {
    // Single-Shot Generation for maximum speed
    const result = await generateContent(
      'Eres un sistema experto de generación de contenido JSON.',
      SINGLE_SHOT_BLOG_PROMPT(topic, additionalPrompt)
    )

    if (!result.content) {
      throw new Error('Failed to generate content')
    }

    // Parse JSON response
    let generatedData;
    try {
        generatedData = JSON.parse(result.content);
    } catch (e) {
        // Fallback cleanup if markdown blocks are included
        const cleanJson = result.content.replace(/```json\n|\n```/g, '');
        generatedData = JSON.parse(cleanJson);
    }

    const { title, content, excerpt, category } = generatedData;

    if (!title || !content) {
        throw new Error('Incomplete JSON response');
    }

    const slug = generateSlug(title)
    const portableTextContent = markdownToPortableText(content)

    return {
      success: true,
      data: {
        title,
        slug,
        category,
      },
      generatedContent: {
        title,
        slug: {
          _type: 'slug',
          current: slug,
        },
        content: portableTextContent,
        excerpt,
        category: category?.toLowerCase() || 'longevidad',
        aiGenerated: true,
        publishedAt: new Date().toISOString(),
      }
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
