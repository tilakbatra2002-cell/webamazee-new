import type { Metadata } from "next";
import { absoluteUrl, isoDate, type SeoEntry } from "./seo";
import { site, siteDefaults } from "./site";

/** Map string author names to the Author object shape Next expects. */
function toAuthors(names: string[]): { name: string }[] {
  return names.map((name) => ({ name }));
}

/**
 * Centralized metadata generator.
 * Produces a complete Next.js `Metadata` object (title, description, canonical,
 * robots, keywords, OpenGraph, Twitter) from a single data-driven `SeoEntry`.
 */
export function generateMetadata(entry: SeoEntry): Metadata {
  const canonical = absoluteUrl(entry.canonical ?? entry.path ?? "/");
  const ogImage = absoluteUrl(entry.ogImage ?? site.ogImage);
  const twitterImage = absoluteUrl(entry.twitterImage ?? entry.ogImage ?? site.ogImage);
  const title = entry.metaTitle ?? entry.title;
  const description = entry.metaDescription;

  const robots = {
    index: entry.noindex ? false : siteDefaults.robots.index,
    follow: entry.nofollow ? false : siteDefaults.robots.follow,
  };

  return {
    title,
    description,
    keywords: entry.keywords,
    authors: toAuthors(entry.authors ?? [...siteDefaults.authors]),
    category: entry.category ?? siteDefaults.category,
    creator: siteDefaults.creator,
    publisher: siteDefaults.publisher,
    robots,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: entry.schemaType === "article" || entry.schemaType === "blog"
        ? "article"
        : entry.schemaType === "profile"
          ? "profile"
          : "website",
      url: canonical,
      siteName: site.name,
      locale: site.defaultLocale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(entry.datePublished ? { publishedTime: isoDate(entry.datePublished) } : {}),
      ...(entry.dateModified ? { modifiedTime: isoDate(entry.dateModified) } : {}),
      ...(entry.authors && entry.authors.length ? { authors: entry.authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: site.twitterHandle,
      images: [twitterImage],
    },
  };
}

/** Convenience wrapper for pages that only need a static entry. */
export function pageMetadata(entry: SeoEntry): Metadata {
  return generateMetadata(entry);
}
