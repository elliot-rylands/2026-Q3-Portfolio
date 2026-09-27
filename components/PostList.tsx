import Link from "next/link";
import type { Post } from "@/lib/posts";

// Words list: separated by hairlines, chevron on the right.
// `withDek` adds the one-line summary under each title (used on /words).
export function PostList({ posts, withDek = false }: { posts: Post[]; withDek?: boolean }) {
  return (
    <ul className={withDek ? "post-list post-list-dek" : "post-list"}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/words/${post.slug}`} className="post-row">
            <span className="post-text">
              <span className="post-title">{post.title}</span>
              {withDek ? <span className="post-dek">{post.dek}</span> : null}
            </span>
            <svg className="post-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 3.5l4.5 4.5L6 12.5" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
