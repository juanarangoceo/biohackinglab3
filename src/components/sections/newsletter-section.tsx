"use client"

import React from "react"

import { useState, useTransition } from "react"
import { Mail, ArrowRight, Sparkles, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeUser } from "@/actions/subscriber-actions"

const guarantees = [
  { icon: Shield, text: "0% spam, 100% valor" },
  { icon: Clock, text: "Emails cada semana" },
  { icon: Sparkles, text: "Contenido exclusivo" }
]

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !email.includes("@")) {
      setError("Por favor, ingresa un email válido")
      return
    }

    startTransition(async () => {
      console.log("🔵 NewsletterSection submitting:", email);
      const result = await subscribeUser({ 
        email, 
        source: "website_newsletter_section",
        tags: ["newsletter"]
      });
      
      console.log("🔵 NewsletterSection result:", result);
      
      if (result.success) {
        setIsSuccess(true)
        setEmail("")
      } else {
        setError(result.error || "Error al suscribirse")
      }
    });
  }

  return (
    <section id="newsletter" className="relative py-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Header */}
          <h2 className="mb-4 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Únete a <span className="text-primary">Biohacking Lab 3.0</span>
          </h2>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">
            Recibe cada semana las mejores técnicas, estudios científicos y protocolos 
            de biohacking directamente en tu bandeja de entrada. Gratis, sin compromisos.
          </p>

          {/* Form */}
          {isSuccess ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-mono text-xl font-semibold text-foreground">
                ¡Bienvenido al laboratorio!
              </h3>
              <p className="text-muted-foreground">
                Revisa tu email para confirmar tu suscripción. Prepárate para hackear tu biología.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-border/50 bg-card/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  aria-label="Email address"
                />
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isPending}
                  className="h-12 gap-2 whitespace-nowrap"
                >
                  {isPending ? (
                    "Enviando..."
                  ) : (
                    <>
                      Quiero unirme
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p>
              )}
            </form>
          )}

          {/* Guarantees */}
          {!isSuccess && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {guarantees.map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Social Proof */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-secondary font-mono text-xs font-bold text-muted-foreground"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Más de <span className="font-semibold text-foreground">10,000 biohackers</span> ya están suscritos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
