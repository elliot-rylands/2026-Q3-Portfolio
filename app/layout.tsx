import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · ${site.role}`,
  description: `${site.intro} Currently designing and building at Jane from Cochrane, near the Canadian Rockies.`,
  openGraph: {
    title: site.name,
    description: site.intro,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

// Structured data so search engines and AI screeners read who this is as text.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Design Engineer",
  worksFor: { "@type": "Organization", name: "Jane", url: "https://jane.app" },
  address: { "@type": "PostalAddress", addressLocality: "Cochrane", addressRegion: "AB", addressCountry: "CA" },
  sameAs: [site.links.linkedin, site.links.github, site.links.dribbble],
  email: site.links.email,
};

// Google Analytics 4 (elliotrylands.com stream). NEXT_PUBLIC_GA_ID in Vercel overrides it.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-4RG566TMBN";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide scroll-reveal elements before first paint so they don't flash.
            If the app never hydrates, show everything after 3s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('reveal-ready');setTimeout(function(){if(!window.__reveal)document.documentElement.classList.add('reveal-fallback')},3000);",
          }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
