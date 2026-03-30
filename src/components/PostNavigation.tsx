import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostNavigationProps {
  prev?: PostMeta;
  next?: PostMeta;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="pagination">
      <div className="pagination__title">
        <span className="pagination__title-h">Read other posts</span>
        <hr />
      </div>
      <div className="pagination__buttons">
        {prev && (
          <Link href={`/posts/${prev.slug}`} className="button inline prev">
            ← {prev.title}
          </Link>
        )}
        {prev && next && <span> :: </span>}
        {next && (
          <Link href={`/posts/${next.slug}`} className="button inline next">
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
