import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini with API key
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY

if (!apiKey) {
  throw new Error('Missing GOOGLE_GENERATIVE_AI_API_KEY or GOOGLE_API_KEY environment variable')
}

const genAI = new GoogleGenerativeAI(apiKey)

// Use Gemini 2.5 Flash for fast, reliable generation
const model = genAI.getGenerativeModel({ 
  model: 'models/gemini-2.5-flash',
  generationConfig: {
    temperature: 0.8, // Slightly creative but controlled
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192, // Enough for long-form content
  },
})

export interface GenerationResult {
  content: string
  tokensUsed?: number
  error?: string
}

/**
 * Generate content using Gemini Flash 2.0
 */
export async function generateContent(
  systemPrompt: string,
  userPrompt: string
): Promise<GenerationResult> {
  try {
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Entendido. Estoy listo para generar contenido de biohacking de alta calidad siguiendo tus directrices.' }],
        },
      ],
    })

    const result = await chat.sendMessage(userPrompt)
    const response = result.response
    const text = response.text()

    return {
      content: text,
      tokensUsed: response.usageMetadata?.totalTokenCount,
    }
  } catch (error) {
    console.error('Gemini generation error:', error)
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Generate short text (for excerpts, categories, etc.)
 */
export async function generateShortText(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text().trim()
  } catch (error) {
    console.error('Gemini short text generation error:', error)
    return ''
  }
}

/**
 * Validate that the API key is configured
 */
export function isGeminiConfigured(): boolean {
  return !!apiKey
}
