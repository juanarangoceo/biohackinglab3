import { seoConfig } from "./config"

/**
 * Generate Organization schema (global)
 */
export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    "name": seoConfig.organization.name,
    "url": seoConfig.siteUrl,
    "logo": seoConfig.organization.logo,
    "sameAs": seoConfig.organization.sameAs,
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
        "urlTemplate": `${seoConfig.siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  category,
  coverImage,
  content,
}: {
  title: string
  description?: string
  slug: string
  publishedAt?: Date
  updatedAt?: Date
  category: string
  coverImage?: string
  content?: string
}) {
  const wordCount = content ? content.split(/\s+/).length : 0

  return {
    "@type": "Article",
    "headline": title,
    "description": description || title,
    "image": coverImage
      ? `${seoConfig.siteUrl}${coverImage}`
      : seoConfig.defaultOgImage,
    "author": {
      "@type": "Person",
      "name": seoConfig.author.name,
      "url": seoConfig.author.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.organization.name,
      "logo": {
        "@type": "ImageObject",
        "url": seoConfig.organization.logo,
      },
    },
    "datePublished": publishedAt?.toISOString(),
    "dateModified": updatedAt?.toISOString() || publishedAt?.toISOString(),
    "articleSection": category,
    "wordCount": wordCount,
    "url": `${seoConfig.siteUrl}/blog/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${seoConfig.siteUrl}/blog/${slug}`,
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
export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
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
 * Generate ItemList schema (for blog listing, apps, etc.)
 */
export function generateItemListSchema({
  name,
  description,
  items,
}: {
  name: string
  description?: string
  items: Array<{ name: string; url: string; description?: string }>
}) {
  return {
    "@type": "ItemList",
    "name": name,
    "description": description,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Thing",
        "name": item.name,
        "url": `${seoConfig.siteUrl}${item.url}`,
        ...(item.description && { "description": item.description }),
      },
    })),
  }
}

/**
 * Render schema as JSON-LD script tag
 */
export function renderSchema(schema: object) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Combine multiple schemas into one script tag
 */
export function combineSchemas(...schemas: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  }
}
