import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import PostContent from "@/components/PostContent";
import PostNavigation from "@/components/PostNavigation";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);
  const toc = post.toc ? extractToc(post.htmlContent) : [];

  return (
    <article className="post">
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        <span className="post-date">{formatDate(post.date)}</span>
        {post.series && <span className="post-author">{post.series}</span>}
        <span>{post.readingTime}</span>
        <span>{post.wordCount} words</span>
      </div>
      {post.tags && post.tags.length > 0 && (
        <span className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag}>
              #<Link href={`/tags/${tag}`}>{tag}</Link>&nbsp;
            </span>
          ))}
        </span>
      )}
      {post.cover && (
        <div className="post-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} />
        </div>
      )}
      {toc.length > 0 && (
        <div className="table-of-contents">
          <h2>Table of Contents</h2>
          <nav>
            <ul>
              {toc.map((item) => (
                <li
                  key={item.id}
                  style={{ marginLeft: `${(item.level - 2) * 2}ch` }}
                >
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <PostContent html={post.htmlContent} />
      <PostNavigation prev={prev} next={next} />
    </article>
  );
}
