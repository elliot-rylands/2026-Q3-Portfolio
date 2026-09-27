"use client";

import { useEffect } from "react";

// Reveals every [data-reveal] element as it scrolls into view.
// Elements that arrive together cascade in document order, so the
// first screen staggers in on load and each section does the same
// as you reach it. Without JS nothing is hidden (see globals.css).
export function ScrollReveal() {
  useEffect(() => {
    (window as Window & { __reveal?: boolean }).__reveal = true;
    document.documentElement.classList.add("reveal-ready");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        arriving.forEach((el, i) => {
          el.style.setProperty("--reveal-delay", `${Math.min(i, 10) * 70}ms`);
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
