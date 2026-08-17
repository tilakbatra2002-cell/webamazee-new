import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  icon,
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow?: ReactNode;
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={cn("max-w-3xl", alignCls)}>
      {eyebrow && <div className="mb-5">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
