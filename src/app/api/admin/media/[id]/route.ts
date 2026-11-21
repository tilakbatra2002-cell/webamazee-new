import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { deleteMediaAsset, updateMediaAlt } from "@/lib/cms/media-repo";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { mediaPatchSchema } from "@/lib/cms/validation";

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
    await requireApiAdmin(request, "media:edit");
    const { id } = await context.params;
    const body = await request.json();
    const parsed = mediaPatchSchema.parse(body);
    const asset = await updateMediaAlt(id, parsed.alt);
    return NextResponse.json({ asset }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    await requireApiAdmin(request, "media:delete");
    const { id } = await context.params;
    const result = await deleteMediaAsset(id);
    return NextResponse.json(
      { success: true, url: result.url },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
