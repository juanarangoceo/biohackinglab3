import Link from "next/link"
import { Dna, Twitter, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  navegacion: [
    { label: "Inicio", href: "/" },
    { label: "Apps", href: "/apps" },
    { label: "Blog", href: "/blog" },
  ],
  temas: [
    { label: "Nootrópicos", href: "/blog?tag=nootropicos" },
    { label: "Sueño", href: "/blog?tag=sueno" },
    { label: "Longevidad", href: "/blog?tag=longevidad" },
    { label: "Nutrición", href: "/blog?tag=nutricion" },
  ],
  legal: [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos", href: "/terminos" },
    { label: "Contacto", href: "/contacto" },
  ]
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                <Dna className="h-5 w-5 text-primary-foreground" />
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                  3.0
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold leading-tight tracking-tight text-foreground">
                  Biohacking <span className="text-primary">Lab</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-accent">
                  Optimize your biology
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Tu fuente de información confiable sobre biohacking y optimización humana. 
              Ciencia aplicada para transformar tu vida.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </h4>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              Temas
            </h4>
            <ul className="space-y-3">
              {footerLinks.temas.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Biohacking Lab 3.0. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Hecho con ciencia y pasión por la optimización humana.
          </p>
        </div>
      </div>
    </footer>
  )
}
