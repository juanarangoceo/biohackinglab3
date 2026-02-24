import Link from "next/link"
import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { 
  Headphones, 
  Brain, 
  Moon, 
  Leaf, 
  Activity, 
  ArrowRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "NeuroAudio: Biohacking Acústico | BioHack Lab 3.0",
  description: "Frecuencias, audios binaurales y ondas cerebrales para optimizar tu enfoque, sueño y relajación a nivel celular.",
}

const CATEGORIES = [
  {
    title: "Activación y enfoque profundo",
    slug: "activacion-enfoque",
    description: "Ondas Gamma, Beta y Ruido Marrón. Diseñado para estados de flow, concentración extrema y energía mental.",
    icon: Activity,
    color: "text-orange-500",
    bgHover: "hover:bg-orange-500/10",
    borderHover: "hover:border-orange-500/50",
  },
  {
    title: "Reducción de Estrés y Creatividad",
    slug: "reduccion-estres",
    description: "Down-regulation. Ondas Alfa y Lo-Fi Binaural para silenciar la ansiedad y fomentar el pensamiento creativo.",
    icon: Brain,
    color: "text-blue-500",
    bgHover: "hover:bg-blue-500/10",
    borderHover: "hover:border-blue-500/50",
  },
  {
    title: "Sueño Profundo y Recuperación",
    slug: "sueno-recuperacion",
    description: "Sleep Hacking. Ondas Delta y Ruido Rosa para maximizar el sueño NREM y reparar tu cuerpo a nivel celular.",
    icon: Moon,
    color: "text-indigo-400",
    bgHover: "hover:bg-indigo-500/10",
    borderHover: "hover:border-indigo-500/50",
  },
  {
    title: "Bienestar y Recuperación Holística",
    slug: "bienestar-holistico",
    description: "Frecuencias Solfeggio (432Hz, 528Hz). Sonidos comprobados para reducir drásticamente el cortisol y reparar el ADN.",
    icon: Leaf,
    color: "text-emerald-500",
    bgHover: "hover:bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/50",
  },
]

export default function NeuroAudioHubPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="flex flex-col">
        {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Ambient background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Headphones className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-medium text-primary">Sistema Acústico</span>
          </span>
          <h1 className="mb-6 font-mono text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Neuro<span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Audio</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl leading-relaxed">
            Hackea tu biología a través del sonido. Frecuencias científicamente validadas para alterar
            tus ondas cerebrales, induciendo estados de alta concentración, sueño profundo o reparación celular bajo demanda.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <Link key={category.slug} href={`/neuroaudio/${category.slug}`}>
                  <Card 
                    className={`group relative h-full overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-500 ${category.borderHover} ${category.bgHover}`}
                  >
                    <CardContent className="p-8 md:p-10 flex flex-col h-full relative z-10">
                      <div className="mb-6 flex items-center justify-between">
                        <div className={`rounded-xl bg-background/50 p-4 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:bg-background/80 ${category.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <ArrowRight className={`h-6 w-6 opacity-0 transition-all duration-300 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${category.color}`} />
                      </div>
                      
                      <h2 className="mb-4 font-mono text-2xl font-bold text-foreground">
                        {category.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed flex-grow">
                        {category.description}
                      </p>
                    </CardContent>
                    
                    {/* Decorative subtle gradient that appears on hover */}
                    <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEO / Info Block */}
      <section className="py-16 md:py-24 border-t border-border/20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 font-mono text-3xl font-bold">La Ciencia del Sonido</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
            El cerebro humano opera a través de actividad eléctrica (ondas cerebrales). Mediante el principio de 
            arrastre de ondas cerebrales (<em>Brainwave Entrainment</em>), podemos utilizar estímulos acústicos 
            precisos como <strong>pulsos binaurales</strong>, <strong>ruido de colores</strong> y frecuencias isocrónicas 
            para guiar al cerebro hacia estados específicos.
          </p>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            Selecciona la categoría superior que coincida con tu objetivo biológico y utiliza auriculares para obtener 
            los máximos beneficios neuromoduladores de nuestros tracks seleccionados.
          </p>
        </div>
      </section>
    </div>
    <Footer />
    </main>
  )
}
