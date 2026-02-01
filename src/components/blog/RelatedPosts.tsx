import Link from "next/link"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq, ne, desc, and } from "drizzle-orm"
import { ArrowRight, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface RelatedPostsProps {
  currentSlug: string
  category: string
}

export async function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  // Try to get 3 posts from the same category
  let relatedPosts = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.category, category),
        ne(posts.slug, currentSlug)
      )
    )
    .orderBy(desc(posts.publishedAt))
    .limit(3)

  // If less than 3, fill with recent posts from other categories
  if (relatedPosts.length < 3) {
    const additionalPosts = await db
      .select()
      .from(posts)
      .where(ne(posts.slug, currentSlug))
      .orderBy(desc(posts.publishedAt))
      .limit(3 - relatedPosts.length)
    
    relatedPosts = [...relatedPosts, ...additionalPosts]
  }

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-8 text-3xl font-bold">También podría interesarte</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post: typeof posts.$inferSelect, index: number) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group h-full border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:bg-card">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
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
                      ? format(new Date(post.publishedAt), "d MMM", { locale: es })
                      : 'Pronto'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
