import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { subscribers, posts, apps } from "@/db/schema";
import { z } from "zod";

// --- Subscribers Validations ---
export const insertSubscriberSchema = createInsertSchema(subscribers, {
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["active", "unsubscribed"]).optional(),
});
export const selectSubscriberSchema = createSelectSchema(subscribers);
export type NewSubscriber = z.infer<typeof insertSubscriberSchema>;


// --- Posts Validations ---
export const insertPostSchema = createInsertSchema(posts, {
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  category: z.enum(["Nootropics", "Sleep", "Longevity", "Fasting", "Light_Cold", "Wearables", "HRV", "Other"]),
  seoTags: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
  }).optional()
});
export const selectPostSchema = createSelectSchema(posts);
export type NewPost = z.infer<typeof insertPostSchema>;


// --- Apps Validations ---
export const insertAppSchema = createInsertSchema(apps, {
  name: z.string().min(2),
  url: z.string().url(),
  pricingType: z.enum(["Free", "Freemium", "Paid"]),
  rating: z.number().min(0).max(5).optional(),
});
export const selectAppSchema = createSelectSchema(apps);
export type NewApp = z.infer<typeof insertAppSchema>;
