import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";
import { getCmsSettings, updateCmsSettings } from "@/lib/cms/blogs-repo";
import { getEnvDiagnostics } from "@/lib/cms/config";
import { revalidateCmsSettingsCache } from "@/lib/cms/revalidate";
import { verifyCsrfOrigin } from "@/lib/cms/security";
import { cmsSettingsSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await requireApiAdmin(request, "settings:read");
    const [settings, diagnostics] = await Promise.all([
      getCmsSettings(),
      Promise.resolve(getEnvDiagnostics()),
    ]);
    return NextResponse.json(
      { settings, diagnostics },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request rejected." }, { status: 403 });
  }

  try {
    const { admin } = await requireApiAdmin(request, "settings:manage");
    const body = await request.json();
    const parsed = cmsSettingsSchema.parse(body);
    const settings = await updateCmsSettings(parsed, admin);
    revalidateCmsSettingsCache();
    return NextResponse.json({ settings }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
