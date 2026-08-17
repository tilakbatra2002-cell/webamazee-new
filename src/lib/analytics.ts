"use client";

import type { AnalyticsEvent } from "./seo-audit/types";

/**
 * Lightweight analytics wrapper.
 *
 * Fires into the standard `window.dataLayer` / `gtag` surface when present so
 * existing tag managers pick up events without installing a new platform. Falls
 * back to a no-op in development. New analytics providers can be wired here.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...params };

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    }
  } catch {
    // Analytics must never break the audit flow.
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", payload);
  }
}
