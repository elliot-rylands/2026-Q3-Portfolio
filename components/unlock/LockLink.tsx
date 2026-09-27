"use client";

import Link from "next/link";
import { openUnlock } from "./events";

function LockIcon() {
  return (
    <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
    </svg>
  );
}

// The lock icon beside each project. A plain click opens the password
// lightbox; cmd/ctrl-click or no JS still goes to /work/[slug], which has
// its own password form.
export function LockLink({ slug, title, locked }: { slug: string; title: string; locked: boolean }) {
  const href = `/work/${slug}`;
  return (
    <Link
      href={href}
      className="lock-link"
      aria-label={`${title} case study${locked ? ", password protected" : ""}`}
      aria-haspopup={locked ? "dialog" : undefined}
      title="Read the case study"
      onClick={(e) => {
        if (!locked || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (document.cookie.split("; ").includes("er_unlocked=1")) return; // already in, go straight there
        e.preventDefault();
        openUnlock({ slug, title, trigger: e.currentTarget });
      }}
    >
      <LockIcon />
    </Link>
  );
}
