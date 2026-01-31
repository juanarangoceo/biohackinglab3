"use client"

import { ArrowRight, Dna, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  const scrollToNewsletter = () => {
    document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[80px]" />
      </div>
      
      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-border/50 bg-card/80 p-8 text-center backdrop-blur-sm md:p-16">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Dna className="h-10 w-10 text-primary" />
          </div>

          {/* Content */}
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            ¿Listo para hackear tu biología?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
            Únete a más de 10,000 biohackers que ya están transformando sus vidas. 
            Recibe protocolos, estudios científicos y guías prácticas cada semana. 
            <span className="font-semibold text-foreground"> Gratis, para siempre.</span>
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={scrollToNewsletter} 
            className="mx-auto h-14 gap-2 px-10 text-base shadow-lg shadow-primary/25"
          >
            Quiero empezar ahora
            <ArrowRight className="h-5 w-5" />
          </Button>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Sin spam, garantizado</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Contenido cada semana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
