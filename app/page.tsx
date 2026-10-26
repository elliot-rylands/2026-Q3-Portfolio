import Image from "next/image";
import Link from "next/link";
import { Clock } from "./Clock";
import { LandAck } from "@/components/LandAck";
import { DriftingPhotos } from "@/components/DriftingPhotos";
import { DrawnPointer } from "@/components/soon/DrawnPointer";
import { PaintedWord } from "@/components/soon/PaintedWord";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import s from "./soon.module.css";

// Coming soon, written as a letter. A hand-drawn pointer draws itself as
// you scroll down to a big painted "Say hi." that opens an email.
// Case studies stay offline (showCaseStudies in lib/site.ts); the full
// homepage lives in git history and on the quilo-redesign branch.

const EMAIL = site.links.email.replace("mailto:", "");
const MAIL = `${site.links.email}?subject=${encodeURIComponent("Hello from elliotrylands.com")}`;

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
          New site coming soon
        </p>
      </header>

      <main>
        <article className={s.letter} aria-labelledby="title">
          <h1 id="title" className={s.hello}>Hi, I&apos;m Elliot Rylands.</h1>
          <p>
            For sixteen years I&apos;ve been designing products, and more and more, building them too. Booking flows for
            patients stuck on waiting lists. A self-service hub for 29 government departments. Pizza ordering for the
            hungry and impatient. An app that tells a tennis ball machine what to do.
          </p>
          <p>
            This site used to show all of that. It&apos;s offline while I rebuild it into something that does the work
            justice, so for now it&apos;s just this letter.
          </p>
          <p>
            These days I design and build at{" "}
            <a href="https://jane.app" target="_blank" rel="noopener">Jane</a>, from Cochrane, a small town in the
            shadow of the Canadian Rockies. On weekends I build little apps with Claude and Cursor, snowboard with more
            confidence than skill, and take far too many photos.
          </p>
          <p>The new site is coming soon. I think you&apos;ll like it.</p>
          <p className={s.sign}>Elliot</p>
        </article>

        <div className={s.pointer}>
          <DrawnPointer />
        </div>

        <section className={s.cta} aria-labelledby="cta-title">
          <h2 id="cta-title" className="sr-only">Say hi</h2>
          <PaintedWord word="Say hi." href={MAIL} label={`Say hi: email ${EMAIL}`} />
          <p className={s.ctaText}>
            Want a look before then? Email <a href={MAIL}>{EMAIL}</a> and tell me what you&apos;re working on. Could be
            a role, could be a project, could be a question. Long or short, I read every one.
          </p>
          <p className={s.ps}>
            P.S. I&apos;m happy to walk you through my case studies on a call. Some of the work is under NDA, so
            it&apos;s easier to show than to publish.
          </p>
          <p className={s.ps}>
            P.P.S. Your email stays with me. No newsletters, no lists, ever. You can also find me on{" "}
            <a href={site.links.linkedin} target="_blank" rel="noopener me">LinkedIn</a> and{" "}
            <a href={site.links.dribbble} target="_blank" rel="noopener me">Dribbble</a>, or read my{" "}
            <Link href="/words">writing</Link>.
          </p>
        </section>

        <section aria-labelledby="photos-title" className={s.photos}>
          <div className={s.photosHead}>
            <h2 id="photos-title" className={s.ps}>P.P.P.S. Here&apos;s what I photograph when I&apos;m not designing.</h2>
            <Link href="/photography" className={s.allPhotos}>All photos →</Link>
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
