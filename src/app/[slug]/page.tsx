import React, { Suspense } from "react";

import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/lib/api/blog";
import { BASE_URL } from "@/lib/constants";
import { ViewCounter } from "@/components/view-counter";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? image : `${BASE_URL}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${BASE_URL}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${BASE_URL}/${post.metadata.image}`
              : `/opengraph-image`,
            url: `${BASE_URL}/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="font-semibold text-2xl tracking-tighter">
        <Balancer>{post.metadata.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm flex-nowrap">
        <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 flex-shrink-0">
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-gray-800 dark:hover:text-gray-400"
            href="https://github.com/1chooo"
          >
            @1chooo
          </Link>{" "}
          {" | "}
          {formatDate(post.metadata.publishedAt)}
        </p>
        <Suspense fallback={<div className="text-xs">Loading views...</div>}>
          <ViewCounter
            className="font-mono text-xs text-neutral-600 dark:text-neutral-400 flex-shrink-0"
            slug={post.slug}
            trackView
          />
        </Suspense>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
