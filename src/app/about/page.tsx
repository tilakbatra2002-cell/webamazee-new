import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { Sparkles, Rocket, Handshake, ShieldCheck, Globe2, LineChart } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader, BenefitsGrid } from "@/components/ui/sections-blocks";
import { globalStats } from "@/lib/stats";

export const metadata: Metadata = staticMetadata("about");

const values = [
  { icon: Rocket, title: "Results over hype", desc: "We measure success in rankings, revenue and real growth — not vanity metrics." },
  { icon: ShieldCheck, title: "White-hat always", desc: "Ethical, Google-safe tactics that protect your business for the long term." },
  { icon: Handshake, title: "Partnership mindset", desc: "We act like part of your team, invested in your outcomes." },
  { icon: LineChart, title: "Data-driven", desc: "Every decision is backed by analytics, testing and evidence." },
  { icon: Globe2, title: "Global perspective", desc: "We serve clients worldwide with local fluency and a global standard." },
  { icon: Sparkles, title: "AI-powered", desc: "We combine AI with human expertise to move faster and smarter." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We're the growth partner behind"
        highlight="your success"
        subtitle="Webamazee is a premium AI-powered digital marketing company built to help ambitious businesses build, optimise and rank."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                <Sparkles className="h-3.5 w-3.5" /> Our Story
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Built by marketers who believe in{" "}
                <span className="text-gradient">measurable growth</span>
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-500">
                <p>
                  Webamazee was founded on a simple conviction: businesses
                  deserve a digital partner that blends premium design,
                  world-class engineering and cutting-edge AI — without the
                  hype, jargon or empty promises.
                </p>
                <p>
                  Today we help business owners, startups and SMEs across around
                  the world build high-performing
                  websites, dominate search results and grow revenue
                  sustainably. Our AI Marketing Framework sits at the heart of
                  everything we do.
                </p>
                <p>
                  We stay deliberately focused. No bloated agency overheads,
                  no obscure reports, no shady tactics. Just a clear strategy,
                  expert execution and results you can see in the numbers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
                <div className="relative rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-lift backdrop-blur-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {globalStats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-3xl border border-line bg-white p-6 text-center shadow-soft"
                      >
                        <p className="font-display text-4xl font-bold text-brand-700">
                          <Counter to={s.to} prefix={s.prefix ?? ""} suffix={s.suffix} />
                        </p>
                        <p className="mt-2 text-sm text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-brand-gradient p-5 text-center text-white">
                    <p className="font-display text-lg font-semibold">
                      The AI Marketing Framework
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      Data → AI Optimisation → Content → Rank & Scale
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative overflow-hidden py-14">
        <div className="absolute inset-0 bg-brand-gradient" />
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {globalStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                  <Counter to={s.to} prefix={s.prefix ?? ""} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Values"
            title="The principles behind"
            highlight="every engagement"
          />
        </div>
      </section>
      <div className="bg-white">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/20 hover:shadow-glow">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Why choose band via benefits */}
      <div className="bg-surface">
        <div className="mx-auto max-w-[1350px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose Webamazee"
            title="A partner built for"
            highlight="growth"
          />
        </div>
      </div>
      <BenefitsGrid
        bg="bg-surface"
        benefits={[
          { title: "Premium quality", desc: "Design and engineering that rivals the best agencies anywhere." },
          { title: "AI advantage", desc: "Proprietary AI workflows that accelerate results." },
          { title: "Transparent pricing", desc: "Clear proposals with no hidden fees or surprises." },
          { title: "Full accountability", desc: "Live dashboards and honest monthly reporting." },
        ]}
      />

      <CTABanner
        title="Let's build your growth story"
        subtitle="Whether you're launching, redesigning or scaling — we'd love to hear about your business."
      />
    </>
  );
}
