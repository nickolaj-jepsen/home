import * as fs from "fs";
import React, { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import { array, boolean, object, parse, string, withDefault } from "valibot";
import { Box } from "@/components/Box";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import rehypeRaw from "rehype-raw";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeSlug from "rehype-slug";

export async function generateStaticParams() {
  const regex = /^(?<date>\d{4}-\d{2}-\d{2})-(?<slug>.*?)\.md$/;
  const files = await fs.promises.readdir("content");
  return files
    .filter((file) => regex.test(file))
    .map((file) => {
      const match = file.match(regex);
      if (match?.groups) {
        return {
          date: match.groups.date,
          slug: match.groups.slug,
        };
      }
      return null;
    })
    .filter(Boolean); // Filter out any null values}
}

const FrontmatterSchema = object({
  title: string(),
  tags: withDefault(array(string()), []),
  published: withDefault(boolean(), false),
});

const MarkdownProcessor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml", "toml"])
  .use(remarkParseFrontmatter)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw) // reparse the dom to allow for html in markdown
  .use(rehypeSlug)
  .use(rehypeExtractToc)
  .use(rehypeReact, { createElement, Fragment });

export default async function Page({
  params,
}: {
  params: { slug: string; date: string };
}) {
  // load the mdx file from the filesystem
  // const source = await import(`../../../../content/${params.slug}/main.mdx`);
  const source = await fs.promises.readFile(
    `content/${params.date}-${params.slug}.md`,
    "utf8",
  );
  const {
    result,
    data: { toc, frontmatter },
  } = await MarkdownProcessor.process(source);
  const { title, published } = parse(FrontmatterSchema, frontmatter);

  if (!published && process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Box className={styles.header}>
        <h1>{title}</h1>
        <span className={styles.author}>
          Author:{" "}
          <a href={"/"} className={styles.authorLink}>
            <Image
              src={logo}
              height={20}
              alt={""}
              className={styles.authorImage}
            ></Image>
            Nickolaj Jepsen
          </a>
        </span>
      </Box>
      {toc?.length ? (
        <div className={styles.tocParent}>
          <Box className={styles.toc}>
            <h2>Table of contents</h2>
            <ul>
              {toc.map((lvl1) => (
                <li key={lvl1.id}>
                  <a href={`#${lvl1.id}`}>{lvl1.value}</a>
                  {lvl1.children?.length ? (
                    <ul>
                      {lvl1.children.map((lvl2) => (
                        <li key={lvl2.id}>
                          <a href={`#${lvl2.id}`}>{lvl2.value}</a>
                        </li>
                      ))}
                    </ul>
                  ) : undefined}
                </li>
              ))}
            </ul>
          </Box>
        </div>
      ) : undefined}
      <Box className={styles.body}>{result}</Box>
    </div>
  );
}
