import { AlertTriangle } from "lucide-react"

export function MedicalDisclaimer() {
  return (
    <div className="my-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
            Aviso Médico Importante
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            Este contenido es solo para fines informativos y educativos. No sustituye el consejo, 
            diagnóstico o tratamiento médico profesional. Siempre consulta con un profesional de 
            la salud calificado antes de implementar cualquier protocolo, suplemento o cambio en 
            tu estilo de vida. Los resultados individuales pueden variar.
          </p>
        </div>
      </div>
    </div>
  )
}
