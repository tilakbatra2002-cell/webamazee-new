import { NextRequest, NextResponse } from "next/server";
import { analyzeUrl } from "@/lib/seo-audit/analyzer";
import { computeScore, buildTopFindings } from "@/lib/seo-audit/scoring";
import { validateUrl } from "@/lib/seo-audit/validators";
import { getCachedAudit, setCachedAudit } from "@/lib/seo-audit/cache";
import { isRateLimited } from "@/lib/seo-audit/rate-limit";
import type { AuditRequest, AuditResponse } from "@/lib/seo-audit/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  // Human-readable only. Never leak internal details.
  return NextResponse.json(
    { success: false, code, error: message },
    { status }
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Rate limit by IP (best effort in serverless).
  const ip = clientIp(req);
  if (isRateLimited(`audit:${ip}`)) {
    return errorResponse(
      "RATE_LIMITED",
      "You have submitted too many audits recently. Please try again in a minute.",
      429
    );
  }

  let body: AuditRequest;
  try {
    body = (await req.json()) as AuditRequest;
  } catch {
    return errorResponse("BAD_REQUEST", "Please provide a valid website URL.", 400);
  }

  const url = body?.url;
  if (typeof url !== "string" || !url.trim()) {
    return errorResponse("BAD_REQUEST", "Please enter a website URL.", 400);
  }

  const validated = validateUrl(url);
  if (!validated) {
    return errorResponse("BAD_REQUEST", "Please enter a valid website URL.", 400);
  }

  let domain = "";
  try {
    domain = new URL(validated).hostname;
  } catch {
    return errorResponse("BAD_REQUEST", "Please enter a valid website URL.", 400);
  }

  // Cache check (same domain, short window).
  const cached = getCachedAudit(domain);
  if (cached) {
    return NextResponse.json(cached);
  }

  // Perform the analysis.
  let summary;
  try {
    summary = await analyzeUrl(validated);
  } catch {
    return errorResponse(
      "AUDIT_UNAVAILABLE",
      "We could not analyze that website right now. Please try again in a moment.",
      500
    );
  }

  // Site unreachable / blocked / timeout handled as a clean response.
  if (summary.unreachable) {
    return errorResponse(
      "UNREACHABLE",
      "We could not reach that website. Please check the URL and try again.",
      422
    );
  }

  const score = computeScore(summary);
  const topFindings = buildTopFindings(summary);

  const response: AuditResponse = {
    success: true,
    url: validated,
    normalizedUrl: summary.normalizedUrl,
    domain: summary.domain,
    seoScore: score,
    topFindings,
    summary,
    requestedAt: new Date().toISOString(),
  };

  setCachedAudit(domain, response);
  return NextResponse.json(response);
}
