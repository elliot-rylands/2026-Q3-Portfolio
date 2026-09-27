import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { PostList } from "@/components/PostList";
import { SiteFooter } from "@/components/SiteFooter";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

const intro = "Notes on designing, building and shipping, mostly written straight after the thing that prompted them.";

export const metadata: Metadata = {
  title: `Words · ${site.name}`,
  description: intro,
  alternates: { canonical: "/words" },
};

export default function WordsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Words by ${site.name}`,
    url: `${site.url}/words`,
    author: { "@type": "Person", name: site.name, url: site.url },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.dek,
      datePublished: p.date,
      url: `${site.url}/words/${p.slug}`,
    })),
  };

  return (
    <main className="page">
      <PageNav />

      <header className="post-header prose">
        <h1 className="lead" data-animate style={{ "--stagger": 1 } as React.CSSProperties}>
          Words
        </h1>
        <p data-animate style={{ "--stagger": 2 } as React.CSSProperties}>
          {intro}
        </p>
      </header>

      <div className="prose" data-animate style={{ "--stagger": 3 } as React.CSSProperties}>
        <div className="label-row">
          <h2 className="label">All posts</h2>
          <span className="label-aside">{posts.length} so far</span>
        </div>
        {posts.length === 0 ? (
          <p className="low">Nothing yet. The first post is being written.</p>
        ) : (
          <PostList posts={posts} withDek />
        )}
      </div>

      <SiteFooter stagger={4} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
