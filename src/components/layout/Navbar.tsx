"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, LogIn, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketingNav } from "@/config/nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-full border border-primary/20 group-hover:bg-primary/30 transition-colors">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">
            Biohacking<span className="text-primary">Lab</span> 3.0
          </span>
        </Link>

      {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {marketingNav.map((link) => (
            link.children ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none">
                  {link.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {link.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href} className="w-full cursor-pointer">
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex gap-4">
             <Link href="/login">
                <Button variant="ghost" size="sm">
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button variant="premium" size="sm" shape="pill" className="group">
                    Join the Lab
                    <LogIn className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                </Button>
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 max-h-[85vh] overflow-y-auto shadow-xl">
          {marketingNav.map((link) => (
            link.children ? (
              <div key={link.name} className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1 mt-2">
                  {link.name}
                </div>
                {link.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className="text-lg font-medium text-foreground hover:text-primary pl-4 border-l-2 border-border hover:border-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
           <div className="flex flex-col gap-2 mt-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full">Join the Lab</Button>
                </Link>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
