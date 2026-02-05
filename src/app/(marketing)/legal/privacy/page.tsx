import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Política de Privacidad | Biohacking Lab 3.0",
  description: "Entiende cómo recopilamos, usamos y protegemos tus datos personales.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Última actualización: {new Date().getFullYear()}</p>
          <h2>1. Introducción</h2>
          <p>Biohacking Lab 3.0 respeta tu privacidad y se compromete a proteger tus datos personales.</p>
          
          <h2>2. Datos que recopilamos</h2>
          <p>Podemos recopilar datos como tu nombre, email y comportamiento de navegación para mejorar nuestros servicios.</p>
          
          <h2>3. Uso de la información</h2>
          <p>Utilizamos tu información para enviarte newsletters, mejorar el sitio web y personalizar tu experiencia.</p>
          
          <h2>4. Cookies</h2>
          <p>Utilizamos cookies para analizar el tráfico y mejorar la funcionalidad del sitio.</p>
          
          <h2>5. Contacto</h2>
          <p>Para dudas sobre privacidad, contáctanos en privacidad@biohackinglab3.com</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
