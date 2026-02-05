import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Términos de Servicio | Biohacking Lab 3.0",
  description: "Términos y condiciones de uso de Biohacking Lab 3.0.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Términos de Servicio</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Última actualización: {new Date().getFullYear()}</p>
          <h2>1. Aceptación de los Términos</h2>
          <p>Al acceder a Biohacking Lab 3.0, aceptas estar sujeto a estos términos de servicio.</p>
          
          <h2>2. Uso del Contenido</h2>
          <p>Todo el contenido es propiedad de Biohacking Lab 3.0. No puedes reproducirlo sin permiso explícito.</p>
          
          <h2>3. Exención de Responsabilidad Médica</h2>
          <p>El contenido es solo informativo y no sustituye el consejo médico profesional.</p>
          
          <h2>4. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
          
          <h2>5. Ley Aplicable</h2>
          <p>Estos términos se rigen por las leyes locales aplicables.</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
