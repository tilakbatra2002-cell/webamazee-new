import type {
  AuditCategory,
  AuditCategoryKey,
  AuditFinding,
  AuditScore,
  AuditStatus,
  AuditSummary,
} from "./types";

/**
 * Deterministic SEO scoring.
 *
 * Each category is a weighted aggregate of the checks that could actually be
 * measured. The overall score is a weighted blend of the categories. This is a
 * "Webamazee SEO Health Score", never a Google score and never a guarantee.
 */

const CATEGORY_LABELS: Record<AuditCategoryKey, string> = {
  technical: "Technical SEO",
  onpage: "On Page SEO",
  content: "Content",
  performance: "Performance",
  indexability: "Indexability",
};

const WEIGHTS: Record<AuditCategoryKey, number> = {
  technical: 0.22,
  onpage: 0.24,
  content: 0.2,
  performance: 0.18,
  indexability: 0.16,
};

function statusFromScore(score: number): AuditStatus {
  if (score >= 80) return "good";
  if (score >= 55) return "warning";
  return "critical";
}

function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function computeCategories(s: AuditSummary): AuditCategory[] {
  // TECHNICAL
  let technicalChecks = 0;
  let technicalPassed = 0;
  const tAdd = (ok: boolean) => {
    technicalChecks++;
    if (ok) technicalPassed++;
  };
  tAdd(s.usesHttps);
  tAdd(s.httpStatus >= 200 && s.httpStatus < 400);
  tAdd(s.hasViewport);
  tAdd(s.hasLang);
  tAdd(s.hasDoctype);
  tAdd(s.hasCanonical);
  const technicalScore = technicalChecks ? (technicalPassed / technicalChecks) * 100 : 0;

  // ON PAGE
  let onChecks = 0;
  let onPassed = 0;
  const oAdd = (ok: boolean) => {
    onChecks++;
    if (ok) onPassed++;
  };
  oAdd(!!s.title && s.titleLength > 0);
  oAdd(s.titleLength >= 30 && s.titleLength <= 70);
  oAdd(!!s.metaDescription);
  oAdd(!!s.metaDescription && s.metaDescriptionLength >= 50 && s.metaDescriptionLength <= 165);
  oAdd(s.h1Count === 1);
  oAdd(s.hasH2);
  oAdd(s.hasCanonical);
  oAdd(s.hasOpenGraph);
  const onScore = onChecks ? (onPassed / onChecks) * 100 : 0;

  // CONTENT
  let cChecks = 0;
  let cPassed = 0;
  const cAdd = (ok: boolean) => {
    cChecks++;
    if (ok) cPassed++;
  };
  cAdd(s.wordCount > 0);
  cAdd(s.wordCount >= 200);
  cAdd(s.headingTags.length >= 1 && s.headingTags.length <= 12);
  cAdd(s.emptyHeadings === 0);
  cAdd(s.imagesMissingAlt === 0);
  const contentScore = cChecks ? (cPassed / cChecks) * 100 : 0;

  // PERFORMANCE
  let pChecks = 0;
  let pPassed = 0;
  const pAdd = (ok: boolean) => {
    pChecks++;
    if (ok) pPassed++;
  };
  pAdd(s.responseTimeMs > 0 && s.responseTimeMs <= 2500);
  pAdd(s.pageSizeBytes > 0 && s.pageSizeBytes <= 3_500_000);
  pAdd(s.imageCount <= 25);
  pAdd(s.imagesMissingAlt === 0 || s.imagesMissingAlt <= s.imageCount * 0.5);
  const performanceScore = pChecks ? (pPassed / pChecks) * 100 : 0;

  // INDEXABILITY
  let iChecks = 0;
  let iPassed = 0;
  const iAdd = (ok: boolean) => {
    iChecks++;
    if (ok) iPassed++;
  };
  iAdd(!s.metaRobotsNoindex);
  iAdd(!s.xRobotsNoindex);
  iAdd(!!s.hasCanonical);
  iAdd(!s.robotsBlocksCrawlers);
  const indexabilityScore = iChecks ? (iPassed / iChecks) * 100 : 0;

  const categories: AuditCategory[] = [
    { key: "technical", label: CATEGORY_LABELS.technical, score: clampScore(technicalScore), status: statusFromScore(technicalScore) },
    { key: "onpage", label: CATEGORY_LABELS.onpage, score: clampScore(onScore), status: statusFromScore(onScore) },
    { key: "content", label: CATEGORY_LABELS.content, score: clampScore(contentScore), status: statusFromScore(contentScore) },
    { key: "performance", label: CATEGORY_LABELS.performance, score: clampScore(performanceScore), status: statusFromScore(performanceScore) },
    { key: "indexability", label: CATEGORY_LABELS.indexability, score: clampScore(indexabilityScore), status: statusFromScore(indexabilityScore) },
  ];

  return categories;
}

export function computeScore(s: AuditSummary): AuditScore {
  const categories = computeCategories(s);
  let total = 0;
  let weightSum = 0;
  for (const cat of categories) {
    total += cat.score * WEIGHTS[cat.key];
    weightSum += WEIGHTS[cat.key];
  }
  const overall = weightSum ? total / weightSum : 0;
  return { overall: clampScore(overall), categories };
}

/**
 * Builds a short list of the most important, real findings. Each finding maps
 * directly to a check we could actually perform.
 */
export function buildTopFindings(s: AuditSummary): AuditFinding[] {
  const findings: AuditFinding[] = [];

  // On page
  if (s.title && s.titleLength > 0 && (s.titleLength < 30 || s.titleLength > 70)) {
    findings.push({
      id: "title-length",
      category: "onpage",
      title: "Title tag length",
      detail: `Your title is ${s.titleLength} characters. A length between 30 and 70 characters tends to display well in search results.`,
      status: s.titleLength > 70 ? "critical" : "warning",
    });
  }
  if (!s.metaDescription) {
    findings.push({
      id: "no-meta-description",
      category: "onpage",
      title: "Missing meta description",
      detail: "No meta description was detected, which can reduce click through from search results.",
      status: "critical",
    });
  } else if (s.metaDescriptionLength < 50 || s.metaDescriptionLength > 165) {
    findings.push({
      id: "meta-description-length",
      category: "onpage",
      title: "Meta description length",
      detail: `Your meta description is ${s.metaDescriptionLength} characters. Aim for roughly 50 to 165 characters.`,
      status: "warning",
    });
  }
  if (s.h1Count !== 1) {
    findings.push({
      id: "h1-count",
      category: "onpage",
      title: "Multiple or missing H1 tags",
      detail: `${s.h1Count} H1 tag${s.h1Count === 1 ? "" : "s"} detected. One clear H1 per page is recommended.`,
      status: s.h1Count === 0 ? "critical" : "warning",
    });
  }

  // Content
  if (s.imagesMissingAlt > 0) {
    findings.push({
      id: "images-missing-alt",
      category: "content",
      title: "Images missing alt text",
      detail: `${s.imagesMissingAlt} image${s.imagesMissingAlt === 1 ? "" : "s"} without alt text detected. Descriptive alt text helps accessibility and relevance.`,
      status: s.imagesMissingAlt > s.imageCount * 0.5 ? "critical" : "warning",
    });
  }
  if (s.wordCount > 0 && s.wordCount < 200) {
    findings.push({
      id: "thin-content",
      category: "content",
      title: "Thin page content",
      detail: `Approximately ${s.wordCount} words were detected. Deeper, more helpful content tends to perform better.`,
      status: "warning",
    });
  }
  if (s.emptyHeadings > 0) {
    findings.push({
      id: "empty-headings",
      category: "content",
      title: "Empty headings",
      detail: `${s.emptyHeadings} heading${s.emptyHeadings === 1 ? "" : "s"} appear to be empty.`,
      status: "warning",
    });
  }

  // Technical / performance
  if (!s.usesHttps) {
    findings.push({
      id: "no-https",
      category: "technical",
      title: "No HTTPS",
      detail: "The page was not served over HTTPS. HTTPS is a baseline trust and security signal.",
      status: "critical",
    });
  }
  if (s.responseTimeMs > 0 && s.responseTimeMs > 2500) {
    findings.push({
      id: "slow-response",
      category: "performance",
      title: "Slow server response",
      detail: `The page responded in about ${Math.round(s.responseTimeMs)} ms. Faster responses tend to improve user experience.`,
      status: "warning",
    });
  }

  // Indexability
  if (s.metaRobotsNoindex || s.xRobotsNoindex) {
    findings.push({
      id: "noindex",
      category: "indexability",
      title: "Page is set to noindex",
      detail: "The page (or its headers) instruct search engines not to index it, which can block it from appearing in results.",
      status: "critical",
    });
  }
  if (s.robotsBlocksCrawlers) {
    findings.push({
      id: "robots-blocks",
      category: "indexability",
      title: "robots.txt may block crawling",
      detail: "The robots.txt file contains rules that could block search engine crawlers from this area of the site.",
      status: "critical",
    });
  }
  if (!s.hasCanonical) {
    findings.push({
      id: "no-canonical",
      category: "indexability",
      title: "Missing canonical tag",
      detail: "No canonical URL was detected, which can allow duplicate pages to compete in search results.",
      status: "warning",
    });
  }

  // Sort by severity: critical first, then warning. Keep to ~4-5.
  const order: Record<AuditStatus, number> = { critical: 0, warning: 1, good: 2, unknown: 3 };
  return findings.sort((a, b) => order[a.status] - order[b.status]).slice(0, 5);
}
