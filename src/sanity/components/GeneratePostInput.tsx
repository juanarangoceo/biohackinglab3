'use client'

import { useCallback, useState } from 'react'
import { TextArea, Button, Stack, Card, Text, Spinner } from '@sanity/ui'
import { set, unset, useClient, useFormValue } from 'sanity'
import { StringInputProps } from 'sanity'

export function GeneratePostInput(props: StringInputProps) {
  const { onChange, value = '' } = props
  const [topic, setTopic] = useState(value)
  const [additionalPrompt, setAdditionalPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Use Studio's authenticated client
  const client = useClient({ apiVersion: '2024-01-01' })
  const documentId = useFormValue(['_id']) as string | undefined

  const handleGenerate = useCallback(async () => {
    if (!topic || topic.trim() === '') {
      setError('Por favor, ingresa un tema para generar el blog.')
      return
    }

    if (!confirm(`¿Generar un blog sobre: "${topic}"? (Se guardará como borrador para tu revisión)`)) {
      return
    }

    setIsGenerating(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/sanity/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          topic,
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
        setError(result.error || 'Error al generar el contenido')
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Error de conexión')
    } finally {
      setIsGenerating(false)
    }
  }, [topic, additionalPrompt, onChange])

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
            🤖 Generador de Blog con IA
          </Text>
          <Text size={1} muted>
            Ingresa un tema y la IA generará el contenido en este mismo borrador. Revisa y formatea antes de publicar.
          </Text>
        </Stack>
      </Card>

      <Stack space={3}>
        <TextArea
          fontSize={2}
          padding={3}
          placeholder="Ej: Los beneficios del ayuno intermitente para la longevidad"
          rows={3}
          value={topic}
          onChange={handleTopicChange}
          disabled={isGenerating}
        />

        <TextArea
          fontSize={1}
          padding={3}
          placeholder="Instrucciones adicionales (opcional): Ej: Enfócate en estudios recientes, incluye protocolos específicos..."
          rows={2}
          value={additionalPrompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdditionalPrompt(e.currentTarget.value)}
          disabled={isGenerating}
        />

        <Button
          text={isGenerating ? 'Generando...' : 'Generar Borrador'}
          tone="primary"
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
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
            <Text size={1}>✅ Contenido generado existosamente en el borrador! Recargando...</Text>
          </Card>
        )}
      </Stack>
    </Stack>
  )
}
