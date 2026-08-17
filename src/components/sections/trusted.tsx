import { Reveal } from "../ui/reveal";

const brands = [
  "Northwind",
  "Veridian",
  "Aurora Labs",
  "Summit",
  "Lumen & Co",
  "Kite Digital",
  "Bluepeak",
  "Northbay",
  "Evolve HQ",
];

export function Trusted() {
  const row = [...brands, ...brands];
  return (
    <section id="trusted" className="border-y border-line bg-surface/60 py-12">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trusted by ambitious brands across NZ · AU · UK · US
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mask-fade-x mt-8 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-14">
              {row.map((b, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap font-display text-lg font-semibold text-slate-300 transition-colors hover:text-brand-600"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
