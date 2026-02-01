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
// Helper to convert markdown to Portable Text
function markdownToPortableText(markdown: string) {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  
  let currentBlock: any = null
  let listType: 'bullet' | 'number' | null = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim() // Keep spaces for indentation checks if needed, but for now robust trim
    
    // Empty lines reset current blocks (except inside code blocks - simplified for now)
    if (trimmedLine === '') {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      listType = null
      continue
    }
    
    // H1
    if (line.startsWith('# ')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h1',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('# ', '').trim() }],
      })
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('## ', '').trim() }],
      })
      continue
    }
    
    // H3
    if (line.startsWith('### ')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text: line.replace('### ', '').trim() }],
      })
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      if (currentBlock && currentBlock.style !== 'blockquote') { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      
      const text = line.replace('> ', '').trim()
      
      if (currentBlock && currentBlock.style === 'blockquote') {
         currentBlock.children[0].text += ' ' + text
      } else {
        currentBlock = {
          _key: generateKey(),
          _type: 'block',
          style: 'blockquote',
          children: [{ _key: generateKey(), _type: 'span', text: text }],
        }
      }
      continue
    }

    // Unordered List (- or *)
    if (line.match(/^(\*|-)\s/)) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      
      const text = line.replace(/^(\*|-)\s/, '').trim()
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        listItem: 'bullet',
        level: 1,
        style: 'normal',
        children: [{ _key: generateKey(), _type: 'span', text: text }],
      })
      continue
    }

    // Ordered List (1. )
    if (line.match(/^\d+\.\s/)) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      
      const text = line.replace(/^\d+\.\s/, '').trim()
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        listItem: 'number',
        level: 1,
        style: 'normal',
        children: [{ _key: generateKey(), _type: 'span', text: text }],
      })
      continue
    }
    
    // Bold text handling within normal paragraphs
    // Note: detailed mark parsing (bold, italic, link) inside generic text is complex manually.
    // For now, we support bold **text** stripping for cleaner text or simple span splitting?
    // The previous implementation was: text: processedLine. 
    // We will keep the text as is but ideally PortableText handles simple marks if we just pass text... 
    // Wait, PortableText needs `marks` array on spans.
    // The previous implementation replaced ** with nothing? No, `(_, text) => text`. It STRIPPED bold markers.
    // Let's improve: keep them stripped but ideally we want BOLD. 
    // Since implementing a full tokenizer is risky here, let's Stick to the previous "strip markers" strategy 
    // BUT correctly identify paragraphs vs lists.
    
    const processedLine = line.replace(/\*\*(.*?)\*\*/g, '$1') // Strip bold markers for now to avoid ** showing up
    
    if (!currentBlock) {
      currentBlock = {
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: generateKey(), _type: 'span', text: processedLine }],
      }
    } else {
      // If previous block was a list item, we DO NOT force append. 
      // But we handled lists by pushing immediately above. 
      // So currentBlock is only 'normal' or 'blockquote' here.
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

    const { title, content, excerpt, category, faq } = generatedData;

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
        faq: faq || [],
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
