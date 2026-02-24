'use server'

import { revalidatePath } from 'next/cache'
import { sanityWriteClient } from '@/lib/sanity/client'
import { generateContent } from '@/lib/ai/gemini'
import { SINGLE_SHOT_NEUROAUDIO_PROMPT } from '@/lib/ai/prompts-v2'

// Helper to generate a random key
function generateKey() {
  return Math.random().toString(36).substring(2, 9)
}

// Helper to convert markdown to Portable Text
function markdownToPortableText(markdown: string) {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  
  let currentBlock: any = null
  let listType: 'bullet' | 'number' | null = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || ''
    const trimmedLine = line.trim()
    
    if (trimmedLine === '') {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      listType = null
      continue
    }
    
    // Header detection
    if (line.match(/^#{2,3}\s/)) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null
      const style = line.startsWith('###') ? 'h3' : 'h2'
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: style,
        children: [{ _key: generateKey(), _type: 'span', text: line.replace(/^#{2,3}\s/, '').trim() }],
      })
      continue
    }

    // List detection
    if (line.match(/^(\*|-)\s/)) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      const text = line.replace(/^(\*|-)\s/, '').trim()
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        listItem: 'bullet',
        level: 1,
        style: 'normal',
        children: parseBoldMarks(text),
      })
      continue
    }
    
    // Normal text blocks
    if (!currentBlock) {
      currentBlock = {
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: parseBoldMarks(trimmedLine),
      }
    } else {
      if (currentBlock && currentBlock.children) {
         currentBlock.children.push({ _key: generateKey(), _type: 'span', text: ' ' })
         parseBoldMarks(trimmedLine).forEach(child => currentBlock.children.push(child))
      }
    }
  }
  
  if (currentBlock) blocks.push(currentBlock)
  return blocks
}

// Simple bold parser for keyword highlighting
function parseBoldMarks(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  const children: any[] = []
  
  parts.forEach(part => {
     if (part.startsWith('**') && part.endsWith('**')) {
        children.push({ 
           _key: generateKey(), 
           _type: 'span', 
           marks: ['strong'], 
           text: part.slice(2, -2) 
        })
     } else if (part) {
        children.push({ 
           _key: generateKey(), 
           _type: 'span', 
           text: part 
        })
     }
  })
  return children.length ? children : [{ _key: generateKey(), _type: 'span', text }]
}

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Generate a complete NeuroAudio element using Gemini
 * This creates a new Sanity document with the YouTube URL, Category and AI Content
 */
export async function generateNeuroAudio(
  youtubeUrl: string,
  category: string,
  topic: string,
  additionalPrompt?: string
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const result = await generateContent(
      'Eres un sistema experto de análisis y generación de contenido enfocado en frecuencias acústicas y biohacking cerebral. Respondes SOLO con JSON.',
      SINGLE_SHOT_NEUROAUDIO_PROMPT(topic, category, additionalPrompt)
    )

    if (!result.content) {
      throw new Error('Failed to generate content')
    }

    // Parse JSON response
    let generatedData;
    try {
        generatedData = JSON.parse(result.content);
    } catch (e) {
        const cleanJson = result.content.replace(/```json\n|\n```/g, '');
        generatedData = JSON.parse(cleanJson);
    }

    const { title, content, excerpt, tags } = generatedData;

    if (!title || !content) {
        throw new Error('Incomplete JSON response');
    }

    const slug = generateSlug(title)
    const portableTextContent = markdownToPortableText(content)

    // Formato final listo para Sanity
    const neuroAudioDocument = {
      _type: 'neuroAudio',
      title: title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      category: category,
      youtubeUrl: youtubeUrl,
      excerpt: excerpt,
      content: portableTextContent,
      tags: Array.isArray(tags) ? tags : [],
    }

    // Save to Sanity directly
    const newDoc = await sanityWriteClient.create(neuroAudioDocument)
    
    // Revalidar las rutas de NeuroAudio en Next.js
    revalidatePath('/neuroaudio')
    revalidatePath(`/neuroaudio/${category}`)
    
    return {
      success: true,
      data: newDoc
    }
  } catch (error) {
    console.error('Generate neuroAudio error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
