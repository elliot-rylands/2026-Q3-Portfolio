"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

// Big letters filled with brush strokes of colour. The paint drifts on its
// own, follows the pointer across the word, and gets a fresh coat on click.
// The word is a real link; the SVG is decoration.
const PAINT = ["#3d4fd1", "#5fe0c6", "#ec8c9b", "#9b8af0", "#e57be0", "#7aa2f7"];

type Stroke = { x: number; y: number; w: number; h: number; r: number; c: string; rx: number };

function coat(seed: number): Stroke[] {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 70 }, () => ({
    x: rnd() * 1100 - 60,
    y: rnd() * 260 - 40,
    w: 80 + rnd() * 260,
    h: 22 + rnd() * 70,
    r: -40 + rnd() * 80,
    rx: 10 + rnd() * 30,
    c: PAINT[Math.floor(rnd() * PAINT.length)],
  }));
}

export function PaintedWord({ word, href, label }: { word: string; href: string; label: string }) {
  const id = useId().replace(/:/g, "");
  const [seed, setSeed] = useState(7);
  const strokes = useMemo(() => coat(seed), [seed]);
  const layer = useRef<SVGGElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const g = layer.current;
    if (!g || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const cur = { x: 0, y: 0 };
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // Ease toward the pointer, plus a slow wander so it never sits still.
      cur.x += (target.current.x - cur.x) * 0.08;
      cur.y += (target.current.y - cur.y) * 0.08;
      const wx = Math.sin(t * 0.5) * 18;
      const wy = Math.cos(t * 0.35) * 10;
      g.setAttribute("transform", `translate(${(cur.x + wx).toFixed(1)} ${(cur.y + wy).toFixed(1)}) rotate(${(Math.sin(t * 0.2) * 2).toFixed(2)} 500 110)`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
    target.current = {
      x: ((e.clientX - box.left) / box.width - 0.5) * -120,
      y: ((e.clientY - box.top) / box.height - 0.5) * -60,
    };
  };

  return (
    <a
      href={href}
      aria-label={label}
      className="painted"
      onPointerMove={onMove}
      onPointerLeave={() => (target.current = { x: 0, y: 0 })}
      onClick={() => setSeed((n) => n + 13)}
    >
      <svg viewBox="0 0 1000 230" role="img" aria-hidden="true">
        <defs>
          <clipPath id={`clip-${id}`}>
            <text x="30" y="195" textLength="940" lengthAdjust="spacingAndGlyphs" className="painted-text">{word}</text>
          </clipPath>
        </defs>
        <g clipPath={`url(#clip-${id})`}>
          <rect x="-100" y="-50" width="1200" height="330" fill={PAINT[0]} />
          <g ref={layer}>
            {strokes.map((st, i) => (
              <rect key={i} x={st.x} y={st.y} width={st.w} height={st.h} rx={st.rx} fill={st.c} transform={`rotate(${st.r} ${st.x + st.w / 2} ${st.y + st.h / 2})`} opacity={0.92} />
            ))}
          </g>
        </g>
      </svg>
    </a>
  );
}
