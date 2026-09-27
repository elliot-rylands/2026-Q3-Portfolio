"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/photos";

// Masonry-style grid. Clicking a photo opens it large in a native <dialog>
// over the same blurred backdrop as the case study lightbox. Photos are view
// only: no download links, right-click and drag-to-save are blocked.
export function PhotoGrid({ photos, reveal = false }: { photos: Photo[]; reveal?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <div className="photo-grid photo-grid-empty" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="photo-tile photo-placeholder" style={{ aspectRatio: i % 3 === 1 ? "4 / 5" : "3 / 2" }} />
        ))}
      </div>
    );
  }

  return (
    <>
      <ul className="photo-grid protected" onContextMenu={(e) => e.preventDefault()}>
        {photos.map((p, i) => (
          <li key={p.src} className="photo-tile" data-reveal={reveal || undefined}>
            <button
              type="button"
              className="photo-button"
              onClick={() => {
                setOpen(p);
                ref.current?.showModal();
              }}
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 688px) 50vw, 320px"
                priority={i < 2}
                draggable={false}
              />
            </button>
            {p.caption ? <p className="photo-caption">{p.caption}</p> : null}
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        className="photo-dialog protected"
        onContextMenu={(e) => e.preventDefault()}
        aria-label={open?.alt ?? "Photo"}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        onClose={() => setOpen(null)}
      >
        {open ? (
          <figure>
            <Image
              src={open.src}
              alt={open.alt}
              width={open.width}
              height={open.height}
              sizes="94vw"
              quality={85}
              draggable={false}
              style={{ "--ar": open.width / open.height } as React.CSSProperties}
            />
            {open.caption ? <figcaption>{open.caption}</figcaption> : null}
          </figure>
        ) : null}
        <button type="button" className="round-btn photo-close" onClick={() => ref.current?.close()} aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
