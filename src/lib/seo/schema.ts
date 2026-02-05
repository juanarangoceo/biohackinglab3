import { seoConfig } from "./config"

interface ArticleSchemaParams {
  title: string
  description?: string
  slug: string
  publishedAt?: Date
  updatedAt?: Date
  category: string
  coverImage?: string
  content: string
  author?: {
    name: string
    slug: string
    credentials?: string[]
    image?: string
    bio?: string
    socialLinks?: {
      twitter?: string
      linkedin?: string
      website?: string
    }
  }
}

interface AuthorSchemaParams {
  name: string
  slug: string
  bio?: string
  credentials?: string[]
  image?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  yearsOfExperience?: number
}

/**
 * Generate Article schema.org structured data
 * Critical for E-E-A-T compliance
 */
export function generateArticleSchema(params: ArticleSchemaParams) {
  const {
    title,
    description,
    slug,
    publishedAt,
    updatedAt,
    category,
    coverImage,
    author,
  } = params

  const articleUrl = `${seoConfig.siteUrl}/blog/${slug}`
  const imageUrl = coverImage?.startsWith("http")
    ? coverImage
    : coverImage
    ? `${seoConfig.siteUrl}${coverImage}`
    : `${seoConfig.siteUrl}/og-image.png`

  const schema: any = {
    "@type": "Article",
    "headline": title,
    "description": description || title,
    "image": imageUrl,
    "datePublished": publishedAt?.toISOString() || new Date().toISOString(),
    "dateModified": updatedAt?.toISOString() || publishedAt?.toISOString() || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/logo.png`,
      },
    },
    "articleSection": category,
  }

  // Add author if available (CRITICAL for E-E-A-T)
  if (author) {
    schema.author = {
      "@type": "Person",
      "name": author.name,
      "url": `${seoConfig.siteUrl}/author/${author.slug}`,
      ...(author.credentials && author.credentials.length > 0 && {
        "jobTitle": author.credentials[0],
      }),
      ...(author.bio && { "description": author.bio }),
      ...(author.image && { "image": author.image }),
      ...(author.socialLinks && {
        "sameAs": [
          author.socialLinks.twitter,
          author.socialLinks.linkedin,
          author.socialLinks.website,
        ].filter(Boolean),
      }),
    }
  } else {
    // Fallback to site author
    schema.author = {
      "@type": "Person",
      "name": seoConfig.author.name,
      "url": seoConfig.siteUrl,
    }
  }

  return schema
}

/**
 * Generate Person schema for author pages
 */
export function generateAuthorSchema(params: AuthorSchemaParams) {
  const { name, slug, bio, credentials, image, socialLinks, yearsOfExperience } = params

  return {
    "@type": "Person",
    "name": name,
    "url": `${seoConfig.siteUrl}/author/${slug}`,
    ...(bio && { "description": bio }),
    ...(image && { "image": image }),
    ...(credentials && credentials.length > 0 && {
      "jobTitle": credentials.join(", "),
    }),
    ...(yearsOfExperience && {
      "knowsAbout": `${yearsOfExperience}+ years of experience in biohacking and human optimization`,
    }),
    ...(socialLinks && {
      "sameAs": [
        socialLinks.twitter,
        socialLinks.linkedin,
        socialLinks.website,
      ].filter(Boolean),
    }),
  }
}

/**
 * Generate Organization schema
 * Should be included on every page
 */
export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${seoConfig.siteUrl}/logo.png`,
    },
    "description": seoConfig.defaultDescription,
    "sameAs": [
      "https://twitter.com/biohackinglab",
      "https://instagram.com/biohackinglab",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contacto@biohackinglab3.com",
    },
  }
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": `${seoConfig.siteUrl}${item.url}` }),
    })),
  }
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${seoConfig.siteUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generate ItemList schema for blog listing pages
 */
export function generateItemListSchema(params: {
  name: string
  description: string
  items: Array<{ name: string; url: string; description?: string }>
}) {
  return {
    "@type": "ItemList",
    "name": params.name,
    "description": params.description,
    "itemListElement": params.items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${seoConfig.siteUrl}${item.url}`,
      "name": item.name,
      ...(item.description && { "description": item.description }),
    })),
  }
}
