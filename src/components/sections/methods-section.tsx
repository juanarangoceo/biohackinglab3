import { 
  Beaker, 
  LineChart, 
  Target, 
  RefreshCw,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Define tu objetivo",
    description: "¿Más energía? ¿Mejor sueño? ¿Mayor concentración? Identificamos exactamente qué quieres optimizar en tu biología.",
    color: "primary"
  },
  {
    number: "02",
    icon: Beaker,
    title: "Protocolo personalizado",
    description: "Te damos un protocolo basado en ciencia, adaptado a tu estilo de vida. Sin cambios drásticos, implementación gradual.",
    color: "accent"
  },
  {
    number: "03",
    icon: LineChart,
    title: "Mide y trackea",
    description: "Lo que no se mide no se mejora. Te enseñamos qué métricas seguir y cómo interpretar tu progreso.",
    color: "primary"
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Itera y optimiza",
    description: "El biohacking es un proceso continuo. Ajustamos tu protocolo según tus resultados para máxima efectividad.",
    color: "accent"
  }
]

export function MethodsSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Nuestro método
            </span>
            <h2 className="mb-6 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              El sistema de 4 pasos que funciona
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground text-pretty">
              No te damos información aleatoria. Biohacking Lab 3.0 sigue un método 
              probado que ha ayudado a más de 10,000 personas a alcanzar sus metas de optimización.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="#newsletter">
                  Empieza tu transformación
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link href="/apps">Ver apps recomendadas</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-border lg:block" />
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className="group relative flex gap-6"
                >
                  {/* Number Circle */}
                  <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    step.color === "primary" 
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20" 
                      : "bg-accent/10 text-accent group-hover:bg-accent/20"
                  } transition-colors`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all group-hover:border-border group-hover:bg-card">
                    <div className="mb-2 flex items-center gap-3">
                      <span className={`font-mono text-sm font-bold ${
                        step.color === "primary" ? "text-primary" : "text-accent"
                      }`}>
                        {step.number}
                      </span>
                      <h3 className="font-mono text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
