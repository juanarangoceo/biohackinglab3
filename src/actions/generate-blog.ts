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
  let listType: 'bullet' | 'number' | null = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || ''
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
    
    // Table handling
    if (line.trim().startsWith('|')) {
      if (currentBlock) { blocks.push(currentBlock); currentBlock = null; }
      listType = null

      const rows: any[] = []
      // Look ahead to capture the full table
      let tableIndex = i;
      while (tableIndex < lines.length) {
        const lineStr = lines[tableIndex];
        if (!lineStr || !lineStr.trim().startsWith('|')) break;
        
        const tableLine = lineStr.trim();
        // Skip separator line (e.g. |---|---|)
        if (!tableLine.match(/^\|\s*:?-+:?\s*\|/)) {
          const cells = tableLine
            .split('|')
            .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1) // Remove first and last empty splits from leading/trailing pipes
            .map(cell => cell.trim());
          
          rows.push({
            _key: generateKey(),
            _type: 'tableRow',
            cells: cells
          });
        }
        tableIndex++;
      }
      
      if (rows.length > 0) {
        blocks.push({
          _key: generateKey(),
          _type: 'table',
          rows: rows
        })
      }
      
      // Advance the main loop index
      i = tableIndex - 1;
      continue;
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
    
    // Parse bold and italic marks
    // We split by **bold** first
    const parts = line.split(/(\*\*.*?\*\*)/g)
    const children: any[] = []
    
    parts.forEach(part => {
       if (part.startsWith('**') && part.endsWith('**')) {
          children.push({ 
             _key: generateKey(), 
             _type: 'span', 
             marks: ['strong'], 
             text: part.slice(2, -2) 
          })
       } else {
          // Then split by *italic* (simple check, assuming no nested ** inside *)
          const subParts = part.split(/(\*.*?\*)/g)
          subParts.forEach(subPart => {
             if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
                 children.push({ 
                   _key: generateKey(), 
                   _type: 'span', 
                   marks: ['em'], 
                   text: subPart.slice(1, -1) 
                 })
             } else {
                 if (subPart) {
                    children.push({ 
                       _key: generateKey(), 
                       _type: 'span', 
                       text: subPart 
                    })
                 }
             }
          })
       }
    })

    if (children.length === 0) continue // Empty line or just markers?

    if (!currentBlock) {
      currentBlock = {
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: children,
      }
    } else {
      // Append to previous block if it's normal/blockquote
      // Note: merging children is tricky if we want to add a space. 
      // Simplified: if extending a block, we add a space span first.
      if (currentBlock && currentBlock.children) {
         currentBlock.children.push({ _key: generateKey(), _type: 'span', text: ' ' })
         children.forEach(child => currentBlock.children.push(child))
      }
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

// Helper to normalize category from AI output
function normalizeCategory(category?: string): string {
  if (!category) return 'longevidad';
  
  const normalized = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  
  if (normalized.includes('mujer') || normalized.includes('femenin') || normalized.includes('ovari') || normalized.includes('menopausia') || normalized.includes('hormonas-femeninas')) return 'longevidad-femenina';
  if (normalized.includes('hogar') || normalized.includes('casa') || normalized.includes('purificador') || normalized.includes('filtro') || normalized.includes('entorno') || normalized.includes('ambiente') || normalized.includes('smart')) return 'biohacking-hogar';
  if (normalized.includes('nootropico')) return 'nootropicos';
  if (normalized.includes('sueno') || normalized.includes('sleep')) return 'sueno';
  if (normalized.includes('nutricion')) return 'nutricion';
  if (normalized.includes('fitness') || normalized.includes('ejercicio')) return 'fitness';
  
  return 'longevidad'; // Default fallback
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

    const { title, content, excerpt, category, faq, references, tags } = generatedData;

    if (!title || !content) {
        throw new Error('Incomplete JSON response');
    }

    const slug = generateSlug(title)
    const portableTextContent = markdownToPortableText(content)

    // Process Tags: Sanity creation/querying
    const sanityTagRefs: any[] = []
    if (Array.isArray(tags) && tags.length > 0) {
      try {
        for (const tagName of tags) {
          const tagSlug = generateSlug(tagName)
          // Look for existing tag
          const existingTag = await sanityWriteClient.fetch('*[_type == "tag" && slug.current == $slug][0]{_id}', { slug: tagSlug })
          if (existingTag) {
            sanityTagRefs.push({ _type: 'reference', _ref: existingTag._id, _key: generateKey() })
          } else {
            // Create new tag
            const newTag = await sanityWriteClient.create({
              _type: 'tag',
              title: tagName,
              slug: { _type: 'slug', current: tagSlug },
              aiGenerated: false
            })
            sanityTagRefs.push({ _type: 'reference', _ref: newTag._id, _key: generateKey() })
          }
        }
      } catch (tagError) {
        console.error("Error linking tags: ", tagError)
      }
    }

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
        category: normalizeCategory(category),
        faq: Array.isArray(faq) ? faq.map((item: any) => ({ ...item, _key: generateKey() })) : [],
        references: Array.isArray(references) ? references.map((item: any) => ({ ...item, _key: generateKey() })) : [],
        tags: sanityTagRefs,
        aiGenerated: true,
        author: "Juan Arango",
        authorRole: "Editor en Jefe",
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
