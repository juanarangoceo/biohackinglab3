import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { topics } from "@/config/topics"

export function TopicsSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm font-medium uppercase tracking-wider text-primary">
            Qué exploramos
          </span>
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Temas que van a cambiar tu vida
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Desde técnicas ancestrales hasta los últimos avances científicos. 
            Todo lo que necesitas para convertirte en la mejor versión de ti mismo.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/temas/${topic.slug}`} className="block h-full">
              <Card 
                className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Tag */}
                  {/* Using title as tag for now, or we could add a short tag to the config if needed */}
                  <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary w-fit">
                    {topic.title}
                  </span>
                  
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/20">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">
                    {topic.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-grow">
                    {topic.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
