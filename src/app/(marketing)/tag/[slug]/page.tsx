import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { BlogGrid } from '@/components/features/BlogGrid'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity/client'

export const revalidate = 3600 // Cache for 1 hour

interface TagPageProps {
  params: Promise<{ slug: string }>
}

// GROQ Queries
const TAG_QUERY = `
  *[_type == "tag" && slug.current == $slug][0] {
    title,
    content,
    aiGenerated
  }
`

const TAG_POSTS_QUERY = `
  *[_type == "post" && $slug in tags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    aiGenerated,
    "mainImage": mainImage.asset->url,
    "tags": tags[]->{title, "slug": slug.current}
  }
`

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  
  const [tag, postCount] = await Promise.all([
    sanityClient.fetch(TAG_QUERY, { slug }),
    sanityClient.fetch(`count(*[_type == "post" && $slug in tags[]->slug.current])`, { slug })
  ])

  if (!tag) {
    return { title: 'Tag no encontrado' }
  }

  // SEO conditional logic: No index if fewer than 3 posts
  const shouldIndex = postCount >= 3

  return {
    title: `${tag.title} | Biohacking Lab 3.0`,
    description: `Descubre todo sobre ${tag.title}. Artículos, ciencia y protocolos de optimización humana.`,
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
      },
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params

  const [tag, postsData] = await Promise.all([
    sanityClient.fetch(TAG_QUERY, { slug }),
    sanityClient.fetch(TAG_POSTS_QUERY, { slug })
  ])

  if (!tag) {
    notFound()
  }

  // Format posts for BlogGrid
  const formattedPosts = (postsData || []).map((p: any) => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
    coverImage: p.mainImage || null,
    aiGenerated: !!p.aiGenerated,
    tags: p.tags || []
  }))

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        
        {/* Tag Header & SGO Content */}
        <section className="pt-32 pb-12">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="mb-8 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Etiqueta: {tag.title}
            </h1>
            
            {tag.content ? (
              <div className="prose prose-lg dark:prose-invert prose-p:text-muted-foreground prose-headings:font-bold prose-headings:font-mono max-w-none mb-16">
                <PortableText value={tag.content} />
              </div>
            ) : (
              <div className="py-8 text-muted-foreground italic border-b border-border mb-8">
                El ensayo o "Hub" de contenido para esta etiqueta aún no ha sido generado.
              </div>
            )}
          </div>
        </section>

        {/* Tag Posts */}
        <section className="bg-secondary/20 pb-20">
          <div className="mx-auto max-w-7xl px-6 pt-12">
            <h2 className="mb-2 text-2xl font-bold font-mono">Artículos sobre {tag.title}</h2>
            <p className="text-muted-foreground mb-8">
              {formattedPosts.length} post{formattedPosts.length !== 1 ? 's' : ''} enlazados a este concepto semántico.
              {formattedPosts.length < 3 && (
                <span className="text-yellow-600/80 text-sm ml-2">
                  (Oculto a Google hasta tener 3 artículos)
                </span>
              )}
            </p>
            <BlogGrid 
              posts={formattedPosts}
              currentPage={1}
              totalPages={1}
              activeCategory="all"
              baseRoute={`/tag/${slug}`}
              hideHeader={true}
              hideFilters={true}
            />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
