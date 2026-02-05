import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Shield, FileCheck, RefreshCw, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Política Editorial | Biohacking Lab 3.0",
  description: "Conoce nuestros estándares editoriales, proceso de verificación y compromiso con la evidencia científica.",
}

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Política <span className="text-primary">Editorial</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Nuestro compromiso con la calidad, precisión y responsabilidad en 
          cada pieza de contenido que publicamos.
        </p>

        {/* Standards */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Estándares Editoriales</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h3>Evidencia Científica</h3>
            <p>
              Todo nuestro contenido está fundamentado en evidencia científica. 
              Priorizamos:
            </p>
            <ul>
              <li>Estudios revisados por pares publicados en revistas científicas reconocidas</li>
              <li>Meta-análisis y revisiones sistemáticas</li>
              <li>Datos de instituciones académicas y organizaciones de salud reconocidas</li>
              <li>Investigaciones recientes (preferentemente de los últimos 5 años)</li>
            </ul>

            <h3>Transparencia en las Fuentes</h3>
            <p>
              Cada afirmación significativa en nuestros artículos está respaldada 
              por referencias a fuentes primarias. Incluimos:
            </p>
            <ul>
              <li>Enlaces directos a estudios científicos</li>
              <li>Citas completas con DOI cuando están disponibles</li>
              <li>Contexto sobre la calidad y limitaciones de cada estudio</li>
            </ul>
          </div>
        </section>

        {/* Verification Process */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileCheck className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Proceso de Verificación</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Antes de publicar cualquier contenido, seguimos un proceso riguroso:
            </p>
            <ol>
              <li>
                <strong>Investigación Inicial</strong>: Revisión de literatura 
                científica relevante y actualizada.
              </li>
              <li>
                <strong>Fact-Checking</strong>: Verificación de datos, estadísticas 
                y afirmaciones contra fuentes primarias.
              </li>
              <li>
                <strong>Revisión de Referencias</strong>: Comprobación de que todas 
                las citas sean precisas y accesibles.
              </li>
              <li>
                <strong>Evaluación de Calidad</strong>: Análisis de la metodología 
                y limitaciones de los estudios citados.
              </li>
              <li>
                <strong>Revisión Final</strong>: Verificación de claridad, precisión 
                y cumplimiento de estándares editoriales.
              </li>
            </ol>
          </div>
        </section>

        {/* Content Updates */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Actualización de Contenido</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              La ciencia evoluciona constantemente. Por eso:
            </p>
            <ul>
              <li>
                Revisamos periódicamente nuestros artículos para incorporar 
                nueva evidencia científica
              </li>
              <li>
                Actualizamos información obsoleta o que ha sido refutada por 
                investigaciones recientes
              </li>
              <li>
                Indicamos claramente la fecha de última actualización en cada artículo
              </li>
              <li>
                Mantenemos un registro de cambios significativos cuando es relevante
              </li>
            </ul>
          </div>
        </section>

        {/* Conflicts of Interest */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Conflictos de Interés</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Mantenemos independencia editorial y divulgamos cualquier posible 
              conflicto de interés:
            </p>
            <ul>
              <li>
                No aceptamos pagos por cobertura favorable de productos o servicios
              </li>
              <li>
                Divulgamos claramente cualquier relación comercial o afiliación 
                que pueda influir en nuestro contenido
              </li>
              <li>
                Mantenemos separación entre contenido editorial y publicidad
              </li>
              <li>
                Nuestras recomendaciones se basan únicamente en evidencia científica 
                y experiencia práctica
              </li>
            </ul>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-8">
          <h2 className="text-2xl font-bold mb-4 text-amber-900 dark:text-amber-100">
            Aviso Médico Importante
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-amber-800 dark:text-amber-200">
              El contenido de Biohacking Lab 3.0 es solo para fines informativos 
              y educativos. No sustituye el consejo, diagnóstico o tratamiento 
              médico profesional.
            </p>
            <p className="text-amber-800 dark:text-amber-200">
              Siempre consulta con un profesional de la salud calificado antes 
              de implementar cualquier protocolo, suplemento o cambio en tu 
              estilo de vida. Los resultados individuales pueden variar.
            </p>
            <p className="text-amber-800 dark:text-amber-200">
              No nos hacemos responsables de ninguna consecuencia derivada del 
              uso de la información proporcionada en este sitio.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Encontraste un error o tienes sugerencias para mejorar nuestro contenido?
          </p>
          <a 
            href="mailto:editorial@biohackinglab3.com"
            className="text-primary hover:underline font-semibold"
          >
            editorial@biohackinglab3.com
          </a>
        </section>
      </div>

      <Footer />
    </main>
  )
}
