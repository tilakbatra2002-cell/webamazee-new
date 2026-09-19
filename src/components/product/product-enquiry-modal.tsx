"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { ProductEnquiryForm } from "./product-enquiry-form";

export function ProductEnquiryModal({
  open,
  onClose,
  productName,
  requestType,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
  requestType: "Try for Free" | "Book a Demo";
}) {
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-md sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${requestType} — ${productName}`}
        >
          <motion.div
            ref={focusRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-500 shadow-soft transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft">
                <Sparkles className="h-3.5 w-3.5" /> {requestType} — {productName}
              </span>
            </div>

            <ProductEnquiryForm productName={productName} requestType={requestType} onSuccess={() => {}} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
