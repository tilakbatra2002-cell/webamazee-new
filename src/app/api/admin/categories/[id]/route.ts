import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { deleteCategory, updateCategory } from "@/lib/cms/blogs-repo";
import { revalidateBlogPaths } from "@/lib/cms/revalidate";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { categorySchema } from "@/lib/cms/validation";

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
    await requireApiAdmin(request, "categories:manage");
    const { id } = await context.params;
    const body = await request.json();
    const parsed = categorySchema.parse(body);
    const { category, touchedSlugs } = await updateCategory(id, parsed);

    if (touchedSlugs.length > 0) {
      revalidateBlogPaths(touchedSlugs);
    }

    return NextResponse.json({ category }, { headers: { "Cache-Control": "no-store" } });
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
    await requireApiAdmin(request, "categories:manage");
    const { id } = await context.params;
    await deleteCategory(id);
    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
