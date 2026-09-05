"use client";

import { ArrowRight, Globe2, SearchCheck } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 sm:text-base";

export function SeoAuditForm({
  url,
  onUrlChange,
  onSubmit,
  urlError,
  apiError,
  inputRef,
  compact = false,
}: {
  url: string;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
  urlError: string | null;
  apiError: string | null;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  compact?: boolean;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {!compact && (
        <>
          <h2 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            How healthy is your website?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Get a free website and SEO audit to uncover technical issues, SEO opportunities, performance
            problems, and areas that may be limiting your growth.
          </p>
        </>
      )}

      <label htmlFor="audit-url" className={`${compact ? "" : "mt-6 "}mb-1.5 block text-sm font-medium text-slate-600`}>
        Website URL
      </label>
      <div className="relative">
        <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id="audit-url"
          ref={inputRef}
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://yourwebsite.com"
          className={inputCls}
          inputMode="url"
          autoComplete="url"
        />
      </div>
      <p role="alert" className={"mt-1.5 text-xs font-medium " + (urlError ? "text-rose-500" : "text-slate-400")}>
        {urlError || "Free • No credit card required"}
      </p>

      {apiError && (
        <p role="alert" className="mt-3 rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-600">
          {apiError}
        </p>
      )}

      <button
        type="submit"
        className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]"
        />
        <SearchCheck className="relative h-4 w-4" />
        <span className="relative">Analyze My Website</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
