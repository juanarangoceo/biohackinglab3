'use client'

import { useCallback, useState } from 'react'
import { TextArea, Button, Stack, Card, Text, Spinner } from '@sanity/ui'
import { set, unset } from 'sanity'
import { StringInputProps } from 'sanity'

export function GeneratePostInput(props: StringInputProps) {
  const { onChange, value = '' } = props
  const [topic, setTopic] = useState(value)
  const [additionalPrompt, setAdditionalPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!topic || topic.trim() === '') {
      setError('Por favor, ingresa un tema para generar el blog.')
      return
    }

    if (!confirm(`¿Generar y publicar automáticamente un blog sobre: "${topic}"?`)) {
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
          topic,
          additionalPrompt: additionalPrompt || undefined,
        }),
      })

      const result = await response.json()

      if (result.success && result.generatedContent) {
        // Create the document using Sanity Studio's client (has write permissions)
        const { client } = await import('sanity')
        const sanityClient = client({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
          dataset: 'production',
          apiVersion: '2024-01-01',
          useCdn: false,
        })

        // Create the document
        const doc = await sanityClient.create({
          _type: 'post',
          ...result.generatedContent,
        })

        setSuccess(true)
        setError(null)
        setTopic('')
        setAdditionalPrompt('')
        onChange(unset())
        
        // Reload to show the new post
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
            Ingresa un tema y la IA generará automáticamente el título, slug, contenido, excerpt y categoría. El post se publicará automáticamente.
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
          text={isGenerating ? 'Generando...' : 'Generar y Publicar Blog'}
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
            <Text size={1}>✅ Blog generado y publicado exitosamente! Recargando...</Text>
          </Card>
        )}
      </Stack>
    </Stack>
  )
}
