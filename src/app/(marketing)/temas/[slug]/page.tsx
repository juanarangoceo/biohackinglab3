import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { topics } from "@/config/topics"
import { sanityFetch } from "@/lib/sanity/client"
import { postsByCategoryQuery } from "@/lib/sanity/queries"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { MedicalDisclaimer } from "@/components/blog/MedicalDisclaimer"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function calculateReadTime(excerpt: string | null): string {
  const avgWords = 1200
  const wpm = 200
  const minutes = Math.ceil(avgWords / wpm)
  return `${minutes} min`
}

// 1. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const topic = topics.find((t) => t.slug === slug)
  
  if (!topic) {
    return {
      title: "Tema no encontrado",
    }
  }

  return {
    title: topic.seoTitle,
    description: topic.seoDescription,
    openGraph: {
      title: topic.seoTitle,
      description: topic.seoDescription,
      type: "website",
    },
  }
}

// 2. Main Page Component
export default async function CategoryPage(props: PageProps) {
  const params = await props.params
  const topic = topics.find((t) => t.slug === params.slug)

  if (!topic) {
    notFound()
  }

  // Fetch related posts from Sanity
  const posts = await sanityFetch(postsByCategoryQuery, { category: topic.slug })

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-secondary/20" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-50" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm border border-border/50">
              <topic.icon className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="mb-6 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {topic.title}
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty leading-relaxed">
              {topic.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- INTRO & CONCEPTS (SGE Optimized) --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Content */}
            <div className="prose prose-lg dark:prose-invert">
              <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground">
                {topic.intro.heading}
              </h2>
              <div className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">
                {topic.intro.content}
              </div>
              
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h3 className="mb-4 font-mono text-lg font-semibold text-primary">
                  La Ciencia Detrás
                </h3>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {topic.scientificBasis}
                </p>
              </div>
            </div>

            {/* Right: Key Benefits */}
            <div className="lg:pl-10">
              <h3 className="mb-8 font-mono text-2xl font-bold tracking-tight">
                Principales Beneficios
              </h3>
              <div className="grid gap-6">
                {topic.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-lg text-foreground/90">{benefit}</p>
                  </div>
                ))}
              </div>

               {/* Medical Disclaimer Inline */}
               <div className="mt-12">
                <MedicalDisclaimer />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RELATED POSTS --- */}
      {posts.length > 0 && (
        <section className="py-16 bg-secondary/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
                <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
                    Artículos Relacionados
                </Badge>
                <h2 className="font-mono text-3xl font-bold">
                    Aprende más sobre {topic.title}
                </h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {posts.map((article: any) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <Badge variant="secondary" className="font-mono text-xs capitalize">
                          {article.category}
                        </Badge>
                      </div>
                      
                      <h3 className="mb-3 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary text-balance">
                        {article.title}
                      </h3>
                      
                      <p className="mb-4 flex-grow text-sm text-muted-foreground leading-relaxed">
                        {article.excerpt || 'Artículo de biohacking'}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span>
                            {article.publishedAt 
                              ? format(new Date(article.publishedAt), "d MMM", { locale: es })
                              : 'Pronto'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {calculateReadTime(article.excerpt)}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center">
                 <p className="text-muted-foreground">
                    Mostrando los últimos artículos. Visita el <a href="/blog" className="text-primary hover:underline">Blog</a> para ver todo.
                 </p>
            </div>
          </div>
        </section>
      )}

      {/* --- FAQ SECTION --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {topic.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                <AccordionTrigger className="text-lg font-medium text-left hover:text-primary transition-colors">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- NEWSLETTER CTA --- */}
      <NewsletterSection />
      
      <Footer />
    </main>
  )
}

// 3. Static Params for SSG (Optional but recommended for speed)
export async function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }))
}
