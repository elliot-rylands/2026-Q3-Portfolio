import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";

// Homepage teaser: six photos, three by two. The whole block links to /photography.
export function PhotoStrip({ photos }: { photos: Photo[] }) {
  const shown = photos.slice(0, 6);
  return (
    <Link href="/photography" className="photo-strip protected" aria-label="See all photography" data-reveal>
      {shown.length === 0
        ? Array.from({ length: 6 }).map((_, i) => <span key={i} className="photo-strip-cell photo-placeholder" />)
        : shown.map((p) => (
            <span key={p.src} className="photo-strip-cell">
              <Image src={p.src} alt="" width={p.width} height={p.height} sizes="(max-width: 688px) 33vw, 220px" draggable={false} />
            </span>
          ))}
    </Link>
  );
}
