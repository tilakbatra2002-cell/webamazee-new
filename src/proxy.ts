import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionJwt } from "@/lib/cms/session-jwt";

/**
 * Permanent (301) redirects for legacy URLs previously crawled by Google
 * Search Console, plus edge-level noindex & session gate for `/admin/*`.
 */
const REDIRECTS: Record<string, string> = {
  "/on-page-seo": "/services/seo-services",
  "/keyword-research-strategy": "/services/seo-services",
  "/social-media-optimization-services": "/services",
  "/services/web-designing-services": "/services/website-development",
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/seo-services": "/services/seo-services",
  "/newhome": "/",
};

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
]);

function normalize(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function applyAdminHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function proxy(request: NextRequest) {
  const key = normalize(request.nextUrl.pathname);

  if (key === "/admin" || key.startsWith("/admin/")) {
    if (!PUBLIC_ADMIN_PATHS.has(key)) {
      const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
      const verified = token ? await verifyAdminSessionJwt(token) : null;
      if (!verified) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        loginUrl.search = key !== "/admin" ? `?next=${encodeURIComponent(key)}` : "";
        return applyAdminHeaders(NextResponse.redirect(loginUrl));
      }
    }
    return applyAdminHeaders(NextResponse.next());
  }

  const destination = REDIRECTS[key];
  if (!destination) return NextResponse.next();

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = destination;
  targetUrl.search = "";
  return NextResponse.redirect(targetUrl, 301);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
