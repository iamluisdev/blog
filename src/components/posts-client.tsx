"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { ViewCounter } from "@/components/view-counter";
import Balancer from "react-wrap-balancer";
import { HoverPop, FadeDown, FadeInLi } from "@/components/animations";

type SortSetting = ["date" | "views", "desc" | "asc"];

interface Post {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
  };
  id?: string;
  date?: string;
  title?: string;
  views?: number;
  viewsFormatted?: string;
}

interface PostsProps {
  posts: Post[];
}

export function PostsClient({ posts: initialPosts }: PostsProps) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);

  function sortDate() {
    setSort((sort) => [
      "date",
      sort[0] !== "date" || sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  function sortViews() {
    setSort((sort) => [
      sort[0] === "views" && sort[1] === "asc" ? "date" : "views",
      sort[0] !== "views" ? "desc" : sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <main className="max-w-2xl m-auto mb-10 text-sm font-mono">
      <FadeDown delay={0.3 * 3}>
        <header className="text-neutral-500 dark:text-neutral-600 flex items-center text-xs">
          <button
            onClick={sortDate}
            className={`w-12 h-9 text-left cursor-pointer ${
              sort[0] === "date" && sort[1] !== "desc"
                ? "text-neutral-700 dark:text-neutral-400"
                : ""
            }`}
          >
            date
            {sort[0] === "date" && sort[1] === "asc" && "↑"}
          </button>
          <span className="grow pl-2">title</span>
          <button
            onClick={sortViews}
            className={`
              h-9
                  pl-4
                  cursor-pointer
                  ${
                    sort[0] === "views"
                      ? "text-neutral-700 dark:text-neutral-400"
                      : ""
                  }
                `}
          >
            views
            {sort[0] === "views" ? (sort[1] === "asc" ? "↑" : "↓") : ""}
          </button>
        </header>
      </FadeDown>

      <Suspense fallback={null}>
        <List posts={initialPosts} sort={sort} />
      </Suspense>
    </main>
  );
}

function List({ posts, sort }: { posts: Post[]; sort: SortSetting }) {
  // sort can be ["date", "desc"] or ["views", "desc"] for example
  const sortedPosts = useMemo(() => {
    const [sortKey, sortDirection] = sort;
    return [...posts].sort((a, b) => {
      if (sortKey === "date") {
        return sortDirection === "desc"
          ? new Date(b.date || b.metadata.publishedAt).getTime() -
              new Date(a.date || a.metadata.publishedAt).getTime()
          : new Date(a.date || a.metadata.publishedAt).getTime() -
              new Date(b.date || b.metadata.publishedAt).getTime();
      } else {
        return sortDirection === "desc"
          ? (b.views || 0) - (a.views || 0)
          : (a.views || 0) - (b.views || 0);
      }
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post, i: number) => {
        const postDate = post.date || post.metadata.publishedAt;
        const year = getYear(postDate);
        const firstOfYear =
          !sortedPosts[i - 1] ||
          getYear(
            sortedPosts[i - 1].date || sortedPosts[i - 1].metadata.publishedAt,
          ) !== year;
        const lastOfYear =
          !sortedPosts[i + 1] ||
          getYear(
            sortedPosts[i + 1].date || sortedPosts[i + 1].metadata.publishedAt,
          ) !== year;

        return (
          <FadeInLi
            key={post.id || post.slug}
            delay={i * 0.1}
            divKey={post.slug}
          >
            <Link href={`/${post.slug}`}>
              <span
                className={`flex transition-[background-color] hover:bg-neutral-100 dark:hover:bg-[#242424] active:bg-neutral-200 dark:active:bg-[#222] border-y border-neutral-200 dark:border-[#313131]
                    ${!firstOfYear ? "border-t-0" : ""}
                    ${lastOfYear ? "border-b-0" : ""}
                  `}
              >
                <span
                  className={`py-3 flex grow items-center ${
                    !firstOfYear ? "ml-14" : ""
                  }`}
                >
                  {firstOfYear && (
                    <span className="w-14 inline-block self-start shrink-0 text-neutral-600 dark:text-neutral-400">
                      {year}
                    </span>
                  )}

                  <span
                    className="grow text-neutral-800 dark:text-neutral-100"
                    style={{
                      wordBreak: "break-word",
                      marginRight: "1rem",
                    }}
                  >
                    <Balancer>{post.metadata.title}</Balancer>
                  </span>
                  <Suspense fallback={<div className="text-xs">...</div>}>
                    <ViewCounter
                      slug={post.slug}
                      trackView={false}
                      displayViews={false}
                      className="text-neutral-600 dark:text-neutral-400 text-xs mr-1 tabular-nums"
                    />
                  </Suspense>
                </span>
              </span>
            </Link>
          </FadeInLi>
        );
      })}
    </ul>
  );
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}
