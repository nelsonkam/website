import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const prevUrl = currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`;
  const nextUrl = `${basePath}?page=${currentPage + 1}`;

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        {hasPrev && (
          <Link href={prevUrl} className="button inline prev">
            ← Newer posts
          </Link>
        )}
        {hasPrev && hasNext && <span> :: </span>}
        {hasNext && (
          <Link href={nextUrl} className="button inline next">
            Older posts →
          </Link>
        )}
      </div>
    </div>
  );
}
