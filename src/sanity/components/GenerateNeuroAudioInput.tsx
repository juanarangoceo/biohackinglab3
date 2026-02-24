'use client'

import { useCallback, useState } from 'react'
import { TextArea, TextInput, Button, Stack, Card, Text, Spinner, Select } from '@sanity/ui'
import { set, unset, useClient, useFormValue } from 'sanity'
import { StringInputProps } from 'sanity'

export function GenerateNeuroAudioInput(props: StringInputProps) {
  const { onChange, value = '' } = props
  const [topic, setTopic] = useState(value)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [category, setCategory] = useState('activacion-enfoque')
  const [additionalPrompt, setAdditionalPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const documentId = useFormValue(['_id']) as string | undefined

  const handleGenerate = useCallback(async () => {
    if (!youtubeUrl || youtubeUrl.trim() === '') {
      setError('Por favor, ingresa el enlace de YouTube.')
      return
    }
    if (!topic || topic.trim() === '') {
        setError('Por favor, ingresa un nombre base o enfoque del audio.')
        return
    }

    if (!confirm(`¿Generar un audio sobre: "${topic}"?`)) {
      return
    }

    setIsGenerating(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/sanity/generate-neuroaudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId, // if provided, though server action creates new normally unless we are patching
          youtubeUrl,
          category,
          topic,
          additionalPrompt: additionalPrompt || undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setError(null)
        setTopic('')
        setYoutubeUrl('')
        setAdditionalPrompt('')
        onChange(unset())
        
        setTimeout(() => {
          // Si estamos creando un nuevo documento, recargar nos sacará de draft o actualizará.
          window.location.reload()
        }, 1500)
      } else {
        setError(result.error || 'Error al generar el contenido de audio')
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Error de conexión')
    } finally {
      setIsGenerating(false)
    }
  }, [topic, youtubeUrl, category, additionalPrompt, onChange, documentId])

  return (
    <Stack space={3}>
      <Card padding={4} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            🎧 Generador de NeuroAudio (IA)
          </Text>
          <Text size={1} muted>
            Crea un nuevo track de NeuroAudio, el contenido y los beneficios se generarán automáticamente.
          </Text>
        </Stack>
      </Card>

      <Stack space={3}>
        <TextInput
          fontSize={2}
          padding={3}
          placeholder="Enlace de YouTube (Ej: https://youtube.com/watch?v=123)"
          value={youtubeUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.currentTarget.value)}
          disabled={isGenerating}
        />

        <TextInput
          fontSize={2}
          padding={3}
          placeholder="Enfoque principal (Ej: Ondas Gamma 40Hz)"
          value={topic}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTopic(e.currentTarget.value)
              onChange(e.currentTarget.value ? set(e.currentTarget.value) : unset())
          }}
          disabled={isGenerating}
        />

        <Select
          fontSize={2}
          padding={3}
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.currentTarget.value)}
          disabled={isGenerating}
        >
          <option value="activacion-enfoque">Activación y enfoque profundo</option>
          <option value="reduccion-estres">Reducción de Estrés y Creatividad</option>
          <option value="sueno-recuperacion">Sueño Profundo y Recuperación</option>
          <option value="bienestar-holistico">Bienestar Holístico (Solfeggio)</option>
        </Select>

        <TextArea
          fontSize={1}
          padding={3}
          placeholder="Instrucciones extra (opcional)..."
          rows={2}
          value={additionalPrompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdditionalPrompt(e.currentTarget.value)}
          disabled={isGenerating}
        />

        <Button
          text={isGenerating ? 'Generando Contenido...' : 'Generar NeuroAudio'}
          tone="primary"
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim() || !youtubeUrl.trim()}
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
            <Text size={1}>✅ ¡Audio y texto generados espectacularmente!</Text>
          </Card>
        )}
      </Stack>
    </Stack>
  )
}
