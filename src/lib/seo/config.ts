export const seoConfig = {
  siteName: "BioHacking Lab 3.0",
  siteUrl: "https://www.biohackinglab3.com",
  defaultTitle: "BioHacking Lab 3.0 | Optimización Humana y Longevidad",
  defaultDescription: "Plataforma líder en biohacking, longevidad y optimización del rendimiento humano. Descubre protocolos científicos, nootrópicos y estrategias para mejorar tu salud.",
  twitterHandle: "@biohackinglab",
  defaultOgImage: "/og-default.png",
  locale: "es_ES",
  author: {
    name: "Juan Arango",
    url: "https://biohackinglab3.com/about",
  },
  organization: {
    name: "BioHacking Lab 3.0",
    logo: "https://biohackinglab3.com/logo.png",
    sameAs: [
      "https://twitter.com/biohackinglab",
      "https://instagram.com/biohackinglab",
      "https://youtube.com/@biohackinglab",
    ],
  },
} as const

export type SEOConfig = typeof seoConfig
