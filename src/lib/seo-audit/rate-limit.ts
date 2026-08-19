/**
 * Lightweight in-memory rate limiting.
 *
 * Suitable as a first line of defense in a serverless environment. It is
 * process-local (not shared across instances), so it is best-effort rather than
 * a hard guarantee. The shape is intentionally simple so it can be swapped for
 * a shared store (e.g. Upstash Redis / Vercel KV) later without changing callers.
 */

interface Bucket {
  windowStart: number;
  count: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10; // per IP per minute

// key -> bucket
const buckets = new Map<string, Bucket>();

// Simple periodic cleanup to avoid unbounded growth.
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < WINDOW_MS) return;
  lastCleanup = now;
  for (const [key, b] of buckets) {
    if (now - b.windowStart > WINDOW_MS) buckets.delete(key);
  }
}

export function isRateLimited(key: string): boolean {
  cleanup();
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { windowStart: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}
