import type { Metadata } from "next";
import { buildSitemap, countSitemapLinks } from "@/lib/sitemap-pages";
import { getPublishedPosts } from "@/lib/cms/public-blogs";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { SitemapDirectoryClient } from "./sitemap-directory-client";

export const revalidate = 60;

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

export default async function NewSitemapPage() {
  const publishedPosts = await getPublishedPosts();
  const sections = buildSitemap(publishedPosts);
  const totalLinks = countSitemapLinks(sections);

  return <SitemapDirectoryClient sections={sections} totalLinks={totalLinks} />;
}
