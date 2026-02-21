import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { BlogGrid } from "@/components/features/BlogGrid"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc, eq, and, isNotNull, sql } from "drizzle-orm"
import { generateBlogListingMetadata } from "@/lib/seo/metadata"
import { generateItemListSchema } from "@/lib/seo/schema"
import { sanityClient } from "@/lib/sanity/client"
import Link from "next/link"
import { Flower2, Home } from "lucide-react"

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams
  const category = params.category || undefined
  
  return generateBlogListingMetadata(category)
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

const POSTS_PER_PAGE = 10

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const category = params.category || 'all'

  // Build query conditions
  const conditions = [isNotNull(posts.publishedAt)]
  if (category && category !== 'all') {
    conditions.push(eq(posts.category, category))
  }

  // Fetch total count for pagination
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(posts)
    .where(and(...conditions))

  const totalPosts = Number(countResult?.count || 0)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  // Fetch paginated posts
  const blogPosts = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      category: posts.category,
      publishedAt: posts.publishedAt,
      coverImage: posts.coverImage,
      aiGenerated: posts.aiGenerated,
    })
    .from(posts)
    .where(and(...conditions))
    .orderBy(desc(posts.publishedAt))
    .limit(POSTS_PER_PAGE)
    .offset((currentPage - 1) * POSTS_PER_PAGE)

  // Cross-reference with Sanity to get tags
  const slugs = blogPosts.map(p => p.slug)
  const sanityTagsPosts = await sanityClient.fetch(
    `*[_type == "post" && slug.current in $slugs]{ "slug": slug.current, "tags": tags[]->{title, "slug": slug.current} }`,
    { slugs }
  )
  
  const tagsMap = new Map<string, {title: string, slug: string}[]>(
    sanityTagsPosts.map((p: any) => [p.slug, p.tags || []])
  )

  const enhancedPosts = blogPosts.map(post => ({
    ...post,
    tags: tagsMap.get(post.slug) || []
  }))

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Featured Hubs Navigation */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance mb-4">
              Blog de Biohacking
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explora nuestros nichos especializados o lee todos los artículos recientes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <Link 
              href="/longevidad-femenina"
              className="group relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-pink-500/20 bg-pink-500/5 p-6 transition-all hover:bg-pink-500/10 hover:border-pink-500/40 sm:w-1/2"
            >
              <div className="rounded-full bg-pink-500/10 p-3 text-pink-500 transition-transform group-hover:scale-110">
                <Flower2 className="h-6 w-6" />
              </div>
              <h3 className="font-mono text-lg font-bold text-foreground">Longevidad Femenina</h3>
              <p className="text-center text-sm text-muted-foreground">Optimización del Eje Ovárico</p>
            </Link>
            
            <Link 
              href="/biohacking-hogar"
              className="group relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 transition-all hover:bg-blue-500/10 hover:border-blue-500/40 sm:w-1/2"
            >
              <div className="rounded-full bg-blue-500/10 p-3 text-blue-500 transition-transform group-hover:scale-110">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="font-mono text-lg font-bold text-foreground">Biohacking Hogar</h3>
              <p className="text-center text-sm text-muted-foreground">Optimiza tu Entorno</p>
            </Link>
          </div>
        </div>
      </section>

      <BlogGrid 
        posts={enhancedPosts} 
        currentPage={currentPage}
        totalPages={totalPages}
        activeCategory={category}
        hideHeader={true}
      />
      <NewsletterSection />
      
      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateItemListSchema({
              name: category && category !== 'all' 
                ? `Artículos de ${category}` 
                : "Blog de Biohacking",
              description: category && category !== 'all'
                ? `Artículos sobre ${category} - Protocolos y estrategias de biohacking`
                : "Artículos, guías y protocolos de biohacking respaldados por ciencia",
              items: enhancedPosts.map(post => ({
                name: post.title,
                url: `/blog/${post.slug}`,
                description: post.excerpt || undefined,
              })),
            })
          ),
        }}
      />
      
      <Footer />
    </main>
  )
}

