"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Subtle GSAP scroll reveal for the Zirakpur redesign.
 *
 * Deliberately restrained: a short y-offset and opacity fade, staggered per
 * child, once only. Honours prefers-reduced-motion by rendering the final state
 * immediately with no animation registered at all.
 *
 * Children are revealed individually by giving them the `data-gsap-item`
 * attribute, which is what the stagger animates.
 */
export function GsapReveal({
  children,
  className = "",
  stagger = 0.06,
  y = 18,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Delay between child reveals, in seconds. */
  stagger?: number;
  /** Distance travelled upward while revealing, in pixels. */
  y?: number;
  as?: "div" | "section" | "ul" | "ol" | "figure" | "dl";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-gsap-item]");
      const targets = items.length > 0 ? items : [el];

      // Anything already inside the first screen must never start hidden,
      // otherwise above-the-fold content waits for a scroll that never comes.
      const inFirstScreen = el.getBoundingClientRect().top < window.innerHeight * 0.92;

      if (inFirstScreen) {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: items.length > 1 ? stagger : 0,
            delay: 0.05,
            clearProps: "opacity,transform",
          }
        );
        return;
      }

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: items.length > 1 ? stagger : 0,
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
      });
    }, el);

    // Safety net: if ScrollTrigger never fires (js error, reduced refresh,
    // layout shift), make absolutely sure nothing stays invisible.
    const failsafe = window.setTimeout(() => {
      el.querySelectorAll<HTMLElement>("[data-gsap-item]").forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      (el as HTMLElement).style.opacity = "1";
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [stagger, y]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/**
 * A single animated line/block. Wrap any text-owning element you want to fade
 * in without restructuring the surrounding markup.
 */
export function GsapItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-gsap-item className={className}>
      {children}
    </div>
  );
}
