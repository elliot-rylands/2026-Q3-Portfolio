"use client";

import { useState } from "react";

export function CopyLink() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the URL is still in the address bar.
    }
  }

  return (
    <button type="button" className="round-btn" onClick={copy} aria-label={copied ? "Link copied" : "Copy link to this page"}>
      {copied ? (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M6.5 9.5l3-3" />
          <path d="M7 4.5l1.2-1.2a2.6 2.6 0 0 1 3.6 3.6L10.6 8" />
          <path d="M9 11.5l-1.2 1.2a2.6 2.6 0 0 1-3.6-3.6L5.4 8" />
        </svg>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
