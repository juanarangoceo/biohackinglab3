import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc, isNotNull } from "drizzle-orm"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export async function SuggestedBlogsSection() {
  // Fetch latest 3 published posts
  const latestPosts = await db
    .select()
    .from(posts)
    .where(isNotNull(posts.publishedAt))
    .orderBy(desc(posts.publishedAt))
    .limit(3)

  if (!latestPosts || latestPosts.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-space tracking-tight">
              Últimos <span className="text-primary">Artículos</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre los últimos protocolos, guías y ciencia sobre optimización humana y longevidad.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 rounded-full group">
            <Link href="/blog" className="flex items-center gap-2">
              Ver todos los artículos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group h-full border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:bg-card">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs capitalize">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <h3 className="mb-3 font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="mb-4 flex-grow text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt || 'Artículo de biohacking'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {post.publishedAt 
                        ? format(new Date(post.publishedAt), "d MMM yyyy", { locale: es })
                        : 'Pronto'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
