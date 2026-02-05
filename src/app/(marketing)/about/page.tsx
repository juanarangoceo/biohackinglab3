import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Badge } from "@/components/ui/badge"
import { Mail, Twitter, Linkedin, Target, Microscope, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Biohacking Lab 3.0",
  description: "Conoce al equipo detrás de Biohacking Lab 3.0. Nuestra misión es democratizar el acceso al conocimiento sobre optimización humana basado en ciencia.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre <span className="text-primary">Biohacking Lab 3.0</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Democratizando el acceso al conocimiento sobre optimización humana 
            a través de ciencia, tecnología y evidencia.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Nuestra Misión</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              En Biohacking Lab 3.0, creemos que el conocimiento sobre optimización 
              humana debe ser accesible para todos. Nuestra misión es proporcionar 
              información basada en evidencia científica sobre biohacking, longevidad, 
              nootrópicos y optimización del rendimiento humano.
            </p>
            <p>
              Nos comprometemos a mantener los más altos estándares de rigor científico, 
              transparencia editorial y ética en todo nuestro contenido.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Microscope className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Nuestros Valores</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-border/50 bg-card/30 p-6">
              <h3 className="font-semibold text-lg mb-2">Evidencia Científica</h3>
              <p className="text-sm text-muted-foreground">
                Todo nuestro contenido está respaldado por estudios científicos 
                revisados por pares y fuentes confiables.
              </p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/30 p-6">
              <h3 className="font-semibold text-lg mb-2">Transparencia</h3>
              <p className="text-sm text-muted-foreground">
                Divulgamos nuestras fuentes, metodologías y cualquier posible 
                conflicto de interés de manera clara.
              </p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/30 p-6">
              <h3 className="font-semibold text-lg mb-2">Responsabilidad</h3>
              <p className="text-sm text-muted-foreground">
                Reconocemos que tratamos temas de salud (YMYL) y actuamos con 
                la máxima responsabilidad profesional.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Nuestro Equipo</h2>
          </div>
          
          <div className="rounded-lg border border-border/50 bg-card/30 p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Juan Arango</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Fundador</Badge>
                  <Badge variant="secondary">Editor en Jefe</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Juan es un apasionado del biohacking y la optimización humana con 
                  años de experiencia investigando y aplicando protocolos basados en 
                  evidencia científica. Su enfoque combina la ciencia rigurosa con 
                  la experimentación práctica.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="mailto:juan@biohackinglab3.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://twitter.com/juanarangoceo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/juanarango" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Proceso Editorial</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Cada artículo publicado en Biohacking Lab 3.0 sigue un riguroso 
              proceso editorial:
            </p>
            <ol>
              <li>
                <strong>Investigación</strong>: Revisión exhaustiva de literatura 
                científica y fuentes primarias.
              </li>
              <li>
                <strong>Redacción</strong>: Creación de contenido claro, preciso 
                y respaldado por evidencia.
              </li>
              <li>
                <strong>Verificación</strong>: Comprobación de datos, estadísticas 
                y referencias.
              </li>
              <li>
                <strong>Actualización</strong>: Revisión periódica del contenido 
                para incorporar nueva evidencia científica.
              </li>
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h2>
          <p className="text-muted-foreground mb-6">
            Estamos aquí para ayudarte. Contáctanos para cualquier consulta, 
            sugerencia o colaboración.
          </p>
          <a 
            href="mailto:contacto@biohackinglab3.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-5 w-5" />
            contacto@biohackinglab3.com
          </a>
        </section>
      </div>

      <Footer />
    </main>
  )
}
