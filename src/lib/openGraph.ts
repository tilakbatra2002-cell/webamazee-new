import type { Metadata } from "next";
import { absoluteUrl } from "./seo";
import { site } from "./site";

/**
 * OpenGraph + Twitter generators.
 * Kept as focused helpers for reuse where a fuller generator isn't needed.
 */

export function openGraphMeta(entry: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  publishedTime?: string;
}) {
  return {
    title: entry.title,
    description: entry.description,
    type: entry.type ?? "website",
    url: absoluteUrl(entry.url),
    siteName: site.name,
    locale: site.defaultLocale,
    images: [{ url: absoluteUrl(entry.image ?? site.ogImage), width: 1200, height: 630, alt: entry.title }],
    ...(entry.publishedTime ? { publishedTime: entry.publishedTime } : {}),
  };
}

export function twitterMeta(entry: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    title: entry.title,
    description: entry.description,
    site: site.twitterHandle,
    images: [absoluteUrl(entry.image ?? site.ogImage)],
  };
}

/** Assemble the OpenGraph + Twitter subset of a Next.js Metadata object. */
export function generateOpenGraph(entry: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  publishedTime?: string;
  twitterImage?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: openGraphMeta(entry),
    twitter: twitterMeta({ title: entry.title, description: entry.description, image: entry.twitterImage ?? entry.image }),
  };
}
