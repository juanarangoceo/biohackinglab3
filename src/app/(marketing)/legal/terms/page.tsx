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
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display tracking-tight text-center md:text-left">
          Términos de Servicio
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline">
          <p className="lead text-xl">
            Por favor, lee estos términos cuidadosamente antes de usar nuestros servicios.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-12">
            Última actualización: {new Date().getFullYear()}
          </p>

          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web de Biohacking Lab 3.0, aceptas cumplir y estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.
          </p>
          
          <h2>2. Uso del Contenido</h2>
          <p>
            El contenido de este sitio web es solo para fines informativos generales. Todo el contenido, incluyendo texto, gráficos, logotipos e imágenes, es propiedad de Biohacking Lab 3.0 y está protegido por las leyes de derechos de autor. No puedes modificar, copiar, reproducir, republicar ni distribuir ningún material sin nuestro consentimiento previo por escrito.
          </p>
          
          <h2>3. Exención de Responsabilidad Médica</h2>
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg my-8 not-prose">
             <h3 className="font-bold text-foreground text-lg mb-2">Aviso Importante</h3>
             <p className="text-sm">El contenido proporcionado en Biohacking Lab 3.0 no constituye consejo médico profesional, diagnóstico o tratamiento. Siempre busca el consejo de tu médico u otro proveedor de salud calificado con cualquier pregunta que puedas tener sobre una condición médica.</p>
          </div>
          
          <h2>4. Cuentas de Usuario</h2>
          <p>
            Si creas una cuenta con nosotros, debes proporcionar información precisa y completa. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Nos reservamos el derecho de cancelar cuentas, editar o eliminar contenido a nuestra entera discreción.
          </p>
          
          <h2>5. Enlaces a Terceros</h2>
          <p>
            Nuestro Servicio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por Biohacking Lab 3.0. No tenemos control ni asumimos responsabilidad por el contenido, las políticas de privacidad o las prácticas de sitios web de terceros.
          </p>

          <h2>6. Ley Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
