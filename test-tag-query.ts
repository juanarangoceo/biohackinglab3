import { sanityClient } from './src/lib/sanity/client'

async function run() {
  try {
    const slug = 'biohacking-ambiental';
    
    console.log(`Testing GROQ queries for slug: ${slug} ...`);

    const TAG_QUERY = `
      *[_type == "tag" && slug.current == $slug][0] {
        title,
        content,
        aiGenerated
      }
    `
    console.log("-> Running TAG_QUERY")
    const tagData = await sanityClient.fetch(TAG_QUERY, { slug });
    console.log(tagData);

    const TAG_POSTS_QUERY = `
      *[_type == "post" && $slug in tags[]->slug.current] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        "tags": tags[]->{title, "slug": slug.current}
      }
    `;
    console.log("-> Running TAG_POSTS_QUERY")
    const postsData = await sanityClient.fetch(TAG_POSTS_QUERY, { slug });
    console.log(`Found ${postsData?.length || 0} posts.`);
    // console.dir(postsData, {depth: null});

  } catch (error) {
    console.error("Test failed:", error);
  }
}

run();
