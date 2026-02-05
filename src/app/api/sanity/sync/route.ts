import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { posts } from '@/db/schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { _id, title, slug, excerpt, content, category, faq, references, aiGenerated, publishedAt } = body

    if (!_id || !slug || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const postSlug = slug.current || slug

    // Insert into Supabase with Upsert (onConflictDoUpdate)
    await db.insert(posts).values({
      slug: postSlug,
      title,
      excerpt: excerpt || '',
      content: JSON.stringify(content),
      category: category || 'general',
      faq: faq || null,
      references: references || null,
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
        references: references || null,
        slug: postSlug,
        updatedAt: new Date(),
      }
    })

    // Revalidate sitemap and blog pages to reflect new/updated post
    revalidatePath('/sitemap.xml')
    revalidatePath('/blog')
    revalidatePath(`/blog/${postSlug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sync to Supabase' },
      { status: 500 }
    )
  }
}
