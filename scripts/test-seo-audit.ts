import assert from "node:assert/strict";
import { validateUrl, isDisallowedHostname, isPrivateOrReservedIpv4 } from "../src/lib/seo-audit/validators";
import { isBlockedHostname } from "../src/lib/seo-audit/ssrf";
import { computeScore, buildTopFindings, buildPositives } from "../src/lib/seo-audit/scoring";
import type { AuditSummary, PerformanceMetrics } from "../src/lib/seo-audit/types";

function emptyPerf(): PerformanceMetrics {
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

function summary(overrides: Partial<AuditSummary> = {}): AuditSummary {
  return {
    domain: "example.com",
    normalizedUrl: "https://example.com/",
    finalUrl: "https://example.com/",
    usesHttps: true,
    httpStatus: 200,
    responseTimeMs: 400,
    pageSizeBytes: 12000,
    redirectCount: 0,
    redirected: false,
    truncated: false,
    tlsInsecure: false,
    hasDoctype: true,
    hasLang: true,
    lang: "en",
    hasViewport: true,
    viewportContent: "width=device-width, initial-scale=1",
    hasDeviceWidth: true,
    title: "Example Domain",
    titleLength: 14,
    metaDescription: "This is a descriptive meta description used for testing the audit engine scoring.",
    metaDescriptionLength: 80,
    hasMetaRobots: false,
    metaRobotsContent: null,
    metaRobotsNoindex: false,
    xRobotsNoindex: false,
    hasCanonical: true,
    canonicalUrl: "https://example.com/",
    h1Count: 1,
    h1Text: "Example Domain",
    h2Count: 2,
    h3Count: 1,
    hasH2: true,
    headingTags: [],
    emptyHeadings: 0,
    wordCount: 420,
    imageCount: 3,
    imagesMissingAlt: 0,
    internalLinks: 8,
    externalLinks: 2,
    scriptCount: 2,
    stylesheetCount: 1,
    hasOpenGraph: true,
    hasStructuredData: true,
    schemaTypes: ["Organization", "WebSite"],
    robotsFound: true,
    robotsBlocksCrawlers: false,
    sitemapFound: true,
    sitemapState: "found",
    sitemapUrl: "https://example.com/sitemap.xml",
    mixedContent: false,
    hasHsts: true,
    hasContactSignal: true,
    hasAboutSignal: true,
    hasAuthorSignal: false,
    hasFaqSignal: false,
    hasOrgSchema: true,
    hasLocalBusinessSchema: false,
    performance: emptyPerf(),
    unreachable: false,
    timedOut: false,
    partialFailure: true,
    warnings: ["Performance data unavailable"],
    ...overrides,
  };
}

function run() {
  assert.equal(validateUrl("example.com"), "https://example.com/");
  assert.equal(validateUrl("www.example.com"), "https://www.example.com/");
  assert.equal(validateUrl("https://example.com"), "https://example.com/");
  assert.equal(validateUrl("https://www.example.com"), "https://www.example.com/");
  assert.equal(validateUrl("https://example.com/"), "https://example.com/");
  assert.equal(validateUrl(""), null);
  assert.equal(validateUrl("not a url"), null);
  assert.equal(validateUrl("localhost"), null);
  assert.equal(validateUrl("http://localhost"), null);
  assert.equal(validateUrl("127.0.0.1"), null);
  assert.equal(validateUrl("http://127.0.0.1"), null);
  assert.equal(validateUrl("http://192.168.1.1"), null);
  assert.equal(validateUrl("http://10.0.0.5"), null);
  assert.equal(validateUrl("file:///etc/passwd"), null);
  assert.equal(validateUrl("javascript:alert(1)"), null);
  assert.equal(validateUrl("data:text/html,hi"), null);
  assert.equal(validateUrl("ftp://example.com"), null);

  assert.equal(isPrivateOrReservedIpv4("127.0.0.1"), true);
  assert.equal(isPrivateOrReservedIpv4("10.0.0.1"), true);
  assert.equal(isPrivateOrReservedIpv4("192.168.0.1"), true);
  assert.equal(isPrivateOrReservedIpv4("169.254.169.254"), true);
  assert.equal(isPrivateOrReservedIpv4("8.8.8.8"), false);

  assert.equal(isDisallowedHostname("localhost"), true);
  assert.equal(isBlockedHostname("localhost"), true);
  assert.equal(isBlockedHostname("metadata.google.internal"), true);
  assert.equal(isBlockedHostname("example.com"), false);

  const healthy = computeScore(summary());
  const weak = computeScore(
    summary({
      usesHttps: false,
      title: null,
      titleLength: 0,
      metaDescription: null,
      metaDescriptionLength: 0,
      h1Count: 0,
      h1Text: null,
      hasViewport: false,
      hasDeviceWidth: false,
      hasCanonical: false,
      canonicalUrl: null,
      hasStructuredData: false,
      schemaTypes: [],
      hasOrgSchema: false,
    })
  );

  const httpOnly = computeScore(summary({ usesHttps: false, tlsInsecure: false, hasHsts: false, mixedContent: false }));
  const httpSecurity = httpOnly.categories.find((c) => c.key === "security");
  assert.equal(httpSecurity?.score, 20);

  assert.ok(healthy.overall !== null && healthy.overall > 50);
  assert.ok(weak.overall !== null && weak.overall < healthy.overall!);
  assert.notEqual(healthy.overall, 72);
  assert.notEqual(weak.overall, 72);

  const perfCat = healthy.categories.find((c) => c.key === "performance");
  assert.equal(perfCat?.available, false);
  assert.equal(perfCat?.score, null);

  const withPerf = computeScore(
    summary({
      performance: {
        available: true,
        source: "pagespeed",
        performanceScore: 91,
        lcpMs: 1800,
        cls: 0.04,
        inpMs: 120,
        fcpMs: 900,
        ttfbMs: 200,
        strategy: "mobile",
      },
      partialFailure: false,
      warnings: [],
    })
  );
  const withPerfCat = withPerf.categories.find((c) => c.key === "performance");
  assert.equal(withPerfCat?.available, true);
  assert.ok(withPerfCat?.score !== null && withPerfCat.score > 70);

  const findings = buildTopFindings(
    summary({ title: null, titleLength: 0, metaDescription: null, metaDescriptionLength: 0 })
  );
  assert.ok(findings.some((f) => f.id === "missing-title"));
  assert.ok(findings.some((f) => f.id === "missing-meta-description"));
  assert.ok(findings.every((f) => f.whyItMatters && f.howToFix));

  const positives = buildPositives(summary());
  assert.ok(positives.some((p) => p.id === "https"));
  assert.ok(positives.some((p) => p.id === "h1"));

  console.log("seo-audit tests passed");
}

run();
