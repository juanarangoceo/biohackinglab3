import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { sanityFetch } from '@/lib/sanity/client'
import { neuroAudioBySlugQuery, SanityNeuroAudioFull } from '@/lib/sanity/queries'
import { PortableTextRenderer } from '@/lib/sanity/portable-text'
import { ArrowLeft, Headphones, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface TrackPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateMetadata({ params }: TrackPageProps) {
  const { slug } = await params;
  
  const track = await sanityFetch<SanityNeuroAudioFull | null>(
    neuroAudioBySlugQuery,
    { slug }
  )
  
  if (!track) return { title: 'No encontrado | NeuroAudio' }

  return {
    title: `${track.title} | NeuroAudio | Biohacking Lab 3.0`,
    description: track.excerpt || "Frecuencias y ondas cerebrales para biohacking.",
  }
}

export default async function NeuroAudioTrackPage({ params }: TrackPageProps) {
  const { slug, category } = await params

  const track = await sanityFetch<SanityNeuroAudioFull | null>(
    neuroAudioBySlugQuery,
    { slug }
  )

  if (!track || track.category !== category) {
    notFound()
  }

  // Extract YouTube ID for Embed
  const videoIdMatch = track.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/)
  const videoId = videoIdMatch ? videoIdMatch[1] : null

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="flex flex-col pt-32 pb-16 lg:pt-40 lg:pb-24">
        <article className="mx-auto max-w-4xl px-6 w-full">
        {/* Navigation */}
        <Link 
          href={`/neuroaudio/${category}`}
          className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a la selección
        </Link>

        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <Headphones className="h-3 w-3 text-primary" />
              <span className="font-mono text-xs font-medium text-primary uppercase tracking-wider">
                NeuroAudio Track
              </span>
            </span>
          </div>

          <h1 className="mb-6 font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            {track.title}
          </h1>

          {track.excerpt && (
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground text-pretty mb-8">
              {track.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={track._createdAt}>
                  {new Date(track._createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
             </div>
          </div>
        </header>

        {/* The Player Area */}
        <div className="mb-16">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-black/50 shadow-2xl">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                title={track.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                 Enlace de video inválido o no soportado.
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-2">
             {track.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono text-xs px-3 py-1 bg-secondary/50">
                   #{tag}
                </Badge>
             ))}
          </div>
        </div>

        {/* AI Scientific Content generated */}
        {track.content && track.content.length > 0 && (
          <div className="mx-auto max-w-3xl">
            <PortableTextRenderer content={track.content} />
          </div>
        )}
      </article>
    </div>
    <Footer />
    </main>
  )
}
