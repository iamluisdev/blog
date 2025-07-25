import { BlogPosts } from "@/components/posts";

export const metadata = {
  title: "Luis Barragan",
  description: "Luis Barragan's Dev Blog",
};

export default function Page() {
  return (
    <section>
      <BlogPosts />
    </section>
  );
}
