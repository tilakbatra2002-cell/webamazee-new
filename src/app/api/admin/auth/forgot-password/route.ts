import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/db/mongodb";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { createPasswordToken, isCmsAuthReady } from "@/lib/cms/auth";
import { getTrustedAppBaseUrl } from "@/lib/cms/config";
import { sendAdminPasswordEmail } from "@/lib/cms/email";
import {
  consumeRateLimit,
  getClientIp,
  verifyCsrfOrigin,
} from "@/lib/cms/security";
import { forgotPasswordSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }
  if (!isCmsAuthReady()) {
    return NextResponse.json(
      { error: "CMS authentication is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const ip = getClientIp(request);
    const rateSlot = await consumeRateLimit(`forgot:ip:${ip}`);
    if (!rateSlot.allowed) {
      return NextResponse.json(
        { error: "Too many reset requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateSlot.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const parsed = forgotPasswordSchema.parse(body);

    const { admins } = await getCollections();
    const admin = await admins.findOne({ email: parsed.email, isActive: true });

    if (admin) {
      const rawToken = await createPasswordToken(admin._id, "reset", 1);
      await sendAdminPasswordEmail({
        to: admin.email,
        recipientName: admin.name,
        token: rawToken,
        type: "reset",
        baseUrl: getTrustedAppBaseUrl(),
      });
    }

    // Generic response avoids leaking whether an account email exists
    return NextResponse.json(
      {
        message:
          "If an active administrator account matches that email and email delivery is configured, a password reset link has been sent. Otherwise, ask your Super Admin for a single-use reset link.",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
