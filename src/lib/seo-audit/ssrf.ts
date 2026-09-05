import { lookup } from "node:dns/promises";
import { isDisallowedHostname, isPrivateOrReservedIpv4 } from "./validators";

/**
 * SSRF protection for the audit endpoint.
 *
 * The endpoint accepts arbitrary URLs, so we must never allow requests to
 * internal or private targets. We resolve the host to an IP and reject any
 * address that is loopback, private, link-local, reserved, or otherwise
 * non-public. Callers re-validate every redirect target.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
  "metadata.goog",
  "169.254.169.254",
  "metadata.google.com",
]);

function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("fe80")) return true;
  if (lower.startsWith("ff")) return true;
  if (lower.startsWith("2001:db8")) return true;

  const v4mapped = lower.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (v4mapped) return isPrivateOrReservedIpv4(v4mapped[1]);

  if (lower.startsWith("::ffff:")) return true;
  return false;
}

export function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, "").replace(/^\[|\]$/g, "");
  if (BLOCKED_HOSTNAMES.has(h)) return true;
  return isDisallowedHostname(h);
}

function isUnsafeAddress(address: string): boolean {
  if (address.includes(":")) return isPrivateIpv6(address);
  return isPrivateOrReservedIpv4(address);
}

/**
 * Validates that a host resolves to a public, non-private IP.
 * Throws on unsafe addresses.
 */
export async function assertSafeHost(hostname: string): Promise<void> {
  const h = hostname.toLowerCase().replace(/\.$/, "").replace(/^\[|\]$/g, "");
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
    if (isUnsafeAddress(address)) {
      throw new Error("BLOCKED_HOST");
    }
  }
}
