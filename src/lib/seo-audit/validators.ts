/**
 * URL normalization and validation for the Free SEO Audit feature.
 * Runs on both the client (fast feedback) and server (authoritative).
 */

/** Normalize a user-supplied URL. Adds https:// when no scheme is present. */
export function normalizeUrl(raw: string): string {
  let value = raw.trim();
  if (!value) return "";
  // Strip surrounding brackets/quotes some browsers paste.
  value = value.replace(/^\[|\]$/g, "").trim();
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }
  return value;
}

const SCHEME_RE = /^https?:\/\//i;

/** Returns a normalized URL string, or null if invalid. */
export function validateUrl(raw: string): string | null {
  const candidate = normalizeUrl(raw);
  if (!SCHEME_RE.test(candidate)) return null;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return null;
  }

  if (!parsed.hostname || !parsed.hostname.includes(".")) return null;
  if (parsed.hostname.length > 253) return null;

  return parsed.origin + parsed.pathname + parsed.search;
}

/** Client-side quick validation used before firing the API request. */
export function isProbablyValidUrl(raw: string): boolean {
  const url = validateUrl(raw);
  return url !== null;
}
