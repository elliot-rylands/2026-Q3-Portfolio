import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LandAck } from "@/components/LandAck";
import { Clock } from "./Clock";
import { CaseTitleLink } from "@/components/unlock/CaseTitleLink";
import { UnlockDialog } from "@/components/unlock/UnlockDialog";
import { builds } from "@/lib/building";
import { formatDate, posts } from "@/lib/posts";
import { clients, janeWork, projects, site } from "@/lib/site";
import { getStudy } from "@/lib/work";
import s from "./home.module.css";

// Homepage. Layout, spacing, type scale and colours follow quilo.co.uk;
// every word, image and figure here is Elliot's own.
//
// Written to be read by machines as well as people: landmarks, one h1,
// every section named by its own h2, lists for repeated items, <article>
// for each piece of work, <time> for dates, <dl> for figures, and JSON-LD
// at the bottom. The base Person schema lives in app/layout.tsx.

// Colour behind each case study card, plus machine-readable dates.
// UK Government has no image: product screens can't be shown.
type Card = { tag: string; bg: string; img?: string; from?: string; to?: string };
const CARD: Record<string, Card> = {
  scan: { tag: "Healthcare", bg: "var(--teal)", img: "/work/scan/media/01-hero.webp", from: "2023-08", to: "2025-04" },
  "terr-ai": { tag: "AI agents", bg: "var(--accent)", img: "/work/terr-ai/media/01-dashboard.webp", from: "2024", to: "2025" },
  squiz: { tag: "Platform", bg: "var(--forest)", img: "/work/squiz/media/launchpad-hero.webp", from: "2018-06", to: "2023-01" },
  "uk-government": { tag: "Government", bg: "var(--mustard)", from: "2019", to: "2023-01" },
  "papa-johns": { tag: "Consumer", bg: "var(--accent)", img: "/work/papa-johns/media/hero.webp", from: "2022-11", to: "2023-08" },
  gctv: { tag: "Streaming", bg: "var(--pink)", img: "/work/gctv/media/hero.webp" },
  "titan-tennis": { tag: "Hardware", bg: "var(--ink)", img: "/work/titan-tennis/media/drill-list.webp", from: "2022", to: "2023" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const human = (d: string) => (d.length > 4 ? `${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}` : d);
const role = (slug: string) => getStudy(slug)?.meta.find((m) => m.label === "Role")?.value;

const IMPACT = [
  { label: "Experience", value: "16+", text: "Years in product and growth", tone: "accent" },
  { label: "Government", value: "29", text: "Departments on one self-service hub", tone: "paper" },
  { label: "Civil servants", value: "300k+", text: "Served by that one hub", tone: "forest" },
  { label: "Scan.com", value: "1st", text: "Design hire, on both sides of the product", tone: "paper" },
];

const PILLARS = [
  { icon: "01", title: "Design", text: "The craft first. Clear flows, honest copy and details that hold up at 2am." },
  { icon: "02", title: "Build", text: "Working screens before specs. I prototype in code, on the real design tokens." },
  { icon: "03", title: "AI", text: "An AI-native workflow, and products that show their work instead of guessing." },
  { icon: "04", title: "Human", text: "I lead by mentoring and by setting the bar, not by owning every pixel." },
];

const Arrow = () => (
  <span className={s.btnArrow} aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  </span>
);

export default function Home() {
  const work = projects.filter((p) => !p.current);
  const jane = projects.find((p) => p.current);
  const pebbl = builds[0];
  const scan = getStudy("scan");
  const marquee = [...work.map((p) => p.title), ...clients.map((c) => c.name)];
  const latest = posts.slice(0, 3);
  const quotePost = posts.find((p) => p.slug === "ai-craft-bar");

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
        itemListElement: work.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.summary,
            url: `${site.url}/work/${p.slug}`,
            creator: { "@id": `${site.url}/#person` },
            ...(role(p.slug) ? { creditText: role(p.slug) } : {}),
          },
        })),
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
        <div className={`${s.wrap} ${s.barInner}`}>
          <Link href="/" className={s.wordmark} aria-label={`${site.name}, home`}>
            elliot<span>.</span>
          </Link>
          <nav aria-label="Main">
            <ul className={s.nav}>
              <li><a href="#work">Work</a></li>
              <li><a href="#now">Now</a></li>
              <li><Link href="/words">Words</Link></li>
              <li><Link href="/photography">Photography</Link></li>
              <li>
                <a href={site.links.email} className={`${s.btn} ${s.btnInk} ${s.btnSmall}`}>
                  Get in touch <Arrow />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <header className={`${s.wrap} ${s.hero}`} aria-labelledby="intro-title">
          <div className={s.heroText}>
            <div className={s.rise}>
              <p className={s.status}>
                <span className={s.live} aria-hidden="true" />
                Designing and building at Jane
              </p>
            </div>
            <h1 id="intro-title" className={`${s.h1} ${s.rise2}`}>
              <span className="sr-only">Elliot Rylands, </span>
              Designer who <span className={s.accentText}>builds</span><span className={s.accentText}>.</span>
            </h1>
            <p className={`${s.lede} ${s.rise2}`}>Ex Scan.com, Squiz and Flipside</p>
            <p className={`${s.lede} ${s.ledeBody} ${s.rise2}`}>
              {site.intro.replace(/^A /, "I'm Elliot, a ")}
            </p>
            <p className={`${s.ctas} ${s.rise3}`}>
              <a href="#work" className={`${s.btn} ${s.btnInk}`}>See the work <Arrow /></a>
              <a href={site.links.email} className={s.btnOutline}>Hiring? Email me</a>
            </p>
          </div>

          <aside className={`${s.heroArt} ${s.rise2}`} aria-label="At a glance">
            <figure className={s.portrait}>
              <Image src="/photography/snowboard-selfie.jpg" alt="Elliot snowboarding in the Rockies on a bright winter afternoon." fill sizes="(min-width: 768px) 520px, 100vw" priority className={s.portraitImg} />
            </figure>
            <div className={s.badge} aria-hidden="true">
              <svg className={s.spin} width="136" height="136" viewBox="0 0 136 136">
                <defs>
                  <path id="er-circle" d="M68,68 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
                </defs>
                <text fill="#F6F2EA" fontSize="10" letterSpacing="0.2" className={s.badgeText}>
                  <textPath href="#er-circle">Product Design · Design Engineering · AI ·</textPath>
                </text>
              </svg>
              <span className={s.badgeDot} />
            </div>
            <Link href={`/building/${pebbl.slug}`} className={s.recent}>
              <span className={s.recentHead}>
                <span className={s.monoTiny}>Now building</span>
                <span className={s.recentDot} aria-hidden="true" />
              </span>
              <span className={s.recentTitle}>
                {pebbl.name} <span className={s.muted}>notetaker</span>
              </span>
              <span className={s.bars} aria-hidden="true">
                <i style={{ height: "40%" }} /><i style={{ height: "65%" }} /><i style={{ height: "50%" }} /><i style={{ height: "85%" }} /><b style={{ height: "100%" }} />
              </span>
              <span className={s.monoTinyLower}>spec → build → ship</span>
            </Link>
            <p className={s.statCard}>
              <strong>16+</strong>
              <span>years in product and growth</span>
            </p>
          </aside>
        </header>

        {/* Marquee */}
        <section className={s.marquee} aria-labelledby="clients-title">
          <h2 id="clients-title" className="sr-only">Clients and products</h2>
          <ul className={s.track}>
            {[...marquee, ...marquee].map((m, i) => (
              <li key={i} aria-hidden={i >= marquee.length || undefined}>{m} <span className={s.star}>✦</span></li>
            ))}
          </ul>
        </section>

        {/* 01 Now */}
        <section className={`${s.wrap} ${s.section}`} id="now" aria-labelledby="now-title">
          <p className={s.eyebrow} data-reveal><span>01</span> / Right now</p>
          <h2 id="now-title" className={`${s.h2} ${s.h2Gap}`} data-reveal>
            Two things on my desk.
          </h2>
          <ul className={s.twoUp}>
            {jane ? (
              <li>
                <article className={`${s.bigCard} ${s.bigTeal}`} data-reveal aria-labelledby="now-jane">
                  <p className={`${s.bigNum} ${s.onDark}`}><span>01</span> Day job</p>
                  <h3 id="now-jane" className={s.bigTitle}>Senior Product Designer at Jane</h3>
                  <p className={s.bigText}>
                    {janeWork.map((w) => w.summary.replace(/\.$/, "")).join(". ")}. Shared on request.
                  </p>
                  <p className={s.cardCtas}>
                    <CaseTitleLink slug={jane.slug} title="Jane" locked={jane.locked}>
                      <span className={`${s.btn} ${s.btnCream}`}>Ask for access <Arrow /></span>
                    </CaseTitleLink>
                    <a href="https://jane.app" target="_blank" rel="noopener" className={`${s.btnOutline} ${s.btnOutlineLight}`}>
                      jane.app<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </article>
              </li>
            ) : null}
            <li>
              <article className={`${s.bigCard} ${s.bigMustard}`} data-reveal aria-labelledby="now-pebbl">
                <p className={s.bigNum}><span>02</span> Side project · {pebbl.status}</p>
                <h3 id="now-pebbl" className={`${s.bigTitle} ${s.inkText}`}>{pebbl.name} {pebbl.title.toLowerCase()}</h3>
                <p className={`${s.bigText} ${s.inkText}`}>{pebbl.dek}</p>
                <p className={s.cardCtas}>
                  <Link href={`/building/${pebbl.slug}`} className={`${s.btn} ${s.btnInk}`}>
                    Read the case study <Arrow />
                  </Link>
                  <Link href={`/building/${pebbl.slug}`} className={s.btnOutline}>Watch the film</Link>
                </p>
              </article>
            </li>
          </ul>
        </section>

        {/* 02 Selected work */}
        <section className={`${s.wrap} ${s.section}`} id="work" aria-labelledby="work-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow} data-reveal><span>02</span> / Case studies</p>
              <h2 id="work-title" className={s.h2} data-reveal>
                Selected work
              </h2>
            </div>
            <a href={`/work/${work[0]?.slug}`} className={s.textLink} data-reveal>Start with {work[0]?.title} →</a>
          </div>
          <ul className={s.cards}>
            {work.map((p, i) => {
              const c = CARD[p.slug];
              const r = role(p.slug);
              return (
                <li key={p.slug}>
                  <article className={s.card} data-reveal aria-labelledby={`work-${p.slug}`}>
                    <div className={s.cardArt} style={{ background: c?.bg }}>
                      <p className={s.tag}>{String(i + 1).padStart(2, "0")} · {c?.tag}</p>
                      {c?.img ? (
                        // Decorative: the title and summary carry the meaning.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.img} alt="" loading="lazy" decoding="async" className={s.cardImg} />
                      ) : (
                        <p className={s.cardType} aria-hidden="true">29<small>departments<br />one hub</small></p>
                      )}
                    </div>
                    <header className={s.cardRow}>
                      <h3 id={`work-${p.slug}`} className={s.cardTitle}>
                        <CaseTitleLink slug={p.slug} title={p.title} locked={p.locked}>{p.title}</CaseTitleLink>
                      </h3>
                      {c?.from ? (
                        <p className={s.cardMeta}>
                          <time dateTime={c.from}>{human(c.from)}</time> to <time dateTime={c.to}>{human(c.to!)}</time>
                        </p>
                      ) : null}
                    </header>
                    <p className={s.cardSummary}>{p.summary}</p>
                    {r ? <p className={s.cardRole}>{r}</p> : null}
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Featured case study */}
        {scan ? (
          <section className={`${s.wrap} ${s.featureWrap}`} aria-labelledby="feature-title">
            <article className={s.feature} data-reveal>
              <div className={s.featureText}>
                <p className={s.chip}>Featured case study</p>
                <h2 id="feature-title" className={s.featureTitle}>
                  Scan<span className={s.pinkText}>.com</span>
                </h2>
                <p className={s.featureDek}>{scan.dek}</p>
                <dl className={s.featureStats}>
                  {scan.work.map((w) => (
                    <div key={w.label}>
                      <dt>{w.label.split(":")[0]}</dt>
                      <dd>{w.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/work/scan" className={`${s.btn} ${s.btnAccent}`}>Read the case study <Arrow /></Link>
              </div>
              <div className={s.featureArt} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/work/scan/media/03-confirm-details.webp" alt="" className={`${s.tilt} ${s.tiltL}`} loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/work/scan/media/04-choose-centre.webp" alt="" className={`${s.tilt} ${s.tiltR}`} loading="lazy" />
              </div>
            </article>
          </section>
        ) : null}

        {/* 03 Impact */}
        <section className={`${s.wrap} ${s.section} ${s.sectionTight}`} aria-labelledby="impact-title">
          <p className={s.eyebrow} data-reveal><span>03</span> / Experience</p>
          <h2 id="impact-title" className="sr-only">Experience in numbers</h2>
          <dl className={s.impact}>
            {IMPACT.map((m) => (
              <div key={m.label} className={`${s.stat} ${s[m.tone]}`} data-reveal>
                <dt>{m.label}</dt>
                <dd className={s.statValue}>{m.value}</dd>
                <dd className={s.statText}>{m.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 04 Approach */}
        <section className={`${s.wrap} ${s.section}`} aria-labelledby="approach-title">
          <p className={s.eyebrow} data-reveal><span>04</span> / Approach</p>
          <h2 id="approach-title" className={`${s.h2} ${s.h2Gap}`} data-reveal>
            How I work
          </h2>
          <ul className={s.pillars}>
            {PILLARS.map((p) => (
              <li key={p.title} className={s.pillar} data-reveal>
                <span className={s.pillarIcon} aria-hidden="true">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Pull quote, from Elliot's own writing */}
        {quotePost ? (
          <section className={`${s.wrap} ${s.quoteWrap}`} aria-label="From my writing">
            <figure className={s.quote} data-reveal>
              <blockquote className={s.quoteText}>
                <p>
                  AI didn&apos;t lower the <span className={s.pinkText}>craft bar.</span> It exposed who never had it.
                </p>
              </blockquote>
              <figcaption className={s.quoteBy}>
                <Image src="/elliot.png" alt="" width={56} height={56} className={s.quoteAvatar} />
                <span className={s.quoteName}>Elliot Rylands</span>
                <span className={s.quoteRole}>From my writing, <time dateTime={quotePost.date}>{formatDate(quotePost.date, "long")}</time></span>
                <Link href={`/words/${quotePost.slug}`} className={s.quoteLink}>Read the post →</Link>
              </figcaption>
            </figure>
          </section>
        ) : null}

        {/* 05 Writing */}
        <section className={`${s.wrap} ${s.writing}`} aria-labelledby="words-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow} data-reveal><span>05</span> / Writing</p>
              <h2 id="words-title" className={s.h2} data-reveal>Words</h2>
            </div>
            <Link href="/words" className={s.textLink} data-reveal>All words →</Link>
          </div>
          <ul className={s.posts}>
            {latest.map((p, i) => (
              <li key={p.slug}>
                <article className={s.post} data-reveal aria-labelledby={`post-${p.slug}`}>
                  <div className={s.postArt} style={{ background: ["var(--mustard)", "var(--pink)", "var(--teal)"][i], color: i === 2 ? "var(--cream)" : "var(--ink)" }} aria-hidden="true">
                    <span>{p.readTime}<small>min read</small></span>
                  </div>
                  <p className={s.postMeta}>Words · <time dateTime={p.date}>{formatDate(p.date, "long")}</time></p>
                  <h3 id={`post-${p.slug}`} className={s.postTitle}>
                    <Link href={`/words/${p.slug}`}>{p.title}</Link>
                  </h3>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <section className={s.footCta} aria-labelledby="contact-title">
            <h2 id="contact-title" className={s.footTitle}>
              Let&apos;s make something <span className={s.pinkText}>worth using.</span>
            </h2>
            <p className={s.ctas}>
              <a href={site.links.email} className={`${s.btn} ${s.btnCream}`}>Email me <Arrow /></a>
              <a href={site.links.linkedin} target="_blank" rel="noopener me" className={`${s.btnOutline} ${s.btnOutlineLight}`}>LinkedIn</a>
            </p>
          </section>
          <div className={s.footRow}>
            <div className={s.footLegal}><span>© {new Date().getFullYear()} Elliot Rylands</span> · <address className={s.address}>Cochrane, Alberta</address></div>
            <nav aria-label="Elsewhere">
              <ul className={s.footLinks}>
                <li><a href="#work">Work</a></li>
                <li><Link href="/words">Words</Link></li>
                <li><Link href="/photography">Photography</Link></li>
                <li><a href={site.links.linkedin} target="_blank" rel="noopener me">LinkedIn</a></li>
                <li><a href={site.links.github} target="_blank" rel="noopener me">GitHub</a></li>
                <li><a href={site.links.dribbble} target="_blank" rel="noopener me">Dribbble</a></li>
              </ul>
            </nav>
          </div>
          <div className={s.footMeta}>
            <LandAck />
            <Clock />
          </div>
          <p className={s.giant} aria-hidden="true">elliot.</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollReveal />
      <UnlockDialog />
    </div>
  );
}
