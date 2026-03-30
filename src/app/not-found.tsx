import Link from "next/link";

export default function NotFound() {
  return (
    <div className="post">
      <h1 className="post-title">404 -- Page not found...</h1>
      <div className="post-content">
        <p>
          <Link href="/">Back to home page →</Link>
        </p>
      </div>
    </div>
  );
}
