import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { GlobalSchema } from "@/components/seo/json-ld";
import { RouteShell } from "@/components/newhome/route-shell";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Webamazee — AI-Powered Digital Marketing Company",
    template: "%s | Webamazee",
  },
  alternates: { canonical: `${site.url}/` },
  description:
    "Webamazee is a premium AI-powered digital marketing agency for business owners, startups and SMEs around the world. Website development, SEO, AI SEO, e-commerce & Google ranking growth.",
  keywords: [
    "digital marketing agency",
    "AI marketing",
    "website development",
    "SEO agency",
    "AI SEO",
    "technical SEO",
    "local SEO",
    "e-commerce development",
    "Google ranking growth",
    "Webamazee",
  ],
  openGraph: {
    title: "Webamazee — AI-Powered Digital Marketing Company",
    description:
      "Premium AI-powered digital marketing for growth-minded businesses worldwide.",
    type: "website",
    locale: site.defaultLocale,
    url: `${site.url}/`,
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Webamazee — AI-Powered Digital Marketing Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webamazee — AI-Powered Digital Marketing Company",
    description:
      "Premium AI-powered digital marketing for growth-minded businesses worldwide.",
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        <GlobalSchema />
        <RouteShell>{children}</RouteShell>
      </body>
    </html>
  );
}
