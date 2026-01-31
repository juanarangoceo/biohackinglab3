import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
  category: string
  title: string
}

export function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  const categoryLabels: Record<string, string> = {
    nootropicos: "Nootrópicos",
    sueno: "Sueño",
    longevidad: "Longevidad",
    nutricion: "Nutrición",
    fitness: "Fitness",
  }

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: categoryLabels[category] || category, href: `/blog?category=${category}` },
    { label: title, href: "#", current: true },
  ]

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 && <Home className="h-4 w-4" />}
              
              {item.current ? (
                <span className="font-medium text-foreground line-clamp-1">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
              
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.current ? undefined : `https://biohackinglab3.com${item.href}`,
            })),
          }),
        }}
      />
    </>
  )
}
