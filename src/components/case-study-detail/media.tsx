"use client";

/**
 * Honest media primitives for the detailed case studies.
 *
 * Rules enforced here:
 *  - every frame shows a real capture of the real site;
 *  - a caption never claims a viewport we do not have;
 *  - captures are contained to a comfortable reading width rather than
 *    stretched edge to edge, so a screenshot reads as a screenshot instead
 *    of a blown-up slice of a page.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Comfortable maximum width for a single large capture. */
export const CAPTURE_W = "mx-auto w-full max-w-[1000px]";

/** Frame with browser chrome, for a genuine desktop capture. */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(max-width: 1040px) 100vw, 1000px",
  ratio = "aspect-[16/10]",
  className,
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-white shadow-lift",
        CAPTURE_W,
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden />
        {url && (
          <span className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[10px] text-slate-400 ring-1 ring-line">
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <div className={cn("relative w-full overflow-hidden bg-surface", ratio)}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/** Caption beneath a capture, with the label doing the work. */
export function CaptureCaption({ label, note }: { label: string; note?: string }) {
  return (
    <p className="mx-auto mt-3 max-w-[1000px] text-[12.5px] leading-relaxed text-slate-400">
      <span className="font-semibold text-slate-600">{label}</span>
      {note && <> — {note}</>}
    </p>
  );
}

export type GalleryEntry = { src: string; label: string; alt: string; note?: string };

/**
 * Screenshot gallery: one featured capture plus its supporting views.
 *
 * Four equal tiles left an orphan in a second row with a large empty gap.
 * A featured frame with the remaining captures beneath keeps the block
 * balanced at any item count and lets the primary screenshot be the
 * largest thing on the page instead of one of four equal thumbnails.
 */
function GalleryTile({
  item,
  index,
  ratio,
  large = false,
  restoreRef,
  onOpen,
}: {
  item: GalleryEntry;
  index: number;
  ratio: string;
  large?: boolean;
  restoreRef: React.RefObject<HTMLElement | null>;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      ref={(el) => {
        if (index === 0) restoreRef.current = el;
      }}
      onClick={(e) => {
        restoreRef.current = e.currentTarget;
        onOpen(index);
      }}
      className="group block w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-glow"
      aria-label={`Enlarge: ${item.label}`}
    >
      <div className={cn("relative w-full overflow-hidden bg-surface", ratio)}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={large ? "(max-width: 1040px) 100vw, 1000px" : "(max-width: 640px) 92vw, 320px"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
        />
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/92 text-brand-700 opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
      <div className={cn("px-3.5", large ? "py-3" : "py-2.5")}>
        <span className={cn("block font-semibold leading-snug text-ink", large ? "text-[14px]" : "text-[12.5px]")}>
          {item.label}
        </span>
        {item.note && (
          <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-400">{item.note}</span>
        )}
      </div>
    </button>
  );
}

export function ScreenshotGallery({
  items,
  featureRatio = "aspect-[16/10]",
}: {
  items: GalleryEntry[];
  featureRatio?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const opener = restoreRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [open]);

  const [feature, ...rest] = items;
  if (!feature) return null;

  return (
    <div>
      <div className={cn(CAPTURE_W, "space-y-4")}>
        <div className="w-full">
          <GalleryTile item={feature} index={0} ratio={featureRatio} large restoreRef={restoreRef} onOpen={setOpen} />
        </div>
        {rest.length > 0 && (
          <div
            className={cn(
              "grid gap-4",
              rest.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
            )}
          >
            {rest.map((item, i) => (
              <GalleryTile key={`${item.label}-${i}`} item={item} index={i + 1} ratio="aspect-[4/3]" restoreRef={restoreRef} onOpen={setOpen} />
            ))}
          </div>
        )}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${items[open].label} — enlarged`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b1528]/88 p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-start justify-between gap-4">
              <p className="text-[13.5px] font-semibold text-white">
                {items[open].label}
                {items[open].note && <span className="block font-normal text-slate-300">{items[open].note}</span>}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close image"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="flex max-h-[76vh] justify-center overflow-auto rounded-2xl border border-white/15 bg-white">
              <Image
                src={items[open].src}
                alt={items[open].alt}
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 95vw, 1024px"
                className="h-auto max-h-[76vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Composed marketing image (laptop + phone), presented as-is because the
 * asset already contains its own real device framing. Contained, never
 * stretched to the full container width.
 */
export function ComposedShowcase({
  src,
  alt,
  caption,
  url,
}: {
  src: string;
  alt: string;
  caption: string;
  url?: string;
}) {
  return (
    <figure className="mx-auto w-full max-w-[900px]">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 900px" className="object-cover" />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[12.5px] text-slate-500">
        <span className="font-semibold text-slate-600">{caption}</span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline"
          >
            Visit the live site <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
