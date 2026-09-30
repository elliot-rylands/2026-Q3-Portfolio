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
              <div key={i} className="label-row post-sub">
                <h2 className="label">{b.text}</h2>
              </div>
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
              <figure key={i} className={b.cite ? "pb-quote" : undefined}>
                <blockquote>
                  <p>
                    <Rich text={b.text} />
                  </p>
                </blockquote>
                {b.cite ? (
                  <figcaption>
                    {b.cite.href ? (
                      <a href={b.cite.href} target="_blank" rel="noopener">{b.cite.name}</a>
                    ) : (
                      b.cite.name
                    )}
                    {b.cite.role ? <span>, {b.cite.role}</span> : null}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "stats":
            return (
              <dl key={i} className="pb-stats">
                {(b.stats ?? []).map((s) => (
                  <div key={s.label}>
                    <dt>{s.value}</dt>
                    <dd>{s.label}</dd>
                  </div>
                ))}
              </dl>
            );
          case "compare":
            return b.compare ? (
              <div key={i} className="pb-compare">
                {[b.compare.before, b.compare.after].map((side, j) => (
                  <div key={side.label} className={j === 0 ? "pb-before" : "pb-after"}>
                    <p className="pb-eyebrow">{side.label}</p>
                    <ul>
                      {side.items.map((it) => (
                        <li key={it}>
                          <Rich text={it} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null;
          case "timeline":
            return (
              <ol key={i} className="pb-timeline">
                {(b.steps ?? []).map((s) => (
                  <li key={s.title}>
                    <span className="pb-when">{s.when}</span>
                    <strong>{s.title}</strong>
                    <p>
                      <Rich text={s.text} />
                    </p>
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={i} className="pb-callout">
                {b.label ? <p className="pb-eyebrow">{b.label}</p> : null}
                <p>
                  <Rich text={b.text} />
                </p>
              </aside>
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
                {b.image.src.startsWith("/work/") ? (
                  // Password-protected case study image: served by a route that checks
                  // the cookie, so it skips Next's (public, cached) image optimiser.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.image.src} alt={b.image.alt} width={b.image.width ?? 1757} height={b.image.height ?? 1318} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
                ) : (
                  <Image src={b.image.src} alt={b.image.alt} width={1280} height={800} sizes="(max-width: 688px) 100vw, 640px" />
                )}
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
