import { site } from "@/lib/site";
import s from "./soon.module.css";

// Coming soon: a full screen that slowly changes colour. Case studies stay
// offline (showCaseStudies in lib/site.ts). The full homepage lives in git
// history and on the quilo-redesign branch.

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Product designer and design engineer",
    sameAs: [site.links.linkedin, site.links.github, site.links.dribbble],
  };

  return (
    <main className={s.screen} data-soon>
      <h1 className={s.title}>
        <span className="sr-only">Elliot Rylands: </span>
        Coming <em>soon</em>
      </h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
