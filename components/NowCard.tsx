import { JaneLogo } from "./JaneLogo";
import { CaseTitleLink } from "./unlock/CaseTitleLink";
import { site } from "@/lib/site";

// Current work, spanning the full width above "Previously". The work itself is
// confidential, so the card is decorative: redacted lines, the Jane mark, and a
// way in for people who have the password or want to ask for it.
const BARS = [72, 88, 54, 80, 38, 66, 90, 46];

export function NowCard({ slug, title, locked }: { slug: string; title: string; locked: boolean }) {
  return (
    <section className="now-card" aria-labelledby="now-title" data-reveal>
      <div className="now-redacted" aria-hidden="true">
        {BARS.map((w, i) => (
          <span key={i} style={{ width: `${w}%` }} />
        ))}
      </div>
      <JaneLogo className="now-mark" />
      <div className="now-copy">
        <p className="now-kicker">Now</p>
        <h2 id="now-title" className="now-title">
          {title}
          <svg className="now-lock" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
            <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
          </svg>
        </h2>
        <p>My current work is confidential, so it lives behind a password and I&apos;m happy to walk you through it in conversation.</p>
        <p className="now-actions">
          <CaseTitleLink slug={slug} title={title} locked={locked}>
            Enter password
          </CaseTitleLink>
          <a href={site.links.accessEmail.replace("Case%20study%20access", "Access%20to%20Jane%20work")}>Request access</a>
        </p>
      </div>
    </section>
  );
}
