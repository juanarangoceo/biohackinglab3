import { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { AppsGrid } from "@/components/features/AppsGrid"

export const metadata: Metadata = {
  title: "Apps de Biohacking | BioHack Lab",
  description: "Las mejores aplicaciones y herramientas para trackear tu sueño, nutrición, ejercicio, meditación y más. Optimiza tu biología con tecnología.",
  keywords: ["apps biohacking", "wearables", "tracking salud", "apps sueño", "apps nutrición", "apps meditación"],
  openGraph: {
    title: "Apps de Biohacking | BioHack Lab",
    description: "Descubre las mejores apps para optimizar tu salud y rendimiento.",
  },
}

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <AppsGrid />
      <Footer />
    </main>
  )
}
