"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { SeoAuditTrigger, SeoAuditTriggerMobile } from "./seo-audit-trigger";
import { SeoAuditModal } from "./seo-audit-modal";

interface AuditContextValue {
  openAudit: () => void;
  closeAudit: () => void;
}

const AuditContext = createContext<AuditContextValue | null>(null);

export function useSeoAudit(): AuditContextValue {
  const ctx = useContext(AuditContext);
  if (!ctx) {
    throw new Error("useSeoAudit must be used within SeoAuditProvider");
  }
  return ctx;
}

/**
 * Mounts the fixed Free SEO Audit button and the audit modal app-wide.
 * Placed in the root layout so the feature works on every page.
 */
export function SeoAuditProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openAudit = useCallback(() => setOpen(true), []);
  const closeAudit = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openAudit, closeAudit }), [openAudit, closeAudit]);

  return (
    <AuditContext.Provider value={value}>
      {children}
      <SeoAuditTrigger onClick={openAudit} />
      <SeoAuditTriggerMobile onClick={openAudit} />
      <SeoAuditModal open={open} onClose={closeAudit} />
    </AuditContext.Provider>
  );
}
