import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSessionCookie, revokeSession } from "@/lib/cms/auth";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionJwt } from "@/lib/cms/session-jwt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (token) {
      const claims = await verifyAdminSessionJwt(token);
      if (claims?.sid) {
        await revokeSession(claims.sid);
      }
    }
  } catch {
    // Still clear cookie even if DB cleanup failed
  }

  await clearSessionCookie();
  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
}
