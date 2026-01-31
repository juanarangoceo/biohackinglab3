"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import { dashboardNav } from "@/config/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardMobileNav() {
    const pathname = usePathname();
    return (
        <header className="flex h-14 items-center gap-4 lg:hidden px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col gap-4 mt-8">
                        <Link href="/" className="flex items-center gap-2 mb-8 px-2">
                             <div className="bg-primary/20 p-2 rounded-full border border-primary/20">
                                <Zap className="w-5 h-5 text-primary" />
                             </div>
                             <span className="text-xl font-bold font-display">BiohackingLab</span>
                        </Link>
                         {dashboardNav.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 text-lg font-medium p-2 rounded-md transition-colors hover:text-primary",
                                     pathname === item.href ? "bg-accent/50 text-primary" : "text-muted-foreground"
                                )}
                                >
                                <Icon className="mr-2 h-5 w-5" />
                                {item.title}
                                </Link>
                            );
                            })}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                 <span className="font-semibold">Dashboard</span>
            </div>
        </header>
    );
}
