-- Add FAQ column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS faq JSONB;

-- Add comment
COMMENT ON COLUMN posts.faq IS 'FAQ section for SEO optimization - array of {question, answer} objects';
