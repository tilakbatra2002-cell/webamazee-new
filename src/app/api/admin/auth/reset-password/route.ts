import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { consumePasswordToken, isCmsAuthReady } from "@/lib/cms/auth";
import {
  clearRateLimit,
  consumeRateLimit,
  getClientIp,
  verifyCsrfOrigin,
} from "@/lib/cms/security";
import { resetPasswordSchema } from "@/lib/cms/validation";

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
    const rateSlot = await consumeRateLimit(`reset:ip:${ip}`, {
      maxAttempts: 10,
      windowMs: 15 * 60 * 1000,
      lockMs: 15 * 60 * 1000,
    });
    if (!rateSlot.allowed) {
      return NextResponse.json(
        { error: "Too many password reset attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateSlot.retryAfterSec) } }
      );
    }

    const body = await request.json();
    const parsed = resetPasswordSchema.parse(body);
    const { email } = await consumePasswordToken(parsed.token, parsed.password);
    await Promise.all([
      clearRateLimit(`login:email:${email}`),
      clearRateLimit(`login:ip:${ip}`),
    ]);

    return NextResponse.json(
      { success: true, email },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
