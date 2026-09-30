import Image from "next/image";
import Link from "next/link";
import { PostList } from "@/components/PostList";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JaneLogo } from "@/components/JaneLogo";
import { PhotoStrip } from "@/components/photography/PhotoStrip";
import { CaseTitleLink } from "@/components/unlock/CaseTitleLink";
import { LockLink } from "@/components/unlock/LockLink";
import { UnlockDialog } from "@/components/unlock/UnlockDialog";
import { SiteFooter } from "@/components/SiteFooter";
import { photos } from "@/lib/photos";
import { posts } from "@/lib/posts";
import { clients, projects, site } from "@/lib/site";
import { getStudy } from "@/lib/work";

export default function Home() {
  return (
    <main className="page">
      <article>
        <div className="prose">
          <h1 className="avatar-heading" data-reveal>
            <Image src="/elliot.png" alt="" width={64} height={64} priority className="avatar" />
            <span className="sr-only">{site.name}</span>
          </h1>
          <p className="lead" data-reveal>
            {site.intro}
          </p>
          <p data-reveal>
            {site.current.before}
            <a href={site.current.link.href} target="_blank" rel="noopener" className="brand-link" title="Jane">
              <JaneLogo className="brand-logo" />
              <span className="sr-only">{site.current.link.label} (opens in a new tab)</span>
            </a>
            {site.current.after}
          </p>
        </div>

        <div className="prose section">
          <div className="label-row" data-reveal>
            <h2 className="label">Previously</h2>
            <span className="label-aside">More case studies coming soon</span>
          </div>
        </div>

        <div className="grid-wrap">
          <div className="grid6">
            {projects.map((p) => (
              <div className="item" key={p.slug} data-reveal>
                <div className="item-title">
                  {getStudy(p.slug) ? (
                    <CaseTitleLink slug={p.slug} title={p.title} locked={p.locked}>
                      {p.title}
                    </CaseTitleLink>
                  ) : (
                    <a href={p.url} target="_blank" rel="noopener">
                      {p.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  {p.locked ? <LockLink slug={p.slug} title={p.title} locked={p.locked} /> : null}
                </div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="note">
          <p data-reveal>
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
          <p data-reveal>
            Case studies are password protected. <a href={site.links.accessEmail}>Email me</a> for access.
          </p>
        </div>

        <div className="prose section">
          <div className="label-row" data-reveal>
            <h2 className="label" id="words">Words</h2>
            <Link href="/words" className="label-link">All words</Link>
          </div>
          {posts.length === 0 ? (
            <p className="low">Nothing yet. The first post is being written.</p>
          ) : (
            <PostList posts={posts} reveal />
          )}
        </div>

        <div className="prose section">
          <div className="label-row" data-reveal>
            <h2 className="label">About</h2>
          </div>
          {site.about.map((para) => (
            <p key={para.slice(0, 24)} data-reveal>
              {para}
            </p>
          ))}
        </div>

        <div className="prose section">
          <div className="label-row" data-reveal>
            <h2 className="label">Photography</h2>
            <Link href="/photography" className="label-link">All photos</Link>
          </div>
          <PhotoStrip photos={photos} />
        </div>

        <div className="prose section">
          <div className="label-row" data-reveal>
            <h2 className="label">Connect</h2>
          </div>
          <p data-reveal>
            Find me on <a href={site.links.linkedin} target="_blank" rel="noopener">
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>, <a href={site.links.github} target="_blank" rel="noopener">
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a> and{" "}
            <a href={site.links.dribbble} target="_blank" rel="noopener">
              Dribbble
              <span className="sr-only"> (opens in a new tab)</span>
            </a>, or by <a href={site.links.email}>email</a>.
          </p>
        </div>
      </article>

      <SiteFooter reveal />
      <ScrollReveal />
      <UnlockDialog />
    </main>
  );
}
