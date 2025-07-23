import { getBlogPosts } from "@/lib/api/blog";
import { PostsClient } from "@/components/posts-client";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  // Transform the blog posts to match the expected format
  const transformedPosts = allBlogs.map((post) => ({
    ...post,
    id: post.slug,
    date: post.metadata.publishedAt,
    title: post.metadata.title,
    views: 0, // Default views count
    viewsFormatted: "0",
  }));

  return <PostsClient posts={transformedPosts} />;
}
