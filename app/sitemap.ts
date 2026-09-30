import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

// Only pages meant to be indexed. Case studies stay out: /work/ is disallowed
// in robots.ts and each study is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://elliotrylands.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/words`, changeFrequency: "monthly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${base}/words/${p.slug}`, lastModified: p.date, priority: 0.6 })),
    { url: `${base}/photography`, changeFrequency: "yearly", priority: 0.4 },
  ];
}
