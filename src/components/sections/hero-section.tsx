"use client"

import { ArrowRight, Zap, Brain, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToNewsletter = () => {
    document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20 md:pt-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px] md:h-[500px] md:w-[500px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-accent/10 blur-[80px] md:h-[400px] md:w-[400px] md:blur-[100px]" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Main Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 md:mb-8 md:px-5 md:py-2.5">
            <Zap className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
            <span className="text-xs font-medium text-primary md:text-sm">
              La ciencia de optimizarte a ti mismo
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-4 max-w-5xl font-mono text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:mb-6 md:text-5xl lg:text-7xl text-balance">
            Tu cuerpo es <span className="text-accent">tecnología.</span>{" "}
            <br className="hidden sm:block" />
            Aprende a <span className="text-primary">programarlo.</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:max-w-2xl md:mb-10 md:text-lg lg:text-xl text-pretty">
            Biohacking Lab 3.0 es tu laboratorio personal de optimización humana. 
            Técnicas respaldadas por ciencia para potenciar tu rendimiento cognitivo, 
            aumentar tu energía y vivir más años con mejor calidad.
          </p>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button size="lg" onClick={scrollToNewsletter} className="h-12 gap-2 px-6 text-sm shadow-lg shadow-primary/25 sm:h-14 sm:px-8 sm:text-base">
              Únete gratis a la comunidad
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 bg-transparent px-6 text-sm sm:h-14 sm:px-8 sm:text-base">
              <a href="/blog">Explorar artículos</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-6 md:mt-16 lg:mt-20">
            <div className="group relative rounded-xl border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card sm:rounded-2xl sm:p-6">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 sm:mb-3 sm:h-12 sm:w-12 sm:rounded-xl">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="block font-mono text-xl font-bold text-foreground sm:text-3xl">+50</span>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">Guías y protocolos</p>
            </div>
            <div className="group relative rounded-xl border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-card sm:rounded-2xl sm:p-6">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20 sm:mb-3 sm:h-12 sm:w-12 sm:rounded-xl">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="block font-mono text-xl font-bold text-foreground sm:text-3xl">10K+</span>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">Biohackers activos</p>
            </div>
            <div className="group relative rounded-xl border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card sm:rounded-2xl sm:p-6">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 sm:mb-3 sm:h-12 sm:w-12 sm:rounded-xl">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="block font-mono text-xl font-bold text-foreground sm:text-3xl">97%</span>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">Reportan mejoras</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </section>
  )
}
