'use client'

import { useCallback, useState } from 'react'
import { TextArea, Button, Stack, Card, Text, Spinner } from '@sanity/ui'
import { set, unset, useClient, useFormValue } from 'sanity'
import { StringInputProps } from 'sanity'

export function GenerateTagInput(props: StringInputProps) {
  const { onChange, value = '' } = props
  const [topic, setTopic] = useState(value)
  const [additionalPrompt, setAdditionalPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Use Studio's authenticated client
  const client = useClient({ apiVersion: '2024-01-01' })
  const documentId = useFormValue(['_id']) as string | undefined
  const tagTitle = useFormValue(['title']) as string | undefined

  const handleGenerate = useCallback(async () => {
    const concept = topic || tagTitle
    if (!concept || concept.trim() === '') {
      setError('Por favor, ingresa un Título arriba o un tema aquí para generar el ensayo.')
      return
    }

    if (!documentId) {
      setError('Por favor, guarda el documento al menos una vez antes de generar con IA.')
      return
    }

    if (!confirm(`¿Generar un ensayo (Hub SGO) sobre: "${concept}"?`)) {
      return
    }

    setIsGenerating(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/sanity/generate-tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          topic: concept,
          additionalPrompt: additionalPrompt || undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setError(null)
        setTopic('')
        setAdditionalPrompt('')
        onChange(unset())
        
        // Reload to show the new content patched by the server
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setError(result.error || 'Error al generar el contenido de la etiqueta')
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Error de conexión')
    } finally {
      setIsGenerating(false)
    }
  }, [topic, tagTitle, additionalPrompt, onChange, documentId])

  const handleTopicChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.currentTarget.value
      setTopic(newValue)
      onChange(newValue ? set(newValue) : unset())
    },
    [onChange]
  )

  return (
    <Stack space={3}>
      <Card padding={4} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            🤖 Generador SGO de Etiqueta (Theme Hub)
          </Text>
          <Text size={1} muted>
            La IA redactará un ensayo estructurado (Qué es, Mecanismo y Beneficios) sobre esta etiqueta. Esto nutre el Hub de la etiqueta para SEO.
          </Text>
        </Stack>
      </Card>

      <Stack space={3}>
        <TextArea
          fontSize={2}
          padding={3}
          placeholder="Tema (Opcional si el Título ya está lleno)..."
          rows={2}
          value={topic}
          onChange={handleTopicChange}
          disabled={isGenerating}
        />

        <TextArea
          fontSize={1}
          padding={3}
          placeholder="Instrucciones adicionales (opcional): Ej: Enfócate en el ritmo circadiano..."
          rows={2}
          value={additionalPrompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdditionalPrompt(e.currentTarget.value)}
          disabled={isGenerating}
        />

        <Button
          text={isGenerating ? 'Generando ensayo...' : 'Generar Hub'}
          tone="primary"
          onClick={handleGenerate}
          disabled={isGenerating || (!topic?.trim() && !tagTitle?.trim()) || !documentId}
          icon={isGenerating ? Spinner : undefined}
          fontSize={2}
          padding={4}
        />

        {error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>❌ {error}</Text>
          </Card>
        )}

        {success && (
          <Card padding={3} radius={2} tone="positive">
            <Text size={1}>✅ Contenido generado existosamente! Recargando...</Text>
          </Card>
        )}
      </Stack>
    </Stack>
  )
}
