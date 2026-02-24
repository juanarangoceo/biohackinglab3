import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { sanityFetch } from '@/lib/sanity/client'
import { neuroAudioByCategoryQuery, SanityNeuroAudio } from '@/lib/sanity/queries'
import { ArrowLeft, PlayCircle, Headphones } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const CATEGORY_INFO: Record<string, { title: string; subtitle: string; seoContent: string }> = {
  "activacion-enfoque": {
    title: "Activación y Enfoque Profundo",
    subtitle: "Ondas Gamma, Beta y Ruido Marrón",
    seoContent: "El arrastre de ondas cerebrales (Brainwave Entrainment) mediante tonos isocrónicos y binaurales en frecuencias Gamma (30-100Hz) y Beta (13-30Hz) está científicamente probado para optimizar las funciones cognitivas superiores. Esta constelación neuroacústica fomenta niveles extraordinarios de concentración, memorización y veloz procesamiento de información. Ideal para inducir estados de hiperfoco ininterrumpidos (Flow State) en jornadas intensas de trabajo, bloqueando las distracciones externas gracias a la máscara acústica del Ruido Marrón u oscuro."
  },
  "reduccion-estres": {
    title: "Reducción de Estrés y Creatividad",
    subtitle: "Down-regulation, Ondas Alfa y Lo-Fi Binaural",
    seoContent: "Diseñadas para la modulación a la baja (Down-regulation) de tu excitado sistema nervioso central, estas pistas estimulan predominantemente las ondas Alfa (8-12Hz) en la corteza cerebral. Esta importante franja frecuencial disuelve la rumiación persistente y la ansiedad, reduciendo drásticamente los niveles de cortisol para fomentar un estado mental tranquilo pero lúcido. Constituyen poderosas herramientas bioacústicas esenciales para superar severos bloqueos creativos, facilitar la meditación analítica o conseguir desconexión inmediata frente al acelerado estilo de vida moderno."
  },
  "sueno-recuperacion": {
    title: "Sueño Profundo y Recuperación",
    subtitle: "Sleep Hacking, Ondas Delta y Ruido Rosa",
    seoContent: "Lograr un sueño verdaderamente reparador y curativo exige mucho más que simplemente cerrar los ojos. A través de las ultralentas y potentes ondas Delta (0.5-4Hz) combinadas inteligentemente con el delicado enmascaramiento acústico que proporciona el Ruido Rosa, estas secuencias fuerzan biológicamente tu arquitectura del sueño, maximizando la fase NREM (sueño profundo de ondas lentas). Precisamente bajo estas frecuencias óptimas es donde se dispara la regeneración celular estructural, la liberación sostenida de hormona del crecimiento exógena y el vital barrido de neurotoxinas que lleva a cabo nuestro sistema glinfático."
  },
  "bienestar-holistico": {
    title: "Bienestar y Recuperación Holística",
    subtitle: "Frecuencias Solfeggio, 432Hz y 528Hz",
    seoContent: "Cimenta tu salud integral en el potente armazón de las antiguas frecuencias resonadoras Solfeggio. La ciencia moderna de la cimática sugiere que frecuencias precisas como los 432Hz (resonancia geométrica natural) y la denominada 'frecuencia reparadora' de 528Hz operan activamente desde el nivel bioenergético más básico, generando homeostasis celular. Se utilizan principalmente en rutinas de biohacking para equilibrar el excesivo caos electromagnético actual (EMFs) que estresa nuestro organismo, propiciando al mismo tiempo una relajación inmunomoduladora sumamente profunda."
  }
}

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categoryStr } = await params
  const info = CATEGORY_INFO[categoryStr]
  
  if (!info) {
    return {
      title: 'Categoría no encontrada | NeuroAudio',
    }
  }

  return {
    title: `${info.title} | NeuroAudio | BioHack Lab 3.0`,
    description: `Tracks de biopotenciación auditiva enfocados en ${info.title}. ${info.subtitle}.`,
  }
}

export default async function NeuroAudioCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const info = CATEGORY_INFO[category]

  if (!info) {
    notFound()
  }

  // Fetch from sanity
  const tracks = await sanityFetch<SanityNeuroAudio[]>(
    neuroAudioByCategoryQuery,
    { category }
  )

  // Extract YouTube Thumbnail fallback if no coverImage
  function getYoutubeThumbnail(url: string) {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/)
    return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg` : null
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="flex flex-col pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 w-full">
        {/* Navigation / Header */}
        <Link 
          href="/neuroaudio"
          className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a Categorías
        </Link>
        
        <div className="mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <Headphones className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-medium text-primary">Categoría NeuroAudio</span>
          </span>
          <h1 className="mb-4 font-mono text-4xl md:text-5xl font-bold text-foreground">
            {info.title}
          </h1>
          <p className="mb-6 max-w-3xl text-xl text-foreground font-medium text-pretty">
            {info.subtitle}.
          </p>
          <div className="max-w-4xl rounded-2xl bg-secondary/30 p-6 md:p-8 backdrop-blur-sm border border-border/40">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
              {info.seoContent}
            </p>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.length > 0 ? (
            tracks.map((track) => {
              const thumbnail = track.coverImage || getYoutubeThumbnail(track.youtubeUrl) || '/images/placeholders/blog-1.jpg'
              
              return (
                <Link key={track._id} href={`/neuroaudio/${category}/${track.slug.current}`}>
                  <Card className="group h-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card">
                    <div className="relative aspect-video w-full overflow-hidden border-b border-border/50">
                      <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:bg-black/10" />
                      
                      {/* Play overlay icon */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 transition-all duration-300 scale-90 group-hover:opacity-100 group-hover:scale-100">
                        <PlayCircle className="h-16 w-16 text-white drop-shadow-md" />
                      </div>

                      <img 
                        src={thumbnail}
                        alt={track.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {track.tags?.slice(0, 3).map((tag, i) => (
                           <span key={i} className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-secondary-foreground">
                             #{tag}
                           </span>
                        ))}
                      </div>
                      
                      <h3 className="mb-3 font-mono text-lg font-bold text-foreground transition-colors group-hover:text-primary leading-tight text-balance">
                        {track.title}
                      </h3>
                      
                      {track.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {track.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full py-16 text-left border-t border-border/50">
              <p className="text-lg text-muted-foreground font-mono">
                [ ] Sistema en espera. Aún no se han cargado tracks para esta categoría en Sanity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </main>
  )
}
