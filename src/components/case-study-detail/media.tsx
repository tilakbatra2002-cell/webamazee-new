"use client";

/**
 * Honest media primitives for the detailed case studies.
 *
 * The rule these enforce: every frame shows a real capture of the real site,
 * and a caption never claims a viewport we do not actually have. Several
 * earlier components rendered one desktop screenshot inside tablet and phone
 * chrome, which implied responsive captures that do not exist. Nothing in
 * here does that — `BrowserFrame` takes the asset, and callers only pass
 * device-labelled content when a genuine asset backs it.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Fixed-ratio frame with browser chrome, for a genuine desktop capture. */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1100px",
  className,
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-line bg-white shadow-lift", className)}>
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
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}

/**
 * Caption plus context for a single screenshot. `note` explains what the
 * capture actually shows, so a reader is never asked to infer it.
 */
export function CaptureFigure({
  src,
  alt,
  caption,
  note,
  ratio = "aspect-[16/10]",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 760px",
}: {
  src: string;
  alt: string;
  caption: string;
  note?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="min-w-0">
      <div className={cn("relative w-full overflow-hidden rounded-2xl border border-line bg-white", ratio)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
      <figcaption className="mt-3 text-[13px] leading-relaxed text-slate-500">
        <span className="font-semibold text-ink">{caption}</span>
        {note && <> — {note}</>}
      </figcaption>
    </figure>
  );
}

export type GalleryEntry = { src: string; label: string; alt: string; note?: string };

/**
 * Screenshot gallery. Each entry owns its own image; the lightbox respects
 * each capture's natural aspect ratio instead of forcing a fixed crop.
 * Escape closes, background scroll locks, focus returns to the opener.
 */
export function ScreenshotGallery({
  items,
  columns = 3,
}: {
  items: GalleryEntry[];
  columns?: 2 | 3;
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
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      restoreRef.current?.focus();
    };
  }, [open]);

  return (
    <div>
      <div
        className={cn(
          "grid gap-5",
          columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
        )}
      >
        {items.map((item, i) => (
          <button
            key={`${item.label}-${i}`}
            type="button"
            ref={(el) => {
              if (i === 0) restoreRef.current = el;
            }}
            onClick={(e) => {
              restoreRef.current = e.currentTarget;
              setOpen(i);
            }}
            className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-glow"
            aria-label={`Enlarge: ${item.label}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/92 text-brand-700 opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
            <div className="px-3.5 py-3">
              <p className="text-[13px] font-semibold leading-snug text-ink">{item.label}</p>
              {item.note && (
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{item.note}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${items[open].label} — enlarged`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b1528]/85 p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-start justify-between gap-4">
              <p className="text-[13.5px] font-semibold text-white">
                {items[open].label}
                {items[open].note && (
                  <span className="block font-normal text-slate-300">{items[open].note}</span>
                )}
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
 * Composed device presentation used ONLY where a genuine composed asset
 * exists in the repo — these marketing images already contain their own
 * laptop/phone framing, so we present them as-is rather than faking chrome.
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
    <figure className="min-w-0">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 1000px" className="object-cover" />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[13px] text-slate-500">
        <span className="font-semibold text-ink">{caption}</span>
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
