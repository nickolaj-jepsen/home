import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeReact from "rehype-react";
import { array, boolean, object, string, optional, parse } from "valibot";
import fs from "fs";
import runtime from 'react/jsx-runtime'

const MarkdownProcessor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml", "toml"])
  .use(remarkParseFrontmatter)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw) // reparse the dom to allow for html in markdown
  .use(rehypeSlug)
  .use(rehypeExtractToc)
  .use(rehypeReact, runtime)

const FrontmatterSchema = object({
  title: string(),
  tags: optional(array(string()), []),
  published: optional(boolean(), false),
});

export const getBlog = async (date: string, slug: string) => {
  const source = await fs.promises.readFile(
    `content/${date}-${slug}.md`,
    "utf8",
  );

  const {
    result,
    data: { toc, frontmatter: rawFrontmatter },
  } = await MarkdownProcessor.process(source);

  const frontmatter = parse(FrontmatterSchema, rawFrontmatter);

  return { result, toc, frontmatter };
};

export const listBlogs = async () => {
  const regex = /^(?<date>\d{4}-\d{2}-\d{2})-(?<slug>.*?)\.md$/;
  const files = await fs.promises.readdir("content");

  const blogs = files
    .map((file) => {
      const match = regex.exec(file);
      if (!match?.groups) throw new Error(`Invalid file name: ${file}`);

      const { date, slug } = match.groups;
      return { date, slug };
    })
    .map(async ({ date, slug }) => {
      const { frontmatter } = await getBlog(date, slug);
      return {
        date,
        slug,
        ...frontmatter,
      };
    });

  const publishedBlogs = (await Promise.all(blogs)).filter(
    (blog) => blog.published || process.env.NODE_ENV !== "production",
  );

  return publishedBlogs.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
};
