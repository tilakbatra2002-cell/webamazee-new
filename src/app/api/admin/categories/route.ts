import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { createCategory, listCategories } from "@/lib/cms/blogs-repo";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { categorySchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await requireApiAdmin(request, "categories:read");
    const items = await listCategories();
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
    await requireApiAdmin(request, "categories:manage");
    const body = await request.json();
    const parsed = categorySchema.parse(body);
    const category = await createCategory(parsed);
    return NextResponse.json(
      { category },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
