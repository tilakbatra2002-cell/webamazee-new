import { NextRequest, NextResponse } from "next/server";
import { analyzeUrl } from "@/lib/seo-audit/analyzer";
import { computeScore, buildTopFindings, buildPositives } from "@/lib/seo-audit/scoring";
import { validateUrl } from "@/lib/seo-audit/validators";
import { getCachedAudit, setCachedAudit } from "@/lib/seo-audit/cache";
import { isRateLimited } from "@/lib/seo-audit/rate-limit";
import type { AuditRequest, AuditResponse } from "@/lib/seo-audit/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function errorResponse(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ success: false, code, error: message }, { status });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
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
    return errorResponse("BAD_REQUEST", "Please enter a valid website URL.", 400);
  }

  const validated = validateUrl(url);
  if (!validated) {
    return errorResponse("BAD_REQUEST", "Please enter a valid website URL.", 400);
  }

  const cached = getCachedAudit(validated);
  if (cached) {
    return NextResponse.json(cached);
  }

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

  if (summary.unreachable) {
    if (summary.errorCode === "BLOCKED_HOST" || summary.errorCode === "INVALID_SCHEME") {
      return errorResponse("BAD_REQUEST", "Please enter a valid website URL.", 400);
    }
    if (summary.timedOut || summary.errorCode === "TIMEOUT" || summary.errorCode === "TOO_MANY_REDIRECTS") {
      return errorResponse(
        "TIMEOUT",
        "The website took too long to respond. Some checks could not be completed.",
        422
      );
    }
    return errorResponse(
      "UNREACHABLE",
      "We couldn't access this website. Please check the URL and try again.",
      422
    );
  }

  const score = computeScore(summary);
  const topFindings = buildTopFindings(summary);
  const positives = buildPositives(summary);

  const response: AuditResponse = {
    success: true,
    url: validated,
    normalizedUrl: summary.normalizedUrl,
    domain: summary.domain,
    seoScore: score,
    topFindings,
    positives,
    summary,
    partialFailure: summary.partialFailure,
    warnings: summary.warnings,
    requestedAt: new Date().toISOString(),
  };

  setCachedAudit(validated, response);
  return NextResponse.json(response);
}
