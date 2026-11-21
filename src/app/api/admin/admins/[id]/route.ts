import { NextRequest, NextResponse } from "next/server";
import { updateAdminUser } from "@/lib/cms/admins-repo";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { updateAdminSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    const { admin } = await requireApiAdmin(request, "admins:manage");
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateAdminSchema.parse(body);

    const result = await updateAdminUser(id, parsed, admin);

    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
