import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Brain, Battery } from "lucide-react";
import { NewsletterForm } from "@/components/features/newsletter/NewsletterForm";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: "7s" }} />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Biohacking Lab 3.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both">
          Optimize Your Biology.<br />
          <span className="text-primary/90 bg-clip-text">Upgrade Your Life.</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-200">
          Decode your potential with science-backed protocols for sleep, longevity, and cognitive performance. Join the revolution of the quantified self.
        </p>

        {/* Newsletter Capture */}
        <div className="w-full max-w-md mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both delay-300">
             <NewsletterForm />
        </div>

        {/* Stats / Specs - High Tech Feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-t border-white/10 pt-8 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-primary">
               <Brain className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold font-display">15+</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Nootropic Stacks</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-center">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-secondary">
               <Activity className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold font-display">98%</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Protocol Success</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-end">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-accent">
               <Battery className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold font-display">24/7</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Optimal Energy</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}
