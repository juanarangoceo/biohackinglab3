import { Metadata } from "next"
import { seoConfig } from "./config"

interface GenerateMetadataParams {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  noIndex?: boolean
}

/**
 * Generate comprehensive metadata for any page
 * Includes OpenGraph, Twitter Cards, and canonical URLs
 */
export function generateMetadata({
  title,
  description,
  image,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: GenerateMetadataParams = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle

  const pageDescription = truncateDescription(
    description || seoConfig.defaultDescription
  )

  const canonicalUrl = `${seoConfig.siteUrl}${path}`
  const ogImage = image || seoConfig.defaultOgImage
  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${seoConfig.siteUrl}${ogImage}`

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: seoConfig.locale,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      title: title || seoConfig.defaultTitle,
      description: pageDescription,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: title || seoConfig.siteName,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [seoConfig.author.name],
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title: title || seoConfig.defaultTitle,
      description: pageDescription,
      images: [absoluteOgImage],
    },
  }

  return metadata
}

/**
 * Truncate description to 160 characters for SEO
 */
function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trim() + "..."
}

/**
 * Generate metadata specifically for blog posts
 */
export function generateBlogPostMetadata({
  title,
  excerpt,
  category,
  slug,
  publishedAt,
  updatedAt,
  coverImage,
}: {
  title: string
  excerpt?: string
  category: string
  slug: string
  publishedAt?: Date
  updatedAt?: Date
  coverImage?: string
}) {
  return generateMetadata({
    title,
    description: excerpt,
    image: coverImage,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: publishedAt?.toISOString(),
    modifiedTime: updatedAt?.toISOString(),
    tags: [category, "biohacking", "longevidad", "optimización humana"],
  })
}

/**
 * Generate metadata for blog listing page
 */
export function generateBlogListingMetadata(category?: string) {
  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} | Blog`
    : "Blog de Biohacking y Longevidad"

  const description = category
    ? `Artículos sobre ${category} - Protocolos, ciencia y estrategias para optimizar tu rendimiento.`
    : "Descubre los últimos artículos sobre biohacking, nootrópicos, longevidad y optimización del rendimiento humano."

  return generateMetadata({
    title,
    description,
    path: category ? `/blog?category=${category}` : "/blog",
  })
}
