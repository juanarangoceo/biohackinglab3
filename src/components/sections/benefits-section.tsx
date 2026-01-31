import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const benefits = [
  {
    number: "01",
    title: "Más energía, menos café",
    description: "Aprende a hackear tus niveles de energía de forma natural. Despierta renovado y mantén el foco durante todo el día sin depender de estimulantes."
  },
  {
    number: "02",
    title: "Mente clara y enfocada",
    description: "Descubre nootrópicos y técnicas para mejorar tu memoria de trabajo, velocidad de procesamiento y capacidad de concentración profunda."
  },
  {
    number: "03",
    title: "Longevidad con calidad",
    description: "No se trata solo de vivir más años, sino de vivirlos mejor. Estrategias anti-aging respaldadas por la ciencia más actual."
  }
]

const features = [
  "Contenido actualizado semanalmente",
  "Basado en estudios científicos reales",
  "Protocolos paso a paso",
  "Comunidad de biohackers",
  "Herramientas y apps recomendadas",
  "Sin bullshit, solo ciencia"
]

export function BenefitsSection() {
  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Benefits */}
          <div>
            <span className="mb-4 inline-block font-mono text-sm font-medium uppercase tracking-wider text-primary">
              Por qué unirte
            </span>
            <h2 className="mb-8 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Tu cuerpo es tu laboratorio. Aprende a experimentar con él.
            </h2>
            
            <div className="space-y-8">
              {benefits.map((benefit) => (
                <div key={benefit.number} className="group flex gap-6">
                  <span className="font-mono text-4xl font-bold text-primary/30 transition-colors group-hover:text-primary">
                    {benefit.number}
                  </span>
                  <div>
                    <h3 className="mb-2 font-mono text-xl font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-border/50 bg-card p-8 lg:p-10">
              <h3 className="mb-6 font-mono text-2xl font-bold text-foreground">
                Lo que encontrarás aquí
              </h3>
              
              <ul className="mb-8 space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full gap-2">
                <Link href="#newsletter">
                  Únete a la comunidad
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
