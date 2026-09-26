import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasAccess } from "@/lib/access";
import { projects, site } from "@/lib/site";
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

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  // The check happens on the server: without access, no case study content is sent.
  const unlocked = !project.locked || (await hasAccess());

  return (
    <main className="page">
      <p className="back">
        <Link href="/">{site.name}</Link>
      </p>

      <h1>{project.title}</h1>
      <p className="dim">{project.summary}</p>

      {unlocked ? (
        <section className="case">
          {/* Case study content goes here, written with the case-study-builder skill. */}
          <p className="low">Case study in progress.</p>
        </section>
      ) : (
        <section className="case">
          <p>This case study is password protected. Enter the password I sent you, or email me for access.</p>
          <UnlockForm next={`/work/${project.slug}`} />
        </section>
      )}
    </main>
  );
}
