import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import {
  deleteAdminBlog,
  getAdminBlogById,
  updateAdminBlog,
} from "@/lib/cms/blogs-repo";
import { revalidateBlogPaths } from "@/lib/cms/revalidate";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { blogPayloadSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await requireApiAdmin(request, "blogs:read");
    const { id } = await context.params;
    const blog = await getAdminBlogById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }
    return NextResponse.json({ blog }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    const { admin } = await requireApiAdmin(request, "blogs:edit");
    const { id } = await context.params;
    const body = await request.json();
    const parsed = blogPayloadSchema.parse(body);

    const { blog, previousSlug, previousStatus } = await updateAdminBlog(
      id,
      parsed,
      admin
    );

    if (blog.status === "published" || previousStatus === "published") {
      revalidateBlogPaths([previousSlug, blog.slug]);
    }

    return NextResponse.json({ blog }, { headers: { "Cache-Control": "no-store" } });
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
    await requireApiAdmin(request, "blogs:delete");
    const { id } = await context.params;
    const { slug } = await deleteAdminBlog(id);
    revalidateBlogPaths([slug]);
    return NextResponse.json({ success: true, slug }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
