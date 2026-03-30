import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post on-list">
      <h2 className="post-title">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="post-meta">
        <span className="post-date">{formatDate(post.date)}</span>
        {post.series && <span className="post-author">{post.series}</span>}
      </div>
      {post.tags && post.tags.length > 0 && (
        <span className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag}>
              #<Link href={`/tags/${tag}`}>{tag}</Link>
              &nbsp;
            </span>
          ))}
        </span>
      )}
      {post.description && (
        <div className="post-content">
          <p>{post.description}</p>
        </div>
      )}
      <div>
        <Link className="read-more" href={`/posts/${post.slug}`}>
          Read more →
        </Link>
      </div>
    </article>
  );
}
