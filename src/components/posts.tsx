import { getBlogPosts } from "@/lib/api/blog";
import { PostsClient } from "@/components/posts-client";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return <PostsClient posts={allBlogs} />;
}
