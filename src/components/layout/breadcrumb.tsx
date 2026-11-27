"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({
  crumbs,
  align = "center",
}: {
  crumbs: { label: string; href?: string }[];
  /** "center" is the historical default used by the centred page heroes. */
  align?: "center" | "start";
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={align === "start" ? "flex justify-start" : "flex justify-center"}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-700">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-brand-700">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-ink">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
