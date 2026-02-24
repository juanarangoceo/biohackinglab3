import Link from "next/link"
import { Headphones, ArrowRight, Activity, Brain, Moon, Zap } from "lucide-react"

export function NeuroAudioShowcase() {
  return (
    <section className="relative py-24 overflow-hidden bg-zinc-950 text-white">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-background to-background pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Content Block */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
              <Headphones className="h-4 w-4 text-orange-500" />
              <span className="font-mono text-sm font-medium text-orange-500 tracking-wider">Nuevo Sistema</span>
            </span>
            
            <h2 className="mb-6 font-mono text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Neuro<span className="text-orange-500">Audio</span>
            </h2>
            
            <p className="mb-8 text-lg text-zinc-400 text-pretty">
              Hackea tus ondas cerebrales mediante el sonido. Frecuencias acústicas avanzadas calibradas para forzar estados biológicos: desde concentración extrema (ondas Gamma) hasta sueño reparador profundo (ondas Delta).
            </p>

            <ul className="mb-10 space-y-4">
              {[
                { label: "Brainwave Entrainment y Resonancia", icon: Activity },
                { label: "Inducción rápida de Flow State", icon: Brain },
                { label: "Reparación celular con sueño profundo", icon: Moon },
                { label: "Binaural Beats y Frecuencias Isocrónicas", icon: Zap },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-500/10 p-1.5">
                    <item.icon className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-zinc-300 font-mono text-sm">{item.label}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/neuroaudio"
              className="group inline-flex h-12 items-center justify-center rounded-lg bg-orange-500 px-8 font-mono text-sm font-medium text-black transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-background"
            >
              Explorar Catálogo Bioacústico
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Visualization Block */}
          <div className="relative">
             <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-orange-500/20 bg-black/50 p-8 backdrop-blur-sm">
                
                {/* Simulated Audio Wave Animation */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-50 mix-blend-screen">
                   {Array.from({ length: 45 }).map((_, i) => (
                      <div 
                         key={i} 
                         className="w-1.5 bg-orange-500 rounded-full animate-pulse"
                         style={{ 
                            height: `${Math.random() * 80 + 10}%`,
                            animationDuration: `${Math.random() * 1.5 + 0.5}s`,
                            animationDelay: `${Math.random() * 1}s`
                         }} 
                      />
                   ))}
                </div>

                {/* Glass Badge Overlay */}
                <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-md">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="font-mono text-xs text-orange-500 mb-1">RECOMENDADO</p>
                         <p className="font-mono font-bold text-white text-lg">Ondas Gamma 40Hz</p>
                         <p className="text-sm text-zinc-400">Activación y Enfoque Profundo</p>
                      </div>
                      <div className="h-12 w-12 rounded-full border-2 border-orange-500 bg-orange-500/20 flex items-center justify-center">
                         <Activity className="h-5 w-5 text-orange-500" />
                      </div>
                   </div>
                </div>

             </div>
             
             {/* Glow effect behind the box */}
             <div className="absolute -inset-1 -z-10 rounded-3xl bg-orange-500/20 opacity-50 blur-2xl" />
          </div>

        </div>
      </div>
    </section>
  )
}
