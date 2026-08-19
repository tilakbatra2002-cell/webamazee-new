import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email/contact-email";
import { isRateLimited } from "@/lib/seo-audit/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120, "Name is too long"),
  businessName: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().max(80).optional().default(""),
  website: z.string().trim().min(1, "Website URL is required").max(2048),
  serviceInterest: z.string().trim().max(200).optional().default(""),
  seoScore: z.number().min(0).max(100).optional().default(0),
  auditSummary: z.string().max(2000).optional().default(""),
  pageUrl: z.string().max(2048).optional().default(""),
  referrer: z.string().max(2048).optional().default(""),
  websiteConfirm: z.string().max(200).optional().default(""),
});

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (isRateLimited(`lead:${clientIp(request)}`)) {
    return NextResponse.json(
      { success: false, code: "RATE_LIMITED", error: "Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, code: "BAD_REQUEST", error: "Invalid submission." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, code: "VALIDATION", error: parsed.error.issues[0]?.message ?? "Please check the form." },
      { status: 400 }
    );
  }

  if (parsed.data.websiteConfirm.trim()) {
    return NextResponse.json({ success: false, code: "SPAM", error: "Invalid submission." }, { status: 400 });
  }

  const data = parsed.data;
  try {
    const result = await sendContactEmail({
      formType: "SEO Audit Lead",
      fields: {
        name: data.name,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        serviceInterest: data.serviceInterest,
        seoScore: `${data.seoScore}/100`,
        auditSummary: data.auditSummary,
      },
      pageUrl: data.pageUrl,
      referrer: data.referrer || request.headers.get("referer") || "",
      visitorEmail: data.email,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: result.id });
  } catch {
    return NextResponse.json(
      { success: false, code: "EMAIL_FAILED", error: "We could not send your request. Please try again." },
      { status: 503 }
    );
  }
}
