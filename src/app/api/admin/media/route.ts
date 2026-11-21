import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { listMediaAssets, uploadMediaAsset } from "@/lib/cms/media-repo";
import { assertCan } from "@/lib/cms/rbac";
import { revalidateBlogPaths } from "@/lib/cms/revalidate";
import { verifyCsrfOrigin } from "@/lib/cms/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await requireApiAdmin(request, "media:read");
    const q = request.nextUrl.searchParams.get("q") ?? undefined;
    const items = await listMediaAssets(q);
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
    const { admin } = await requireApiAdmin(request, "media:upload");
    const formData = await request.formData();
    const file = formData.get("file");
    const alt = String(formData.get("alt") ?? "").trim();
    const replaceAssetId = String(formData.get("replaceAssetId") ?? "").trim() || undefined;

    if (replaceAssetId) {
      assertCan(
        admin,
        "media:edit",
        "You do not have permission to edit existing media assets."
      );
      assertCan(
        admin,
        "media:replace",
        "You do not have permission to replace existing media assets."
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please attach an image file." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await uploadMediaAsset({
      buffer,
      originalFilename: file.name || "image.webp",
      declaredMime: file.type,
      alt,
      replaceAssetId,
      actor: admin,
    });

    if (replaceAssetId && asset.usedInSlugs.length > 0) {
      revalidateBlogPaths(asset.usedInSlugs);
    }

    return NextResponse.json(
      { asset },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}
