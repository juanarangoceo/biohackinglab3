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
import { StyledPortableText } from "@/components/blog/StyledPortableText"
import { MedicalDisclaimer } from "@/components/blog/MedicalDisclaimer"
import { References } from "@/components/blog/References"
import { AffiliateAdBlock, AffiliateAdProps } from "@/components/blog/AffiliateAdBlock"
import { sanityClient } from "@/lib/sanity/client"
import { generateBlogPostMetadata } from "@/lib/seo/metadata"
import { 
  generateArticleSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema
} from "@/lib/seo/schema"

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

  return generateBlogPostMetadata({
    title: post.title,
    excerpt: post.excerpt || undefined,
    category: post.category,
    slug: post.slug,
    publishedAt: post.publishedAt || undefined,
    updatedAt: post.updatedAt || undefined,
    coverImage: post.coverImage || undefined,
  })
}

export const revalidate = 3600 // ISR: Revalidate every 1 hour

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

  // Fetch Affiliate Ad directly from Sanity Studio using the slug
  let affiliateAd: AffiliateAdProps | null = null
  try {
    affiliateAd = await sanityClient.fetch<AffiliateAdProps | null>(
      `*[_type == "affiliateAd" && post->slug.current == $slug][0]{
        internalName,
        url,
        image {
          asset-> {
            url
          }
        }
      }`,
      { slug }
    )
  } catch (error) {
    console.error("Error fetching affiliate ad:", error)
  }

  // Parse FAQ
  const faqData = post.faq as Array<{ question: string; answer: string }> | null

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
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
              
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {post.author ? post.author.charAt(0) : "J"}
                 </div>
                 <div>
                    <p className="font-semibold text-foreground leading-none">
                      {post.author || "Juan Arango"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {post.authorRole || "Editor en Jefe"}
                    </p>
                 </div>
              </div>

              {post.publishedAt && (
                <time className="text-sm text-muted-foreground block mb-4">
                  Publicado el {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
                </time>
              )}
            </header>

            {/* Mobile Affiliate Ad (Shows BEFORE the generic Mobile TOC) */}
            {affiliateAd && (
              <div className="lg:hidden mb-8">
                <AffiliateAdBlock ad={affiliateAd} />
              </div>
            )}

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
            <div className="max-w-none">
              <StyledPortableText value={contentWithIds} />
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-8">
              <MedicalDisclaimer />
            </div>

            {/* References */}
            {post.references && Array.isArray(post.references) && post.references.length > 0 && (
              <References references={post.references as any} />
            )}

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
          <aside className="hidden lg:block space-y-8 sticky top-24 h-fit self-start">
            <TableOfContents content={contentWithIds} />
            
            {/* Desktop Affiliate Ad (Shows AFTER the Desktop TOC) */}
            {affiliateAd && (
              <div className="mt-8">
                <AffiliateAdBlock ad={affiliateAd} />
              </div>
            )}
            
            <NewsletterCard />
          </aside>
        </div>
      </div>


      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              generateArticleSchema({
                title: post.title,
                description: post.excerpt || undefined,
                slug: post.slug,
                publishedAt: post.publishedAt || undefined,
                updatedAt: post.updatedAt || undefined,
                category: post.category,
                coverImage: post.coverImage || undefined,
                content: typeof post.content === 'string' ? post.content : JSON.stringify(post.content),
              }),
              ...(faqData && faqData.length > 0 ? [generateFAQSchema(faqData)] : []),
              generateBreadcrumbSchema([
                { name: "Inicio", url: "/" },
                { name: "Blog", url: "/blog" },
                { name: post.category, url: `/blog?category=${post.category}` },
                { name: post.title },
              ])
            ]
          }),
        }}
      />
      
      <Footer />
    </main>
  )
}
