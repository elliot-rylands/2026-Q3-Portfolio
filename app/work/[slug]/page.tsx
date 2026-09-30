import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageNav } from "@/components/PageNav";
import { PostBody } from "@/components/PostBody";
import { SiteFooter } from "@/components/SiteFooter";
import { hasAccess } from "@/lib/access";
import { projects, site } from "@/lib/site";
import { getStudy, type Stat } from "@/lib/work";
import { UnlockForm } from "./UnlockForm";

type Props = { params: Promise<{ slug: string }> };

// Always check the password cookie at request time; never serve a cached copy.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} · ${site.name}` : site.name,
    robots: { index: false, follow: false },
  };
}

const s = (n: number) => ({ "--stagger": n }) as React.CSSProperties;

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <dl className="case-stats">
      {stats.map((st) => (
        <div key={st.label} className="case-stat">
          <dt>{st.value}</dt>
          <dd>{st.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  // The check happens on the server: without access, no case study content is sent.
  const unlocked = !project.locked || (await hasAccess());
  const study = getStudy(slug);
  const more = projects.filter((p) => p.slug !== slug);

  return (
    <main className="page post">
      <PageNav />

      {!unlocked ? (
        <section className="prose">
          <h1 className="lead" data-animate style={s(1)}>{project.title}</h1>
          <p data-animate style={s(2)}>{project.summary}</p>
          <p data-animate style={s(3)}>
            This case study is password protected. Enter the password I sent you, or{" "}
            <a href={site.links.accessEmail}>email me</a> for access.
          </p>
          <div data-animate style={s(4)}>
            <UnlockForm next={`/work/${project.slug}`} />
          </div>
        </section>
      ) : !study ? (
        <section className="prose">
          <h1 className="lead" data-animate style={s(1)}>{project.title}</h1>
          <p data-animate style={s(2)}>{project.summary}</p>
          <p className="low" data-animate style={s(3)}>Case study in progress.</p>
        </section>
      ) : (
        <article>
          <header className="post-header prose">
            <p className="case-kicker" data-animate style={s(1)}>
              <a href={project.url} target="_blank" rel="noopener">
                {project.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
            <h1 className="lead" data-animate style={s(2)}>{study.title}</h1>
            <p data-animate style={s(3)}>{study.dek}</p>
          </header>

          <dl className="case-meta" data-animate style={s(4)}>
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>

          <div data-animate style={s(5)}>
            <Stats stats={study.work} />
          </div>

          <div className="case-body" data-animate style={s(6)}>
            <PostBody blocks={study.body} />
          </div>

          {study.scale ? (
            <section className="prose section">
              <div className="label-row">
                <h2 className="label">{study.scale.heading}</h2>
              </div>
              <Stats stats={study.scale.stats} />
              <p className="case-note">
                {study.scale.note}
                {study.sources?.length ? (
                  <>
                    {" "}Source:{" "}
                    {study.sources.map((src, i) => (
                      <span key={src.href}>
                        <a href={src.href} target="_blank" rel="noopener">{src.label}</a>
                        {i < study.sources!.length - 1 ? ", " : "."}
                      </span>
                    ))}
                  </>
                ) : null}
              </p>
            </section>
          ) : null}
        </article>
      )}

      <section className="prose section">
        <div className="label-row">
          <h2 className="label">More work</h2>
          <Link href="/" className="label-link">Home</Link>
        </div>
        <ul className="post-list post-list-dek">
          {more.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="post-row">
                <span className="post-text">
                  <span className="post-title">{p.title}</span>
                  <span className="post-dek">{p.summary}</span>
                </span>
                <svg className="post-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter stagger={8} />

      {study && unlocked ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: study.title,
              about: study.dek,
              author: { "@type": "Person", name: site.name, jobTitle: "Staff Product Designer", url: site.url },
              keywords: "0-to-1, healthcare, medical imaging, referral, booking flow, worklist, design system, design tokens, coded prototypes",
            }),
          }}
        />
      ) : null}
    </main>
  );
}
