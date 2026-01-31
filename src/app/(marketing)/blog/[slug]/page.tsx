import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { PortableText } from "@portabletext/react"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)

  if (!post) {
    return {
      title: "Post no encontrado | BioHack Lab",
    }
  }

  return {
    title: `${post.title} | BioHack Lab`,
    description: post.excerpt || post.title,
    keywords: [post.category, "biohacking", "longevidad", "optimización humana"],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: ["BioHack Lab"],
    },
  }
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)

  if (!post) {
    notFound()
  }

  // Parse the Portable Text content
  let portableTextContent = []
  try {
    portableTextContent = typeof post.content === 'string' 
      ? JSON.parse(post.content) 
      : post.content
  } catch (e) {
    console.error('Failed to parse content:', e)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-8 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase">
              {post.category}
            </span>
            {post.aiGenerated && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
                ✨ Generado con IA
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-4">
              {post.excerpt}
            </p>
          )}
          
          {post.publishedAt && (
            <time className="text-sm text-muted-foreground">
              Publicado el {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
            </time>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-foreground
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-ul:my-6 prose-li:my-2
          prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        ">
          <PortableText value={portableTextContent} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">¿Te gustó este artículo?</h3>
            <p className="text-muted-foreground mb-6">
              Únete a nuestra comunidad y recibe contenido exclusivo de biohacking
            </p>
            <a 
              href="/blog" 
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ver más artículos
            </a>
          </div>
        </div>
      </article>
      
      <Footer />
    </main>
  )
}
