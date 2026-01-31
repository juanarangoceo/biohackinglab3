
import { NextResponse } from 'next/server'
import { generateBlogFromTopic } from '@/actions/generate-blog'

export const maxDuration = 60 // Allow longer execution time for AI generation

export async function POST(req: Request) {
  try {
    const { topic, additionalPrompt } = await req.json()

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      )
    }

    // Generate content but DON'T write to Sanity
    // Return the generated data to the client instead
    const result = await generateBlogFromTopic(topic, additionalPrompt)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    // Return the generated content to the client
    // The client (Sanity Studio) will create the document
    return NextResponse.json({ 
      success: true, 
      data: result.data,
      generatedContent: result.generatedContent // Include full content
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
