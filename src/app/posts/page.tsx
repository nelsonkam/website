import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const pageParam = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / siteConfig.postsPerPage);
  const start = (currentPage - 1) * siteConfig.postsPerPage;
  const posts = allPosts.slice(start, start + siteConfig.postsPerPage);

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/posts"
      />
    </div>
  );
}
