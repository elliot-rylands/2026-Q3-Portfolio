"use client";

import { useEffect, useRef, useState } from "react";
import { UnlockForm } from "@/app/work/[slug]/UnlockForm";
import { site } from "@/lib/site";
import { onOpenUnlock, type UnlockRequest } from "./events";

// One lightbox for every case study. Uses the native <dialog>, so focus is
// trapped, Esc closes it, and the page behind is inert. The blur is on
// ::backdrop (see globals.css).
export function UnlockDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [req, setReq] = useState<UnlockRequest | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(
    () =>
      onOpenUnlock((r) => {
        setReq(r);
        setClosing(false);
        const d = ref.current;
        if (d && !d.open) d.showModal();
      }),
    [],
  );

  const close = () => {
    const d = ref.current;
    if (!d?.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return d.close();
    setClosing(true);
    window.setTimeout(() => d.close(), 180);
  };

  return (
    <dialog
      ref={ref}
      className="unlock-dialog"
      data-closing={closing || undefined}
      aria-labelledby="unlock-title"
      aria-describedby="unlock-desc"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClose={() => {
        setClosing(false);
        req?.trigger?.focus();
      }}
      onClick={(e) => {
        // Click on the blurred backdrop (the dialog element itself) closes it.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="unlock-card">
        <button type="button" className="unlock-close round-btn" onClick={close} aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
          </svg>
        </button>

        <div className="unlock-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
            <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
          </svg>
        </div>

        <h2 id="unlock-title" className="unlock-heading">
          <span className="label">{req?.title ?? "Case study"}</span>
        </h2>
        <p id="unlock-desc" className="unlock-copy">
          Case studies are password protected while I write them. Enter the password I sent you, or{" "}
          <a href={site.links.accessEmail}>email me</a> for access.
        </p>

        {req ? <UnlockForm key={req.slug} next={`/work/${req.slug}`} autoFocus /> : null}
      </div>
    </dialog>
  );
}
