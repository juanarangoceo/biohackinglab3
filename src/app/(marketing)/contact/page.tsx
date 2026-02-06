"use client"

import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dna, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-bold font-display mb-6">Hablemos de Biohacking</h1>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              ¿Tienes preguntas sobre longevidad, nootrópicos o nuestros servicios? 
              Estamos aquí para ayudarte a optimizar tu biología.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">contacto@biohackinglab3.com</p>
                  <p className="text-sm text-muted-foreground/80 mt-1">Respondemos en menos de 24 horas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Dna className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Comunidad</h3>
                  <p className="text-muted-foreground">Únete a nuestra newsletter para recibir tips semanales.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                <Input id="subject" placeholder="¿En qué podemos ayudarte?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." className="min-h-[150px]" required />
              </div>

              <Button type="submit" className="w-full">enviar Mensaje</Button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
