import type { Metadata } from "next";
import { buildSitemap, countSitemapLinks } from "@/lib/sitemap-pages";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { SitemapDirectoryClient } from "./sitemap-directory-client";

const pagePath = "/new-sitemap";
const pageUrl = `${site.url}${pagePath}`;
const pageTitle = "Website Directory & Sitemap";
const pageDescription =
  "Find everything in one place. Browse Webamazee's services, industries, products, insights, projects and the markets we serve.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: false },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: site.name,
    locale: site.defaultLocale,
    type: "website",
    images: [
      {
        url: absoluteUrl(site.ogImage),
        width: 1200,
        height: 630,
        alt: `${pageTitle} | ${site.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    site: site.twitterHandle,
    images: [absoluteUrl(site.ogImage)],
  },
};

export default function NewSitemapPage() {
  const sections = buildSitemap();
  const totalLinks = countSitemapLinks(sections);

  return <SitemapDirectoryClient sections={sections} totalLinks={totalLinks} />;
}
