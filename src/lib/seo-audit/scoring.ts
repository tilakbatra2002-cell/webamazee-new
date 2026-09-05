import type {
  AuditCategory,
  AuditCategoryKey,
  AuditFinding,
  AuditPositive,
  AuditScore,
  AuditStatus,
  AuditSummary,
  FindingSeverity,
} from "./types";

/**
 * Deterministic Webamazee website health score.
 *
 * Categories that cannot be measured (for example PageSpeed when the API key
 * is missing) are excluded from the overall score rather than invented.
 *
 * Weights:
 *   Technical SEO 25% · On-Page SEO 20% · Performance 20% · Mobile 10%
 *   Security 10% · Structured Data 5% · AI Search Readiness 10%
 */

const WEIGHTS: Record<AuditCategoryKey, number> = {
  technical: 0.25,
  onpage: 0.2,
  performance: 0.2,
  mobile: 0.1,
  security: 0.1,
  structured: 0.05,
  aiReadiness: 0.1,
};

const LABELS: Record<AuditCategoryKey, string> = {
  technical: "Technical SEO",
  onpage: "On-Page SEO",
  performance: "Performance",
  mobile: "Mobile",
  security: "Security",
  structured: "Structured Data",
  aiReadiness: "AI Search Readiness",
};

function statusFromScore(score: number | null): AuditStatus {
  if (score === null) return "unknown";
  if (score >= 80) return "good";
  if (score >= 55) return "warning";
  return "critical";
}

function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function ratio(passed: number, total: number): number {
  if (total <= 0) return 0;
  return clampScore((passed / total) * 100);
}

function computeCategories(s: AuditSummary): AuditCategory[] {
  const technical = ratio(
    [
      s.httpStatus >= 200 && s.httpStatus < 400,
      s.usesHttps,
      s.robotsFound,
      s.sitemapFound,
      s.hasCanonical,
      !s.metaRobotsNoindex && !s.xRobotsNoindex,
      !s.robotsBlocksCrawlers,
      s.hasLang,
      s.hasDoctype,
    ].filter(Boolean).length,
    9
  );

  const onpage = ratio(
    [
      !!s.title,
      s.titleLength >= 30 && s.titleLength <= 60,
      !!s.metaDescription,
      !!s.metaDescription && s.metaDescriptionLength >= 70 && s.metaDescriptionLength <= 160,
      s.h1Count === 1,
      s.hasH2,
      s.emptyHeadings === 0,
      s.imagesMissingAlt === 0,
      s.internalLinks > 0,
      s.hasOpenGraph,
    ].filter(Boolean).length,
    10
  );

  let performance: AuditCategory;
  const psiScore = s.performance.performanceScore;
  if (!s.performance.available || psiScore === null) {
    performance = {
      key: "performance",
      label: LABELS.performance,
      score: null,
      status: "unknown",
      available: false,
      unavailableReason: "Performance data unavailable",
    };
  } else {
    const p = s.performance;
    const checks = [
      psiScore >= 50,
      psiScore >= 80,
      p.lcpMs === null || p.lcpMs <= 2500,
      p.cls === null || p.cls <= 0.1,
      p.inpMs === null || p.inpMs <= 200,
      p.fcpMs === null || p.fcpMs <= 1800,
      p.ttfbMs === null || p.ttfbMs <= 800,
    ];
    const blended = clampScore(psiScore * 0.7 + ratio(checks.filter(Boolean).length, checks.length) * 0.3);
    performance = {
      key: "performance",
      label: LABELS.performance,
      score: blended,
      status: statusFromScore(blended),
      available: true,
    };
  }

  const mobileChecks = [s.hasViewport, s.hasDeviceWidth];
  let mobileScore = ratio(mobileChecks.filter(Boolean).length, mobileChecks.length);
  if (s.performance.available && s.performance.performanceScore !== null) {
    mobileScore = clampScore(mobileScore * 0.45 + s.performance.performanceScore * 0.55);
  }

  const security = s.usesHttps
    ? ratio(
        [true, !s.mixedContent, !s.tlsInsecure, s.hasHsts].filter(Boolean).length,
        4
      )
    : 20;

  const usefulSchema = [
    "Organization",
    "LocalBusiness",
    "Product",
    "Article",
    "BreadcrumbList",
    "FAQPage",
    "WebSite",
    "Person",
  ];
  const detectedUseful = s.schemaTypes.filter((t) =>
    usefulSchema.some((u) => u.toLowerCase() === t.toLowerCase())
  ).length;
  let structuredScore = 20;
  if (s.hasStructuredData) structuredScore = 55 + Math.min(45, detectedUseful * 12);
  if (!s.hasStructuredData) structuredScore = 18;

  const aiChecks = [
    s.hasOrgSchema || s.hasLocalBusinessSchema,
    s.hasAboutSignal,
    s.hasContactSignal,
    s.hasAuthorSignal || s.hasOrgSchema,
    s.hasStructuredData,
    s.h1Count === 1 && s.hasH2,
    !s.metaRobotsNoindex && !s.xRobotsNoindex && !s.robotsBlocksCrawlers,
    s.wordCount >= 300,
    s.hasFaqSignal,
    !!s.title && s.titleLength >= 20,
  ];
  const aiReadiness = ratio(aiChecks.filter(Boolean).length, aiChecks.length);

  return [
    { key: "technical", label: LABELS.technical, score: technical, status: statusFromScore(technical), available: true },
    { key: "onpage", label: LABELS.onpage, score: onpage, status: statusFromScore(onpage), available: true },
    performance,
    { key: "mobile", label: LABELS.mobile, score: mobileScore, status: statusFromScore(mobileScore), available: true },
    { key: "security", label: LABELS.security, score: security, status: statusFromScore(security), available: true },
    {
      key: "structured",
      label: LABELS.structured,
      score: clampScore(structuredScore),
      status: statusFromScore(structuredScore),
      available: true,
    },
    {
      key: "aiReadiness",
      label: LABELS.aiReadiness,
      score: aiReadiness,
      status: statusFromScore(aiReadiness),
      available: true,
    },
  ];
}

export function computeScore(s: AuditSummary): AuditScore {
  const categories = computeCategories(s);
  let total = 0;
  let weightSum = 0;
  for (const cat of categories) {
    if (cat.score === null || !cat.available) continue;
    total += cat.score * WEIGHTS[cat.key];
    weightSum += WEIGHTS[cat.key];
  }
  const overall = weightSum ? clampScore(total / weightSum) : null;
  return { overall, categories };
}

function finding(
  id: string,
  category: AuditCategoryKey,
  severity: FindingSeverity,
  title: string,
  whyItMatters: string,
  howToFix: string
): AuditFinding {
  return { id, category, severity, title, whyItMatters, howToFix };
}

export function buildTopFindings(s: AuditSummary): AuditFinding[] {
  const findings: AuditFinding[] = [];

  if (s.httpStatus >= 400) {
    findings.push(
      finding(
        "http-status",
        "technical",
        "critical",
        `HTTP status ${s.httpStatus}`,
        "Search engines and visitors may not be able to access the page reliably.",
        "Fix the server or application error so the homepage returns a 200 response."
      )
    );
  }
  if (!s.usesHttps) {
    findings.push(
      finding(
        "no-https",
        "security",
        "critical",
        "Website is not served over HTTPS",
        "Browsers mark HTTP sites as not secure, and search engines treat HTTPS as a baseline ranking and trust signal.",
        "Install a valid TLS certificate and redirect all HTTP traffic to HTTPS."
      )
    );
  }
  if (s.tlsInsecure) {
    findings.push(
      finding(
        "tls-insecure",
        "security",
        "high",
        "TLS certificate could not be verified",
        "An untrusted or mismatched certificate can block visitors and crawlers, and weakens trust.",
        "Renew or replace the certificate and ensure it matches the live hostname, including www and non-www variants."
      )
    );
  }
  if (s.metaRobotsNoindex || s.xRobotsNoindex) {
    findings.push(
      finding(
        "noindex",
        "technical",
        "critical",
        "Page is set to noindex",
        "A noindex directive tells search engines not to include this page in search results.",
        "Remove noindex from the meta robots tag and X-Robots-Tag header unless the page is intentionally excluded."
      )
    );
  }
  if (s.robotsBlocksCrawlers) {
    findings.push(
      finding(
        "robots-blocks",
        "technical",
        "critical",
        "robots.txt may block crawling",
        "A Disallow: / rule for all user agents can prevent search engines from crawling the site.",
        "Update robots.txt so public pages are crawlable. Keep Disallow rules only for areas that should stay private."
      )
    );
  }
  if (!s.title) {
    findings.push(
      finding(
        "missing-title",
        "onpage",
        "critical",
        "Missing title tag",
        "The title tag is a primary on-page signal and is often used as the search result headline.",
        "Add a unique, descriptive title that reflects the page's topic, ideally 30–60 characters."
      )
    );
  } else if (s.titleLength < 30 || s.titleLength > 60) {
    findings.push(
      finding(
        "title-length",
        "onpage",
        s.titleLength > 70 ? "high" : "opportunity",
        "Title tag length",
        `The title is ${s.titleLength} characters. Titles outside roughly 30–60 characters may be truncated or look thin in search results.`,
        "Rewrite the title so it is unique, specific and comfortably within 30–60 characters."
      )
    );
  }
  if (!s.metaDescription) {
    findings.push(
      finding(
        "missing-meta-description",
        "onpage",
        "high",
        "Missing meta description",
        "Search engines may have less useful information available for generating the page snippet.",
        "Add a unique, descriptive meta description relevant to the page, roughly 70–160 characters."
      )
    );
  } else if (s.metaDescriptionLength < 70 || s.metaDescriptionLength > 160) {
    findings.push(
      finding(
        "meta-description-length",
        "onpage",
        "opportunity",
        "Meta description length",
        `The meta description is ${s.metaDescriptionLength} characters. A length around 70–160 characters tends to display more cleanly.`,
        "Edit the meta description so it summarises the page and fits within 70–160 characters."
      )
    );
  }
  if (s.h1Count === 0) {
    findings.push(
      finding(
        "missing-h1",
        "onpage",
        "high",
        "Missing H1 heading",
        "An H1 helps people and crawlers understand the main topic of the page.",
        "Add one clear H1 that describes the primary subject of the homepage."
      )
    );
  } else if (s.h1Count > 1) {
    findings.push(
      finding(
        "multiple-h1",
        "onpage",
        "opportunity",
        "Multiple H1 headings",
        `${s.h1Count} H1 tags were detected. Extra H1s can dilute the main topic of the page.`,
        "Keep a single H1 for the primary heading and use H2/H3 for supporting sections."
      )
    );
  }
  if (!s.hasH2) {
    findings.push(
      finding(
        "missing-h2",
        "onpage",
        "opportunity",
        "No H2 headings detected",
        "Subheadings help readers scan the page and give crawlers a clearer outline of the content.",
        "Add descriptive H2 (and H3) headings that organise the page into clear sections."
      )
    );
  }
  if (s.emptyHeadings > 0) {
    findings.push(
      finding(
        "empty-headings",
        "onpage",
        "opportunity",
        "Empty headings",
        `${s.emptyHeadings} heading${s.emptyHeadings === 1 ? "" : "s"} appear to be empty, which adds noise without helping structure.`,
        "Remove empty heading tags or give them meaningful text."
      )
    );
  }
  if (s.imagesMissingAlt > 0) {
    findings.push(
      finding(
        "images-missing-alt",
        "onpage",
        s.imagesMissingAlt > s.imageCount * 0.5 ? "high" : "opportunity",
        "Images missing alt text",
        `${s.imagesMissingAlt} of ${s.imageCount} images have no alt attribute. Alt text helps accessibility and gives crawlers more context.`,
        "Add concise, descriptive alt text to informative images. Decorative images can use an empty alt attribute."
      )
    );
  }
  if (s.wordCount > 0 && s.wordCount < 200) {
    findings.push(
      finding(
        "thin-content",
        "onpage",
        "opportunity",
        "Thin page content",
        `Approximately ${s.wordCount} words were detected. Thin homepages can make it harder to understand what the business offers.`,
        "Add useful, specific content that explains who you help, what you do and why it matters."
      )
    );
  }
  if (!s.hasCanonical) {
    findings.push(
      finding(
        "no-canonical",
        "technical",
        "opportunity",
        "Missing canonical tag",
        "Without a canonical URL, duplicate versions of the page (www, HTTP, parameters) can compete with each other.",
        "Add a rel=canonical tag pointing to the preferred homepage URL."
      )
    );
  }
  if (!s.robotsFound) {
    findings.push(
      finding(
        "no-robots",
        "technical",
        "opportunity",
        "robots.txt not found",
        "A robots.txt file helps crawlers understand which parts of the site they may access and often points to the sitemap.",
        "Publish a robots.txt file at the site root and include a Sitemap directive if you have one."
      )
    );
  }
  if (!s.sitemapFound) {
    findings.push(
      finding(
        "no-sitemap",
        "technical",
        "opportunity",
        "XML sitemap not found",
        "A sitemap helps search engines discover important URLs, especially on larger or newer sites.",
        "Publish an XML sitemap and reference it in robots.txt."
      )
    );
  }
  if (!s.hasViewport) {
    findings.push(
      finding(
        "no-viewport",
        "mobile",
        "high",
        "Missing mobile viewport",
        "Without a viewport meta tag, mobile browsers may render a desktop layout that is hard to use.",
        'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the document head.'
      )
    );
  } else if (!s.hasDeviceWidth) {
    findings.push(
      finding(
        "viewport-not-device-width",
        "mobile",
        "opportunity",
        "Viewport is not device-width",
        "The viewport tag does not include width=device-width, which is the usual signal that the layout is intended to be responsive.",
        "Update the viewport meta tag to include width=device-width, initial-scale=1."
      )
    );
  }
  if (s.mixedContent) {
    findings.push(
      finding(
        "mixed-content",
        "security",
        "high",
        "Mixed content detected",
        "HTTP images, scripts or stylesheets on an HTTPS page can be blocked by browsers and weaken the secure context.",
        "Serve all page resources over HTTPS, or update their URLs to protocol-relative or HTTPS addresses."
      )
    );
  }
  if (!s.hasStructuredData) {
    findings.push(
      finding(
        "no-schema",
        "structured",
        "opportunity",
        "No structured data detected",
        "JSON-LD or Schema.org markup was not detected. Structured data can help search engines understand the organisation, content and entities on the page.",
        "Add JSON-LD for relevant types such as Organization, LocalBusiness, WebSite or BreadcrumbList. Detection is not the same as validation."
      )
    );
  }
  if (s.performance.available && s.performance.lcpMs !== null && s.performance.lcpMs > 2500) {
    findings.push(
      finding(
        "slow-lcp",
        "performance",
        s.performance.lcpMs > 4000 ? "high" : "opportunity",
        "Largest Contentful Paint is slow",
        `LCP was about ${Math.round(s.performance.lcpMs)} ms. Slow main content can hurt both user experience and performance scores.`,
        "Optimise the main hero image or heading, reduce render-blocking resources and improve server response time."
      )
    );
  }
  if (s.performance.available && s.performance.cls !== null && s.performance.cls > 0.1) {
    findings.push(
      finding(
        "high-cls",
        "performance",
        "opportunity",
        "Layout shift is high",
        `CLS was ${s.performance.cls.toFixed(2)}. Unexpected movement makes pages harder to use, especially on mobile.`,
        "Reserve space for images and embeds, and avoid inserting content above existing content after load."
      )
    );
  }
  if (!s.hasContactSignal) {
    findings.push(
      finding(
        "weak-contact",
        "aiReadiness",
        "opportunity",
        "Limited contact information detected",
        "Clear contact details help people and AI-powered search experiences identify how to reach the business.",
        "Add a visible phone number, email or contact page, and consider Organization or LocalBusiness structured data."
      )
    );
  }
  if (!s.hasAboutSignal && !s.hasOrgSchema) {
    findings.push(
      finding(
        "weak-entity",
        "aiReadiness",
        "opportunity",
        "Limited organisation information",
        "AI search readiness looks at whether the site clearly describes the organisation behind it. An About page or Organization markup was not detected.",
        "Add an About page and Organization (or LocalBusiness) JSON-LD with the business name, URL and contact details."
      )
    );
  }

  const order: Record<FindingSeverity, number> = { critical: 0, high: 1, opportunity: 2 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 12);
}

export function buildPositives(s: AuditSummary): AuditPositive[] {
  const items: AuditPositive[] = [];
  if (s.usesHttps) items.push({ id: "https", title: "HTTPS enabled" });
  if (s.httpStatus >= 200 && s.httpStatus < 400) {
    items.push({ id: "status", title: `HTTP ${s.httpStatus} response` });
  }
  if (s.hasViewport) items.push({ id: "viewport", title: "Mobile viewport detected" });
  if (s.title) items.push({ id: "title", title: "Title tag detected" });
  if (s.metaDescription) items.push({ id: "meta", title: "Meta description detected" });
  if (s.h1Count === 1) items.push({ id: "h1", title: "H1 detected" });
  if (s.hasCanonical) items.push({ id: "canonical", title: "Canonical detected" });
  if (s.robotsFound && !s.robotsBlocksCrawlers) items.push({ id: "robots", title: "robots.txt found" });
  if (s.sitemapFound) items.push({ id: "sitemap", title: "XML sitemap found" });
  if (s.hasStructuredData) items.push({ id: "schema", title: "Structured data detected" });
  if (!s.mixedContent && s.usesHttps) items.push({ id: "no-mixed", title: "No mixed-content resources detected" });
  if (s.hasOpenGraph) items.push({ id: "og", title: "Open Graph tags detected" });
  if (s.hasHsts) items.push({ id: "hsts", title: "HSTS header detected" });
  if (s.performance.available && s.performance.performanceScore !== null && s.performance.performanceScore >= 80) {
    items.push({ id: "psi", title: "Strong mobile performance score" });
  }
  return items;
}

/** @deprecated Use buildTopFindings. Kept as an alias for older imports. */
export const buildFindings = buildTopFindings;
