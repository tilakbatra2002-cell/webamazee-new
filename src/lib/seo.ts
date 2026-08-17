import { site } from "./site";

/** Build an absolute URL from a path or return the site root. */
export function absoluteUrl(path?: string): string {
  if (!path) return site.url;
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Produce an ISO date (YYYY-MM-DD) from a human-readable date string if possible. */
export function isoDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString();
}

export interface SeoEntry {
  title: string;
  metaTitle?: string;
  metaDescription: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  twitterImage?: string;
  schemaType?: string;
  slug?: string;
  path?: string;
  breadcrumb?: { label: string; href?: string }[];
  category?: string;
  authors?: string[];
  datePublished?: string;
  dateModified?: string;
  noindex?: boolean;
  nofollow?: boolean;
}
