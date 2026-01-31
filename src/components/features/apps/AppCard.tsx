import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { type NewApp } from "@/lib/validations";

// We can extend NewApp to include ID if needed, but for display NewApp layout is fine if strict
interface AppCardProps {
  app: {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    pricingType: string;
    rating: number | null;
  }
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl mb-2">{app.name}</CardTitle>
                <Badge variant="secondary" className="mb-2">{app.category}</Badge>
            </div>
            {app.rating && app.rating > 0 && (
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{app.rating}</span>
                </div>
            )}
        </div>
        <CardDescription className="line-clamp-3">{app.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">{app.pricingType}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={app.url} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button variant="ghost" className="w-full group">
                Visit Website
                <ExternalLink className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
