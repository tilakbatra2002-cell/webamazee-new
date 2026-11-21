import { NextRequest, NextResponse } from "next/server";
import { publishDueScheduledPosts } from "@/lib/cms/blogs-repo";
import { isCronConfigured, isMongoConfigured } from "@/lib/cms/config";
import { timingSafeEqualStrings } from "@/lib/cms/password";
import { revalidateBlogPaths } from "@/lib/cms/revalidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorizedCronRequest(request: NextRequest): boolean {
  if (!isCronConfigured()) return false;
  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return false;
  const provided = authHeader.slice(7).trim();
  const expected = process.env.CRON_SECRET!.trim();
  if (!provided || !expected) return false;
  return timingSafeEqualStrings(provided, expected);
}

async function handleScheduledPublish(request: NextRequest): Promise<NextResponse> {
  if (!isCronConfigured()) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured on the server." },
      { status: 503 }
    );
  }

  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized cron invocation." }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI is not configured on the server." },
      { status: 503 }
    );
  }

  try {
    const result = await publishDueScheduledPosts();
    if (result.publishedCount > 0) {
      revalidateBlogPaths(result.publishedSlugs);
    }

    const hasPartialFailure = result.failedSlugs.length > 0;
    return NextResponse.json(
      {
        ok: !hasPartialFailure,
        checkedAt: new Date().toISOString(),
        publishedCount: result.publishedCount,
        publishedSlugs: result.publishedSlugs,
        failedCount: result.failedSlugs.length,
        failedSlugs: result.failedSlugs,
      },
      {
        status: hasPartialFailure ? 207 : 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process scheduled blog publications." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return handleScheduledPublish(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleScheduledPublish(request);
}
