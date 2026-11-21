import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/cms/api-error";
import { requireApiAdmin } from "@/lib/cms/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { admin } = await requireApiAdmin(request);
    return NextResponse.json({ admin }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
