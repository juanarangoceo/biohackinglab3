"use client"

import { useState } from "react"
import { 
  Moon, 
  Brain, 
  Dumbbell, 
  Apple, 
  Heart,
  Timer,
  Smartphone,
  ExternalLink,
  Star
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "all", label: "Todas" },
  { id: "sleep", label: "Sueño" },
  { id: "cognitive", label: "Cognitivo" },
  { id: "fitness", label: "Fitness" },
  { id: "nutrition", label: "Nutrición" },
  { id: "tracking", label: "Tracking" },
]

const apps = [
  {
    name: "Oura Ring",
    category: "tracking",
    description: "El anillo inteligente más avanzado para trackear sueño, actividad y recuperación. Datos precisos sin incomodidad.",
    icon: Heart,
    rating: 4.8,
    price: "Premium",
    features: ["Tracking de sueño", "HRV", "Temperatura corporal"],
    url: "https://ouraring.com"
  },
  {
    name: "Whoop",
    category: "tracking",
    description: "Wearable enfocado en rendimiento deportivo y recuperación. Ideal para atletas y entusiastas del fitness.",
    icon: Dumbbell,
    rating: 4.7,
    price: "Suscripción",
    features: ["Strain score", "Recovery score", "Sleep coach"],
    url: "https://whoop.com"
  },
  {
    name: "Sleep Cycle",
    category: "sleep",
    description: "Alarma inteligente que te despierta en tu fase de sueño más ligera. Análisis detallado de tu descanso.",
    icon: Moon,
    rating: 4.6,
    price: "Freemium",
    features: ["Smart alarm", "Sleep analysis", "Snore detection"],
    url: "https://sleepcycle.com"
  },
  {
    name: "Headspace",
    category: "cognitive",
    description: "Meditación guiada y mindfulness para reducir estrés, mejorar focus y dormir mejor. Perfecto para principiantes.",
    icon: Brain,
    rating: 4.9,
    price: "Freemium",
    features: ["Meditaciones guiadas", "Sleep stories", "Focus music"],
    url: "https://headspace.com"
  },
  {
    name: "Zero",
    category: "nutrition",
    description: "La mejor app para ayuno intermitente. Trackea tus ayunos, aprende los beneficios y mantente motivado.",
    icon: Timer,
    rating: 4.8,
    price: "Freemium",
    features: ["Fasting tracker", "Fasting zones", "Insights"],
    url: "https://zerolongevity.com"
  },
  {
    name: "Cronometer",
    category: "nutrition",
    description: "Tracking nutricional de precisión. Monitorea macros, micros y calorías con la base de datos más completa.",
    icon: Apple,
    rating: 4.7,
    price: "Freemium",
    features: ["84+ nutrientes", "Integraciones", "Metas personalizadas"],
    url: "https://cronometer.com"
  },
  {
    name: "Neuronation",
    category: "cognitive",
    description: "Ejercicios científicamente diseñados para mejorar memoria, concentración y velocidad mental.",
    icon: Brain,
    rating: 4.5,
    price: "Freemium",
    features: ["Brain training", "Personalized workouts", "Progress tracking"],
    url: "https://neuronation.com"
  },
  {
    name: "Strong",
    category: "fitness",
    description: "El mejor tracker de entrenamientos de fuerza. Registra ejercicios, sets, reps y visualiza tu progreso.",
    icon: Dumbbell,
    rating: 4.9,
    price: "Freemium",
    features: ["Workout logging", "Exercise library", "Progress charts"],
    url: "https://strong.app"
  },
  {
    name: "Elite HRV",
    category: "tracking",
    description: "Mide tu variabilidad cardíaca cada mañana para optimizar entrenamiento y recuperación.",
    icon: Heart,
    rating: 4.6,
    price: "Gratis",
    features: ["Morning readiness", "HRV trends", "Training guidance"],
    url: "https://elitehrv.com"
  },
]

export function AppsGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  
  const filteredApps = activeCategory === "all" 
    ? apps 
    : apps.filter(app => app.category === activeCategory)

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Smartphone className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-medium text-primary">Herramientas del biohacker</span>
          </span>
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Apps que realmente funcionan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Hemos probado cientos de apps. Estas son las que de verdad valen la pena para 
            optimizar tu sueño, nutrición, ejercicio y rendimiento cognitivo.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 font-mono text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <Card 
              key={app.name}
              className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <app.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {app.price}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="mb-2 font-mono text-xl font-semibold text-foreground">
                  {app.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {app.description}
                </p>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-mono text-sm font-medium text-foreground">{app.rating}</span>
                </div>

                {/* Features */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {app.features.map((feature) => (
                    <span 
                      key={feature}
                      className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                  <a href={app.url} target="_blank" rel="noopener noreferrer">
                    Ver app
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-muted-foreground">
            ¿Conoces una app que debería estar aquí?
          </p>
          <Button variant="outline" asChild>
            <a href="mailto:apps@biohacklab.com">Recomiéndanos una app</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
