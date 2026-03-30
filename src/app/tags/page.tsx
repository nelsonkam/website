import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="terms">
      <h1 className="post-title">Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link href={`/tags/${tag.name}`}>
              {tag.name} [{tag.count}]
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
