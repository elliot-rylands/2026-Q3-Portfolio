import Image from "next/image";
import type { PostBlock } from "@/lib/posts";
import GapDemo from "./gap-demo";
import { Rich } from "./Rich";

function Demo({ id }: { id?: string }) {
  if (id === "gap") return <GapDemo />;
  // The booking demo is still being moved over from the old site.
  return (
    <div className="demo-placeholder">
      <p>Interactive demo coming back soon.</p>
    </div>
  );
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="post-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="post-h2">
                <span>{b.text}</span>
              </h2>
            );
          case "ul":
            return (
              <ul key={i}>
                {(b.items ?? []).map((item, j) => (
                  <li key={j}>
                    <Rich text={item} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <p>
                  <Rich text={b.text} />
                </p>
              </blockquote>
            );
          case "code":
            return (
              <pre key={i} className="code" data-lang={b.lang}>
                <code>{b.text}</code>
              </pre>
            );
          case "image":
            return b.image ? (
              <figure key={i}>
                <Image src={b.image.src} alt={b.image.alt} width={1280} height={800} sizes="(max-width: 688px) 100vw, 640px" />
                {b.image.caption ? <figcaption>{b.image.caption}</figcaption> : null}
              </figure>
            ) : null;
          case "demo":
            return (
              <div key={i} className="post-demo">
                <Demo id={b.demo ?? b.text} />
              </div>
            );
          case "repo":
            return null;
          default:
            return (
              <p key={i}>
                <Rich text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
