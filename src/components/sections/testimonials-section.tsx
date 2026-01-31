"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "CEO & Entrepreneur",
    avatar: "CM",
    content: "Después de implementar los protocolos de sueño y nootrópicos que descubrí aquí, mi productividad aumentó un 40%. No es exageración, lo mido todo.",
    rating: 5,
    highlight: "+40% productividad"
  },
  {
    name: "Ana García",
    role: "Médico Deportivo",
    avatar: "AG",
    content: "Como profesional de la salud, aprecio que todo esté respaldado por estudios. Recomiendo Biohacking Lab 3.0 a mis pacientes que quieren ir más allá.",
    rating: 5,
    highlight: "Respaldado por ciencia"
  },
  {
    name: "Miguel Torres",
    role: "Atleta de Alto Rendimiento",
    avatar: "MT",
    content: "La información sobre HRV y recuperación cambió mi forma de entrenar. Ahora rindo más entrenando menos, porque entreno más inteligente.",
    rating: 5,
    highlight: "Mejor rendimiento"
  },
  {
    name: "Laura Sánchez",
    role: "Desarrolladora de Software",
    avatar: "LS",
    content: "El ayuno intermitente y la terapia de luz transformaron mi energía. Ya no tengo esos bajones de las 3pm. Trabajo enfocada todo el día.",
    rating: 5,
    highlight: "Energía constante"
  },
  {
    name: "Roberto Díaz",
    role: "Inversor & Biohacker",
    avatar: "RD",
    content: "Llevo 2 años siguiendo estos protocolos. Mi edad biológica bajó 8 años según mis análisis. Esto es inversión en uno mismo.",
    rating: 5,
    highlight: "-8 años biológicos"
  },
  {
    name: "Patricia Luna",
    role: "Coach de Bienestar",
    avatar: "PL",
    content: "La comunidad es increíble. No solo aprendes, compartes experiencias con personas que entienden lo que buscas. Es muy motivador.",
    rating: 5,
    highlight: "Comunidad activa"
  }
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            <Quote className="h-3 w-3" />
            Testimonios reales
          </span>
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Lo que dice nuestra comunidad
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Miles de biohackers ya están transformando sus vidas con nuestros protocolos.
            Estas son sus historias.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className={`group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <CardContent className="p-6">
                {/* Highlight Badge */}
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1">
                  <span className="text-xs font-semibold text-primary">{testimonial.highlight}</span>
                </div>

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="mb-6 text-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-mono text-sm font-bold text-muted-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
