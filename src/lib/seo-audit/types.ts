/** Shared types for the Free Website & SEO Audit feature. */

export type AuditStatus = "good" | "warning" | "critical" | "unknown";

export type FindingSeverity = "critical" | "high" | "opportunity";

export type AuditCategoryKey =
  | "technical"
  | "onpage"
  | "performance"
  | "mobile"
  | "security"
  | "structured"
  | "aiReadiness";

export interface AuditCategory {
  key: AuditCategoryKey;
  label: string;
  /** 0–100, or null when the category could not be measured reliably. */
  score: number | null;
  status: AuditStatus;
  available: boolean;
  unavailableReason?: string;
}

export interface AuditFinding {
  id: string;
  category: AuditCategoryKey;
  title: string;
  whyItMatters: string;
  howToFix: string;
  severity: FindingSeverity;
}

export interface AuditPositive {
  id: string;
  title: string;
}

export interface AuditScore {
  overall: number | null;
  categories: AuditCategory[];
}

export interface PerformanceMetrics {
  available: boolean;
  source: "pagespeed" | "none";
  performanceScore: number | null;
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  fcpMs: number | null;
  ttfbMs: number | null;
  strategy: "mobile" | "desktop" | null;
  error?: string;
}

/** Raw facts extracted from the analyzed page. Never invented. */
export interface AuditSummary {
  domain: string;
  normalizedUrl: string;
  finalUrl: string;
  usesHttps: boolean;
  httpStatus: number;
  responseTimeMs: number;
  pageSizeBytes: number;
  redirectCount: number;
  redirected: boolean;
  truncated: boolean;
  tlsInsecure: boolean;

  hasDoctype: boolean;
  hasLang: boolean;
  lang: string | null;
  hasViewport: boolean;
  viewportContent: string | null;
  hasDeviceWidth: boolean;

  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  hasMetaRobots: boolean;
  metaRobotsContent: string | null;
  metaRobotsNoindex: boolean;
  xRobotsNoindex: boolean;
  hasCanonical: boolean;
  canonicalUrl: string | null;

  h1Count: number;
  h1Text: string | null;
  h2Count: number;
  h3Count: number;
  hasH2: boolean;
  headingTags: { tag: string; text: string; isEmpty: boolean }[];
  emptyHeadings: number;
  wordCount: number;
  imageCount: number;
  imagesMissingAlt: number;
  internalLinks: number;
  externalLinks: number;
  scriptCount: number;
  stylesheetCount: number;
  hasOpenGraph: boolean;
  hasStructuredData: boolean;
  schemaTypes: string[];

  robotsFound: boolean;
  robotsBlocksCrawlers: boolean;
  sitemapFound: boolean;
  sitemapState: "found" | "not-found" | "unknown";
  sitemapUrl: string | null;

  mixedContent: boolean;
  hasHsts: boolean;

  hasContactSignal: boolean;
  hasAboutSignal: boolean;
  hasAuthorSignal: boolean;
  hasFaqSignal: boolean;
  hasOrgSchema: boolean;
  hasLocalBusinessSchema: boolean;

  performance: PerformanceMetrics;

  unreachable: boolean;
  timedOut: boolean;
  partialFailure: boolean;
  warnings: string[];
  errorCode?: string;
}

export interface AuditRequest {
  url: string;
}

export interface AuditResponse {
  success: boolean;
  error?: string;
  code?: string;
  url: string;
  normalizedUrl: string;
  domain: string;
  seoScore: AuditScore;
  topFindings: AuditFinding[];
  positives: AuditPositive[];
  summary: AuditSummary;
  partialFailure: boolean;
  warnings: string[];
  requestedAt: string;
}

export interface AuditLeadRequest {
  name: string;
  email: string;
  company: string;
  website: string;
  seoScore: number;
  auditSummary: string;
}

export type AnalyticsEvent =
  | "seo_audit_opened"
  | "seo_audit_started"
  | "seo_audit_completed"
  | "seo_audit_cta_clicked"
  | "seo_audit_lead_form_opened"
  | "seo_audit_lead_submitted"
  | "seo_audit_failed"
  | "audit_started"
  | "audit_completed"
  | "audit_failed"
  | "audit_lead_submitted"
  | "audit_cta_clicked";
