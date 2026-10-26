"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";
import s from "@/app/soon.module.css";

// Columns of photos that drift at different speeds as the page scrolls.
// Transform only, one rAF per frame, and it stays still for anyone who
// prefers reduced motion.
const SPEEDS = [-0.18, 0.12, -0.08, 0.2];

export function DriftingPhotos({ photos, columns = 4 }: { photos: Photo[]; columns?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cols = Array.from(root.querySelectorAll<HTMLElement>("[data-drift]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      // 0 when the wall is centred on screen, negative before, positive after.
      const progress = window.innerHeight / 2 - (box.top + box.height / 2);
      cols.forEach((c) => {
        const speed = Number(c.dataset.drift);
        c.style.transform = `translate3d(0, ${(progress * speed).toFixed(1)}px, 0)`;
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

  const lanes: Photo[][] = Array.from({ length: columns }, () => []);
  photos.forEach((p, i) => lanes[i % columns].push(p));

  return (
    <div ref={ref} className={s.wall} aria-label="Photographs I've taken around the Rockies and further afield" role="region">
      {lanes.map((lane, i) => (
        <ul key={i} className={s.lane} data-drift={SPEEDS[i % SPEEDS.length]}>
          {lane.map((p) => (
            <li key={p.src} className={s.tile}>
              <figure>
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 700px) 50vw, 25vw" quality={85} />
              </figure>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
