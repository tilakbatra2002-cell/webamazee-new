"use client";

/**
 * Case study presentation primitives.
 *
 * These replace the repeated card grids with a small vocabulary the three
 * case studies compose differently: a wide showcase frame, a device strip,
 * a numbered requirement list and a gallery that honours each entry's own
 * image. All styling comes from the established case-study tokens already
 * used across the site, so nothing new is introduced visually.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

export type GalleryItem = {
  label: string;
  device: "desktop" | "tablet" | "mobile";
  alt: string;
  src?: string;
};

/**
 * A large, single project capture in a browser-style frame. The frame is
 * presentational chrome around a real screenshot — it is never a fabricated
 * browser window containing invented UI.
 */
export function ShowcaseFrame({
  src,
  alt,
  caption,
  url,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  url: string;
  priority?: boolean;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-[#f7f9fc] px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
          </span>
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-white px-2.5 py-0.5 text-[10.5px] font-medium text-slate-500">
            {host}
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-[#f7f9fc]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-top"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-[12px] text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Wide, full-bleed showcase for the composed project artwork.
 */
export function WideShowcase({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[3/2] w-full">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      {caption && (
        <figcaption className="border-t border-slate-200 bg-[#f7f9fc] px-4 py-2.5 text-[12px] text-slate-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Desktop capture beside a portrait capture. Used where a project has a
 * genuine full-page or mobile-long capture rather than a second desktop one.
 */
export function SplitShowcase({
  wide,
  tall,
  wideAlt,
  tallAlt,
  wideCaption,
  tallCaption,
}: {
  wide: { src: string; url: string };
  tall: { src: string };
  wideAlt: string;
  tallAlt: string;
  wideCaption?: string;
  tallCaption?: string;
}) {
  const host = wide.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      <figure>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center border-b border-slate-200 bg-[#f7f9fc] px-3 py-2">
            <span className="mx-auto max-w-[70%] truncate rounded-md bg-white px-2.5 py-0.5 text-[10.5px] font-medium text-slate-500">
              {host}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={wide.src}
              alt={wideAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover object-top"
            />
          </div>
        </div>
        {wideCaption && (
          <figcaption className="mt-2 text-[12px] text-slate-500">{wideCaption}</figcaption>
        )}
      </figure>

      <figure>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <div className="relative mx-auto aspect-[9/17] w-full max-w-[260px] overflow-hidden rounded-xl">
            <Image
              src={tall.src}
              alt={tallAlt}
              fill
              sizes="260px"
              className="object-cover object-top"
            />
          </div>
        </div>
        {tallCaption && (
          <figcaption className="mt-2 text-center text-[12px] text-slate-500">
            {tallCaption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

/**
 * Numbered requirement list — reads as an editorial list rather than a grid
 * of equal-weight cards.
 */
export function RequirementList({
  items,
  numbered = true,
}: {
  items: string[];
  numbered?: boolean;
}) {
  return (
    <ol className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-4 py-3.5">
          {numbered && (
            <span className="mt-0.5 shrink-0 font-display text-[11px] font-bold text-[#0f6dff]">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <p className="text-[13.5px] leading-relaxed text-slate-600">{item}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Gallery. Each tile uses its own `src` when the entry has one, so tiles are
 * no longer four crops of a single screenshot. Falls back to the project
 * image for entries without a dedicated capture.
 */
export function ProjectGallery({
  items,
  fallback,
  heading = "Project gallery",
}: {
  items: GalleryItem[];
  fallback: string;
  heading?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  // Escape closes, the page behind does not scroll, and focus returns to the
  // tile that was opened so keyboard users keep their place.
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={`${item.label}-${i}`}
            type="button"
            onClick={(e) => {
              restoreRef.current = e.currentTarget;
              setOpen(i);
            }}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-colors hover:border-[#0f6dff]/40"
            aria-label={`View ${item.label}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f7f9fc]">
              <Image
                src={item.src ?? fallback}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] font-semibold text-[#0b1528]">
                  {item.label}
                </span>
                <span className="text-[11px] uppercase tracking-[0.08em] text-slate-400">
                  {item.device}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[#0f6dff]"
              />
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b1528]/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${items[open].label} — enlarged view`}
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-[13.5px] font-semibold text-white">
                {items[open].label}{" "}
                <span className="font-normal text-slate-400">· {heading}</span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close gallery"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="flex max-h-[76vh] justify-center overflow-auto rounded-2xl border border-white/15 bg-white">
              <Image
                src={items[open].src ?? fallback}
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
