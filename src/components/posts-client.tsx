"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { FadeDown, FadeInLi } from "@/components/animations";
import { Post } from "@/types/post";

type SortSetting = ["date", "desc" | "asc"];

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

  return (
    <div className="max-w-2xl m-auto mb-10 text-sm font-mono">
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
        </header>
      </FadeDown>

      <List posts={initialPosts} sort={sort} />
    </div>
  );
}

function List({ posts, sort }: { posts: Post[]; sort: SortSetting }) {
  // sort can be ["date", "desc"] or ["date", "asc"]
  const sortedPosts = useMemo(() => {
    const [, sortDirection] = sort;
    return [...posts].sort((a, b) => {
      return sortDirection === "desc"
        ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post, i: number) => {
        const postDate = post.publishedAt;
        const year = getYear(postDate);
        const firstOfYear =
          !sortedPosts[i - 1] ||
          getYear(sortedPosts[i - 1].publishedAt) !== year;
        const lastOfYear =
          !sortedPosts[i + 1] ||
          getYear(sortedPosts[i + 1].publishedAt) !== year;

        return (
          <FadeInLi
            key={post.slug}
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
                  >
                    <Balancer>{post.title}</Balancer>
                  </span>
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
