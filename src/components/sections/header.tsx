"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Dna, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { marketingNav } from "@/config/nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <Dna className="h-5 w-5 text-primary-foreground" />
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
              3.0
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold leading-tight tracking-tight text-foreground">
              Biohacking <span className="text-primary">Lab</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-accent">
              Optimize your biology
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {marketingNav.map((link) => (
            link.children ? (
              <DropdownMenu key={link.name} modal={false}>
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            )
          ))}
          <Button asChild>
            <Link href="#newsletter">Únete Gratis</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden shrink-0 p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6 overflow-y-auto max-h-[85vh]">
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
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button asChild className="mt-2">
              <Link href="#newsletter">Únete Gratis</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
