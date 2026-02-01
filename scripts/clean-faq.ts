/**
 * Migration script to remove FAQ field from existing posts
 * Run this if you're getting "Unknown field found" errors
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
})

async function removeFaqFromPosts() {
  console.log('🔍 Fetching all posts with FAQ field...')
  
  const posts = await client.fetch(`*[_type == "post" && defined(faq)]`)
  
  console.log(`📝 Found ${posts.length} posts with FAQ field`)
  
  if (posts.length === 0) {
    console.log('✅ No posts with FAQ field found. Nothing to clean.')
    return
  }
  
  for (const post of posts) {
    console.log(`🧹 Removing FAQ from post: ${post.title || post._id}`)
    
    await client
      .patch(post._id)
      .unset(['faq'])
      .commit()
  }
  
  console.log('✅ Successfully removed FAQ field from all posts')
  console.log('🔄 Now restart Sanity Studio to reload the schema')
}

removeFaqFromPosts().catch(console.error)
