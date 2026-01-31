import { NextRequest, NextResponse } from 'next/server'
import { generateBlog } from '@/actions/generate-blog'
import { z } from 'zod'

const requestSchema = z.object({
  documentId: z.string().min(1),
  topic: z.string().min(10).max(500),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const validation = requestSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request data',
          details: validation.error.issues 
        },
        { status: 400 }
      )
    }

    const { documentId, topic } = validation.data

    // Generate blog post
    const result = await generateBlog(documentId, topic)

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || result.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      postId: result.postId,
    })
  } catch (error) {
    console.error('[API] Generate blog error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
