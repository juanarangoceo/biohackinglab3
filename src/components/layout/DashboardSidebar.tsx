"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { dashboardNav } from "@/config/nav";
import { Zap } from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="relative hidden h-screen w-72 flex-col border-r bg-background pt-8 md:flex">
      <div className="px-6 mb-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-full border border-primary/20 group-hover:bg-primary/30 transition-colors">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">
            Biohacking<span className="text-primary">Lab</span>
          </span>
        </Link>
      </div>

      <div className="px-4">
        {dashboardNav.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-transparent hover:underline",
                "justify-start w-full mb-1"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
