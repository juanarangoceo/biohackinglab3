import { db } from '../src/db'
import { posts } from '../src/db/schema'

async function deleteAllPosts() {
  console.log('🗑️  Deleting all posts from Supabase...')
  
  try {
    const result = await db.delete(posts)
    
    console.log('✅ Successfully deleted all posts from Supabase')
    console.log('📊 Result:', result)
    
    // Verify deletion
    const remaining = await db.select().from(posts)
    console.log(`📝 Remaining posts: ${remaining.length}`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error deleting posts:', error)
    process.exit(1)
  }
}

deleteAllPosts()
