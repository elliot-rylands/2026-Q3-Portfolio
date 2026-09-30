// Case studies: each lives in lib/work/<slug>.ts and is listed in `studies`.
// Images live in content/work/<slug>/ (not public/) and are served by
// app/work/[slug]/media/[file], which checks the password cookie first.
import type { PostBlock } from "./posts";
import { scan } from "./work/scan";

export type Stat = { value: string; label: string };

export type CaseStudy = {
  slug: string; // matches the project slug in lib/site.ts
  title: string; // outcome title, "Verb-ing who outcome"
  dek: string;
  meta: { label: string; value: string }[];
  work: Stat[]; // what I did, counted from the work itself
  scale?: { heading: string; note: string; stats: Stat[] }; // company context, never claimed as my result
  notice?: string; // shown in an alert box above the story
  body: PostBlock[];
  sources?: { label: string; href: string }[];
};

export const studies: CaseStudy[] = [scan];

export function getStudy(slug: string) {
  return studies.find((s) => s.slug === slug);
}

// Case study images are 1757 x 1318 exports on the pink frame.
export const mediaSize = { width: 1757, height: 1318 };
export const media = (slug: string, file: string) => `/work/${slug}/media/${file}`;
