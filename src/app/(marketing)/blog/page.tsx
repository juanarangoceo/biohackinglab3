import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { BlogGrid } from "@/components/features/BlogGrid"
import { NewsletterSection } from "@/components/sections/newsletter-section"

export const metadata: Metadata = {
  title: "Blog de Biohacking | BioHack Lab",
  description: "Artículos, guías y protocolos de biohacking respaldados por ciencia. Aprende sobre nootrópicos, sueño, longevidad, nutrición y más.",
  keywords: ["blog biohacking", "artículos biohacking", "guías nootrópicos", "protocolos sueño", "longevidad", "optimización humana"],
  openGraph: {
    title: "Blog de Biohacking | BioHack Lab",
    description: "Contenido científico para optimizar tu biología y rendimiento.",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BlogGrid />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
