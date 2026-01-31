import { 
  Brain, 
  Pill, 
  Sun, 
  Moon, 
  Dumbbell, 
  Thermometer,
  Heart,
  Eye
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const topics = [
  {
    icon: Brain,
    title: "Nootrópicos",
    description: "Suplementos y compuestos que potencian tu memoria, concentración y claridad mental.",
    tag: "Cognitivo"
  },
  {
    icon: Sun,
    title: "Terapia de Luz",
    description: "Optimiza tus ritmos circadianos con luz roja, infrarroja y exposición solar estratégica.",
    tag: "Energía"
  },
  {
    icon: Moon,
    title: "Optimización del Sueño",
    description: "Hackea tu descanso para regenerarte mejor y despertar con máxima energía cada día.",
    tag: "Recuperación"
  },
  {
    icon: Thermometer,
    title: "Terapia de Frío",
    description: "Duchas frías, crioterapia y exposición al frío para activar tu metabolismo y resiliencia.",
    tag: "Hormesis"
  },
  {
    icon: Dumbbell,
    title: "Ejercicio Inteligente",
    description: "Protocolos de entrenamiento diseñados para maximizar resultados con el mínimo tiempo.",
    tag: "Rendimiento"
  },
  {
    icon: Pill,
    title: "Suplementación",
    description: "Vitaminas, minerales y compuestos esenciales para llenar los vacíos de tu nutrición.",
    tag: "Nutrición"
  },
  {
    icon: Heart,
    title: "Variabilidad Cardíaca",
    description: "Monitorea y mejora tu HRV para entender tu estado de recuperación y estrés.",
    tag: "Tracking"
  },
  {
    icon: Eye,
    title: "Ayuno Intermitente",
    description: "Estrategias de alimentación temporal para autofagia, longevidad y claridad mental.",
    tag: "Longevidad"
  }
]

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
            <Card 
              key={topic.title}
              className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
            >
              <CardContent className="p-6">
                {/* Tag */}
                <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
                  {topic.tag}
                </span>
                
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/20">
                  <topic.icon className="h-6 w-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">
                  {topic.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
