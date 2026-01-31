// GROQ queries for Sanity CMS

export const postsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    aiGenerated,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    category,
    publishedAt,
    aiGenerated,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`

export const postsByCategoryQuery = `
  *[_type == "post" && category == $category && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    aiGenerated,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`

export const paginatedPostsQuery = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    aiGenerated,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`

export const postCountQuery = `
  count(*[_type == "post" && defined(publishedAt)])
`

export const postCountByCategoryQuery = `
  count(*[_type == "post" && category == $category && defined(publishedAt)])
`

// Type definitions for query results
export interface SanityPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  category: string
  publishedAt: string
  aiGenerated: boolean
  mainImage?: string
  mainImageAlt?: string
}

export interface SanityPostFull extends SanityPost {
  content: any[] // Portable Text blocks
}
