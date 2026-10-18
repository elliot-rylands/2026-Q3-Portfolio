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
import { formatDate, posts } from "@/lib/posts";
import { clients, janeWork, projects, site } from "@/lib/site";
import { getStudy } from "@/lib/work";
import s from "./home.module.css";

// Markup is written to be read by machines as well as people: landmarks,
// one h1, every section named by its own h2, lists for repeated items,
// <article> for each piece of work, <time> for dates, <dl> for figures,
// plus JSON-LD below. The Person schema lives in app/layout.tsx.

// Cards for the work grid: a category, a colour from each client's world,
// the image that best shows the product, and machine-readable dates.
// UK Government has no image (product screens can't be shown).
type Card = { tag: string; bg: string; ink: string; img?: string; from?: string; to?: string };
const CARD: Record<string, Card> = {
  scan: { tag: "Healthcare · 0 to 1", bg: "#0d5a43", ink: "#ffffff", img: "/work/scan/media/01-hero.webp", from: "2023-08", to: "2025-04" },
  "terr-ai": { tag: "AI agents · Proptech", bg: "#a3220f", ink: "#ffffff", img: "/work/terr-ai/media/01-dashboard.webp", from: "2024", to: "2025" },
  squiz: { tag: "B2B SaaS · Platform", bg: "#0b1c36", ink: "#e8f1ff", img: "/work/squiz/media/launchpad-hero.webp", from: "2018-06", to: "2023-01" },
  "uk-government": { tag: "Government · Self-service", bg: "#e9c24a", ink: "#0b0c0c", from: "2019", to: "2023-01" },
  "papa-johns": { tag: "Consumer · Ordering", bg: "#f2ead7", ink: "#1d2b22", img: "/work/papa-johns/media/hero.webp", from: "2022-11", to: "2023-08" },
  gctv: { tag: "Streaming · Sport", bg: "#121216", ink: "#f4f4f6", img: "/work/gctv/media/hero.webp" },
  "titan-tennis": { tag: "Native app · Hardware", bg: "#1a1f12", ink: "#f1f5e8", img: "/work/titan-tennis/media/drill-list.webp", from: "2022", to: "2023" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const human = (d: string) => (d.length > 4 ? `${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}` : d);
const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

const PILLARS = [
  { title: "Design", text: "The craft first. Clear flows, honest copy and details that hold up at 2am." },
  { title: "Build", text: "Working screens before specs. I prototype in code, on the real design tokens." },
  { title: "AI", text: "An AI-native workflow, and products that show their work instead of guessing." },
  { title: "People", text: "I lead by mentoring and by setting the bar, not by owning every pixel." },
];

export default function Home() {
  const work = projects.filter((p) => !p.current);
  const jane = projects.find((p) => p.current);
  const pebbl = builds[0];
  const marquee = [...work.map((p) => p.title), ...clients.map((c) => c.name)];

  const impact = [
    { label: "Experience", value: "16", plus: true, text: "years in product and growth", tone: "clay" },
    { label: "Government", value: "29", text: "departments served by one self-service hub", tone: "paper" },
    { label: "First hire", value: "1st", text: "designer at Scan.com, on both sides of the product", tone: "forest" },
    { label: "Case studies", value: String(work.length), text: "products shown here, from healthcare to sport", tone: "ink" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: `${site.name} · Product designer and design engineer`,
        mainEntity: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: "Product designer and design engineer",
        description: site.intro,
        worksFor: { "@type": "Organization", name: "Jane", url: "https://jane.app" },
        homeLocation: { "@type": "Place", name: "Cochrane, Alberta, Canada" },
        knowsAbout: ["Product design", "Design engineering", "Design systems", "Accessibility", "Prototyping in code", "AI-assisted products"],
        sameAs: [site.links.linkedin, site.links.github, site.links.dribbble],
      },
      {
        "@type": "ItemList",
        name: "Selected work",
        itemListElement: work.map((p, i) => {
          const role = getStudy(p.slug)?.meta.find((m) => m.label === "Role")?.value;
          return {
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              name: p.title,
              description: p.summary,
              url: `${site.url}/work/${p.slug}`,
              creator: { "@id": `${site.url}/#person` },
              ...(role ? { creditText: role } : {}),
            },
          };
        }),
      },
      {
        "@type": "SoftwareApplication",
        name: pebbl.name,
        description: pebbl.summary,
        operatingSystem: "macOS",
        applicationCategory: "ProductivityApplication",
        url: `${site.url}/building/${pebbl.slug}`,
        creator: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <div className={s.home} data-home>
      <a href="#main" className={s.skip}>Skip to content</a>

      <header className={s.bar}>
        <Link href="/" className={s.brand} aria-label={`${site.name}, home`}>
          <Image src="/elliot.png" alt="" width={32} height={32} className={s.brandAvatar} priority />
          <span>Elliot Rylands</span>
        </Link>
        <nav aria-label="Main">
          <ul className={s.nav}>
            <li><a href="#work">Work</a></li>
            <li><a href="#building">Building</a></li>
            <li><Link href="/words">Words</Link></li>
            <li><Link href="/photography">Photography</Link></li>
            <li>
              <a href={site.links.email} className={s.pill}>
                Get in touch <span className={s.pillDot} aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {/* Intro */}
        <header className={s.hero} aria-labelledby="intro-title">
          <div className={s.heroText}>
            <p className={s.status} data-reveal>
              <span className={s.statusDot} aria-hidden="true" />
              Designing and building at{" "}
              <a href="https://jane.app" target="_blank" rel="noopener" className={s.statusJane}>
                <JaneLogo className={s.statusLogo} />
                <span className="sr-only">Jane (opens in a new tab)</span>
              </a>
            </p>
            <h1 id="intro-title" className={s.h1} data-reveal>
              <span className={s.kicker}>Elliot Rylands<span className="sr-only">,</span></span>{" "}
              <span className={s.headline}>
                Product designer <span className={s.accent}>who builds.</span>
              </span>
            </h1>
            <p className={s.creds} data-reveal>Previously Scan.com, Squiz and Flipside · Cochrane, Alberta</p>
            <p className={s.lede} data-reveal>{site.intro}</p>
            <p className={s.ctas} data-reveal>
              <a href="#work" className={s.btnDark}>
                See the work <span className={s.btnIcon} aria-hidden="true">→</span>
              </a>
              <a href={site.links.email} className={s.btnGhost}>Email me</a>
            </p>
          </div>
          <aside className={s.heroArt} aria-label="At a glance" data-reveal>
            <figure className={s.heroPhoto}>
              <Image src="/photography/horses-at-dusk.jpg" alt="Horses grazing at dusk with the Rockies on the horizon, near Cochrane." fill sizes="(max-width: 900px) 100vw, 520px" priority quality={90} />
            </figure>
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
            <p className={s.floatStat}>
              <strong>16<sup>+</sup></strong>
              <span>years helping ideas find their feet</span>
            </p>
          </aside>
        </header>

        {/* Clients */}
        <section className={s.marquee} aria-labelledby="clients-title">
          <h2 id="clients-title" className="sr-only">Clients and products</h2>
          <ul className={s.track}>
            {[...marquee, ...marquee].map((m, i) => (
              <li key={i} aria-hidden={i >= marquee.length || undefined}>{m}</li>
            ))}
          </ul>
        </section>

        {/* 01 Work */}
        <section className={s.section} id="work" aria-labelledby="work-title">
          <p className={s.eyebrow} data-reveal><b>01</b> / Selected work</p>
          <h2 id="work-title" className={s.h2} data-reveal>
            {WORDS[work.length] ?? work.length} products, one habit: make it work, then make it good.
          </h2>
          <ul className={s.cards}>
            {work.map((p, i) => {
              const c = CARD[p.slug];
              const role = getStudy(p.slug)?.meta.find((m) => m.label === "Role")?.value;
              return (
                <li key={p.slug}>
                  <article className={s.card} data-reveal aria-labelledby={`work-${p.slug}`}>
                    <div className={s.cardArt} style={{ background: c?.bg, color: c?.ink }}>
                      <p className={s.cardTag}>{String(i + 1).padStart(2, "0")} · {c?.tag}</p>
                      {c?.img ? (
                        // Decorative: the title and summary carry the meaning.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.img} alt="" loading="lazy" decoding="async" className={s.cardImg} />
                      ) : (
                        <p className={s.cardType} aria-hidden="true">29<small>departments, one hub</small></p>
                      )}
                      <span className={s.cardGo} aria-hidden="true">→</span>
                    </div>
                    <div className={s.cardMeta}>
                      <header>
                        <h3 id={`work-${p.slug}`} className={s.cardTitle}>
                          <CaseTitleLink slug={p.slug} title={p.title} locked={p.locked}>
                            {p.title}
                          </CaseTitleLink>
                        </h3>
                        {role || c?.from ? (
                          <p className={s.cardRole}>
                            {role}
                            {role && c?.from ? <br /> : null}
                            {c?.from ? (
                              <>
                                <time dateTime={c.from}>{human(c.from)}</time> to{" "}
                                <time dateTime={c.to}>{human(c.to!)}</time>
                              </>
                            ) : null}
                          </p>
                        ) : null}
                      </header>
                      <p>{p.summary}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Featured build */}
        <section className={s.featureWrap} id="building" aria-labelledby="building-title">
          <h2 id="building-title" className="sr-only">What I&apos;m building</h2>
          <article className={s.feature} data-reveal aria-labelledby="pebbl-title">
            <div className={s.featureText}>
              <p className={s.chip}>Featured build · {pebbl.status}</p>
              <h3 id="pebbl-title" className={s.featureTitle}>
                <span className="build-mark" aria-hidden="true" /> {pebbl.name}
              </h3>
              <p className={s.featureDek}>{pebbl.title}. {pebbl.summary}</p>
              <dl className={s.featureStats}>
                {pebbl.work.slice(0, 3).map((w) => (
                  <div key={w.label}>
                    <dt>{w.label}</dt>
                    <dd>{w.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/building/${pebbl.slug}`} className={s.btnClay}>
                Read the case study <span className="sr-only">for {pebbl.name}</span>
                <span className={s.btnIcon} aria-hidden="true">→</span>
              </Link>
            </div>
            <figure className={s.featureArt}>
              <Image src="/building/pebbl/meeting.jpg" alt="pebbl. meeting notes with a promise and a decision, each linked to its line in the transcript." width={1200} height={800} sizes="(max-width: 900px) 100vw, 640px" />
            </figure>
          </article>
        </section>

        {/* 02 Jane */}
        {jane ? (
          <section className={s.section} aria-labelledby="now-title">
            <p className={s.eyebrow} data-reveal><b>02</b> / Now</p>
            <h2 id="now-title" className={s.h2} data-reveal>
              At <JaneLogo className={s.h2Logo} /> Jane, three strands of work.
            </h2>
            <ul className={s.duo}>
              {janeWork.map((w, i) => (
                <li key={w.title}>
                  <article className={`${s.strand} ${s[["strandInk", "strandClay", "strandMustard"][i]]}`} data-reveal aria-labelledby={`jane-${i}`}>
                    <h3 id={`jane-${i}`} className={s.chipLight}>{w.title}</h3>
                    <p>{w.summary}</p>
                    <p className={s.strandFoot}>
                      <CaseTitleLink slug={jane.slug} title={`Jane: ${w.title}`} locked={jane.locked}>
                        Ask for access
                      </CaseTitleLink>
                      <LockLink slug={jane.slug} title={`Jane: ${w.title}`} locked={jane.locked} />
                    </p>
                    <span className={s.bigNum} aria-hidden="true">0{i + 1}</span>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* 03 Experience */}
        <section className={s.section} aria-labelledby="experience-title">
          <p className={s.eyebrow} data-reveal><b>03</b> / Experience</p>
          <h2 id="experience-title" className="sr-only">Experience in numbers</h2>
          <dl className={s.impact}>
            {impact.map((m) => (
              <div key={m.label} className={`${s.stat} ${s[m.tone]}`} data-reveal>
                <dt className={s.mono}>{m.label}</dt>
                <dd className={s.statValue}>
                  {m.value}
                  {m.plus ? <sup>+</sup> : null}
                </dd>
                <dd className={s.statText}>{m.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 04 How I work */}
        <section className={s.section} aria-labelledby="approach-title">
          <p className={s.eyebrow} data-reveal><b>04</b> / Approach</p>
          <h2 id="approach-title" className={s.h2} data-reveal>How I work</h2>
          <ol className={s.pillars}>
            {PILLARS.map((p, i) => (
              <li key={p.title} className={s.pillar} data-reveal>
                <span className={s.mono} aria-hidden="true">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 05 Words */}
        <section className={s.section} aria-labelledby="words-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow} data-reveal><b>05</b> / Writing</p>
              <h2 id="words-title" className={s.h2} data-reveal>Words</h2>
            </div>
            <Link href="/words" className={s.btnGhost} data-reveal>All words <span aria-hidden="true">→</span></Link>
          </div>
          <ul className={s.posts}>
            {posts.map((p) => (
              <li key={p.slug}>
                <article className={s.post} data-reveal aria-labelledby={`post-${p.slug}`}>
                  <p className={s.mono}>
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readTime} min read
                  </p>
                  <h3 id={`post-${p.slug}`} className={s.postTitle}>
                    <Link href={`/words/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p>{p.dek}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* 06 Photography */}
        <section className={s.section} aria-labelledby="photos-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow} data-reveal><b>06</b> / Off the clock</p>
              <h2 id="photos-title" className={s.h2} data-reveal>Photography</h2>
            </div>
            <Link href="/photography" className={s.btnGhost} data-reveal>All photos <span aria-hidden="true">→</span></Link>
          </div>
          <ul className={s.photos}>
            {photos.slice(0, 5).map((ph, i) => (
              <li key={ph.src} className={`${s.photo} ${i === 0 ? s.photoBig : ""}`} data-reveal>
                <figure>
                  <Image src={ph.src} alt={ph.alt} fill sizes="(max-width: 900px) 50vw, 360px" quality={90} />
                </figure>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className={s.ctaWrap} aria-labelledby="contact-title">
          <div className={s.cta} data-reveal>
            <h2 id="contact-title">Let&apos;s make something worth using.</h2>
            <ul className={s.ctas}>
              <li>
                <a href={site.links.email} className={s.btnClay}>
                  Email me <span className={s.btnIcon} aria-hidden="true">→</span>
                </a>
              </li>
              <li><a href={site.links.linkedin} target="_blank" rel="noopener me" className={s.btnGhostLight}>LinkedIn</a></li>
              <li><a href={site.links.dribbble} target="_blank" rel="noopener me" className={s.btnGhostLight}>Dribbble</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p>© {new Date().getFullYear()} Elliot Rylands</p>
        <address className={s.address}>Cochrane, Alberta, Canada</address>
        <LandAck />
        <Clock />
        <nav aria-label="Elsewhere">
          <ul className={s.footLinks}>
            <li><a href={site.links.linkedin} target="_blank" rel="noopener me">LinkedIn</a></li>
            <li><a href={site.links.github} target="_blank" rel="noopener me">GitHub</a></li>
            <li><a href={site.links.dribbble} target="_blank" rel="noopener me">Dribbble</a></li>
          </ul>
        </nav>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollReveal />
      <UnlockDialog />
    </div>
  );
}
