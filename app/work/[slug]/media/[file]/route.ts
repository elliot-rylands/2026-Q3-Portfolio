import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasAccess } from "@/lib/access";
import { projects } from "@/lib/site";
import { getStudy } from "@/lib/work";

// Case study images live in content/work/<slug>/, outside public/, and are
// only sent to visitors holding the password cookie (unless the project is unlocked).
const TYPES: Record<string, string> = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4" };

export async function GET(req: Request, { params }: { params: Promise<{ slug: string; file: string }> }) {
  const { slug, file } = await params;
  if (!getStudy(slug) || !/^[\w-]+\.(webp|png|jpg|mp4)$/.test(file)) return new Response("Not found", { status: 404 });
  const locked = projects.find((p) => p.slug === slug)?.locked ?? true;
  if (locked && !(await hasAccess())) return new Response("Locked", { status: 401 });

  try {
    const data = await readFile(path.join(process.cwd(), "content", "work", slug, file));
    const headers: Record<string, string> = {
      "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
      "Cache-Control": locked ? "private, max-age=86400" : "public, max-age=86400",
      "X-Robots-Tag": "noindex, nofollow",
      "Accept-Ranges": "bytes",
    };
    // Safari only plays video from servers that answer byte-range requests.
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get("range") ?? "");
    if (range && (range[1] || range[2])) {
      const size = data.length;
      const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      if (start >= size || start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
      return new Response(new Uint8Array(data.subarray(start, end + 1)), {
        status: 206,
        headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
      });
    }
    return new Response(new Uint8Array(data), { headers: { ...headers, "Content-Length": String(data.length) } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
