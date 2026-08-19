import type { AuditResponse } from "./types";

/**
 * Short-lived in-memory cache keyed by domain. Prevents repeated audits of the
 * same site within a short window while keeping results fresh enough to avoid
 * stale/misleading data.
 */

const TTL_MS = 5 * 60 * 1000; // 5 minutes

const store = new Map<string, { at: number; value: AuditResponse }>();

export function getCachedAudit(domain: string): AuditResponse | undefined {
  const hit = store.get(domain);
  if (!hit) return undefined;
  if (Date.now() - hit.at > TTL_MS) {
    store.delete(domain);
    return undefined;
  }
  return hit.value;
}

export function setCachedAudit(domain: string, value: AuditResponse): void {
  // Simple size guard to avoid unbounded growth.
  if (store.size > 400) {
    store.clear();
  }
  store.set(domain, { at: Date.now(), value });
}
