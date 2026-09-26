import Image from "next/image";
import Link from "next/link";
import { posts, projects, site } from "@/lib/site";
import { Clock } from "./Clock";

function LockIcon() {
  return (
    <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="Password protected">
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
            <Image src="/elliot.png" alt="" width={56} height={56} priority className="avatar" />
            <span className="sr-only">{site.name}</span>
          </h1>
          <p data-animate style={{ "--stagger": 1 } as React.CSSProperties}>
            <em>{site.lead}</em> {site.intro}
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
          <h2 className="small">Previously</h2>
        </div>

        <div className="grid-wrap" data-animate style={{ "--stagger": 4 } as React.CSSProperties}>
          <div className="grid6">
            {projects.map((p) => (
              <div className="item" key={p.slug}>
                <div className="item-title">
                  <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  {p.locked ? <LockIcon /> : null}
                </div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="note" data-animate style={{ "--stagger": 4 } as React.CSSProperties}>
          {site.alsoLine} Case studies are password protected, <a href={site.links.email}>email me</a> for access.
        </p>

        <div className="prose section" data-animate style={{ "--stagger": 5 } as React.CSSProperties}>
          <h2 className="small">Words</h2>
          {posts.length === 0 ? (
            <p className="low">Nothing yet. The first post is being written.</p>
          ) : (
            <div className="items">
              {posts.map((post) => (
                <div className="item" key={post.slug}>
                  <div className="item-title">
                    <Link href={`/words/${post.slug}`}>{post.title}</Link>
                  </div>
                  <p>{post.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="prose section" data-animate style={{ "--stagger": 6 } as React.CSSProperties}>
          <h2>Now</h2>
          <p>
            {site.now[0]} <em>{site.nowQuote}</em>
          </p>
          <p>{site.now[1]}</p>
        </div>

        <div className="prose section" data-animate style={{ "--stagger": 7 } as React.CSSProperties}>
          <h2>Connect</h2>
          <p>
            Find me on <a href={site.links.linkedin}>LinkedIn</a>, <a href={site.links.github}>GitHub</a> and{" "}
            <a href={site.links.dribbble}>Dribbble</a>, or by <a href={site.links.email}>email</a>.
          </p>
        </div>
      </article>

      <footer data-animate style={{ "--stagger": 8 } as React.CSSProperties}>
        <span>{site.footer}</span>
        <span>{new Date().getFullYear()}</span>
        <Clock />
      </footer>
    </main>
  );
}
