import { Header } from "@/components/sections/header"
import { HeroSection } from "@/components/sections/hero-section"
import { TopicsSection } from "@/components/sections/topics-section"
import { MethodsSection } from "@/components/sections/methods-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
import { Footer } from "@/components/sections/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <TopicsSection />
      <MethodsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
