import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc } from "drizzle-orm"

async function checkLatestPost() {
  try {
    const latestPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(1)
    
    if (latestPosts.length === 0) {
      console.log("No posts found.")
      return
    }

    const post = latestPosts[0]
    console.log("Latest Post Title:", post.title)
    console.log("Created At:", post.createdAt)
    console.log("References Field:", JSON.stringify(post.references, null, 2))
    console.log("Is Array?", Array.isArray(post.references))
    console.log("Length:", Array.isArray(post.references) ? post.references.length : "N/A")
    
  } catch (error) {
    console.error("Error fetching post:", error)
  }
  process.exit(0)
}

checkLatestPost()
