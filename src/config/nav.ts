import { LayoutDashboard, Users, FileText, Settings, BarChart } from "lucide-react";

export const siteConfig = {
  name: "Biohacking Lab 3.0",
  description: "Optimización Humana a través de Ciencia y Tecnología",
}

export const marketingNav = [
  { name: "Inicio", href: "/" },
  { 
    name: "Temas", 
    href: "/temas",
    children: [
      { name: "Nootrópicos", href: "/temas/nootropicos" },
      { name: "Terapia de Luz", href: "/temas/terapia-de-luz" },
      { name: "Sueño", href: "/temas/sueno" },
      { name: "Terapia de Frío", href: "/temas/terapia-de-frio" },
      { name: "Fitness", href: "/temas/fitness" },
      { name: "Suplementación", href: "/temas/suplementacion" },
      { name: "HRV", href: "/temas/hrv" },
      { name: "Ayuno", href: "/temas/ayuno" },
    ]
  },
  { name: "Blog", href: "/blog" },
  { name: "Apps", href: "/apps" },
]

export const dashboardNav = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Protocols",
    href: "/dashboard/protocols",
    icon: FileText,
  },
  {
    title: "Tracking",
    href: "/dashboard/tracking",
    icon: BarChart,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]
