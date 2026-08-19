"use client";

import { forwardRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}

const sizeStyles: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-[3.4rem] px-9 text-base",
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-300 select-none";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { children, variant = "primary", size = "md", withArrow, className, onClick, href, type = "button" },
    ref
  ) {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>(
      []
    );

    function spawnRipple(e: React.MouseEvent<HTMLButtonElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 650);
    }

    const variantStyles: Record<Variant, string> = {
      primary:
        "bg-brand-gradient text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
      secondary:
        "bg-white text-ink border border-line shadow-soft hover:border-brand-600/40 hover:text-brand-700 hover:shadow-glow",
      ghost: "bg-transparent text-ink hover:text-brand-700",
    };

    const content = (
      <button
        ref={ref}
        type={type}
        onClick={(e) => {
          spawnRipple(e);
          onClick?.();
        }}
        className={cn(base, sizeStyles[size], variantStyles[variant], className)}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          {withArrow && (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
        {variant === "primary" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          >
            <span className="absolute inset-y-0 left-0 w-1/2 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(320%)]" />
          </span>
        )}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none absolute h-6 w-6 rounded-full bg-white/40"
            style={{ left: r.x - 12, top: r.y - 12 }}
          />
        ))}
      </button>
    );

    if (href) {
      return (
        <Magnetic>
          <a href={href} className="inline-flex">
            {content}
          </a>
        </Magnetic>
      );
    }
    return <Magnetic>{content}</Magnetic>;
  }
);
