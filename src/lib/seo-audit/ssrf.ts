import { lookup } from "node:dns/promises";

/**
 * SSRF protection for the audit endpoint.
 *
 * The endpoint accepts arbitrary URLs, so we must never allow requests to
 * internal or private targets. We resolve the host to an IP and reject any
 * address that is loopback, private, link-local, reserved, or otherwise
 * non-public. Callers re-validate every redirect target.
 */

const BLOCKED_HOSTNAMES = [
  "localhost",
  "metadata.google.internal",
  "metadata.goog",
  "169.254.169.254",
];

function ipv4ToInt(ip: string): number {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    return NaN;
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function isPrivateIpv4(ip: string): boolean {
  const int = ipv4ToInt(ip);
  if (Number.isNaN(int)) return true; // treat unparseable as unsafe
  const isPrivate = (
    // 10.0.0.0/8
    (int >>> 24) === 10 ||
    // 127.0.0.0/8
    (int >>> 24) === 127 ||
    // 169.254.0.0/16 (link-local incl. cloud metadata)
    ((int >>> 16) & 0xffff) === 0xa9fe ||
    // 172.16.0.0/12
    ((int >>> 20) & 0xfff) === 0xac1 ||
    // 192.168.0.0/16
    ((int >>> 16) & 0xffff) === 0xc0a8 ||
    // 100.64.0.0/10 (CGNAT)
    ((int >>> 22) & 0x3ff) === 0x64 ||
    // 0.0.0.0/8
    (int >>> 24) === 0 ||
    // 198.18.0.0/15 (benchmarking)
    ((int >>> 21) & 0x7ff) === 0xfc1 ||
    // 192.0.0.0/24 and 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 (reserved/doc)
    ((int >>> 24) === 192 && ((int & 0xff) === 0)) ||
    ((int >>> 24) === 198 && ((int & 0xff) === 51)) ||
    ((int >>> 24) === 203 && ((int & 0xff) === 0 && ((int >>> 16) & 0xff) === 0)) ||
    // 240.0.0.0/4 reserved
    (int >>> 24) >= 240
  );
  return isPrivate;
}

/** Basic IPv6 reserved / private range detection. */
function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower.startsWith("::1")) return true; // loopback
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local
  if (lower.startsWith("fe80")) return true; // link-local
  if (lower.startsWith("::")) return true; // unspecified
  return false;
}

function isLoopbackIp(ip: string): boolean {
  if (ip === "::1") return true;
  return ipv4ToInt(ip) !== ipv4ToInt(ip) ? false : (ipv4ToInt(ip) >>> 24) === 127;
}

/**
 * Returns true if a hostname is explicitly blocked (no DNS lookup needed).
 */
export function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, "");
  return BLOCKED_HOSTNAMES.includes(h);
}

/**
 * Validates that a host resolves to a public, non-private IP.
 * Throws on unsafe addresses.
 */
export async function assertSafeHost(hostname: string): Promise<void> {
  const h = hostname.toLowerCase().replace(/\.$/, "");
  if (isBlockedHostname(h)) {
    throw new Error("BLOCKED_HOST");
  }

  let addresses: import("node:dns").LookupAddress[];
  try {
    addresses = await lookup(h, { all: true });
  } catch {
    throw new Error("DNS_FAILED");
  }

  if (!addresses.length) throw new Error("BLOCKED_HOST");

  for (const { address } of addresses) {
    const isIpv4 = address.includes(".");
    if (isIpv4) {
      if (isLoopbackIp(address) || isPrivateIpv4(address)) {
        throw new Error("BLOCKED_HOST");
      }
    } else {
      if (isPrivateIpv6(address)) {
        throw new Error("BLOCKED_HOST");
      }
    }
  }
}
