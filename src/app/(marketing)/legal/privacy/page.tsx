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
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display tracking-tight text-center md:text-left">
          Política de Privacidad
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline">
          <p className="lead text-xl">
            En Biohacking Lab 3.0, valoramos tu confianza y nos comprometemos a proteger tu información personal.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-12">
            Última actualización: {new Date().getFullYear()}
          </p>

          <h2>1. Introducción</h2>
          <p>
            Esta Política de Privacidad describe cómo Biohacking Lab 3.0 ("nosotros", "nuestro" o "la Compañía") recopila, utiliza y comparte su información personal cuando utiliza nuestro sitio web. Al acceder o utilizar el Servicio, usted acepta la recopilación y el uso de su información de acuerdo con esta política.
          </p>
          
          <h2>2. Datos que recopilamos</h2>
          <p>
            Podemos recopilar diferentes tipos de datos para diversos fines a fin de brindarle y mejorar nuestro Servicio:
          </p>
          <ul>
            <li><strong>Datos personales:</strong> Nombre, dirección de correo electrónico, etc.</li>
            <li><strong>Datos de uso:</strong> Información sobre cómo se accede y utiliza el Servicio.</li>
            <li><strong>Cookies:</strong> Datos de rastreo para mejorar la experiencia del usuario.</li>
          </ul>
          
          <h2>3. Uso de la información</h2>
          <p>Utilizamos los datos recopilados para:</p>
          <ul>
            <li>Proporcionar y mantener nuestro Servicio.</li>
            <li>Notificarle sobre cambios en nuestro Servicio.</li>
            <li>Proporcionar soporte al cliente.</li>
            <li>Recopilar análisis o información valiosa para mejorar el Servicio.</li>
            <li>Enviar boletines informativos si ha optado por recibirlos.</li>
          </ul>
          
          <h2>4. Cookies y Tecnologías de Rastreo</h2>
          <p>
            Utilizamos cookies y tecnologías de rastreo similares para rastrear la actividad en nuestro Servicio y mantener cierta información. Puede indicar a su navegador que rechace todas las cookies o que indique cuándo se envía una cookie.
          </p>
          
          <h2>5. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en:<br />
            <a href="mailto:privacidad@biohackinglab3.com">privacidad@biohackinglab3.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
