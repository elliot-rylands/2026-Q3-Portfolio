import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageNav } from "@/components/PageNav";
import { PostBody } from "@/components/PostBody";
import { SiteFooter } from "@/components/SiteFooter";
import { builds, getBuild } from "@/lib/building";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBuild(slug);
  if (!b) return {};
  return {
    title: `${b.name} ${b.title} · ${site.name}`,
    description: b.summary,
    openGraph: { title: b.name, description: b.summary, images: [b.cover.src] },
  };
}

const s = (n: number) => ({ "--stagger": n }) as React.CSSProperties;

export default async function BuildPage({ params }: Props) {
  const { slug } = await params;
  const b = getBuild(slug);
  if (!b) notFound();

  return (
    <main className="page post">
      <PageNav />
      <article>
        <header className="post-header prose">
          <p className="case-kicker" data-animate style={s(1)}>
            Building · {b.status}
          </p>
          <p className="build-title" data-animate style={s(2)}>
            <span className="build-mark" aria-hidden="true" />
            {b.name}
          </p>
          <h1 className="lead" data-animate style={s(3)}>{b.title}</h1>
          <p data-animate style={s(4)}>{b.dek}</p>
        </header>
        <dl className="case-meta" data-animate style={s(5)}>
          {b.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        <div data-animate style={s(5)}>
          <dl className="case-stats">
            {b.work.map((st) => (
              <div key={st.label} className="case-stat">
                <dt>{st.value}</dt>
                <dd>{st.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="case-body" data-animate style={s(6)}>
          <PostBody blocks={b.body} />
        </div>
      </article>
      <SiteFooter stagger={7} />
    </main>
  );
}
