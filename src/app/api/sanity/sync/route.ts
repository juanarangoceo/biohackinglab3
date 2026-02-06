import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { sanityClient } from '@/lib/sanity/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { _id } = body

    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: _id' },
        { status: 400 }
      )
    }

    // Fetch the full document from Sanity to ensure we have all fields
    // Webhooks might send partial data depending on the projection
    const post = await sanityClient.fetch<any>(`*[_type == "post" && _id == $id][0]{
      _id,
      title,
      slug,
      excerpt,
      content,
      category,
      faq,
      references,
      aiGenerated,
      publishedAt
    }`, { id: _id })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found in Sanity' },
        { status: 404 }
      )
    }

    const { 
      title, 
      slug, 
      excerpt, 
      content, 
      category, 
      faq, 
      references, 
      aiGenerated, 
      publishedAt 
    } = post

    if (!slug || !title) {
       return NextResponse.json(
        { success: false, error: 'Post data is incomplete (missing slug or title)' },
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

    return NextResponse.json({ success: true, message: 'Synced successfully', data: { title, slug: postSlug } })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sync to Supabase' },
      { status: 500 }
    )
  }
}
