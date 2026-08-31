import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Permanent (301) redirects for legacy URLs previously crawled by Google
 * Search Console. Each obsolete path maps directly to its current canonical
 * destination — a single 301, with no redirect chain and no loop.
 *
 * This lives in the proxy (formerly "middleware"; renamed in Next.js 16)
 * because it runs BEFORE Next.js trailing-slash normalization. That lets the
 * trailing-slash variants (e.g. `/on-page-seo/`) return the 301 immediately,
 * instead of first going through an extra trailing-slash hop. It also lets us
 * return an explicit 301 status.
 *
 * Domain-level handling (non-www -> www, http -> https) is done at the host /
 * Vercel layer and is intentionally not duplicated here.
 */
const REDIRECTS: Record<string, string> = {
  // Legacy on-page SEO article -> current SEO services page
  "/on-page-seo": "/services/seo-services",
  // Legacy keyword research article -> current SEO services page
  "/keyword-research-strategy": "/services/seo-services",
  // Legacy social media optimization service -> services hub
  "/social-media-optimization-services": "/services",
  // Legacy web designing services -> current website development service
  "/services/web-designing-services": "/services/website-development",
  // Legacy about-us page -> current about page
  "/about-us": "/about",
  // Legacy contact-us page -> current contact page
  "/contact-us": "/contact",
};

function normalize(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function proxy(request: NextRequest) {
  const key = normalize(request.nextUrl.pathname);
  const destination = REDIRECTS[key];
  if (!destination) return NextResponse.next();

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = destination;
  targetUrl.search = ""; // keep the destination clean (canonical path only)
  return NextResponse.redirect(targetUrl, 301);
}

export const config = {
  // Run the proxy on page requests (exclude Next internals, the API and
  // static assets). The redirect logic inside runs BEFORE Next.js trailing-
  // slash normalization, so both the bare and trailing-slash legacy paths
  // return a single 301. Non-legacy paths fall straight through via
  // NextResponse.next(), so normal pages are unaffected.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
