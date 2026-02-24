import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { topics } from "@/config/topics"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryTitle(slug: string): string {
  if (!slug) return '';
  const topic = topics.find(t => t.slug === slug);
  return topic ? topic.title : slug;
}
