import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { PhotoGrid } from "@/components/photography/PhotoGrid";
import { SiteFooter } from "@/components/SiteFooter";
import { photographyIntro, photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Photography · ${site.name}`,
  description: photographyIntro,
  alternates: { canonical: "/photography" },
  openGraph: { title: `Photography · ${site.name}`, description: photographyIntro, url: "/photography", type: "website" },
};

export default function PhotographyPage() {
  return (
    <main className="page page-wide">
      <PageNav />

      <header className="post-header prose">
        <h1 className="lead" data-animate style={{ "--stagger": 1 } as React.CSSProperties}>
          Photography
        </h1>
        <p data-animate style={{ "--stagger": 2 } as React.CSSProperties}>
          {photographyIntro}
        </p>
      </header>

      <div data-animate style={{ "--stagger": 3 } as React.CSSProperties}>
        <PhotoGrid photos={photos} />
      </div>

      <SiteFooter stagger={4} />
    </main>
  );
}
