"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/photos";

function DownloadLink({ photo, className }: { photo: Photo; className: string }) {
  const name = photo.src.split("/").pop();
  return (
    <a href={photo.src} download={name} className={className} aria-label={`Download photo: ${photo.alt}`}>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10" />
      </svg>
      <span>Download</span>
    </a>
  );
}

// Masonry-style grid. Clicking a photo opens it large in a native <dialog>
// over the same blurred backdrop as the case study lightbox.
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
      <ul className="photo-grid">
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
              />
            </button>
            <div className="photo-meta">
              {p.caption ? <p className="photo-caption">{p.caption}</p> : <span />}
              <DownloadLink photo={p} className="photo-download" />
            </div>
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        className="photo-dialog"
        aria-label={open?.alt ?? "Photo"}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        onClose={() => setOpen(null)}
      >
        {open ? (
          <figure>
            <Image src={open.src} alt={open.alt} width={open.width} height={open.height} sizes="92vw" />
            <figcaption>
              <span>{open.caption ?? ""}</span>
              <DownloadLink photo={open} className="photo-download photo-download-strong" />
            </figcaption>
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
