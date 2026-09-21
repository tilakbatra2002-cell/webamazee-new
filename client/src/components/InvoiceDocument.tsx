import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// The single canonical invoice template - the exact same module the server
// uses to produce the PDF and PNG/JPG, so all four outputs stay identical.
// @ts-expect-error - plain JS module shared with the Express server
import { invoiceBodyHtml, invoiceStyles, A4_PX } from '@shared/invoiceTemplate.js';
import type { Invoice } from '../lib/types';

let styleEl: HTMLStyleElement | null = null;

/** Injects the template stylesheet once, refreshing it when the accent changes. */
function useTemplateStyles(primaryColor: string) {
  useEffect(() => {
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.dataset.wmInvoiceTemplate = 'true';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = invoiceStyles(primaryColor);
  }, [primaryColor]);
}

interface Props {
  /** Full invoice, or the live draft being edited. */
  invoice: Partial<Invoice>;
  /** Scale the fixed A4 canvas down to fit narrow screens. */
  fit?: boolean;
  className?: string;
}

/**
 * Renders the invoice exactly as it will be exported.
 *
 * The A4 canvas has a fixed 794px width so the preview is pixel-identical to
 * the PDF; on small screens it is proportionally scaled rather than reflowed.
 */
export function InvoiceDocument({ invoice, fit = true, className = '' }: Props) {
  const accent = invoice?.company?.primaryColor || '#0F6DFF';
  useTemplateStyles(accent);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!fit) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const measure = () => {
      const available = wrapper.clientWidth;
      const next = Math.min(1, available / A4_PX.width);
      setScale(next);
      const contentHeight = innerRef.current?.scrollHeight ?? A4_PX.height;
      setHeight(contentHeight * next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [fit, invoice]);

  const html = invoiceBodyHtml(invoice);

  return (
    <div ref={wrapperRef} className={`wm-invoice-scaler ${className}`} style={{ height }}>
      <div
        ref={innerRef}
        style={
          fit
            ? { transform: `scale(${scale})`, transformOrigin: 'top left', width: A4_PX.width }
            : undefined
        }
        // The markup is produced by our own template module, which HTML-escapes
        // every field it interpolates (see shared/invoiceTemplate.js).
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
