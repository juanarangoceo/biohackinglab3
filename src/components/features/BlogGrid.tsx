import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPagination } from "./BlogPagination"

const categories = [
  { id: "all", label: "Todos" },
  { id: "nootropicos", label: "Nootrópicos" },
  { id: "sueno", label: "Sueño" },
  { id: "longevidad", label: "Longevidad" },
  { id: "nutricion", label: "Nutrición" },
  { id: "fitness", label: "Fitness" },
]

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  category: string
  publishedAt: Date | null
  coverImage: string | null
  aiGenerated: boolean
}

interface BlogGridProps {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  activeCategory: string
}

function calculateReadTime(excerpt: string | null): string {
  // Estimate 200 words per minute, assume 1000-1500 words per article
  const avgWords = 1200
  const wpm = 200
  const minutes = Math.ceil(avgWords / wpm)
  return `${minutes} min`
}

export function BlogGrid({ posts, currentPage, totalPages, activeCategory }: BlogGridProps) {
  // Separate featured posts (first 2 if on page 1)
  const featuredPosts = currentPage === 1 ? posts.slice(0, 2) : []
  const regularPosts = currentPage === 1 ? posts.slice(2) : posts

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
            <Link
              key={category.id}
              href={`/blog?category=${category.id}`}
            >
              <button
                className={`rounded-full px-4 py-2 font-mono text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            </Link>
          ))}
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-12 grid gap-6 lg:grid-cols-2">
            {featuredPosts.map((article) => (
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
                      {article.aiGenerated && (
                        <Badge variant="outline" className="gap-1 font-mono text-xs">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </Badge>
                      )}
                    </div>
                    
                    <h2 className="mb-3 font-mono text-2xl font-bold text-foreground transition-colors group-hover:text-primary text-balance">
                      {article.title}
                    </h2>
                    
                    <p className="mb-6 flex-grow text-muted-foreground leading-relaxed">
                      {article.excerpt || 'Artículo de biohacking'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {article.publishedAt 
                            ? format(article.publishedAt, "d MMM yyyy", { locale: es })
                            : 'Próximamente'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {calculateReadTime(article.excerpt)}
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
          {regularPosts.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs capitalize">
                      {article.category}
                    </Badge>
                    {article.aiGenerated && (
                      <Badge variant="outline" className="gap-1 font-mono text-xs">
                        <Sparkles className="h-3 w-3" />
                        AI
                      </Badge>
                    )}
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
                          ? format(article.publishedAt, "d MMM", { locale: es })
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

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No hay artículos en esta categoría todavía. ¡Pronto habrá más contenido!
            </p>
          </div>
        )}

        {/* Pagination */}
        <BlogPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          category={activeCategory}
        />
      </div>
    </section>
  )
}
