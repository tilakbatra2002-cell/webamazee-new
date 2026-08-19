import { cn } from "@/lib/utils";

type Variant = "homepage" | "service" | "product" | "mobile" | "booking" | "landing";

/** Stylised "BEFORE" preview — dated, muted, cluttered. Not a real screenshot. */
function BeforeMock({ variant }: { variant: Variant }) {
  const isMobile = variant === "mobile";
  return (
    <div className={cn("flex h-full w-full flex-col overflow-hidden bg-slate-100", isMobile && "px-1")}>
      {/* old-school top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-200 px-3 py-1.5">
        <div className="h-2 w-10 rounded bg-slate-300" />
        <div className="flex gap-1">
          <div className="h-1.5 w-6 rounded bg-slate-300" />
          <div className="h-1.5 w-6 rounded bg-slate-300" />
          <div className="h-1.5 w-6 rounded bg-slate-300" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="h-3 w-1/2 rounded bg-slate-300" />
        <div className="h-2 w-2/3 rounded bg-slate-200" />
        <div className={cn("mt-1 h-8 w-full rounded bg-gradient-to-r from-slate-300 to-slate-200", isMobile && "h-16")} />
        <div className={cn("grid gap-1.5", isMobile ? "grid-cols-1" : "grid-cols-3")}>
          {Array.from({ length: isMobile ? 3 : 3 }).map((_, i) => (
            <div key={i} className="h-6 rounded bg-slate-200" />
          ))}
        </div>
        <div className={cn("mt-auto flex gap-1.5", isMobile && "flex-col")}>
          <div className="h-4 w-1/3 rounded bg-slate-300" />
          <div className="h-4 w-1/4 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

/** Stylised "AFTER" preview — premium, brand-coloured, modern. Not a real screenshot. */
function AfterMock({ variant }: { variant: Variant }) {
  const isMobile = variant === "mobile";
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-white to-brand-50">
      {/* modern nav */}
      <div className="flex items-center justify-between border-b border-brand-100 bg-white/70 px-3 py-1.5 backdrop-blur">
        <div className="h-2 w-10 rounded-full bg-brand-gradient" />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-6 rounded-full bg-brand-200" />
          <div className="h-1.5 w-6 rounded-full bg-brand-200" />
          <div className="h-1.5 w-6 rounded-full bg-brand-gradient" />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col gap-1.5 p-3">
        <div className="grid-pattern absolute inset-0 opacity-30" />
        <div className="relative h-2.5 w-1/2 rounded-full bg-brand-300/80" />
        <div className="relative h-2 w-2/3 rounded-full bg-brand-200/70" />
        <div className={cn("relative mt-1 h-8 w-full overflow-hidden rounded-lg bg-brand-gradient shadow-glow", isMobile && "h-16")}>
          <span className="absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-sm" />
        </div>
        <div className={cn("relative grid gap-1.5", isMobile ? "grid-cols-1" : "grid-cols-3")}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-7 rounded-lg bg-white shadow-soft ring-1 ring-brand-100" />
          ))}
        </div>
        <div className={cn("relative mt-auto flex gap-1.5", isMobile && "flex-col")}>
          <div className="h-4 w-1/3 rounded-full bg-brand-gradient" />
          <div className="h-4 w-1/4 rounded-full border border-brand-300 bg-white" />
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterMockups({ variant }: { variant: Variant }) {
  return (
    <div className="flex h-full w-full flex-col">
      <BeforeMock variant={variant} />
    </div>
  );
}

export function BeforeMockView({ variant }: { variant: Variant }) {
  return <BeforeMock variant={variant} />;
}

export function AfterMockView({ variant }: { variant: Variant }) {
  return <AfterMock variant={variant} />;
}
