import { safeFetch, safeFetchText } from "./http";
import { normalizeUrl } from "./validators";
import type { AuditSummary } from "./types";

/**
 * Lightweight SEO analysis engine. Produces an AuditSummary of the submitted
 * homepage using real data extracted from the fetched HTML, headers and
 * supporting resources (robots.txt / sitemap.xml). It is deliberately an
 * "SEO overview", not a full crawler.
 */

function count(html: string, re: RegExp): number {
  return (html.match(re) || []).length;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function headingInfo(html: string): { tags: { tag: string; text: string; isEmpty: boolean }[]; empty: number } {
  const tags: { tag: string; text: string; isEmpty: boolean }[] = [];
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[2]);
    tags.push({ tag: `h${m[1]}`, text, isEmpty: text.length === 0 });
  }
  return { tags, empty: tags.filter((t) => t.isEmpty).length };
}

function extractDomainAndUrl(inputUrl: string): { domain: string; normalizedUrl: string } {
  const normalized = normalizeUrl(inputUrl);
  let domain = "";
  try {
    domain = new URL(normalized).hostname;
  } catch {
    domain = normalized;
  }
  return { domain, normalizedUrl: normalized };
}

export async function analyzeUrl(inputUrl: string): Promise<AuditSummary> {
  const { domain, normalizedUrl } = extractDomainAndUrl(inputUrl);
  const base = new URL(normalizedUrl);

  const baseSummary: AuditSummary = {
    domain,
    normalizedUrl,
    finalUrl: normalizedUrl,
    usesHttps: base.protocol === "https:",
    httpStatus: 0,
    responseTimeMs: 0,
    pageSizeBytes: 0,
    hasDoctype: false,
    hasLang: false,
    hasViewport: false,
    title: null,
    titleLength: 0,
    metaDescription: null,
    metaDescriptionLength: 0,
    hasMetaRobots: false,
    metaRobotsNoindex: false,
    xRobotsNoindex: false,
    hasCanonical: false,
    h1Count: 0,
    hasH2: false,
    headingTags: [],
    emptyHeadings: 0,
    wordCount: 0,
    imageCount: 0,
    imagesMissingAlt: 0,
    internalLinks: 0,
    externalLinks: 0,
    scriptCount: 0,
    stylesheetCount: 0,
    hasOpenGraph: false,
    hasStructuredData: false,
    robotsFound: false,
    robotsBlocksCrawlers: false,
    sitemapFound: false,
    sitemapState: "unknown",
    unreachable: false,
  };

  let fetch: { status: number; headers: import("node:http").IncomingHttpHeaders; body: string; finalUrl: string; responseTimeMs: number };
  try {
    fetch = await safeFetch(normalizedUrl);
  } catch {
    // Site unreachable, timeout, blocked, or failed.
    return { ...baseSummary, unreachable: true };
  }

  const html = fetch.body;
  const finalBase = new URL(fetch.finalUrl);

  // robots.txt
  const robotsUrl = new URL("/robots.txt", finalBase).href;
  let robotsFound = false;
  let robotsBlocksCrawlers = false;
  const robots = await safeFetchText(robotsUrl);
  if (robots && robots.status >= 200 && robots.status < 300) {
    robotsFound = true;
    const lower = robots.text.toLowerCase();
    const hasUserAgent = /user-agent\s*:\s*\*/.test(lower);
    const hasFullDisallow = /user-agent\s*:\s*\*\s*[\s\S]*?disallow\s*:\s*\/\s*/.test(lower);
    robotsBlocksCrawlers = hasUserAgent && hasFullDisallow;
  }

  // sitemap.xml
  let sitemapState: AuditSummary["sitemapState"] = "unknown";
  let sitemapFound = false;
  const sitemapUrl = new URL("/sitemap.xml", finalBase).href;
  const sitemap = await safeFetchText(sitemapUrl);
  if (sitemap && sitemap.status >= 200 && sitemap.status < 300 && /<urlset|<sitemapindex/i.test(sitemap.text)) {
    sitemapState = "found";
    sitemapFound = true;
  } else {
    sitemapState = "not-found";
  }

  // X-Robots-Tag header
  const xrobots = (fetch.headers["x-robots-tag"] as string | undefined) ?? "";
  const xRobotsNoindex = /noindex/i.test(xrobots);

  const metaDescriptionMatch = /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(html);
  const metaDescription = metaDescriptionMatch ? metaDescriptionMatch[1] : null;
  const hasMetaRobots = /<meta[^>]+name=["']robots["'][^>]*>/i.test(html);
  const metaRobotsNoindex = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html);
  // Capture <title> inner text
  let titleText: string | null = null;
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (titleMatch) titleText = stripTags(titleMatch[1]);

  const h1Count = count(html, /<h1\b/gi);
  const hasH2 = count(html, /<h2\b/gi) > 0;
  const { tags: headingTags, empty: emptyHeadings } = headingInfo(html);

  const hasLang = /<html[^>]*lang=["'][^"']+["']/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html);
  const hasDoctype = /<!doctype html/i.test(html);
  const hasOpenGraph = /<meta[^>]+property=["']og:/i.test(html);
  const hasStructuredData = /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(html);

  const wordCount = stripTags(html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "")).split(/\s+/).filter(Boolean).length;

  const imageCount = count(html, /<img\b/gi);
  const imagesMissingAlt = count(html, /<img\b(?![^>]*alt=)[^>]*>/gi);

  const scriptCount = count(html, /<script\b/gi);
  const stylesheetCount = count(html, /<link[^>]+rel=["']stylesheet["']/gi);

  // Links
  const allLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  let internalLinks = 0;
  let externalLinks = 0;
  for (const href of allLinks) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    let target: URL | null = null;
    try {
      target = new URL(href, finalBase);
    } catch {
      continue;
    }
    if (target.hostname === finalBase.hostname) internalLinks++;
    else externalLinks++;
  }

  return {
    ...baseSummary,
    finalUrl: fetch.finalUrl,
    usesHttps: finalBase.protocol === "https:",
    httpStatus: fetch.status,
    responseTimeMs: fetch.responseTimeMs,
    pageSizeBytes: Buffer.byteLength(html, "utf8"),
    hasDoctype,
    hasLang,
    hasViewport,
    title: titleText,
    titleLength: titleText ? titleText.length : 0,
    metaDescription: metaDescription && metaDescription !== titleText ? metaDescription : null,
    metaDescriptionLength: metaDescription ? metaDescription.length : 0,
    hasMetaRobots,
    metaRobotsNoindex,
    xRobotsNoindex,
    hasCanonical,
    h1Count,
    hasH2,
    headingTags,
    emptyHeadings,
    wordCount,
    imageCount,
    imagesMissingAlt,
    internalLinks,
    externalLinks,
    scriptCount,
    stylesheetCount,
    hasOpenGraph,
    hasStructuredData,
    robotsFound,
    robotsBlocksCrawlers,
    sitemapFound,
    sitemapState,
    unreachable: false,
  };
}
