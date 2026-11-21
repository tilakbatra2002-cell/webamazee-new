import { parseDisplayDate } from "./cms/slugify";
import { site } from "./site";

/** Build an absolute URL from a path or return the site root. */
export function absoluteUrl(path?: string): string {
  if (!path) return site.url;
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Produce an ISO date (YYYY-MM-DDTHH:mm:ss.sssZ) deterministically in UTC when possible. */
export function isoDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsed = parseDisplayDate(date);
  return parsed ? parsed.toISOString() : date;
}

export interface SeoEntry {
  title: string;
  metaTitle?: string;
  metaDescription: string;
  canonical?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  twitterImage?: string;
  schemaType?: string;
  slug?: string;
  path?: string;
  breadcrumb?: { label: string; href?: string }[];
  category?: string;
  authors?: string[];
  datePublished?: string;
  dateModified?: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
  nofollow?: boolean;
}
