"use client";

import { useEffect } from "react";

/** Page-local, progressively enhanced motion: content remains visible without JS. */
export function AboutEffects() {
  useEffect(() => {
    const root = document.getElementById("new-about-content");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const animations = new Set<Animation>();
    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-about-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (reducedMotion.matches) return;

          const element = entry.target as HTMLElement;
          const animation = element.animate(
            [
              { opacity: 0.35, transform: "translateY(20px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((element) => observer.observe(element));

    const cleanups = Array.from(root.querySelectorAll<HTMLElement>("[data-about-tilt]")).map((element) => {
      const move = (event: PointerEvent) => {
        if (reducedMotion.matches || !hoverPointer.matches || event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.transform = `perspective(1200px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
      };
      const reset = () => { element.style.transform = ""; };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      element.addEventListener("pointercancel", reset);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
        element.removeEventListener("pointercancel", reset);
        reset();
      };
    });

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      root.querySelectorAll<HTMLElement>("[data-about-tilt]").forEach((element) => {
        element.style.transform = "";
      });
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      cleanups.forEach((cleanup) => cleanup());
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return null;
}
