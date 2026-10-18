import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LandAck } from "@/components/LandAck";
import { Clock } from "./Clock";
import { JaneLogo } from "@/components/JaneLogo";
import { CaseTitleLink } from "@/components/unlock/CaseTitleLink";
import { LockLink } from "@/components/unlock/LockLink";
import { UnlockDialog } from "@/components/unlock/UnlockDialog";
import { builds } from "@/lib/building";
import { photos } from "@/lib/photos";
import { posts } from "@/lib/posts";
import { clients, janeWork, projects, site } from "@/lib/site";
import s from "./home.module.css";

// Cards for the work grid: a category, a colour from each client's world,
// and the image that best shows the product. UK Government has no image
// (product screens can't be shown), so it gets a typographic card.
const CARD: Record<string, { tag: string; bg: string; ink: string; img?: string; fit?: "cover" | "contain" }> = {
  scan: { tag: "Healthcare · 0 to 1", bg: "#0d5a43", ink: "#ffffff", img: "/work/scan/media/01-hero.webp" },
  "terr-ai": { tag: "AI agents · Proptech", bg: "#a3220f", ink: "#ffffff", img: "/work/terr-ai/media/01-dashboard.webp" },
  squiz: { tag: "B2B SaaS · Platform", bg: "#0b1c36", ink: "#e8f1ff", img: "/work/squiz/media/launchpad-hero.webp" },
  "uk-government": { tag: "Government · Self-service", bg: "#e9c24a", ink: "#0b0c0c" },
  "papa-johns": { tag: "Consumer · Ordering", bg: "#f2ead7", ink: "#1d2b22", img: "/work/papa-johns/media/hero.webp" },
  gctv: { tag: "Streaming · Sport", bg: "#121216", ink: "#f4f4f6", img: "/work/gctv/media/hero.webp" },
  "titan-tennis": { tag: "Native app · Hardware", bg: "#1a1f12", ink: "#f1f5e8", img: "/work/titan-tennis/media/drill-list.webp" },
};

const PILLARS = [
  { n: "01", title: "Design", text: "The craft first. Clear flows, honest copy and details that hold up at 2am." },
  { n: "02", title: "Build", text: "Working screens before specs. I prototype in code, on the real design tokens." },
  { n: "03", title: "AI", text: "An AI-native workflow, and products that show their work instead of guessing." },
  { n: "04", title: "People", text: "I lead by mentoring and by setting the bar, not by owning every pixel." },
];

const IMPACT = [
  { label: "Experience", value: "16", plus: true, text: "years in product and growth", tone: "clay" },
  { label: "Government", value: "29", text: "departments served by one self-service hub", tone: "paper" },
  { label: "First hire", value: "1st", text: "designer at Scan.com, on both sides of the product", tone: "forest" },
  { label: "Shipped", value: "7", text: "case studies, from healthcare to sport", tone: "ink" },
];

export default function Home() {
  const work = projects.filter((p) => !p.current);
  const jane = projects.find((p) => p.current);
  const pebbl = builds[0];
  const marquee = [...work.map((p) => p.title), ...clients.map((c) => c.name)];

  return (
    <main className={s.home} data-home>
      <header className={s.bar}>
        <Link href="/" className={s.brand} aria-label={`${site.name}, home`}>
          <Image src="/elliot.png" alt="" width={32} height={32} className={s.brandAvatar} priority />
          <span>Elliot Rylands</span>
        </Link>
        <nav className={s.nav} aria-label="Main">
          <a href="#work">Work</a>
          <a href="#building">Building</a>
          <Link href="/words">Words</Link>
          <Link href="/photography">Photography</Link>
          <a href={site.links.email} className={s.pill}>
            Get in touch <span className={s.pillDot} aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroText}>
          <p className={s.status} data-reveal>
            <span className={s.statusDot} aria-hidden="true" />
            Designing and building at{" "}
            <a href="https://jane.app" target="_blank" rel="noopener" className={s.statusJane}>
              <JaneLogo className={s.statusLogo} />
              <span className="sr-only">Jane (opens in a new tab)</span>
            </a>
          </p>
          <h1 className={s.h1} data-reveal>
            Product designer <span className={s.accent}>who builds.</span>
          </h1>
          <p className={s.creds} data-reveal>Previously Scan.com, Squiz and Terr.ai · Cochrane, Alberta</p>
          <p className={s.lede} data-reveal>{site.intro}</p>
          <div className={s.ctas} data-reveal>
            <a href="#work" className={s.btnDark}>
              See the work <span className={s.btnIcon} aria-hidden="true">→</span>
            </a>
            <a href={site.links.email} className={s.btnGhost}>Email me</a>
          </div>
        </div>
        <div className={s.heroArt} data-reveal>
          <div className={s.heroPhoto}>
            <Image src="/photography/horses-at-dusk.jpg" alt="Horses grazing at dusk with the Rockies on the horizon, near Cochrane." fill sizes="(max-width: 900px) 100vw, 520px" priority quality={90} />
          </div>
          <Link href={`/building/${pebbl.slug}`} className={s.floatRecent}>
            <span className={s.mono}>Now building</span>
            <strong>
              <span className="build-mark" aria-hidden="true" /> {pebbl.name}
            </strong>
            <span className={s.recentBars} aria-hidden="true">
              <i /><i /><i /><i /><b />
            </span>
            <span className={s.monoSmall}>spec → build → ship</span>
          </Link>
          <div className={s.floatStat}>
            <strong>16<sup>+</sup></strong>
            <span>years helping ideas find their feet</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className={s.marquee} aria-label="Clients and products">
        <div className={s.track}>
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} aria-hidden={i >= marquee.length}>{m}</span>
          ))}
        </div>
      </div>

      {/* 01 Work */}
      <section className={s.section} id="work">
        <p className={s.eyebrow} data-reveal><b>01</b> / Selected work</p>
        <h2 className={s.h2} data-reveal>Seven products, one habit: make it work, then make it good.</h2>
        <div className={s.cards}>
          {work.map((p, i) => {
            const c = CARD[p.slug];
            return (
              <article key={p.slug} className={s.card} data-reveal>
                <div className={s.cardArt} style={{ background: c?.bg, color: c?.ink }}>
                  <span className={s.cardTag}>{String(i + 1).padStart(2, "0")} · {c?.tag}</span>
                  {c?.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.img} alt="" loading="lazy" decoding="async" className={s.cardImg} />
                  ) : (
                    <span className={s.cardType}>29<small>departments, one hub</small></span>
                  )}
                  <span className={s.cardGo} aria-hidden="true">→</span>
                </div>
                <div className={s.cardMeta}>
                  <h3 className={s.cardTitle}>
                    <CaseTitleLink slug={p.slug} title={p.title} locked={p.locked}>
                      {p.title}
                    </CaseTitleLink>
                  </h3>
                  <p>{p.summary}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Featured build */}
      <section className={s.featureWrap} id="building">
        <div className={s.feature} data-reveal>
          <div className={s.featureText}>
            <span className={s.chip}>Featured build</span>
            <h2 className={s.featureTitle}>
              <span className="build-mark" aria-hidden="true" /> {pebbl.name}
            </h2>
            <p className={s.featureDek}>{pebbl.title}. {pebbl.summary}</p>
            <dl className={s.featureStats}>
              {pebbl.work.slice(0, 3).map((w) => (
                <div key={w.label}>
                  <dt>{w.value}</dt>
                  <dd>{w.label}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/building/${pebbl.slug}`} className={s.btnClay}>
              Read the case study <span className={s.btnIcon} aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={s.featureArt}>
            <Image src="/building/pebbl/meeting.jpg" alt="pebbl. meeting notes with the transcript beside them" width={1200} height={800} sizes="(max-width: 900px) 100vw, 640px" />
          </div>
        </div>
      </section>

      {/* 02 Jane */}
      {jane ? (
        <section className={s.section}>
          <p className={s.eyebrow} data-reveal><b>02</b> / Now</p>
          <h2 className={s.h2} data-reveal>
            At <JaneLogo className={s.h2Logo} /> Jane, three strands of work.
          </h2>
          <div className={s.duo}>
            {janeWork.map((w, i) => (
              <div key={w.title} className={`${s.strand} ${s[["strandInk", "strandClay", "strandMustard"][i]]}`} data-reveal>
                <span className={s.chipLight}>{w.title}</span>
                <p>{w.summary}</p>
                <span className={s.strandFoot}>
                  <CaseTitleLink slug={jane.slug} title={`Jane: ${w.title}`} locked={jane.locked}>
                    Ask for access
                  </CaseTitleLink>
                  <LockLink slug={jane.slug} title={`Jane: ${w.title}`} locked={jane.locked} />
                </span>
                <span className={s.bigNum} aria-hidden="true">0{i + 1}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* 03 Impact */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal><b>03</b> / Experience</p>
        <div className={s.impact}>
          {IMPACT.map((m) => (
            <div key={m.label} className={`${s.stat} ${s[m.tone]}`} data-reveal>
              <span className={s.mono}>{m.label}</span>
              <strong>
                {m.value}
                {m.plus ? <sup>+</sup> : null}
              </strong>
              <span>{m.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 04 How I work */}
      <section className={s.section}>
        <p className={s.eyebrow} data-reveal><b>04</b> / Approach</p>
        <h2 className={s.h2} data-reveal>How I work</h2>
        <div className={s.pillars}>
          {PILLARS.map((p) => (
            <div key={p.n} className={s.pillar} data-reveal>
              <span className={s.mono}>{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 Words */}
      <section className={s.section}>
        <div className={s.headRow}>
          <div>
            <p className={s.eyebrow} data-reveal><b>05</b> / Writing</p>
            <h2 className={s.h2} data-reveal>Words</h2>
          </div>
          <Link href="/words" className={s.btnGhost} data-reveal>All words →</Link>
        </div>
        <div className={s.posts}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/words/${p.slug}`} className={s.post} data-reveal>
              <span className={s.mono}>{p.readTime} min read</span>
              <strong>{p.title}</strong>
              <span>{p.dek}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 06 Photography */}
      <section className={s.section}>
        <div className={s.headRow}>
          <div>
            <p className={s.eyebrow} data-reveal><b>06</b> / Off the clock</p>
            <h2 className={s.h2} data-reveal>Photography</h2>
          </div>
          <Link href="/photography" className={s.btnGhost} data-reveal>All photos →</Link>
        </div>
        <div className={s.photos}>
          {photos.slice(0, 5).map((ph, i) => (
            <Link key={ph.src} href="/photography" className={`${s.photo} ${i === 0 ? s.photoBig : ""}`} data-reveal aria-label="See all photography">
              <Image src={ph.src} alt="" fill sizes="(max-width: 900px) 50vw, 360px" quality={90} />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={s.ctaWrap}>
        <div className={s.cta} data-reveal>
          <h2>Let&apos;s make something worth using.</h2>
          <div className={s.ctas}>
            <a href={site.links.email} className={s.btnClay}>
              Email me <span className={s.btnIcon} aria-hidden="true">→</span>
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener" className={s.btnGhostLight}>LinkedIn</a>
            <a href={site.links.dribbble} target="_blank" rel="noopener" className={s.btnGhostLight}>Dribbble</a>
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Elliot Rylands</span>
        <LandAck />
        <Clock />
        <span className={s.footLinks}>
          <a href={site.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <a href={site.links.github} target="_blank" rel="noopener">GitHub</a>
          <a href={site.links.dribbble} target="_blank" rel="noopener">Dribbble</a>
        </span>
      </footer>

      <ScrollReveal />
      <UnlockDialog />
    </main>
  );
}
