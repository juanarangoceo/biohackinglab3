import { createClient } from '@sanity/client'
import { SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = 'production'
const apiVersion = '2024-01-01'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

// Public client for reading data (no token needed)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads
  perspective: 'published', // Only published documents
})

// Write client for mutations (requires token)
const sanityToken = process.env.SANITY_API_TOKEN;

if (!sanityToken) {
  console.warn('⚠️ SANITY_API_TOKEN is not set. Write operations will fail.');
} else {
  console.log('✅ SANITY_API_TOKEN loaded:', sanityToken.substring(0, 10) + '...');
}

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: sanityToken,
  perspective: 'published',
})

// Helper to check if write client is configured
export function hasWriteAccess(): boolean {
  return !!process.env.SANITY_API_TOKEN
}

// Type-safe fetch helper
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {},
  options: { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = 60, tags = [] } = options

  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  })
}
