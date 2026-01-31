import { NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { _id, title, slug, excerpt, content, category, faq, aiGenerated, publishedAt } = body

    if (!_id || !slug || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert into Supabase with Upsert (onConflictDoUpdate)
    await db.insert(posts).values({
      slug: slug.current || slug,
      title,
      excerpt: excerpt || '',
      content: JSON.stringify(content),
      category: category || 'general',
      faq: faq || null,
      sanityId: _id,
      aiGenerated: aiGenerated || false,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    }).onConflictDoUpdate({
      target: posts.sanityId,
      set: {
        title,
        excerpt: excerpt || '',
        content: JSON.stringify(content),
        category: category || 'general',
        faq: faq || null,
        slug: slug.current || slug,
        updatedAt: new Date(),
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sync to Supabase' },
      { status: 500 }
    )
  }
}
