import { getBlogPosts } from "@/lib/api/blog";
import { PostsClient } from "@/components/posts-client";
import { createClient } from "@/lib/supabase";

async function getPostsWithViews() {
  const allBlogs = getBlogPosts();
  const supabase = createClient();

  // Get views for all posts in a single query
  const { data: viewsData, error } = await supabase
    .from("page_views")
    .select("page, views");

  if (error) {
    console.error("Error fetching views:", error);
  }

  // Create a map of views by slug for easier lookup
  const viewsMap = new Map();
  if (viewsData) {
    viewsData.forEach((item) => {
      // Remove leading slash from page path to match slug
      const slug = item.page.startsWith("/") ? item.page.slice(1) : item.page;
      viewsMap.set(slug, item.views);
    });
  }

  // Transform the blog posts to match the expected format
  const transformedPosts = allBlogs.map((post) => {
    const views = viewsMap.get(post.slug) || 0;
    return {
      ...post,
      id: post.slug,
      date: post.metadata.publishedAt,
      title: post.metadata.title,
      views,
      viewsFormatted: views.toLocaleString("en-US"),
    };
  });

  return transformedPosts;
}

export async function BlogPosts() {
  const transformedPosts = await getPostsWithViews();
  return <PostsClient posts={transformedPosts} />;
}
