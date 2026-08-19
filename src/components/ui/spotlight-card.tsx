"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a soft spotlight glow that follows the cursor.
 * Wraps children in an overflow-hidden rounded container.
 */
export function SpotlightCard({
  children,
  className,
  spotlightSize = 420,
  spotlightOpacity = 0.13,
}: {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={cn("group relative", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, rgba(30,136,255,${spotlightOpacity}), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
