import React, { ComponentPropsWithoutRef } from "react";
import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createHeading } from "@/components/mdx/heading";
import { CodeBlock } from "@/components/mdx/code-block";
import remarkFootnotes from "remark-footnotes";
import { MarkdownAlert, Highlight } from "@/components/mdx/markdown-alert";
import { LeetCodeLink } from "@/components/mdx/leetcode-link";

import { cn } from "@/lib/utils";

import styles from "@/styles/md.module.css";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className={styles.code} {...props} />
  ),
  pre: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <CodeBlock className={cn(styles.pre)} {...props} />
  ),
  Table,
  MarkdownAlert,
  Highlight,
  LeetCodeLink,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...props.components }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkFootnotes],
          rehypePlugins: [
            [
              rehypeShiki,
              {
                themes: {
                  light: "github-light",
                  dark: "github-dark",
                },
                addLanguageClass: true,
                defaultColor: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
