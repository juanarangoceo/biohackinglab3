import Link from "next/link";
import { Zap, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/20 p-2 rounded-full border border-primary/20">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight font-display">
                Biohacking<span className="text-primary">Lab</span> 3.0
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Optimizing human biology through science, technology, and data.
              Decode your potential.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-start-3">
             <h4 className="font-bold mb-4 font-display">Explore</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/apps" className="hover:text-primary transition-colors">Apps Directory</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
             </ul>
          </div>

          <div className="md:col-start-4">
             <h4 className="font-bold mb-4 font-display">Legal</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
             </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-muted-foreground">© 2026 Biohacking Lab 3.0. All rights reserved.</p>
             <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-4 h-4" /></Link>
             </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
