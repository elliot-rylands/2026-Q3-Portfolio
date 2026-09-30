import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasAccess } from "@/lib/access";
import { getStudy } from "@/lib/work";

// Case study images live in content/work/<slug>/, outside public/, and are
// only sent to visitors holding the password cookie.
const TYPES: Record<string, string> = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4" };

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; file: string }> }) {
  const { slug, file } = await params;
  if (!getStudy(slug) || !/^[\w-]+\.(webp|png|jpg|mp4)$/.test(file)) return new Response("Not found", { status: 404 });
  if (!(await hasAccess())) return new Response("Locked", { status: 401 });

  try {
    const data = await readFile(path.join(process.cwd(), "content", "work", slug, file));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
        "Cache-Control": "private, max-age=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
