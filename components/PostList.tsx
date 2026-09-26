import Link from "next/link";
import type { Post } from "@/lib/posts";

// Words list: titles only, separated by hairlines.
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/words/${post.slug}`} className="post-row">
            <span className="post-title">{post.title}</span>
            <svg className="post-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 3.5l4.5 4.5L6 12.5" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
