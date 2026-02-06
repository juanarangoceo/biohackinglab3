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
      <div className="mb-6">
         <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:translate-x-[-4px] duration-200"
         >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Volver al Blog
         </Link>
      </div>

      <nav aria-label="Breadcrumb" className="mb-8 hidden md:block">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground/80 font-medium">
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
                  className="text-foreground/80 hover:text-primary transition-colors hover:underline"
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
