"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { openUnlock } from "./events";

// A project title that opens its case study. Same behaviour as the lock icon:
// a plain click opens the password lightbox; cmd/ctrl-click, no JS, or an
// already-unlocked visitor go straight to /work/[slug].
export function CaseTitleLink({ slug, title, locked, children }: { slug: string; title: string; locked: boolean; children: ReactNode }) {
  return (
    <Link
      href={`/work/${slug}`}
      aria-haspopup={locked ? "dialog" : undefined}
      onClick={(e) => {
        if (!locked || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (document.cookie.split("; ").includes("er_unlocked=1")) return;
        e.preventDefault();
        openUnlock({ slug, title, trigger: e.currentTarget });
      }}
    >
      {children}
    </Link>
  );
}
