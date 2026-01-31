import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Sanity webhook payload structure
    const { _id, _type, slug, title, excerpt, content, category, publishedAt, aiGenerated } = body

    if (_type !== 'post') {
      return NextResponse.json({ success: true, message: 'Not a post document' })
    }

    console.log(`[Webhook] Syncing post: ${_id}`)

    // Check if post exists in Supabase
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.sanityId, _id))
      .limit(1)

    const slugCurrent = slug?.current

    if (!slugCurrent) {
      return NextResponse.json(
        { success: false, error: 'Missing slug' },
        { status: 400 }
      )
    }

    if (existingPost.length > 0) {
      // Update existing post
      await db
        .update(posts)
        .set({
          title,
          slug: slugCurrent,
          excerpt,
          content: content ? JSON.stringify(content) : null,
          category,
          aiGenerated: aiGenerated || false,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          updatedAt: new Date(),
        })
        .where(eq(posts.sanityId, _id))
    } else {
      // Insert new post
      await db.insert(posts).values({
        sanityId: _id,
        slug: slugCurrent,
        title,
        excerpt,
        content: content ? JSON.stringify(content) : null,
        category,
        aiGenerated: aiGenerated || false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      })
    }

    // Revalidate blog pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${slugCurrent}`)

    return NextResponse.json({
      success: true,
      message: 'Post synced successfully',
    })
  } catch (error) {
    console.error('[Webhook] Sync error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
