"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  /** Distance travelled while revealing, in tailwind units. */
  from?: "up" | "left" | "right" | "none";
};

/**
 * Lightweight scroll reveal.
 *
 * Deliberately dependency-free: the project ships framer-motion, but pulling in
 * GSAP for five preview pages would add ~70 kB for what is a single
 * IntersectionObserver plus a CSS transition. Honours prefers-reduced-motion by
 * rendering the final state immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the OS setting without setting state synchronously: the
    // observer fires immediately for anything already on screen, and reduced
    // motion is handled by `motion-reduce:` classes in the markup.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }

    // Anything already in view on first paint should not wait for scroll.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    from === "left"
      ? "-translate-x-5 opacity-0"
      : from === "right"
        ? "translate-x-5 opacity-0"
        : from === "none"
          ? "opacity-0"
          : "translate-y-5 opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none",
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
