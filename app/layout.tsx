import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { site } from "@/content/site";
import { GlassRuntime } from "@/components/glass/GlassRuntime";
import "./globals.css";

/* Geist is self-hosted by its package — no Google Fonts fetch at build. It
   now leads the --font-sans stack, replacing the earlier SF-Pro-first
   arrangement, so every platform renders the same typeface. */

/* The italic accent line on every heading. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F4F1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /* Remove this attribute for the midnight palette. */
      data-theme="light"
      className={`${GeistSans.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen antialiased">
        <GlassRuntime />
        {children}
      </body>
    </html>
  );
}
