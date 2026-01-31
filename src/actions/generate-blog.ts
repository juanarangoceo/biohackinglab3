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
export async function generateBlogFromTopic(
  topic: string,
  additionalPrompt?: string
): Promise<{ success: boolean; error?: string; data?: any; generatedContent?: any }> {
  try {
    // Parallelize Content, Title, and Category generation for speed
    const [contentResult, title, categoryRaw] = await Promise.all([
      // 1. Content (Longest first)
      generateContent(
        'Eres un experto en Biohacking, Longevidad y Optimización del Rendimiento Humano.',
        CONTENT_GENERATION_PROMPT(topic, additionalPrompt)
      ),
      // 2. Title
      generateShortText(`Genera un título viral y optimizado para SEO sobre: "${topic}". 
      El título debe:
      - Prometer un beneficio claro o resolver un dolor
      - Ser atractivo y clickeable
      - Máximo 60 caracteres
      - En español
      
      Responde SOLO con el título, sin comillas ni explicaciones.`),
      // 3. Category
      generateShortText(CATEGORY_SUGGESTION_PROMPT(topic))
    ])

    if (!contentResult.content || !title) {
      throw new Error('Failed to generate content or title')
    }

    const contentMarkdown = contentResult.content
    const category = categoryRaw?.toLowerCase() || 'longevidad'
    const slug = generateSlug(title)

    // 4. Generate excerpt (based on content, kept serial as it needs content)
    // Could also parallelize if based on topic, but better quality from content
    const excerpt = await generateShortText(
      EXCERPT_GENERATION_PROMPT(contentMarkdown)
    )

    // 5. Convert to Portable Text
    const portableTextContent = markdownToPortableText(contentMarkdown)

    // Return the generated content WITHOUT writing to Sanity
    // The client will handle document creation
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
        category,
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
