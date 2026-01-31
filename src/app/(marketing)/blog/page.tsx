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

  // DIAGNOSTIC MOCK DATA - BYPASSING DB
  // This is a temporary change to isolate the 500 error source
  const blogPosts = [
    {
       id: '1',
       title: 'TEST POST - DB BYPASSED',
       slug: 'test-post',
       excerpt: 'If you see this, the site works and the DB connection is the problem.',
       publishedAt: new Date(),
       coverImage: null,
       category: 'System Check',
       aiGenerated: false,
    }
  ];
  const totalPosts = 1;
  const totalPages = 1;

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

