import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { createAdminBlog, listAdminBlogs } from "@/lib/cms/blogs-repo";
import { revalidateBlogPaths } from "@/lib/cms/revalidate";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { blogPayloadSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await requireApiAdmin(request, "blogs:read");
    const sp = request.nextUrl.searchParams;
    const sortParam = sp.get("sort");
    const sort =
      sortParam === "published" || sortParam === "title" ? sortParam : "updated";

    const result = await listAdminBlogs({
      q: sp.get("q") ?? undefined,
      status: sp.get("status") ?? undefined,
      category: sp.get("category") ?? undefined,
      page: Number(sp.get("page") || "1"),
      pageSize: Number(sp.get("pageSize") || "12"),
      sort,
    });

    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    const { admin } = await requireApiAdmin(request, "blogs:create");
    const body = await request.json();
    const parsed = blogPayloadSchema.parse(body);

    const blog = await createAdminBlog(parsed, admin);
    if (blog.status === "published") {
      revalidateBlogPaths([blog.slug]);
    }

    return NextResponse.json(
      { blog },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
