import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'
import { generateTagFromTopic } from '@/actions/generate-tag'

export const maxDuration = 60 // Allow longer execution time for AI generation

export async function POST(req: Request) {
  try {
    const { documentId, topic, additionalPrompt } = await req.json()

    if (!topic || !documentId) {
      return NextResponse.json(
        { success: false, error: 'Topic and documentId are required' },
        { status: 400 }
      )
    }

    // Generate content 
    const result = await generateTagFromTopic(topic, additionalPrompt)

    if (!result.success || !result.generatedContent) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to generate tag content' },
        { status: 500 }
      )
    }

    // Write directly to Sanity using the server client with write permissions
    await sanityWriteClient
      .patch(documentId)
      .set({
        content: result.generatedContent.content,
        aiGenerated: true,
      })
      .commit()

    return NextResponse.json({ 
      success: true, 
      generatedContent: result.generatedContent,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
