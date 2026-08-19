"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable, dependency-free Before/After image comparison slider.
 * - Drag handle with mouse, touch and keyboard support
 * - Native DOM listeners (pointer + mouse + touch) for maximum reliability
 * - Smooth 60fps updates via requestAnimationFrame + direct style writes
 * - Accepts React nodes so real `next/image` components can be dropped in
 * - Prevented text selection / scrolling while dragging
 */
export function ImageComparisonSlider({
  before,
  after,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  className,
  aspectRatio = "16 / 10",
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(50);

  const setFromX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    posRef.current = Math.min(94, Math.max(6, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const apply = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const p = posRef.current;
      if (clipRef.current) clipRef.current.style.clipPath = `inset(0 0 0 ${p}%)`;
      if (handleRef.current) {
        handleRef.current.style.left = `${p}%`;
        handleRef.current.setAttribute("aria-valuenow", String(Math.round(p)));
      }
      rafRef.current = null;
    });
  }, []);

  // Native listeners for pointer/mouse/touch (works reliably across environments)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent | MouseEvent | TouchEvent) => {
      e.preventDefault();
      draggingRef.current = true;
      const clientX =
        "touches" in e && e.touches.length ? e.touches[0].clientX : (e as PointerEvent).clientX;
      setFromX(clientX);
      apply();
    };
    const onMove = (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX =
        "touches" in e && e.touches.length ? e.touches[0].clientX : (e as PointerEvent).clientX;
      setFromX(clientX);
      apply();
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        posRef.current = Math.min(94, Math.max(6, posRef.current - 4));
        apply();
      }
      if (e.key === "ArrowRight") {
        posRef.current = Math.min(94, Math.max(6, posRef.current + 4));
        apply();
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchcancel", onUp);
    el.addEventListener("touchend", onUp);
    el.addEventListener("keydown", onKey);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchcancel", onUp);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseup", onUp);
    };
  }, [setFromX, apply]);

  return (
    <div
      ref={containerRef}
      className={`group relative touch-none select-none overflow-hidden rounded-3xl ${className ?? ""}`}
      style={{ aspectRatio }}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
      aria-valuetext="Drag to compare before and after"
    >
      {/* BEFORE (base layer) */}
      <div className="absolute inset-0">{before}</div>

      {/* AFTER (top layer, clipped from the left) */}
      <div
        ref={clipRef}
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        {after}
      </div>

      {/* labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-soft backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow backdrop-blur">
        {afterLabel}
      </span>

      {/* divider + handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: "50%" }}>
        <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </div>

      <div
        ref={handleRef}
        className="absolute top-1/2 z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-white/60 bg-white text-brand-700 shadow-glow-lg transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand-500"
        style={{ left: "50%" }}
        aria-hidden
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-brand-gradient opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40" />
        <ChevronLeft className="h-4 w-4" />
        <span className="mx-px h-5 w-px bg-brand-300" />
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}
