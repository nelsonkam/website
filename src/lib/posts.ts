import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import readingTime from "reading-time";
import { terminalTheme } from "./terminal-theme";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  series?: string;
  description?: string;
  tags?: string[];
  cover?: string;
  toc?: boolean;
  readingTime: string;
  wordCount: number;
}

export interface Post extends PostMeta {
  content: string;
  htmlContent: string;
}

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

function parsePostFile(fileName: string): PostMeta & { content: string } {
  const slug = fileName.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    series: data.author,
    description: data.description,
    tags: data.tags,
    cover: data.cover,
    toc: data.toc ?? false,
    readingTime: stats.text,
    wordCount: stats.words,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostFiles()
    .map((file) => {
      const { content: _, ...meta } = parsePostFile(file);
      return meta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["hanchor"], ariaLabel: "Anchor" },
      content: {
        type: "text",
        value: "#",
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(rehypePrettyCode, {
      theme: terminalTheme as any,
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fileName = `${slug}.md`;
  const parsed = parsePostFile(fileName);
  const htmlContent = await renderMarkdown(parsed.content);

  return {
    ...parsed,
    htmlContent,
  };
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}

export function getAdjacentPosts(slug: string): {
  prev?: PostMeta;
  next?: PostMeta;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? posts[index - 1] : undefined,
    next: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
