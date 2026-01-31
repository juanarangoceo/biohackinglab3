CREATE TABLE "apps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"url" varchar(255) NOT NULL,
	"icon_url" varchar(255),
	"category" varchar(50) NOT NULL,
	"pricing_type" varchar(50) NOT NULL,
	"rating" real DEFAULT 0,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" text,
	"content" text,
	"cover_image" varchar(255),
	"published_at" timestamp,
	"category" varchar(50) NOT NULL,
	"author_id" uuid,
	"seo_tags" jsonb DEFAULT '{"title":"","description":"","keywords":[]}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"source" varchar(100) DEFAULT 'website',
	"tags" jsonb DEFAULT '[]'::jsonb,
	"status" varchar(50) DEFAULT 'active',
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
