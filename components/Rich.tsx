import Link from "next/link";
import type { ReactNode } from "react";

// Renders the small inline markdown used in posts: **bold**, `code` and [text](href).
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(<strong key={i++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      out.push(<code key={i++}>{tok.slice(1, -1)}</code>);
    } else {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/) ?? [];
      const external = /^https?:/.test(href ?? "");
      out.push(
        external ? (
          <a key={i++} href={href} target="_blank" rel="noopener">
            {label}
          </a>
        ) : (
          <Link key={i++} href={href ?? "/"}>
            {label}
          </Link>
        ),
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
