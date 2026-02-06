import React from 'react'
import { PortableText as PortableTextReact, PortableTextComponents, PortableTextComponentProps, PortableTextMarkComponentProps } from "@portabletext/react"

// Helper to parse markdown-style bold/italic if children is a string or array of strings
const renderMarkdownChildren = (content: React.ReactNode): React.ReactNode => {
  if (typeof content !== 'string') {
      // If it's an array, map over it. If it's complex objects, return as is.
      if (Array.isArray(content)) {
        return content.map((child, i) => <React.Fragment key={i}>{renderMarkdownChildren(child)}</React.Fragment>)
      }
      return content
  }

  // Split by **bold** first
  const parts = content.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-foreground">{part.slice(2, -2)}</strong>
    }
    // Then split by *italic*
    const subParts = part.split(/(\*.*?\*)/g)
    return subParts.map((subPart, subIndex) => {
        if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
          return <em key={`${index}-${subIndex}`} className="italic">{subPart.slice(1, -1)}</em>
        }
        return subPart
    })
  })
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<any>) => (
      <p className="mb-6 leading-relaxed text-muted-foreground text-lg">{renderMarkdownChildren(children)}</p>
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
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<any>) => (
      <li>{renderMarkdownChildren(children)}</li>
    ),
    number: ({ children }: PortableTextComponentProps<any>) => (
      <li>{renderMarkdownChildren(children)}</li>
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
  types: {
    table: ({ value }: { value: any }) => {
      const rows = value?.rows || []
      
      return (
        <div className="my-8 overflow-x-auto rounded-lg border border-border shadow-sm">
          <table className="w-full min-w-[600px] border-collapse bg-card">
            <tbody>
              {rows.map((row: any, rowIndex: number) => (
                <tr 
                  key={rowIndex}
                  className={rowIndex === 0 ? "bg-primary/5 border-b-2 border-primary/20" : "border-b border-border hover:bg-muted/30 transition-colors"}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => {
                    const isHeader = rowIndex === 0
                    const Tag = isHeader ? 'th' : 'td'
                    
                    return (
                      <Tag
                        key={cellIndex}
                        className={`
                          px-4 py-3 text-left
                          ${isHeader ? 'font-bold text-foreground text-sm uppercase tracking-wide' : 'text-muted-foreground'}
                          ${cellIndex === 0 ? 'font-semibold text-foreground' : ''}
                        `}
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
}

export function StyledPortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />
}
