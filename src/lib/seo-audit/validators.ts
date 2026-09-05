/**
 * URL normalization and validation for the Free SEO Audit feature.
 * Runs on both the client (fast feedback) and server (authoritative).
 */

const SCHEME_RE = /^https?:\/\//i;
const BLOCKED_SCHEMES = /^(javascript|data|file|ftp|ws|wss|blob|about|chrome|vbscript):/i;
const LOCAL_HOST_RE = /^(localhost|localhost\.localdomain)$/i;
const LOCAL_SUFFIX_RE = /\.(local|localhost|internal|lan|home|corp|private)$/i;
const IPV4_RE = /^(?:\d{1,3}\.){3}\d{1,3}$/;
const DECIMAL_IP_RE = /^\d{8,10}$/;

function ipv4ToInt(ip: string): number {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    return NaN;
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

/** True for loopback, private, link-local, CGNAT, docs and reserved IPv4. */
export function isPrivateOrReservedIpv4(ip: string): boolean {
  const int = ipv4ToInt(ip);
  if (Number.isNaN(int)) return true;
  const a = (int >>> 24) & 0xff;
  const b = (int >>> 16) & 0xff;
  const c = (int >>> 8) & 0xff;

  if (a === 0) return true;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 192 && b === 0 && (c === 0 || c === 2)) return true;
  if (a === 198 && b === 51 && c === 100) return true;
  if (a === 203 && b === 0 && c === 113) return true;
  if (a === 198 && (b === 18 || b === 19)) return true;
  if (a >= 224) return true;
  return false;
}

function isPrivateOrReservedIpv6(ip: string): boolean {
  const lower = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (lower === "::" || lower === "::1") return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("fe80")) return true;
  if (lower.startsWith("ff")) return true;
  if (lower.startsWith("2001:db8")) return true;
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateOrReservedIpv4(mapped[1]);
  const mappedHex = lower.match(/^::ffff:([0-9a-f:]+)$/);
  if (mappedHex) return true;
  return false;
}

export function isDisallowedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, "").replace(/^\[|\]$/g, "");
  if (!h) return true;
  if (LOCAL_HOST_RE.test(h)) return true;
  if (LOCAL_SUFFIX_RE.test(h)) return true;
  if (h === "metadata.google.internal" || h === "metadata.goog" || h === "169.254.169.254") {
    return true;
  }
  if (DECIMAL_IP_RE.test(h)) return true;
  if (IPV4_RE.test(h) && isPrivateOrReservedIpv4(h)) return true;
  if (h.includes(":") && isPrivateOrReservedIpv6(h)) return true;
  return false;
}

/** Normalize a user-supplied URL. Adds https:// when no scheme is present. */
export function normalizeUrl(raw: string): string {
  let value = raw.trim();
  if (!value) return "";
  value = value.replace(/^\[|\]$/g, "").replace(/^['"]+|['"]+$/g, "").trim();
  if (BLOCKED_SCHEMES.test(value)) return value;
  if (!SCHEME_RE.test(value)) {
    value = `https://${value}`;
  }
  return value;
}

/** Returns a normalized URL string, or null if invalid. */
export function validateUrl(raw: string): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 2048) return null;
  if (BLOCKED_SCHEMES.test(trimmed)) return null;

  const candidate = normalizeUrl(trimmed);
  if (!SCHEME_RE.test(candidate)) return null;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return null;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  if (parsed.username || parsed.password) return null;

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
  if (!hostname || hostname.length > 253) return null;
  if (isDisallowedHostname(hostname)) return null;

  const looksLikeIpv4 = IPV4_RE.test(hostname);
  const looksLikeIpv6 = hostname.includes(":");
  if (!looksLikeIpv4 && !looksLikeIpv6 && !hostname.includes(".")) return null;
  if (!looksLikeIpv4 && !looksLikeIpv6 && hostname.startsWith(".")) return null;

  const path = parsed.pathname || "/";
  return `${parsed.protocol}//${hostname}${parsed.port ? `:${parsed.port}` : ""}${path}${parsed.search}`;
}

/** Client-side quick validation used before firing the API request. */
export function isProbablyValidUrl(raw: string): boolean {
  return validateUrl(raw) !== null;
}
