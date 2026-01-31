"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "all", label: "Todos" },
  { id: "nootropicos", label: "Nootrópicos" },
  { id: "sueno", label: "Sueño" },
  { id: "longevidad", label: "Longevidad" },
  { id: "nutricion", label: "Nutrición" },
  { id: "fitness", label: "Fitness" },
]

const articles = [
  {
    slug: "guia-completa-nootropicos-2026",
    title: "Guía completa de nootrópicos en 2026: qué funciona y qué no",
    excerpt: "Analizamos los 15 nootrópicos más populares, sus efectos, dosis óptimas y lo que dice la ciencia sobre cada uno.",
    category: "nootropicos",
    readTime: "12 min",
    date: "28 Ene 2026",
    featured: true
  },
  {
    slug: "protocolo-sueno-profundo",
    title: "El protocolo de sueño profundo: cómo conseguir 20% más de deep sleep",
    excerpt: "Técnicas respaldadas por estudios para aumentar tu sueño profundo y despertar verdaderamente descansado.",
    category: "sueno",
    readTime: "8 min",
    date: "25 Ene 2026",
    featured: true
  },
  {
    slug: "ayuno-intermitente-guia-definitiva",
    title: "Ayuno intermitente: la guía definitiva para empezar hoy",
    excerpt: "Todo lo que necesitas saber sobre el ayuno intermitente, desde protocolos básicos hasta estrategias avanzadas.",
    category: "nutricion",
    readTime: "15 min",
    date: "22 Ene 2026",
    featured: false
  },
  {
    slug: "luz-roja-beneficios-evidencia",
    title: "Terapia de luz roja: beneficios reales vs marketing",
    excerpt: "Separamos la ciencia del hype. Qué dice la evidencia sobre la terapia de luz roja para recuperación y piel.",
    category: "longevidad",
    readTime: "10 min",
    date: "19 Ene 2026",
    featured: false
  },
  {
    slug: "creatina-cerebro-beneficios-cognitivos",
    title: "Creatina para el cerebro: el suplemento más subestimado",
    excerpt: "Conocida por el fitness, la creatina tiene beneficios cognitivos impresionantes que la ciencia está confirmando.",
    category: "nootropicos",
    readTime: "7 min",
    date: "16 Ene 2026",
    featured: false
  },
  {
    slug: "hrv-variabilidad-cardiaca-guia",
    title: "HRV: cómo medir y mejorar tu variabilidad cardíaca",
    excerpt: "La métrica más importante para entender tu recuperación y estrés. Aprende a interpretarla y optimizarla.",
    category: "fitness",
    readTime: "9 min",
    date: "13 Ene 2026",
    featured: false
  },
  {
    slug: "exposicion-frio-hormesis",
    title: "Exposición al frío: protocolos seguros para activar la hormesis",
    excerpt: "Desde duchas frías hasta crioterapia. Cómo aprovechar el frío para mejorar tu metabolismo y resiliencia.",
    category: "longevidad",
    readTime: "11 min",
    date: "10 Ene 2026",
    featured: false
  },
  {
    slug: "magnesio-tipos-cual-elegir",
    title: "Los 8 tipos de magnesio: cuál elegir según tu objetivo",
    excerpt: "No todos los magnesios son iguales. Te explicamos las diferencias y cuál es mejor para sueño, ansiedad o rendimiento.",
    category: "nutricion",
    readTime: "6 min",
    date: "7 Ene 2026",
    featured: false
  },
]

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  const featuredArticles = filteredArticles.filter(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  return (
    <section className="pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-medium text-primary">Conocimiento que transforma</span>
          </span>
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Blog de Biohacking
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Artículos, guías y protocolos escritos para personas que quieren 
            optimizar su biología con ciencia, no con mitos.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 font-mono text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12 grid gap-6 lg:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Destacado
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs capitalize">
                        {article.category}
                      </Badge>
                    </div>
                    
                    <h2 className="mb-3 font-mono text-2xl font-bold text-foreground transition-colors group-hover:text-primary text-balance">
                      {article.title}
                    </h2>
                    
                    <p className="mb-6 flex-grow text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-1">
                        Leer
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Regular Articles */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card">
                <CardContent className="flex h-full flex-col p-6">
                  <Badge variant="secondary" className="mb-4 w-fit font-mono text-xs capitalize">
                    {article.category}
                  </Badge>
                  
                  <h3 className="mb-3 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary text-balance">
                    {article.title}
                  </h3>
                  
                  <p className="mb-4 flex-grow text-sm text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No hay artículos en esta categoría todavía. ¡Pronto habrá más contenido!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
