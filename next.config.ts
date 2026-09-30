import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Case study images live outside public/ and are read by the protected
  // media route at request time, so they must ship with that function.
  outputFileTracingIncludes: {
    "/work/[slug]/media/[file]": ["./content/work/**/*"],
  },
  images: {
    // Photos are served at 90 (75 is Next's default and looked blotchy),
    // as AVIF or WebP where the browser supports them.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/work/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
