import { safeFetch, safeFetchText } from "./http";
import { normalizeUrl } from "./validators";
import { fetchPageSpeed } from "./pagespeed";
import type { AuditSummary, PerformanceMetrics } from "./types";
import {
  countImages,
  countLinks,
  countOccurrences,
  extractCanonical,
  extractLang,
  extractSchemaTypes,
  extractTitle,
  extractViewport,
  getMeta,
  hasAboutSignal,
  hasAuthorSignal,
  hasContactSignal,
  hasFaqSignal,
  hasMixedContent,
  headingInfo,
  parseRobotsSitemaps,
  robotsBlocksAll,
  wordCount,
} from "./parse";

function emptyPerformance(): PerformanceMetrics {
  return {
    available: false,
    source: "none",
    performanceScore: null,
    lcpMs: null,
    cls: null,
    inpMs: null,
    fcpMs: null,
    ttfbMs: null,
    strategy: null,
    error: "Performance data unavailable",
  };
}

function baseSummary(inputUrl: string): AuditSummary {
  const normalizedUrl = normalizeUrl(inputUrl);
  let domain = "";
  try {
    domain = new URL(normalizedUrl).hostname;
  } catch {
    domain = normalizedUrl;
  }

  return {
    domain,
    normalizedUrl,
    finalUrl: normalizedUrl,
    usesHttps: normalizedUrl.startsWith("https:"),
    httpStatus: 0,
    responseTimeMs: 0,
    pageSizeBytes: 0,
    redirectCount: 0,
    redirected: false,
    truncated: false,
    tlsInsecure: false,
    hasDoctype: false,
    hasLang: false,
    lang: null,
    hasViewport: false,
    viewportContent: null,
    hasDeviceWidth: false,
    title: null,
    titleLength: 0,
    metaDescription: null,
    metaDescriptionLength: 0,
    hasMetaRobots: false,
    metaRobotsContent: null,
    metaRobotsNoindex: false,
    xRobotsNoindex: false,
    hasCanonical: false,
    canonicalUrl: null,
    h1Count: 0,
    h1Text: null,
    h2Count: 0,
    h3Count: 0,
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
    schemaTypes: [],
    robotsFound: false,
    robotsBlocksCrawlers: false,
    sitemapFound: false,
    sitemapState: "unknown",
    sitemapUrl: null,
    mixedContent: false,
    hasHsts: false,
    hasContactSignal: false,
    hasAboutSignal: false,
    hasAuthorSignal: false,
    hasFaqSignal: false,
    hasOrgSchema: false,
    hasLocalBusinessSchema: false,
    performance: emptyPerformance(),
    unreachable: false,
    timedOut: false,
    partialFailure: false,
    warnings: [],
  };
}

/**
 * Real homepage analysis. Fetches the submitted URL, supporting resources and
 * (when configured) PageSpeed Insights. Failures of optional checks never
 * abort the whole audit.
 */
export async function analyzeUrl(inputUrl: string): Promise<AuditSummary> {
  const summary = baseSummary(inputUrl);
  const warnings: string[] = [];

  let page: Awaited<ReturnType<typeof safeFetch>>;
  try {
    page = await safeFetch(summary.normalizedUrl);
  } catch (err) {
    const code = err instanceof Error ? err.message : "REQUEST_FAILED";
    return {
      ...summary,
      unreachable: true,
      timedOut: code === "TIMEOUT" || code === "TOO_MANY_REDIRECTS",
      errorCode: code,
    };
  }

  let finalBase: URL;
  try {
    finalBase = new URL(page.finalUrl);
  } catch {
    return { ...summary, unreachable: true, errorCode: "INVALID_URL" };
  }

  const html = page.body;
  const robotsUrl = new URL("/robots.txt", finalBase).href;
  const defaultSitemapUrl = new URL("/sitemap.xml", finalBase).href;

  const [performance, robots, sitemapDirect] = await Promise.all([
    fetchPageSpeed(page.finalUrl),
    safeFetchText(robotsUrl),
    safeFetchText(defaultSitemapUrl),
  ]);

  let robotsFound = false;
  let robotsBlocksCrawlers = false;
  let sitemapFound = false;
  let sitemapState: AuditSummary["sitemapState"] = "unknown";
  let sitemapUrl: string | null = null;

  if (robots && robots.status >= 200 && robots.status < 300 && robots.text.trim()) {
    robotsFound = true;
    robotsBlocksCrawlers = robotsBlocksAll(robots.text);
    const listed = parseRobotsSitemaps(robots.text, finalBase);
    if (listed.length) {
      sitemapUrl = listed[0];
      const extra = listed[0] === defaultSitemapUrl ? null : await safeFetchText(listed[0]);
      const candidate = extra ?? sitemapDirect;
      if (candidate && candidate.status >= 200 && candidate.status < 300 && /<urlset|<sitemapindex/i.test(candidate.text)) {
        sitemapFound = true;
        sitemapState = "found";
      }
    }
  } else if (robots === null) {
    warnings.push("robots.txt could not be retrieved.");
  }

  if (!sitemapFound) {
    if (
      sitemapDirect &&
      sitemapDirect.status >= 200 &&
      sitemapDirect.status < 300 &&
      /<urlset|<sitemapindex/i.test(sitemapDirect.text)
    ) {
      sitemapFound = true;
      sitemapState = "found";
      sitemapUrl = defaultSitemapUrl;
    } else {
      sitemapState = "not-found";
    }
  }

  if (!performance.available) {
    warnings.push("Performance data unavailable");
  }

  const xrobotsHeader = page.headers["x-robots-tag"];
  const xrobots = Array.isArray(xrobotsHeader) ? xrobotsHeader.join(",") : xrobotsHeader ?? "";
  const xRobotsNoindex = /noindex/i.test(xrobots);

  const title = extractTitle(html);
  const metaDescription = getMeta(html, "description");
  const metaRobotsContent = getMeta(html, "robots");
  const canonicalUrl = extractCanonical(html);
  const lang = extractLang(html);
  const viewportContent = extractViewport(html);
  const headings = headingInfo(html);
  const images = countImages(html);
  const links = countLinks(html, finalBase);
  const schemaTypes = extractSchemaTypes(html);
  const words = wordCount(html);

  const hstsHeader = page.headers["strict-transport-security"];
  const hasHsts = Boolean(typeof hstsHeader === "string" ? hstsHeader.trim() : hstsHeader);

  const partialFailure = warnings.length > 0 || page.truncated;

  return {
    ...summary,
    domain: finalBase.hostname,
    finalUrl: page.finalUrl,
    usesHttps: finalBase.protocol === "https:",
    httpStatus: page.status,
    responseTimeMs: page.responseTimeMs,
    pageSizeBytes: Buffer.byteLength(html, "utf8"),
    redirectCount: page.redirectCount,
    redirected: page.redirectCount > 0,
    truncated: page.truncated,
    tlsInsecure: page.tlsInsecure,
    hasDoctype: /<!doctype html/i.test(html),
    hasLang: !!lang,
    lang,
    hasViewport: !!viewportContent,
    viewportContent,
    hasDeviceWidth: /width\s*=\s*device-width/i.test(viewportContent || ""),
    title,
    titleLength: title ? title.length : 0,
    metaDescription,
    metaDescriptionLength: metaDescription ? metaDescription.length : 0,
    hasMetaRobots: !!metaRobotsContent,
    metaRobotsContent,
    metaRobotsNoindex: /noindex/i.test(metaRobotsContent || ""),
    xRobotsNoindex,
    hasCanonical: !!canonicalUrl,
    canonicalUrl,
    h1Count: headings.h1Count,
    h1Text: headings.h1Text,
    h2Count: headings.h2Count,
    h3Count: headings.h3Count,
    hasH2: headings.h2Count > 0,
    headingTags: headings.tags.slice(0, 40),
    emptyHeadings: headings.empty,
    wordCount: words,
    imageCount: images.total,
    imagesMissingAlt: images.missingAlt,
    internalLinks: links.internal,
    externalLinks: links.external,
    scriptCount: countOccurrences(html, /<script\b/gi),
    stylesheetCount: countOccurrences(html, /<link\b[^>]+rel=["']stylesheet["']/gi),
    hasOpenGraph: /<meta\b[^>]+property=["']og:/i.test(html),
    hasStructuredData: schemaTypes.length > 0,
    schemaTypes,
    robotsFound,
    robotsBlocksCrawlers,
    sitemapFound,
    sitemapState,
    sitemapUrl,
    mixedContent: hasMixedContent(html, finalBase.protocol === "https:"),
    hasHsts,
    hasContactSignal: hasContactSignal(html),
    hasAboutSignal: hasAboutSignal(html),
    hasAuthorSignal: hasAuthorSignal(html),
    hasFaqSignal: hasFaqSignal(html, schemaTypes),
    hasOrgSchema: schemaTypes.some((t) => t.toLowerCase() === "organization"),
    hasLocalBusinessSchema: schemaTypes.some((t) =>
      /localbusiness|restaurant|store|dentist|attorney|medicalbusiness/i.test(t)
    ),
    performance,
    unreachable: false,
    timedOut: false,
    partialFailure,
    warnings: page.truncated
      ? [...warnings, "The page was larger than the audit size limit, so some checks used truncated HTML."]
      : warnings,
  };
}
