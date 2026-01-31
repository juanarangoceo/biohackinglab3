"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "¿Qué es exactamente el biohacking?",
    answer: "El biohacking es el arte y ciencia de optimizar tu biología usando técnicas respaldadas por evidencia científica. Incluye desde cambios en nutrición y sueño hasta el uso de nootrópicos, terapias de luz, exposición al frío y tracking de métricas de salud. En Biohacking Lab 3.0, nos enfocamos en métodos seguros, accesibles y comprobados."
  },
  {
    question: "¿Necesito conocimientos previos para empezar?",
    answer: "Para nada. Nuestro contenido está diseñado tanto para principiantes como para biohackers experimentados. Empezamos desde lo básico y te guiamos paso a paso. Si ya tienes experiencia, encontrarás contenido avanzado y estudios científicos profundos que te llevarán al siguiente nivel."
  },
  {
    question: "¿El newsletter es realmente gratis?",
    answer: "Sí, 100% gratis. Recibirás contenido de alta calidad cada semana sin costo alguno. No hay trucos ni suscripciones ocultas. Creemos que el conocimiento sobre optimización humana debería ser accesible para todos. En el futuro ofreceremos contenido premium opcional, pero el newsletter seguirá siendo gratuito."
  },
  {
    question: "¿Con qué frecuencia publican nuevo contenido?",
    answer: "Publicamos nuevo contenido en el blog 2-3 veces por semana y enviamos un newsletter semanal con los mejores artículos, estudios recientes y protocolos prácticos. Además, actualizamos constantemente nuestras guías existentes con nueva evidencia científica."
  },
  {
    question: "¿Las técnicas que enseñan son seguras?",
    answer: "Absolutamente. Solo compartimos técnicas que tienen respaldo científico y un perfil de seguridad bien establecido. Siempre incluimos advertencias cuando algo requiere supervisión médica o no es apto para ciertas condiciones. Tu salud es la prioridad número uno."
  },
  {
    question: "¿Puedo implementar esto si tengo poco tiempo?",
    answer: "¡Claro! Entendemos que estás ocupado. Por eso diseñamos protocolos que se adaptan a diferentes estilos de vida. Muchas de las técnicas más efectivas (como optimizar el sueño o la exposición a luz matutina) no requieren tiempo extra, solo ajustar lo que ya haces."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/20" />
      
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </span>
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Preguntas frecuentes
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Todo lo que necesitas saber antes de comenzar tu viaje de optimización.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-300",
                openIndex === index 
                  ? "border-primary/30 bg-card" 
                  : "border-border/50 bg-card/50 hover:border-border hover:bg-card"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-mono text-lg font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    openIndex === index && "rotate-180 text-primary"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "grid transition-all duration-300",
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
