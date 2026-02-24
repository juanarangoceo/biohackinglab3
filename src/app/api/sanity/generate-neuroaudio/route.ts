import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'
import { generateNeuroAudio } from '@/actions/generate-neuroaudio'

export const maxDuration = 60 // Allow longer execution time for AI generation

export async function POST(req: Request) {
  try {
    const { documentId, youtubeUrl, category, topic, additionalPrompt } = await req.json()

    if (!topic || !youtubeUrl || !category) {
      return NextResponse.json(
        { success: false, error: 'Topic, YoutubeUrl and Category are required' },
        { status: 400 }
      )
    }

    // Generate content (this creates a new document via the server action)
    // NOTE: If the user clicked inside an existing document in Sanity CMS that was empty,
    // they actually already have a Draft _id via `documentId`. 
    // We should patch it rather than creating a duplicate. Let's adjust logic!
    
    // Instead of using generateNeuroAudio which creates a *NEW* document automatically,
    // it's much better to patch the CURRENT document the user is viewing to avoid ghost drafts.
    
    // For now, let's call the server action, but the server action creates it. Let's patch instead.
    // Actually, I'll modify the API route to handle the patching directly using the same prompt 
    // to strictly respect the Sanity Studio workflow exactly like blog posts.
    
    // Let's import the prompt here and generate:
    const { generateContent } = await import('@/lib/ai/gemini');
    const { SINGLE_SHOT_NEUROAUDIO_PROMPT } = await import('@/lib/ai/prompts-v2');

    const result = await generateContent(
      'Eres un sistema experto de análisis y generación de contenido enfocado en frecuencias acústicas y biohacking cerebral. Respondes SOLO con JSON.',
      SINGLE_SHOT_NEUROAUDIO_PROMPT(topic, category, additionalPrompt)
    )

    if (!result.content) {
      throw new Error('Failed to generate content')
    }

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

    // Import helper to generate Portable Text
    // This is a quick hack, normally we'd isolate this logic, but for speed:
    // (We'll use a stripped down portable text generation)
    function generateKey() {
      return Math.random().toString(36).substring(2, 9)
    }

    function parseBoldMarks(text: string) {
      const parts = text.split(/(\*\*.*?\*\*)/g)
      const children: any[] = []
      
      parts.forEach(part => {
         if (part.startsWith('**') && part.endsWith('**')) {
            children.push({ _key: generateKey(), _type: 'span', marks: ['strong'], text: part.slice(2, -2) })
         } else if (part) {
            children.push({ _key: generateKey(), _type: 'span', text: part })
         }
      })
      return children.length ? children : [{ _key: generateKey(), _type: 'span', text }]
    }

    const blocks: any[] = []
    const lines = content.split('\n')
    let currentBlock: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] || ''
      const trimmedLine = line.trim()
      
      if (trimmedLine === '') {
        if (currentBlock) { blocks.push(currentBlock); currentBlock = null }
        continue
      }
      
      if (line.match(/^#{2,3}\s/)) {
        if (currentBlock) { blocks.push(currentBlock); currentBlock = null }
        const style = line.startsWith('###') ? 'h3' : 'h2'
        blocks.push({
          _key: generateKey(), _type: 'block', style: style,
          children: [{ _key: generateKey(), _type: 'span', text: line.replace(/^#{2,3}\s/, '').trim() }],
        })
        continue
      }

      if (line.match(/^(\*|-)\s/)) {
        if (currentBlock) { blocks.push(currentBlock); currentBlock = null }
        const text = line.replace(/^(\*|-)\s/, '').trim()
        blocks.push({
          _key: generateKey(), _type: 'block', listItem: 'bullet', level: 1, style: 'normal',
          children: parseBoldMarks(text),
        })
        continue
      }
      
      if (!currentBlock) {
        currentBlock = { _key: generateKey(), _type: 'block', style: 'normal', children: parseBoldMarks(trimmedLine) }
      } else {
        if (currentBlock && currentBlock.children) {
           currentBlock.children.push({ _key: generateKey(), _type: 'span', text: ' ' })
           parseBoldMarks(trimmedLine).forEach(child => currentBlock.children.push(child))
        }
      }
    }
    if (currentBlock) blocks.push(currentBlock)

    const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')

    if (documentId) {
      // Patch the existing Sanity Studio document
      await sanityWriteClient
        .patch(documentId)
        .set({
          title,
          slug: { _type: 'slug', current: slug },
          category,
          youtubeUrl,
          tags,
          excerpt,
          content: blocks
        })
        .commit()
    } else {
      // If triggerd without a document id somehow
      await sanityWriteClient.create({
        _type: 'neuroAudio',
        title,
        slug: { _type: 'slug', current: slug },
        category,
        youtubeUrl,
        tags,
        excerpt,
        content: blocks
      })
    }

    return NextResponse.json({ 
      success: true, 
      data: { title, slug }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
