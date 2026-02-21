import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { MedicalDisclaimer } from "@/components/blog/MedicalDisclaimer"
import { BlogGrid } from "@/components/features/BlogGrid"
import { Dna, Flower2, HeartPulse, Activity } from "lucide-react"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc, eq, and, isNotNull, sql } from "drizzle-orm"
import { generateItemListSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Biohacking y Longevidad Femenina: Optimización del Eje Ovárico | Biohacking Lab",
  description: "Guía completa de biohacking para mujeres. Descubre protocolos respaldados por la ciencia para optimizar las hormonas femeninas, la menopausia, el ciclo ovárico y extender la longevidad y el healthspan.",
  openGraph: {
    title: "Biohacking y Longevidad Femenina: Optimización del Eje Ovárico",
    description: "Protocolos respaldados por la ciencia para optimizar las hormonas femeninas, la menopausia, el ciclo ovárico y extender la longevidad.",
    type: "website",
    url: "https://www.biohackinglab3.com/longevidad-femenina",
  },
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds
const POSTS_PER_PAGE = 9 // Fits nicely in a 3-column grid

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function LongevidadFemeninaPage(props: PageProps) {
  const searchParams = await props.searchParams
  const currentPage = parseInt(searchParams?.page || "1", 10)
  const category = "longevidad-femenina"

  // 1. Pagination Logic
  const conditions = [isNotNull(posts.publishedAt), eq(posts.category, category)]

  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(posts)
    .where(and(...conditions))

  const totalPosts = Number(countResult?.count || 0)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  // 2. Fetch Active Posts
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
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-pink-500/5 dark:bg-pink-500/10" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-50" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm border border-pink-500/20">
              <Flower2 className="h-8 w-8 text-pink-500" />
            </div>
            
            <h1 className="mb-6 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Biohacking y <span className="text-pink-500 dark:text-pink-400">Longevidad Femenina</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty leading-relaxed">
              El cuerpo femenino, con sus ciclos intrincados y su delicado equilibrio hormonal, requiere un enfoque de optimización único. Explora el futuro de la salud ovárica, retraso de la menopausia y el *Healthspan* femenino.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT & SGO EDUCATIONAL SECTION --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Left Column: Educational Content */}
            <div className="prose prose-lg dark:prose-invert lg:col-span-7">
              <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground mb-6">
                El Eje Ovárico: La Clave de la Longevidad
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Durante décadas, los estudios de biohacking y longevidad se centraron casi exclusivamente en la fisiología masculina, asumiendo erróneamente que las mujeres eran simplemente "hombres más pequeños". Hoy entendemos que el <strong>eje hipotálamo-hipófisis-ovario (eje HHO)</strong> no solo dicta la reproducción, sino que es un marcapasos biológico para todo el organismo de la mujer.
              </p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">¿Por qué envejecen primero los ovarios?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Los ovarios envejecen a una velocidad sorprendentemente más rápida (hasta 2.5 veces más rápido) que el resto de los tejidos corporales humanos. Esta drástica asincronía significa que el cese de función protectora de hormonas como el <em>estrógeno</em> y la <em>progesterona</em> (la menopausia) ocurre en la mitad de la vida de la mujer, acelerando el envejecimiento sistémico a nivel cardiovascular, cognitivo, metabólico y óseo.
              </p>

              <blockquote className="border-l-4 border-pink-500 pl-6 italic my-8 text-foreground/90 bg-pink-500/5 py-4 pr-4 rounded-r-lg">
                "Retrasar el envejecimiento ovárico no se trata primordialmente de fertilidad aislada; es la intervención preventiva más poderosa para asegurar una longevidad sistémica y un cerebro joven en la mujer."
              </blockquote>

              <h3 className="text-2xl font-bold mt-8 mb-4">Áreas de Optimización (Biohacking)</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                El biohacking enfocado en la biología femenina prioriza la sincronización circadiana con las fases menstruales y la intervención celular específica:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-card border border-border/50 rounded-xl p-6">
                  <div className="bg-pink-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <Activity className="text-pink-500 h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 m-0">Infradian Rhythm Tracking</h4>
                  <p className="text-sm text-muted-foreground m-0">Adaptación del ayuno, ejercicio frío y carbohidratos según las 4 fases del ciclo (Folicular, Ovulatoria, Lútea y Menstrual).</p>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-6">
                  <div className="bg-pink-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <Dna className="text-pink-500 h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 m-0">Calidad Oocitaria (Mitocondrial)</h4>
                  <p className="text-sm text-muted-foreground m-0">Suplementación objetiva como NMN (NAD+), CoQ10, Resveratrol y melatonina orientada a salvar la densidad mitocondrial de los óvulos.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Pillars & Disclaimer */}
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-2xl border border-pink-500/20 bg-gradient-to-b from-pink-500/5 to-transparent p-8">
                <h3 className="font-mono text-2xl font-bold mb-6 flex items-center gap-3">
                  <HeartPulse className="h-6 w-6 text-pink-500" />
                  4 Pilares de la Prevención
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Terapia de Reemplazo Hormonal (TRH) Identica</h4>
                      <p className="text-sm text-muted-foreground mt-1">Evaluación personalizada del declive hormonal perimenopáusico temprano.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Soporte Mitocondrial Femenino</h4>
                      <p className="text-sm text-muted-foreground mt-1">Uso de fotobiomodulación (luz roja) dirigida y exposición termal hormética (sauna/frío regulado).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Optimización del Microbioma (Estroboloma)</h4>
                      <p className="text-sm text-muted-foreground mt-1">Alimentación que regula la vía digestiva capaz de metabolizar y recircular o excretar el exceso estrogénico.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-500 font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Masa Muscular como Escudo</h4>
                      <p className="text-sm text-muted-foreground mt-1">Resistencia ósea y metabólica a través de hipertrofia de alto estímulo (superponiendo con proteína pesada).</p>
                    </div>
                  </li>
                </ul>
              </div>

               <MedicalDisclaimer />
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG GRID (PAGINADO) --- */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-4">
              Investigaciones y Protocolos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestros artículos, guías paso a paso y resúmenes de los últimos papers científicos enfocados en extender tu Healthspan y preservar la función de tu eje hormonal joven.
            </p>
          </div>

          <BlogGrid 
            posts={blogPosts} 
            currentPage={currentPage}
            totalPages={totalPages}
            activeCategory={category}
            baseRoute="/longevidad-femenina" // Customize the pagination route to stay on this specific landing
          />
        </div>
      </section>

      <NewsletterSection />
      
      {/* ItemList Schema for the blog post list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateItemListSchema({
              name: "Biohacking y Longevidad Femenina: Artículos",
              description: "Artículos, guías y protocolos respaldados por ciencia para la longevidad y salud de la mujer.",
              items: blogPosts.map(post => ({
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
