import { pgTable, uuid, varchar, text, timestamp, jsonb, real, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// --- Enums ---
// Implementation note: We use varchar for enums to keep it flexible/easy to migrate, 
// but enforced via Zod at the application level.

// --- Subscribers ---
export const subscribers = pgTable("subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  source: varchar("source", { length: 100 }).default("website"),
  tags: jsonb("tags").$type<string[]>().default([]),
  status: varchar("status", { length: 50 }).default("active"), // active, unsubscribed
});

// --- Blog Posts ---
// Note: Even if using MDX later, having this table allows for dynamic/hybrid approaches
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"), // Markdown/MDX content or Portable Text JSON
  coverImage: varchar("cover_image", { length: 255 }),
  publishedAt: timestamp("published_at"), // If null, it's a draft
  category: varchar("category", { length: 50 }).notNull(), // Nootropics, Sleep, etc.
  sanityId: varchar("sanity_id", { length: 255 }).unique(), // Link to Sanity CMS document
  aiGenerated: boolean("ai_generated").default(false).notNull(), // Track AI-generated content
  faq: jsonb("faq").$type<Array<{ question: string; answer: string }>>(), // FAQ section for SEO
  seoTags: jsonb("seo_tags").$type<{ title: string; description: string; keywords: string[] }>().default({ title: "", description: "", keywords: [] }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Apps Directory ---
export const apps = pgTable("apps", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  iconUrl: varchar("icon_url", { length: 255 }),
  category: varchar("category", { length: 50 }).notNull(), // Tracking, Meditation, etc.
  pricingType: varchar("pricing_type", { length: 50 }).notNull(), // Free, Freemium, Paid
  rating: real("rating").default(0),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
