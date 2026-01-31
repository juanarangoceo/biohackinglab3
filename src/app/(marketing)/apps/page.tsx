import { Suspense } from "react";
import { type Metadata } from "next";
import { db } from "@/db";
import { apps } from "@/db/schema";
import { AppCard } from "@/components/features/apps/AppCard";
import { Skeleton } from "@/components/ui/skeleton";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Apps Directory | Biohacking Lab 3.0",
  description: "Curated list of the best applications for sleep tracking, meditation, and cognitive enhancement.",
};

// 1. Fetching Component
async function AppsGrid() {
  // Simulate delay to show skeleton if needed, or remove for production
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const allApps = await db.select().from(apps).orderBy(desc(apps.createdAt));

  if (allApps.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/20">
        <h3 className="text-2xl font-bold mb-2">No Apps Found</h3>
        <p className="text-muted-foreground">The lab is currently analyzing the best tools. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allApps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

// 2. Loading State
function AppsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[300px] rounded-lg border border-border bg-card/20 animate-pulse p-6 space-y-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-full mt-auto" />
                </div>
            ))}
        </div>
    )
}

// 3. Main Page Assembly
export default function AppsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Biohacking Tools
        </h1>
        <p className="text-lg text-muted-foreground">
            A curated directory of software, apps, and utilities to optimize your physiology.
        </p>
      </div>

      <Suspense fallback={<AppsSkeleton />}>
        <AppsGrid />
      </Suspense>
    </div>
  );
}
