import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/CopyLink";
import { PostBody } from "@/components/PostBody";
import { PostList } from "@/components/PostList";
import { SiteFooter } from "@/components/SiteFooter";
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

  const more = posts.filter((p) => p.slug !== post.slug);
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
        <Link href="/" className="avatar-link" aria-label={`${site.name}, back to home`}>
          <Image src="/elliot.png" alt="" width={40} height={40} className="avatar avatar-sm" />
          <span className="avatar-name">{site.name}</span>
        </Link>
        <CopyLink />
      </nav>

      <article>
        <header className="post-header prose">
          <h1 className="lead" data-animate style={{ "--stagger": 1 } as React.CSSProperties}>
            {post.title}
          </h1>
          <p data-animate style={{ "--stagger": 2 } as React.CSSProperties}>
            {post.dek}
          </p>
          <p className="post-meta" data-animate style={{ "--stagger": 3 } as React.CSSProperties}>
            <time dateTime={post.date}>{formatDate(post.date, "long")}</time> · {post.readTime} min read
          </p>
        </header>

        <div data-animate style={{ "--stagger": 4 } as React.CSSProperties}>
          <PostBody blocks={post.body} />
        </div>
      </article>

      {more.length > 0 ? (
        <div className="prose section" data-animate style={{ "--stagger": 5 } as React.CSSProperties}>
          <div className="label-row">
            <h2 className="label">More words</h2>
          </div>
          <PostList posts={more} />
        </div>
      ) : null}

      <SiteFooter stagger={6} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
