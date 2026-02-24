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
          {topics.map((topic) => {
            const isLongevidadFemenina = topic.slug === "longevidad-femenina";
            const isBiohackingHogar = topic.slug === "biohacking-hogar";
            const isNeuroAudio = topic.slug === "neuroaudio";
            
            // Layout logic based on array length
            const index = topics.indexOf(topic);
            const isLast = index === topics.length - 1;
            const isSecondToLast = index === topics.length - 2;
            const isThirdToLast = index === topics.length - 3;
            
            // Determine custom classes based on the topic
            // With 11 items, to make the grid symmetrical at the end:
            const colSpanClass = isLast ? "lg:col-span-4" : ((isSecondToLast || isThirdToLast) ? "lg:col-span-2" : "");
            
            let cardBgClass = "bg-card/50 hover:bg-card";
            let borderClass = "border-border/50 hover:border-primary/50";
            let shadowClass = "hover:shadow-primary/5";
            let iconBgClass = "bg-secondary group-hover:bg-primary/20";
            let iconColorClass = "text-primary";
            let tagColorClass = "text-primary bg-primary/10";
            
            if (isLongevidadFemenina) {
              cardBgClass = "bg-rose-950/20 hover:bg-rose-950/30";
              borderClass = "border-rose-500/30 hover:border-rose-500/60";
              shadowClass = "hover:shadow-rose-500/10";
              iconBgClass = "bg-rose-500/20 group-hover:bg-rose-500/30";
              iconColorClass = "text-rose-400";
              tagColorClass = "text-rose-400 bg-rose-500/10";
            } else if (isBiohackingHogar) {
              cardBgClass = "bg-blue-950/20 hover:bg-blue-950/30";
              borderClass = "border-blue-500/30 hover:border-blue-500/60";
              shadowClass = "hover:shadow-blue-500/10";
              iconBgClass = "bg-blue-500/20 group-hover:bg-blue-500/30";
              iconColorClass = "text-blue-400";
              tagColorClass = "text-blue-400 bg-blue-500/10";
            } else if (isNeuroAudio) {
               cardBgClass = "bg-orange-950/20 hover:bg-orange-950/30";
               borderClass = "border-orange-500/30 hover:border-orange-500/60";
               shadowClass = "hover:shadow-orange-500/10";
               iconBgClass = "bg-orange-500/20 group-hover:bg-orange-500/30";
               iconColorClass = "text-orange-400";
               tagColorClass = "text-orange-400 bg-orange-500/10";
            }

            let topicLink = `/temas/${topic.slug}`;
            if (isLongevidadFemenina || isBiohackingHogar || isNeuroAudio) {
               topicLink = `/${topic.slug}`;
            }

            return (
              <Link key={topic.slug} href={topicLink} className={`block h-full ${colSpanClass}`}>
                <Card 
                  className={`group relative h-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${cardBgClass} ${borderClass} ${shadowClass}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Tag */}
                    <span className={`mb-4 inline-block rounded-full px-3 py-1 font-mono text-xs font-medium w-fit ${tagColorClass}`}>
                      {topic.title}
                    </span>
                    
                    {/* Icon */}
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${iconBgClass}`}>
                      <topic.icon className={`h-6 w-6 ${iconColorClass}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">
                      {topic.title}
                    </h3>
                    <p className={`text-sm leading-relaxed text-muted-foreground flex-grow ${(isLongevidadFemenina || isBiohackingHogar || isNeuroAudio) ? "max-w-2xl" : ""}`}>
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}
