import Hero from "@/components/sections/Hero";
import { FeaturesBento } from "@/components/sections/FeaturesBento";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Spacer for Future Sections */}
      <FeaturesBento />
      
      <div className="py-20 text-center text-muted-foreground bg-white/5">
        <p>[Newsletter Capture Placeholder]</p>
      </div>
    </div>
  );
}
