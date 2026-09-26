import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/CopyLink";
import { PostBody } from "@/components/PostBody";
import { formatDate, getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} · ${site.name}`,
    description: post.dek,
    openGraph: { title: post.title, description: post.dek, type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <main className="page post">
      <nav className="post-nav" data-animate>
        <Link href="/#words" className="round-btn" aria-label="Back to home">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6.5 4L3 7.5 6.5 11" />
            <path d="M3.5 7.5h6a3.5 3.5 0 0 1 3.5 3.5v1" />
          </svg>
        </Link>
        <CopyLink />
      </nav>

      <article>
        <header className="post-header" data-animate style={{ "--stagger": 1 } as React.CSSProperties}>
          <h1>{post.title}</h1>
          <p className="post-meta">
            <time dateTime={post.date}>{formatDate(post.date, "long")}</time> · {post.readTime} min read
          </p>
        </header>

        <div data-animate style={{ "--stagger": 2 } as React.CSSProperties}>
          <PostBody blocks={post.body} />
        </div>
      </article>

      <footer className="post-footer">
        <Link href="/#words">More words</Link>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
