/** Shared types for the Free SEO Audit feature. */

export type AuditStatus = "good" | "warning" | "critical" | "unknown";

export type AuditCategoryKey =
  | "technical"
  | "onpage"
  | "content"
  | "performance"
  | "indexability";

export interface AuditCategory {
  key: AuditCategoryKey;
  label: string;
  score: number; // 0-100
  status: AuditStatus;
}

export interface AuditFinding {
  id: string;
  category: AuditCategoryKey;
  title: string;
  detail: string;
  status: AuditStatus;
}

export interface AuditScore {
  overall: number; // 0-100
  categories: AuditCategory[];
}

/** Raw facts extracted from the analyzed page. */
export interface AuditSummary {
  domain: string;
  normalizedUrl: string;
  finalUrl: string;
  usesHttps: boolean;
  httpStatus: number;
  responseTimeMs: number;
  pageSizeBytes: number;

  hasDoctype: boolean;
  hasLang: boolean;
  hasViewport: boolean;

  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  hasMetaRobots: boolean;
  metaRobotsNoindex: boolean;
  xRobotsNoindex: boolean;
  hasCanonical: boolean;
  h1Count: number;
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

  robotsFound: boolean;
  robotsBlocksCrawlers: boolean;
  sitemapFound: boolean;
  sitemapState: "found" | "not-found" | "unknown";
  unreachable: boolean;
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
  summary: AuditSummary;
  requestedAt: string;
}

/** Lead captured after the free overview. */
export interface AuditLead {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  website: string;
  serviceInterest?: string;
  seoScore: number;
  auditSummary: string;
  source: string;
  createdAt: string;
}

export interface AuditLeadRequest {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  website: string;
  serviceInterest?: string;
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
  | "seo_audit_failed";
