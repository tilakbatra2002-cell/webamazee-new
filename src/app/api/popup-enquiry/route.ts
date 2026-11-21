import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email/contact-email";
import { isRateLimited } from "@/lib/seo-audit/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Must stay in sync with the options in the popup enquiry form. */
const POPUP_ENQUIRY_SERVICES = [
  "Website Development",
  "SEO Services",
  "AI SEO",
  "Social Media Marketing",
  "Digital Marketing",
  "Other",
] as const;

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  workEmail: z
    .string()
    .trim()
    .email("Please enter a valid work email.")
    .max(254, "Email is too long."),
  phoneNumber: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .regex(/^[0-9+()\-\s]*$/, "Please enter a valid phone number.")
    .optional()
    .default(""),
  serviceRequired: z
    .string()
    .trim()
    .min(1, "Please choose a service.")
    .refine(
      (value) => (POPUP_ENQUIRY_SERVICES as readonly string[]).includes(value),
      "Please choose a valid service."
    ),
  projectDetails: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project.")
    .max(5000, "Message is too long."),
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
  if (isRateLimited(`popup-enquiry:${clientIp(request)}`)) {
    return NextResponse.json(
      {
        success: false,
        code: "RATE_LIMITED",
        error: "Too many requests. Please try again in a minute.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, code: "BAD_REQUEST", error: "Invalid submission." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: "VALIDATION",
        error: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: real users never fill this field.
  if (data.websiteConfirm.trim()) {
    return NextResponse.json(
      { success: false, code: "SPAM", error: "Invalid submission." },
      { status: 400 }
    );
  }

  try {
    // Reuses the existing Resend integration in @/lib/email/contact-email.
    // Popup enquiries must always go to the requested inbox.
    const result = await sendContactEmail({
      formType: "Popup",
      recipient: "info@webamazee.com",
      fields: {
        fullName: data.fullName,
        workEmail: data.workEmail,
        phoneNumber: data.phoneNumber || "Not provided",
        serviceRequired: data.serviceRequired,
        projectDetails: data.projectDetails,
      },
      pageUrl: data.pageUrl,
      referrer: data.referrer || request.headers.get("referer") || "",
      visitorEmail: data.workEmail,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "EMAIL_FAILED",
        error: "We could not send your request. Please try again shortly.",
      },
      { status: 503 }
    );
  }
}
