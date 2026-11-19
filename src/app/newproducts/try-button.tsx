"use client";

import { useState } from "react";
import { ProductEnquiryModal } from "@/components/product/product-enquiry-modal";
import { trackEvent } from "@/lib/analytics";

export function TryButton({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => { setOpen(true); trackEvent("product_enquiry_opened", { product: productName, requestType: "Try for Free" }); }} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]">Try for Free</button>
      <ProductEnquiryModal open={open} onClose={() => setOpen(false)} productName={productName} requestType="Try for Free" />
    </>
  );
}
