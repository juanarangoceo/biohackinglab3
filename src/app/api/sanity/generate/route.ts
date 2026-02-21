import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'
import { generateBlogFromTopic } from '@/actions/generate-blog'

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
    const result = await generateBlogFromTopic(topic, additionalPrompt)

    if (!result.success || !result.generatedContent) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to generate content' },
        { status: 500 }
      )
    }

    // Write directly to Sanity using the server client with write permissions
    await sanityWriteClient
      .patch(documentId)
      .set({
        title: result.generatedContent.title,
        slug: result.generatedContent.slug,
        content: result.generatedContent.content,
        excerpt: result.generatedContent.excerpt,
        category: result.generatedContent.category,
        faq: result.generatedContent.faq,
        references: result.generatedContent.references,
        aiGenerated: true,
        author: result.generatedContent.author,
        authorRole: result.generatedContent.authorRole,
      })
      .commit()

    return NextResponse.json({ 
      success: true, 
      data: result.data,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
