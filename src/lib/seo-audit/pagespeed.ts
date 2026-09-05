import type { PerformanceMetrics } from "./types";

const PSI_TIMEOUT_MS = 18_000;
const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function auditNumeric(
  audits: Record<string, { numericValue?: number } | undefined>,
  id: string
): number | null {
  return num(audits[id]?.numericValue);
}

/**
 * Fetches mobile PageSpeed Insights data when GOOGLE_PAGESPEED_API_KEY is set.
 * Never throws — callers treat a null/unavailable result as "Not enough data".
 */
export async function fetchPageSpeed(url: string): Promise<PerformanceMetrics> {
  const key = process.env.GOOGLE_PAGESPEED_API_KEY?.trim();
  if (!key) {
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

  const endpoint = new URL(PSI_ENDPOINT);
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("key", key);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.set("category", "PERFORMANCE");

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      signal: AbortSignal.timeout(PSI_TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return unavailable("Performance data unavailable");
    }

    const data = (await res.json()) as {
      lighthouseResult?: {
        categories?: { performance?: { score?: number } };
        audits?: Record<string, { numericValue?: number }>;
      };
    };

    const audits = data.lighthouseResult?.audits ?? {};
    const score = data.lighthouseResult?.categories?.performance?.score;
    const performanceScore =
      typeof score === "number" ? Math.round(score * 100) : null;

    const inp =
      auditNumeric(audits, "interaction-to-next-paint") ??
      auditNumeric(audits, "experimental-interaction-to-next-paint");

    return {
      available: performanceScore !== null,
      source: "pagespeed",
      performanceScore,
      lcpMs: auditNumeric(audits, "largest-contentful-paint"),
      cls: auditNumeric(audits, "cumulative-layout-shift"),
      inpMs: inp,
      fcpMs: auditNumeric(audits, "first-contentful-paint"),
      ttfbMs:
        auditNumeric(audits, "server-response-time") ??
        auditNumeric(audits, "time-to-first-byte"),
      strategy: "mobile",
      error: performanceScore === null ? "Performance data unavailable" : undefined,
    };
  } catch {
    return unavailable("Performance data unavailable");
  }
}

function unavailable(error: string): PerformanceMetrics {
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
    error,
  };
}
