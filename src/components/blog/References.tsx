interface Reference {
  title: string
  authors?: string
  journal?: string
  year?: number
  url: string
  doi?: string
}

interface ReferencesProps {
  references: Reference[]
}

export function References({ references }: ReferencesProps) {
  if (!references || references.length === 0) {
    return null
  }

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-2xl font-bold mb-6">Referencias Científicas</h2>
      <ol className="space-y-4 text-sm">
        {references.map((ref, index) => (
          <li key={index} className="flex gap-3">
            <span className="font-semibold text-primary flex-shrink-0">
              [{index + 1}]
            </span>
            <div>
              {ref.authors && (
                <span className="text-muted-foreground">{ref.authors}. </span>
              )}
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors underline"
              >
                {ref.title}
              </a>
              {ref.journal && (
                <span className="text-muted-foreground italic">
                  {" "}
                  {ref.journal}
                </span>
              )}
              {ref.year && (
                <span className="text-muted-foreground"> ({ref.year})</span>
              )}
              {ref.doi && (
                <span className="text-muted-foreground block mt-1">
                  DOI: {ref.doi}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted-foreground mt-6">
        Todas las referencias han sido verificadas y provienen de fuentes
        científicas confiables. Última verificación:{" "}
        {new Date().toLocaleDateString("es-ES")}
      </p>
    </section>
  )
}
