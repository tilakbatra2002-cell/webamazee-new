import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/db/mongodb";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { createAdminSession, isCmsAuthReady, serializeAdmin } from "@/lib/cms/auth";
import { getDummyPasswordHash, verifyPassword } from "@/lib/cms/password";
import {
  clearRateLimit,
  consumeRateLimit,
  getClientIp,
  verifyCsrfOrigin,
} from "@/lib/cms/security";
import { loginSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  if (!isCmsAuthReady()) {
    return NextResponse.json(
      {
        error:
          "CMS authentication requires MONGODB_URI and SESSION_SECRET (>= 32 chars) to be configured.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.parse(body);

    const ip = getClientIp(request);
    const rateKeyIp = `login:ip:${ip}`;
    const rateKeyEmail = `login:email:${parsed.email}`;

    // Atomic check-and-reserve BEFORE expensive bcrypt verification so concurrent bursts cannot bypass limits
    const [ipSlot, emailSlot] = await Promise.all([
      consumeRateLimit(rateKeyIp),
      consumeRateLimit(rateKeyEmail),
    ]);

    if (!ipSlot.allowed || !emailSlot.allowed) {
      const retryAfter = Math.max(ipSlot.retryAfterSec, emailSlot.retryAfterSec);
      return NextResponse.json(
        {
          error: `Too many failed sign-in attempts. Try again in ${Math.max(
            1,
            Math.ceil(retryAfter / 60)
          )} minute(s).`,
        },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const { admins } = await getCollections();
    const admin = await admins.findOne({ email: parsed.email });

    // Always run bcrypt verification (even when email does not exist) and check isActive only AFTER verification
    const targetHash = admin?.passwordHash || (await getDummyPasswordHash());
    const passwordOk = await verifyPassword(parsed.password, targetHash);

    if (!admin || !passwordOk || !admin.isActive) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    await Promise.all([clearRateLimit(rateKeyIp), clearRateLimit(rateKeyEmail)]);

    await createAdminSession(admin, {
      userAgent: request.headers.get("user-agent") ?? undefined,
      ip,
    });

    return NextResponse.json(
      { admin: serializeAdmin(admin) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
