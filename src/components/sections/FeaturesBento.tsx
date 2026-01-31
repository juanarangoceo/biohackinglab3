"use client";

import { Brain, Moon, Hourglass, Zap, Thermometer, Watch, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    title: "Nootr\u00f3picos",
    description: "Potencia tu arquitectura cognitiva. Memoria, enfoque y velocidad de procesamiento.",
    icon: Brain,
    className: "md:col-span-2",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    title: "Optimizaci\u00f3n del Sue\u00f1o",
    description: "Reparaci\u00f3n profunda a nivel celular. Domina tus ritmos circadianos.",
    icon: Moon,
    className: "md:col-span-1",
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
  },
  {
    title: "Longevidad",
    description: "Protocolos para desacelerar el reloj biol\u00f3gico y extender la vitalid.",
    icon: Hourglass,
    className: "md:col-span-1",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    title: "Ayuno Intermitente",
    description: "Flexibilidad metab\u00f3lica y autofagia. El poder de la restricci\u00f3n.",
    icon: Zap,
    className: "md:col-span-2",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    title: "Hormesis (Fr\u00edo/Calor)",
    description: "Resiliencia a trav\u00e9s de estresores controlados. Saunas y ba\u00f1os de hielo.",
    icon: Thermometer,
    className: "md:col-span-1",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20",
  },
  {
    title: "Quantified Self",
    description: "Tracking de biomarcadores y HRV.",
    icon: Watch,
    className: "md:col-span-1",
    color: "text-orange-500",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "An\u00e1lisis de Datos",
    description: "Toma decisiones basadas en tu propia biolog\u00eda.",
    icon: Activity,
    className: "md:col-span-1",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function FeaturesBento() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display"
          >
            Sistemas de <span className="text-primary">Optimizaci\u00f3n</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Explora los pilares fundamentales para reprogramar tu biolog\u00eda y alcanzar el m\u00e1ximo potencial humano.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]",
                feature.className,
                feature.bg
              )}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-4">
                  <div className={cn("inline-flex p-3 rounded-lg bg-background/50 backdrop-blur-md mb-4", feature.color)}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                
                {/* Visual accent only visible on hover (concept) */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Background Glow Effect */}
              <div
                className={cn(
                  "absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity",
                  feature.color.replace("text-", "bg-")
                )}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
