import Image from "next/image";
import Link from "next/link";
import { Clock } from "./Clock";
import { LandAck } from "@/components/LandAck";
import { DriftingPhotos } from "@/components/DriftingPhotos";
import { photos } from "@/lib/photos";
import { clients, site } from "@/lib/site";
import s from "./soon.module.css";

// Coming soon. The portfolio is being rebuilt, so the homepage holds the
// basics and a wall of photos while case studies stay offline
// (showCaseStudies in lib/site.ts). The full homepage lives in git history
// and on the quilo-redesign branch.

const NAMES = ["Jane", "Scan.com", "Squiz", "UK Government", "Papa John's", ...clients.map((c) => c.name)];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    name: `${site.name} · Product designer and design engineer`,
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle: "Product designer and design engineer",
      description: site.intro,
      worksFor: { "@type": "Organization", name: "Jane", url: "https://jane.app" },
      homeLocation: { "@type": "Place", name: "Cochrane, Alberta, Canada" },
      sameAs: [site.links.linkedin, site.links.github, site.links.dribbble],
    },
  };

  return (
    <div className={s.soon} data-soon>
      <header className={s.top}>
        <Image src="/elliot.png" alt="" width={36} height={36} className={s.avatar} priority />
        <p className={s.badge}>
          <span className={s.dot} aria-hidden="true" />
          New portfolio coming soon
        </p>
      </header>

      <main>
        <section className={s.hero} aria-labelledby="title">
          <h1 id="title" className={s.title}>
            Elliot Rylands<span className="sr-only">,</span>
            <span className={s.role}>
              product designer <em>who builds.</em>
            </span>
          </h1>
          <p className={s.lede}>
            {site.intro} Currently designing and building at{" "}
            <a href="https://jane.app" target="_blank" rel="noopener">Jane</a>, from Cochrane, near the Canadian Rockies.
          </p>
          <p className={s.lede}>
            I&apos;m rebuilding this site, so my case studies are offline for now. Happy to walk you through them on a call.
          </p>
          <ul className={s.ctas}>
            <li><a href={site.links.email} className={s.primary}>Email me</a></li>
            <li><a href={site.links.linkedin} target="_blank" rel="noopener me">LinkedIn</a></li>
            <li><a href={site.links.dribbble} target="_blank" rel="noopener me">Dribbble</a></li>
            <li><Link href="/words">Words</Link></li>
          </ul>
          <section className={s.names} aria-labelledby="names-title">
            <h2 id="names-title" className={s.namesTitle}>Worked with</h2>
            <ul>
              {NAMES.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </section>
        </section>

        <section aria-labelledby="photos-title" className={s.photos}>
          <div className={s.photosHead}>
            <h2 id="photos-title" className={s.namesTitle}>Off the clock</h2>
            <Link href="/photography">All photos →</Link>
          </div>
          <DriftingPhotos photos={photos} />
        </section>
      </main>

      <footer className={s.foot}>
        <p>© {new Date().getFullYear()} Elliot Rylands</p>
        <LandAck />
        <Clock />
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
