import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { BlogGrid } from "@/components/features/BlogGrid"
import { Home, Lightbulb, Wind, Droplets, Shield } from "lucide-react"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc, eq, and, isNotNull, sql } from "drizzle-orm"
import { generateItemListSchema } from "@/lib/seo/schema"
import { sanityClient } from "@/lib/sanity/client"
import { Tag } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Biohacking del Hogar: Optimiza tu Entorno | Biohacking Lab",
  description: "Guía completa para optimizar tu casa. Descubre tecnologías y hábitos para purificar tu aire, tu agua, mejorar tu iluminación circadiana y mitigar EMFs.",
  openGraph: {
    title: "Biohacking del Hogar: Optimiza tu Entorno",
    description: "Protocolos guiados por datos para transformar tu casa en un templo de salud: aire puro, agua, luz circadiana y blindaje electromagnético.",
    type: "website",
    url: "https://www.biohackinglab3.com/biohacking-hogar",
  },
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds
const POSTS_PER_PAGE = 9 // Fits nicely in a 3-column grid

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function BiohackingHogarPage(props: PageProps) {
  const searchParams = await props.searchParams
  const currentPage = parseInt(searchParams?.page || "1", 10)
  const category = "biohacking-hogar"

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

  // Fetch Sanity Tags
  const slugs = blogPosts.map(p => p.slug)
  let enhancedPosts = blogPosts
  if (slugs.length > 0) {
    const sanityTagsPosts = await sanityClient.fetch(
      `*[_type == "post" && slug.current in $slugs]{ "slug": slug.current, "tags": tags[]->{title, "slug": slug.current} }`,
      { slugs }
    )
    const tagsMap = new Map<string, {title: string, slug: string}[]>(
      sanityTagsPosts.map((p: any) => [p.slug, p.tags || []])
    )
    enhancedPosts = blogPosts.map((post: any) => ({
      ...post,
      tags: tagsMap.get(post.slug) || []
    }))
  }

  // Extract unique tags for this category
  const uniqueTagsMap = new Map<string, {title: string, slug: string}>()
  enhancedPosts.forEach((post: any) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: any) => {
        if (tag && tag.slug) {
          uniqueTagsMap.set(tag.slug, tag)
        }
      })
    }
  })
  const categoryTags = Array.from(uniqueTagsMap.values())

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-50" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm border border-blue-500/20">
              <Home className="h-8 w-8 text-blue-500" />
            </div>
            
            <h1 className="mb-6 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Biohacking del <span className="text-blue-500 dark:text-blue-400">Hogar (Smart Home)</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty leading-relaxed">
              No puedes estar óptimo si el entorno donde duermes, trabajas y respiras es tóxico. Transforma tu casa en un templo de regeneración mitigando luz artificial, toxinas en agua y aire, y contaminación electromagnética.
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
                Tu Ambiente Determina tu Biología
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Pasamos aproximadamente el <strong>90% de nuestra vida en interiores</strong>. El síndrome del edificio enfermo, la acumulación de dióxido de carbono en la habitación al dormir y los picos de luz azul nocturna de nuestras lámparas desregulan los ritmos biológicos a nivel genético y celular, saboteando dietas e interrumpiendo el sistema inmune.
              </p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">La Carga Tóxica Invisible</h3>
              <p className="text-muted-foreground leading-relaxed">
                El polvo de nuestros hogares suele contener microplásticos y disruptores endocrinos derivados de sartenes de teflón, velas sintéticas o productos de limpieza químicos (VOCs). Cuando tu hígado gasta un 30% de sus recursos diarios en detoxificar el simple acto de respirar dentro de tu apartamento, tu cerebro no puede funcionar al 100%.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-6 italic my-8 text-foreground/90 bg-blue-500/5 py-4 pr-4 rounded-r-lg">
                "El biohacking del hogar es entender que tu casa es la membrana externa de tu cuerpo. Un ambiente enfermo crea un huésped enfermo, independientemente de la dieta."
              </blockquote>

              <h3 className="text-2xl font-bold mt-8 mb-4">Áreas de Acción Fáciles</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Reducir agresivamente la inflamación ambiental inicia con estas dos métricas que puedes medir barato y rápido:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-card border border-border/50 rounded-xl p-6">
                  <div className="bg-blue-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="text-blue-500 h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 m-0">Ecología Lumínica</h4>
                  <p className="text-sm text-muted-foreground m-0">Bombillas rojas y ambarinas en la noche. Bloqueadores de luz azul de uso físico. Ventanas abiertas apenas amanezca para resetear el reloj maestro.</p>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-6">
                  <div className="bg-blue-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="text-blue-500 h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 m-0">Higiene Inalámbrica (EMF)</h4>
                  <p className="text-sm text-muted-foreground m-0">Apagar el router de WiFi al dormir, cargar móviles o laptops en estancias alejadas de la cabecera, y conexión Ethernet donde sea posible.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Pillars & Disclaimer */}
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent p-8">
                <h3 className="font-mono text-2xl font-bold mb-6 flex items-center gap-3">
                  <Home className="h-6 w-6 text-blue-500" />
                  4 Pilares del Biohacking Hogar
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Aire e Intercambio Limpio</h4>
                      <p className="text-sm text-muted-foreground mt-1">Uso de monitores CO2 y purificadores HEPA / Carbón activado verdadero para neutralizar ácaros, polen, humo humano y moho.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Iluminación Circadiana Hacking</h4>
                      <p className="text-sm text-muted-foreground mt-1">Sistemas de luces inteligetes sin Flicker (titileo LED indetectable) que hacen transición a rojo post-sundown.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Temperatura Ambiental Basal</h4>
                      <p className="text-sm text-muted-foreground mt-1">Optimización del termostato (17°C a 19°C) en el cuarto principal (BatCave) para maximizar la fase de sueño de Ondas Lentas.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Agua a nivel Celular</h4>
                      <p className="text-sm text-muted-foreground mt-1">Filtros Reverse Osmosis + Remineralización para eliminar metales pesados o microplásticos tanto al beber como al ducharse.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG GRID (PAGINADO) --- */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-4">
              Colecciones y Hubs Semánticos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestros grupos de temas relacionados, guías inteligentes y hubs científicos enfocados en optimizar la salud de tu entorno.
            </p>
          </div>

          {categoryTags.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTags.map(tag => (
                <Link key={tag.slug} href={`/tag/${tag.slug}`} className="block group h-full">
                  <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col transition-all hover:border-blue-500/50 hover:shadow-md">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 shrink-0">
                      <Tag className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="mb-2 font-mono text-xl font-bold group-hover:text-blue-500 transition-colors">
                      {tag.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow">
                      Explora todos los artículos y protocolos de nuestra base de datos relacionados con {tag.title.toLowerCase()}.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-xl bg-background/50">
              <p className="text-muted-foreground">Aún no se han generado etiquetas o colecciones para esta categoría. Pronto añadiremos nuevo contenido guiado por la IA.</p>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
      
      {/* ItemList Schema for the blog post list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateItemListSchema({
              name: "Biohacking de Hogar y Casa: Artículos",
              description: "Tecnología, filtros, aire e iluminación para que tu casa mejore tu biología.",
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
