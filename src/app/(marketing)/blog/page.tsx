import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { BlogGrid } from "@/components/features/BlogGrid"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc, eq, and, isNotNull, sql } from "drizzle-orm"

export const metadata: Metadata = {
  title: "Blog de Biohacking | BioHack Lab",
  description: "Artículos, guías y protocolos de biohacking respaldados por ciencia. Aprende sobre nootrópicos, sueño, longevidad, nutrición y más.",
  keywords: ["blog biohacking", "artículos biohacking", "guías nootrópicos", "protocolos sueño", "longevidad", "optimización humana"],
  openGraph: {
    title: "Blog de Biohacking | BioHack Lab",
    description: "Contenido científico para optimizar tu biología y rendimiento.",
  },
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

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BlogGrid 
        posts={blogPosts} 
        currentPage={currentPage}
        totalPages={totalPages}
        activeCategory={category}
      />
      <NewsletterSection />
      <Footer />
    </main>
  )
}

