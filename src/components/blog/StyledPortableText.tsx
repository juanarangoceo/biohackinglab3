import { PortableText as PortableTextReact, PortableTextComponents, PortableTextComponentProps, PortableTextMarkComponentProps } from "@portabletext/react"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<any>) => (
      <p className="mb-6 leading-relaxed text-muted-foreground text-lg">{children}</p>
    ),
    h1: ({ children, value }: PortableTextComponentProps<any>) => (
      <h1 
        id={value?._key} 
        className="text-4xl font-extrabold mt-16 mb-8 scroll-mt-24 pb-4 border-b-2 border-primary/20 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
      >
        {children}
      </h1>
    ),
    h2: ({ children, value }: PortableTextComponentProps<any>) => (
      <h2 
        id={value?._key} 
        className="text-3xl font-bold mt-12 mb-6 scroll-mt-24 pb-2 border-b border-border/50 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }: PortableTextComponentProps<any>) => (
      <h3 
        id={value?._key} 
        className="text-2xl font-semibold mt-8 mb-4 scroll-mt-24 text-foreground/90"
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: PortableTextComponentProps<any>) => (
      <blockquote className="border-l-4 border-primary/50 pl-6 italic my-8 text-xl text-muted-foreground bg-muted/30 py-4 rounded-r-lg shadow-sm">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<any>) => (
      <ul className="list-disc pl-6 space-y-3 my-6 text-muted-foreground marker:text-primary/70">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<any>) => (
      <ol className="list-decimal pl-6 space-y-3 my-6 text-muted-foreground marker:text-primary/70 font-medium">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-primary bg-primary/10 px-1 rounded-sm shadow-sm decoration-clone box-decoration-clone">
        {children}
      </strong>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary border border-border">
        {children}
      </code>
    ),
    link: ({ children, value }: PortableTextMarkComponentProps<any>) => {
      const href = value?.href || '#'
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !href.startsWith('/') ? '_blank' : undefined
      return (
        <a 
          href={href} 
          rel={rel} 
          target={target}
          className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

export function StyledPortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />
}
