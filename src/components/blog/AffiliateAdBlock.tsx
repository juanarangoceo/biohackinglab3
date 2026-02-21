import Image from "next/image"
import { ExternalLink } from "lucide-react"

export interface AffiliateAdProps {
  internalName?: string
  url: string
  image: {
    asset: {
      url: string
    }
  }
}

export function AffiliateAdBlock({ ad }: { ad: AffiliateAdProps | null }) {
  if (!ad || !ad.url || !ad.image?.asset?.url) return null

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <a 
        href={ad.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block relative group"
      >
        <div className="absolute top-3 left-3 z-10 rounded-full bg-background/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border">
          Recomendación
        </div>
        
        <div className="relative aspect-square w-full sm:aspect-video lg:aspect-square overflow-hidden bg-muted">
          <Image
            src={ad.image.asset.url}
            alt="Producto recomendado"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          />
        </div>
        
        <div className="flex items-center justify-between bg-primary/5 p-4 transition-colors group-hover:bg-primary/10">
          <span className="font-mono text-sm font-semibold text-foreground">
             Ver producto
          </span>
          <ExternalLink className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </a>
    </div>
  )
}
