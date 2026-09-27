import Image from "next/image";
import Link from "next/link";
import { PostList } from "@/components/PostList";
import { SiteFooter } from "@/components/SiteFooter";
import { posts } from "@/lib/posts";
import { clients, projects, site } from "@/lib/site";

function LockIcon() {
  return (
    <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="page">
      <article>
        <div className="prose">
          <h1 data-animate className="avatar-heading">
            <Image src="/elliot.png" alt="" width={64} height={64} priority className="avatar" />
            <span className="sr-only">{site.name}</span>
          </h1>
          <p className="lead" data-animate style={{ "--stagger": 1 } as React.CSSProperties}>
            {site.intro}
          </p>
          <p data-animate style={{ "--stagger": 2 } as React.CSSProperties}>
            {site.current.before}
            <a href={site.current.link.href} target="_blank" rel="noopener">
              {site.current.link.label}
            </a>
            {site.current.after}
          </p>
        </div>

        <div className="prose section" data-animate style={{ "--stagger": 3 } as React.CSSProperties}>
          <div className="label-row">
            <h2 className="label">Previously</h2>
            <span className="label-aside">Case studies coming soon</span>
          </div>
        </div>

        <div className="grid-wrap" data-animate style={{ "--stagger": 4 } as React.CSSProperties}>
          <div className="grid6">
            {projects.map((p) => (
              <div className="item" key={p.slug}>
                <div className="item-title">
                  <a href={p.url} target="_blank" rel="noopener">
                    {p.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <Link
                    href={`/work/${p.slug}`}
                    className="lock-link"
                    aria-label={`${p.title} case study${p.locked ? ", password protected" : ""}`}
                    title="Read the case study"
                  >
                    <LockIcon />
                  </Link>
                </div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="note" data-animate style={{ "--stagger": 4 } as React.CSSProperties}>
          <p>
            Also worked with{" "}
            {clients.map((c, i) => (
              <span key={c.name}>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
                {i < clients.length - 2 ? ", " : i === clients.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>
          <p>
            Case studies are password protected. <a href={site.links.email}>Email me</a> for access.
          </p>
        </div>

        <div className="prose section" data-animate style={{ "--stagger": 5 } as React.CSSProperties}>
          <div className="label-row">
            <h2 className="label" id="words">Words</h2>
            <Link href="/words" className="label-link">All words</Link>
          </div>
          {posts.length === 0 ? (
            <p className="low">Nothing yet. The first post is being written.</p>
          ) : (
            <PostList posts={posts} />
          )}
        </div>

        <div className="prose section" data-animate style={{ "--stagger": 6 } as React.CSSProperties}>
          <div className="label-row">
            <h2 className="label">About</h2>
          </div>
          {site.about.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <div className="prose section" data-animate style={{ "--stagger": 7 } as React.CSSProperties}>
          <div className="label-row">
            <h2 className="label">Connect</h2>
          </div>
          <p>
            Find me on <a href={site.links.linkedin}>LinkedIn</a>, <a href={site.links.github}>GitHub</a> and{" "}
            <a href={site.links.dribbble}>Dribbble</a>, or by <a href={site.links.email}>email</a>.
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
