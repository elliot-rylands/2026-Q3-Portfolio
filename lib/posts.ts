// Words: posts live in lib/posts/<slug>.ts. To publish one, import it and add it to `posts`.
import { aiCraftBar } from "./posts/ai-craft-bar";
import { clockingOff } from "./posts/clocking-off";
import { holdNote } from "./posts/rethinking-booking-ux-with-motion";
import { theGapGetsSmaller } from "./posts/the-gap-gets-smaller";

export type PostImage = { src: string; alt: string; caption?: string; width?: number; height?: number };

export type PostBlock = {
  type: "p" | "h2" | "code" | "demo" | "image" | "ul" | "quote" | "repo" | "stats" | "compare" | "timeline" | "callout";
  text: string;
  lang?: string;
  demo?: string;
  image?: PostImage;
  items?: string[];
  // Case study blocks for image-free stories
  stats?: { value: string; label: string }[];
  compare?: { before: { label: string; items: string[] }; after: { label: string; items: string[] } };
  steps?: { when: string; title: string; text: string }[];
  label?: string; // callout eyebrow, e.g. "The strategic call"
  cite?: { name: string; role?: string; href?: string }; // quote attribution
};

export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO, e.g. 2026-07-19
  readTime: number; // minutes
  body: PostBlock[];
};

export const posts: Post[] = [holdNote, theGapGetsSmaller, clockingOff, aiCraftBar].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string, style: "short" | "long" = "short") {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    ...(style === "long" ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(d);
}
