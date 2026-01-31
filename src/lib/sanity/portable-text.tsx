import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

// Custom components for rendering Portable Text
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 font-mono text-4xl font-bold tracking-tight text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-mono text-3xl font-bold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-mono text-2xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-primary">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || ''
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="my-8">
          <Image
            src={value.asset._ref}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg border border-border"
          />
          {value.alt && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
}

interface PortableTextRendererProps {
  content: any[]
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}
