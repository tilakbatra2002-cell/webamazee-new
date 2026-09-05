"use client";

import { useCallback, useRef, useState } from "react";
import { validateUrl } from "@/lib/seo-audit/validators";
import { trackEvent } from "@/lib/analytics";
import type { AuditResponse } from "@/lib/seo-audit/types";
import { AUDIT_PROGRESS_STEPS } from "./seo-audit-progress";

export type AuditStep = "form" | "progress" | "result";

export function useSeoAuditRun(initialUrl = "") {
  const [step, setStep] = useState<AuditStep>("form");
  const [url, setUrl] = useState(initialUrl);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [result, setResult] = useState<AuditResponse | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopProgress = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    setProgressStep(0);
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 1;
      if (i >= AUDIT_PROGRESS_STEPS.length - 1) {
        setProgressStep(AUDIT_PROGRESS_STEPS.length - 1);
        stopProgress();
        return;
      }
      setProgressStep(i);
    }, 700);
  }, [stopProgress]);

  const reset = useCallback((nextUrl = "") => {
    stopProgress();
    setStep("form");
    setUrl(nextUrl);
    setUrlError(null);
    setApiError(null);
    setResult(null);
    setProgressStep(0);
  }, [stopProgress]);

  const analyze = useCallback(
    async (raw?: string) => {
      const value = (raw ?? url).trim();
      const normalized = validateUrl(value);
      if (!normalized) {
        setUrlError("Please enter a valid website URL.");
        setStep("form");
        trackEvent("audit_failed", { reason: "invalid-url" });
        trackEvent("seo_audit_failed", { reason: "invalid-url" });
        return;
      }

      setUrl(value);
      setUrlError(null);
      setApiError(null);
      setStep("progress");
      startProgress();
      trackEvent("audit_started");
      trackEvent("seo_audit_started");

      const startedAt = Date.now();
      try {
        const res = await fetch("/api/seo-audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ url: normalized }),
        });
        const data = (await res.json()) as AuditResponse & { error?: string; code?: string };
        const elapsed = Date.now() - startedAt;
        if (elapsed < 1100) {
          await new Promise((resolve) => setTimeout(resolve, 1100 - elapsed));
        }

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Unable to analyze that website.");
        }
        stopProgress();
        setProgressStep(AUDIT_PROGRESS_STEPS.length);
        setResult(data);
        setStep("result");
        trackEvent("audit_completed", { score: data.seoScore.overall });
        trackEvent("seo_audit_completed", { score: data.seoScore.overall });
      } catch (err) {
        stopProgress();
        const message = err instanceof Error ? err.message : "Unable to analyze that website.";
        setApiError(message);
        setStep("form");
        trackEvent("audit_failed", { reason: "api-error" });
        trackEvent("seo_audit_failed", { reason: "api-error" });
      }
    },
    [url, startProgress, stopProgress]
  );

  return {
    step,
    url,
    setUrl,
    urlError,
    apiError,
    progressStep,
    result,
    analyze,
    reset,
  };
}
