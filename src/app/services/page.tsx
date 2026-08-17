import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import Link from "next/link";
import { ArrowUpRight, Code2, Search, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { services } from "@/lib/services";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/services/service-icon";

export const metadata: Metadata = staticMetadata("services");

const groups = [
  { key: "web", label: "Web Design & Development", icon: Code2, desc: "Premium websites, redesigns, landing pages and e-commerce that convert.", slugs: ["website-development", "website-redesign", "landing-page-development", "ecommerce-development"] },
  { key: "seo", label: "Search & SEO", icon: Search, desc: "Rank higher and grow organic traffic with SEO, AI SEO and technical excellence.", slugs: ["seo-services", "ai-seo", "technical-seo", "local-seo"] },
  { key: "growth", label: "Content & Growth", icon: TrendingUp, desc: "Scale content, outrank competitors and build authority that compounds.", slugs: ["ai-content-optimization", "google-ranking-growth", "competitor-analysis", "link-building"] },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Every capability you need to"
        highlight="win online"
        subtitle="From premium website builds to AI-driven SEO, we offer a complete suite of digital marketing services under one roof."
        crumbs={[{ label: "Services" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {groups.map((g, gi) => {
              const groupServices = services.filter((s) => g.slugs.includes(s.slug));
              return (
                <Reveal key={g.key} delay={gi * 0.05}>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                      <g.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-ink">{g.label}</h2>
                      <p className="text-sm text-slate-500">{g.desc}</p>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {groupServices.map((s) => {
                      return (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="group flex flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/25 hover:shadow-glow"
                        >
                          <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
                            <ServiceIcon name={s.icon} className="h-6 w-6" />
                          </span>
                          <h3 className="font-display text-lg font-bold text-ink">
                            {s.name}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                            {s.shortDesc}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                            Learn more
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title="Not sure which service you need?"
        subtitle="Book a free strategy call and we'll recommend the right approach for your business and goals."
      />
    </>
  );
}
