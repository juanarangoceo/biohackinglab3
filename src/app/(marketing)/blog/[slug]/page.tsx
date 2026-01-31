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
import { Breadcrumbs } from "@/components/blog/Breadcrumbs"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { FAQSection } from "@/components/blog/FAQSection"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { NewsletterCard } from "@/components/blog/NewsletterCard"

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

  // Add IDs to headings for TOC navigation
  const contentWithIds = portableTextContent.map((block: any, index: number) => {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      return { ...block, _key: `heading-${index}` }
    }
    return block
  })

  // Parse FAQ
  const faqData = post.faq as Array<{ question: string; answer: string }> | null

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <Breadcrumbs category={post.category} title={post.title} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <article>
            {/* Header */}
            <header className="mb-8 border-b border-border pb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase">
                  {post.category}
                </span>
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

            {/* Mobile TOC */}
            <div className="lg:hidden mb-8">
              <details className="rounded-lg border border-border bg-card p-4">
                <summary className="cursor-pointer font-semibold text-sm uppercase tracking-wide">
                  Índice del artículo
                </summary>
                <div className="mt-4">
                  <TableOfContents content={contentWithIds} />
                </div>
              </details>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-6 prose-li:my-2
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            ">
              <PortableText 
                value={contentWithIds}
                components={{
                  block: {
                    h2: ({ children, value }) => (
                      <h2 id={value._key || `heading-${Math.random()}`}>{children}</h2>
                    ),
                    h3: ({ children, value }) => (
                      <h3 id={value._key || `heading-${Math.random()}`}>{children}</h3>
                    ),
                  },
                }}
              />
            </div>

            {/* FAQ Section */}
            {faqData && faqData.length > 0 && (
              <FAQSection faqs={faqData} />
            )}

            {/* Mobile Newsletter */}
            <div className="lg:hidden mt-12">
              <NewsletterCard />
            </div>

            {/* Related Posts */}
            <RelatedPosts currentSlug={post.slug} category={post.category} />
          </article>

          {/* Sidebar (Desktop only) */}
          <aside className="hidden lg:block">
            <TableOfContents content={contentWithIds} />
            <NewsletterCard />
          </aside>
        </div>
      </div>

      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt || post.title,
            "author": {
              "@type": "Organization",
              "name": "BioHack Lab",
            },
            "publisher": {
              "@type": "Organization",
              "name": "BioHack Lab",
              "logo": {
                "@type": "ImageObject",
                "url": "https://biohackinglab3.com/logo.png",
              },
            },
            "datePublished": post.publishedAt?.toISOString(),
            "dateModified": post.updatedAt?.toISOString(),
            "articleSection": post.category,
          }),
        }}
      />
      
      <Footer />
    </main>
  )
}
