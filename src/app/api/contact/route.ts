import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email/contact-email";
import { isRateLimited } from "@/lib/seo-audit/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fieldValue = z.union([
  z.string().max(5000),
  z.number().finite(),
  z.boolean(),
  z.null(),
]);

const schema = z.object({
  formType: z.string().trim().min(2).max(80).regex(/^[a-zA-Z0-9 &/()'_-]+$/),
  fields: z.record(z.string().min(1).max(80), fieldValue).refine(
    (fields) => Object.keys(fields).length > 0 && Object.keys(fields).length <= 30,
    "Invalid fields"
  ),
  pageUrl: z.string().max(2048).optional().default(""),
  referrer: z.string().max(2048).optional().default(""),
  websiteConfirm: z.string().max(200).optional().default(""),
});

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function findVisitorEmail(fields: Record<string, string | number | boolean | null>): string | undefined {
  const entry = Object.entries(fields).find(([key, value]) =>
    key.toLowerCase().includes("email") && typeof value === "string" && value.trim()
  );
  if (!entry || typeof entry[1] !== "string") return undefined;
  const parsed = z.string().trim().email().safeParse(entry[1]);
  return parsed.success ? parsed.data : undefined;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (isRateLimited(`contact:${clientIp(request)}`)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid submission." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  if (parsed.data.websiteConfirm.trim()) {
    return NextResponse.json({ success: false, error: "Invalid submission." }, { status: 400 });
  }

  const visitorEmail = findVisitorEmail(parsed.data.fields);
  const submittedEmail = Object.entries(parsed.data.fields).find(([key]) =>
    key.toLowerCase().includes("email")
  )?.[1];

  if (typeof submittedEmail === "string" && submittedEmail.trim() && !visitorEmail) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const result = await sendContactEmail({
      formType: parsed.data.formType,
      fields: parsed.data.fields,
      pageUrl: parsed.data.pageUrl,
      referrer: parsed.data.referrer || request.headers.get("referer") || "",
      visitorEmail,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: result.id });
  } catch {
    return NextResponse.json(
      { success: false, error: "We could not send your request right now. Please try again shortly." },
      { status: 503 }
    );
  }
}
