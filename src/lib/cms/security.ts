import type { NextRequest } from "next/server";
import { getCollections } from "@/lib/db/mongodb";
import {
  getCanonicalSiteUrl,
  getTrustedAppBaseUrl,
  isMongoConfigured,
} from "./config";

interface MemoryRateBucket {
  count: number;
  windowEndsAt: number;
  lockedUntil: number;
}

const memoryAttempts = new Map<string, MemoryRateBucket>();

const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_LOCK_MS = 15 * 60 * 1000;

export interface RateLimitOptions {
  maxAttempts?: number;
  windowMs?: number;
  lockMs?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
  remaining: number;
}

function isTrustedProxyEnv(): boolean {
  return (
    process.env.VERCEL === "1" ||
    Boolean(process.env.VERCEL_ENV) ||
    process.env.TRUST_PROXY === "1"
  );
}

export function getClientIp(request: NextRequest): string {
  if (isTrustedProxyEnv()) {
    const vercelIp = request.headers.get("x-vercel-forwarded-for");
    if (vercelIp) {
      const first = vercelIp.split(",")[0]?.trim();
      if (first) return first;
    }
    const realIp = request.headers.get("x-real-ip")?.trim();
    if (realIp) return realIp;

    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      const parts = forwarded
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      // Take the rightmost proxy-appended hop rather than client-controlled leftmost value
      const hop = parts[parts.length - 1];
      if (hop) return hop;
    }
  }

  const runtimeIp = (request as NextRequest & { ip?: string }).ip?.trim();
  return runtimeIp || "direct-client";
}

function getAllowedHosts(request: NextRequest): Set<string> {
  const allowed = new Set<string>();

  for (const candidateUrl of [getTrustedAppBaseUrl(), getCanonicalSiteUrl()]) {
    try {
      allowed.add(new URL(candidateUrl).host.toLowerCase());
    } catch {
      // ignore malformed URL
    }
  }

  if (process.env.VERCEL_URL) {
    allowed.add(process.env.VERCEL_URL.trim().toLowerCase());
  }

  const reqHost = request.headers.get("host")?.trim().toLowerCase();
  if (reqHost && !/[\s<>]/.test(reqHost)) {
    allowed.add(reqHost);
  }

  // Only trust x-forwarded-host on Vercel's edge where it is platform-controlled
  if (process.env.VERCEL === "1" || process.env.VERCEL_ENV) {
    const xfHost = request.headers.get("x-forwarded-host")?.trim().toLowerCase();
    if (xfHost && !/[\s<>]/.test(xfHost)) {
      allowed.add(xfHost);
    }
  }

  return allowed;
}

export function verifyCsrfOrigin(request: NextRequest): boolean {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return true;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (secFetchSite === "cross-site") {
    return false;
  }

  const allowedHosts = getAllowedHosts(request);

  if (origin) {
    try {
      const originHost = new URL(origin).host.toLowerCase();
      return allowedHosts.has(originHost);
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).host.toLowerCase();
      return allowedHosts.has(refererHost);
    } catch {
      return false;
    }
  }

  // Fail closed on state-changing requests missing both Origin and Referer
  return false;
}

function consumeMemoryRateLimit(
  key: string,
  now: number,
  maxAttempts: number,
  windowMs: number,
  lockMs: number
): RateLimitResult {
  const existing = memoryAttempts.get(key);

  if (existing && existing.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.lockedUntil - now) / 1000)),
      remaining: 0,
    };
  }

  if (!existing || existing.windowEndsAt <= now) {
    const nextBucket: MemoryRateBucket = {
      count: 1,
      windowEndsAt: now + windowMs,
      lockedUntil: 0,
    };
    memoryAttempts.set(key, nextBucket);
    return {
      allowed: true,
      retryAfterSec: 0,
      remaining: Math.max(0, maxAttempts - 1),
    };
  }

  const nextCount = existing.count + 1;
  if (nextCount > maxAttempts) {
    const lockedUntil = now + lockMs;
    memoryAttempts.set(key, {
      count: nextCount,
      windowEndsAt: existing.windowEndsAt,
      lockedUntil,
    });
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil(lockMs / 1000)),
      remaining: 0,
    };
  }

  memoryAttempts.set(key, {
    count: nextCount,
    windowEndsAt: existing.windowEndsAt,
    lockedUntil: 0,
  });
  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: Math.max(0, maxAttempts - nextCount),
  };
}

/**
 * Atomically checks and consumes one attempt inside a fixed rate-limit window.
 * Safe under concurrent request bursts in both MongoDB Atlas and memory fallback.
 */
export async function consumeRateLimit(
  key: string,
  options?: RateLimitOptions
): Promise<RateLimitResult> {
  const maxAttempts = options?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const lockMs = options?.lockMs ?? DEFAULT_LOCK_MS;
  const now = Date.now();

  if (!isMongoConfigured()) {
    return consumeMemoryRateLimit(key, now, maxAttempts, windowMs, lockMs);
  }

  try {
    const { loginAttempts } = await getCollections();
    const nowDate = new Date(now);
    const fixedWindowEnd = new Date(now + windowMs);
    const lockUntilDate = new Date(now + lockMs);

    const doc = await loginAttempts.findOneAndUpdate(
      { key },
      [
        {
          $set: {
            _reset: {
              $and: [
                {
                  $or: [
                    { $eq: [{ $type: "$lockedUntil" }, "missing"] },
                    { $eq: ["$lockedUntil", null] },
                    { $lte: ["$lockedUntil", nowDate] },
                  ],
                },
                {
                  $or: [
                    { $eq: [{ $type: "$windowEndsAt" }, "missing"] },
                    { $lte: ["$windowEndsAt", nowDate] },
                  ],
                },
              ],
            },
          },
        },
        {
          $set: {
            count: {
              $cond: [
                "$_reset",
                1,
                {
                  $cond: [
                    {
                      $and: [
                        { $ne: ["$lockedUntil", null] },
                        { $gt: ["$lockedUntil", nowDate] },
                      ],
                    },
                    "$count",
                    { $add: [{ $ifNull: ["$count", 0] }, 1] },
                  ],
                },
              ],
            },
            windowEndsAt: {
              $cond: ["$_reset", fixedWindowEnd, "$windowEndsAt"],
            },
            lockedUntil: {
              $cond: ["$_reset", null, "$lockedUntil"],
            },
          },
        },
        {
          $set: {
            lockedUntil: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$lockedUntil", null] },
                    { $gt: ["$lockedUntil", nowDate] },
                  ],
                },
                "$lockedUntil",
                {
                  $cond: [{ $gt: ["$count", maxAttempts] }, lockUntilDate, null],
                },
              ],
            },
          },
        },
        {
          $set: {
            expiresAt: {
              $cond: [
                { $ne: ["$lockedUntil", null] },
                { $max: ["$windowEndsAt", "$lockedUntil"] },
                "$windowEndsAt",
              ],
            },
          },
        },
        { $unset: "_reset" },
      ],
      { upsert: true, returnDocument: "after" }
    );

    if (doc?.lockedUntil && doc.lockedUntil.getTime() > now) {
      return {
        allowed: false,
        retryAfterSec: Math.max(1, Math.ceil((doc.lockedUntil.getTime() - now) / 1000)),
        remaining: 0,
      };
    }

    const count = doc?.count ?? 1;
    if (count > maxAttempts) {
      return {
        allowed: false,
        retryAfterSec: Math.max(1, Math.ceil(lockMs / 1000)),
        remaining: 0,
      };
    }

    return {
      allowed: true,
      retryAfterSec: 0,
      remaining: Math.max(0, maxAttempts - count),
    };
  } catch {
    return consumeMemoryRateLimit(key, now, maxAttempts, windowMs, lockMs);
  }
}

export async function clearRateLimit(key: string): Promise<void> {
  memoryAttempts.delete(key);
  if (isMongoConfigured()) {
    try {
      const { loginAttempts } = await getCollections();
      await loginAttempts.deleteOne({ key });
    } catch {
      // Ignore cleanup failure
    }
  }
}

export function resetMemoryRateLimitsForTest(): void {
  memoryAttempts.clear();
}
