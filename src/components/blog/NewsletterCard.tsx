"use client"

import { useState } from "react"
import { Mail, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterCard() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <div className="mt-6">
      <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-purple-500/10 p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-primary/20 p-2">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Newsletter Exclusivo</h3>
        </div>
        
        <p className="mb-4 text-sm text-muted-foreground">
          Recibe protocolos de biohacking y contenido premium directo a tu inbox.
        </p>

        {status === "success" ? (
          <div className="rounded-lg bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
            ¡Suscripción exitosa! Revisa tu email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Suscribiendo..."
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Suscribirme
                </>
              )}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-2 text-xs text-red-500">
            Error al suscribirse. Intenta de nuevo.
          </p>
        )}
      </div>
    </div>
  )
}
