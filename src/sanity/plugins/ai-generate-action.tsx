import { DocumentActionComponent } from 'sanity'
import { SparklesIcon } from '@sanity/icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // Correct hook for Next.js

export const AIGenerateAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props
  const [isGenerating, setIsGenerating] = useState(false)

  // Only show for post documents
  if (type !== 'post') {
    return null
  }

  const handleGenerate = async () => {
    const topic = (draft?.topic || published?.topic) as string | undefined

    if (!topic || topic.trim() === '') {
      alert('Por favor, ingresa un tema en el campo "AI Topic" antes de generar.')
      return
    }

    if (!confirm(`¿Generar contenido con IA para el tema: "${topic}"?`)) {
      return
    }

    setIsGenerating(true)

    try {
      // Call the Next.js API route
      const response = await fetch('/api/sanity/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: id,
          topic,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('✅ Contenido generado exitosamente! Recarga la página para ver los cambios.')
        window.location.reload()
      } else {
        alert(`❌ Error: ${result.error || 'No se pudo generar el contenido'}`)
      }
    } catch (error) {
      console.error('AI Generation error:', error)
      alert(`❌ Error de conexión: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    label: isGenerating ? 'Generando...' : 'Generate with AI',
    icon: SparklesIcon,
    disabled: isGenerating,
    onHandle: handleGenerate,
  }
}
