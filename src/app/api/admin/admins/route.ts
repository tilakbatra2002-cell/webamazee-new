import { NextRequest, NextResponse } from "next/server";
import { createAdminUser, listAdmins } from "@/lib/cms/admins-repo";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { createAdminSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await requireApiAdmin(request, "admins:manage");
    const q = request.nextUrl.searchParams.get("q") ?? undefined;
    const items = await listAdmins(q);
    return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    const { admin } = await requireApiAdmin(request, "admins:manage");
    const body = await request.json();
    const parsed = createAdminSchema.parse(body);

    const result = await createAdminUser(parsed, admin);

    return NextResponse.json(result, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
