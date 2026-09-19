"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ProductEnquiryModal } from "./product-enquiry-modal";

/**
 * Renders the "Try for Free" / "Book a Demo" button pair for a product.
 * Both open the shared product enquiry modal (built on the existing
 * Webamazee contact form infrastructure) with `Product Interested In`
 * pre-filled — no separate signup system is created.
 */
export function ProductCtaButtons({
  productName,
  primaryLabel = "Try for Free",
  secondaryLabel = "Book a Demo",
  size = "lg",
  align = "left",
  variant = "light",
}: {
  productName: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  size?: "md" | "lg";
  align?: "left" | "center";
  /** Use "dark" when placed on a brand-gradient / dark background. */
  variant?: "light" | "dark";
}) {
  const [modal, setModal] = useState<"Try for Free" | "Book a Demo" | null>(null);

  function open(type: "Try for Free" | "Book a Demo") {
    setModal(type);
    trackEvent("product_enquiry_opened", { product: productName, requestType: type });
  }

  const sizeCls = size === "lg" ? "h-[3.4rem] px-9 text-base" : "h-12 px-7 text-sm";
  const primaryCls =
    variant === "dark"
      ? "bg-white text-brand-700 hover:brightness-105"
      : "bg-brand-gradient text-white hover:shadow-glow-lg hover:-translate-y-0.5";
  const secondaryCls =
    variant === "dark"
      ? "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
      : "border border-line bg-white text-ink shadow-soft hover:border-brand-600/40 hover:text-brand-700 hover:shadow-glow";

  return (
    <>
      <div className={`flex flex-col gap-3 sm:flex-row ${align === "center" ? "items-center justify-center" : ""}`}>
        <button
          type="button"
          onClick={() => open("Try for Free")}
          className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold shadow-glow transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${primaryCls} ${sizeCls}`}
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {primaryLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => open("Book a Demo")}
          className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${secondaryCls} ${sizeCls}`}
        >
          <CalendarDays className="h-4 w-4" />
          {secondaryLabel}
        </button>
      </div>

      <ProductEnquiryModal
        open={modal !== null}
        onClose={() => setModal(null)}
        productName={productName}
        requestType={modal ?? "Try for Free"}
      />
    </>
  );
}
