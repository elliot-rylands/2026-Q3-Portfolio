"use client";

import { useEffect, useRef } from "react";

// A hand-drawn line that ends in a pointing hand. It draws itself as it
// scrolls through the screen, and is already drawn for reduced motion.
export function DrawnPointer({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-draw]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = svg.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters at the bottom of the screen, 1 once the hand passes the middle.
      const t = Math.min(1, Math.max(0, (vh - box.top) / (box.height + vh * 0.35)));
      const line = Math.min(1, t / 0.75);
      const hand = Math.min(1, Math.max(0, (t - 0.7) / 0.3));
      paths.forEach((p) => {
        const share = p.dataset.draw === "line" ? line : hand;
        p.style.strokeDashoffset = String(1 - share);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg ref={ref} className={className} viewBox="0 0 120 400" width="120" height="400" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="pointer-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b6fd8" />
          <stop offset="1" stopColor="#6b1fa8" />
        </linearGradient>
      </defs>
      <g stroke="url(#pointer-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path data-draw="line" pathLength={1} strokeDasharray="1" strokeDashoffset="1" d="M60 4 C60.6 60 59.3 130 60.3 190 C60.7 220 59.8 238 60 250" />
        <path data-draw="hand" pathLength={1} strokeDasharray="1" strokeDashoffset="1" d="M45 250 C52 247 68 247 76 250" />
        <path
          data-draw="hand"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          d="M48 252 C47 266 42 276 36 286 C29 295 33 309 42 305 C40 316 49 321 53 312 C53 323 62 325 63 316 L63.5 372 C64 386 76 386 76 372 L75.5 302 C84 299 92 290 85 282 C80 277 75 282 73 287 C72.5 276 72 262 72.5 252"
        />
        <path data-draw="hand" pathLength={1} strokeDasharray="1" strokeDashoffset="1" d="M44 300 C47 297 49 297 51 299 M54 309 C57 306 59 306 61 308" />
      </g>
    </svg>
  );
}
