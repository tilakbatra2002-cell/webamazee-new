import { companyProofPoints } from "@/lib/proof-points";

export function AgencyEvidence() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {companyProofPoints.map((point) => (
            <div key={point.label} className="text-center">
              <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                {point.value}
              </p>
              <p className="mt-2 text-sm font-medium text-white/75">{point.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
