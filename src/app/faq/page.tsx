import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import Link from "next/link";
import { MessageCircleQuestion, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = staticMetadata("faq");

const categories = ["General", "SEO", "Web", "Contact"];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ label: "FAQ" }]), faqSchema(faqs)]} />

      <PageHero
        eyebrow="FAQ"
        title="Questions,"
        highlight="answered"
        subtitle="Everything you need to know before we start working together. Can't find your question? Just ask."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[13fr_7fr] md:gap-9 lg:grid-cols-[7fr_3fr] lg:gap-10">
            {/* LEFT — FAQ content (70%) */}
            <div className="min-w-0">
              <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {categories.map((cat, ci) => {
                const items = faqs.filter((f) => f.category === cat);
                return (
                  <Reveal key={cat} delay={ci * 0.05}>
                    <div className="mb-10">
                      <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-bold text-ink">
                        <MessageCircleQuestion className="h-5 w-5 text-brand-600" />
                        {cat}
                      </h2>
                      <Accordion items={items} defaultOpen={null} />
                    </div>
                  </Reveal>
                );
              })}

              <Reveal className="mt-2 text-center">
                <p className="text-slate-500">
                  Still have a question?{" "}
                  <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
                    Get in touch <ArrowUpRight className="inline h-4 w-4" />
                  </Link>
                </p>
              </Reveal>
            </div>

            {/* RIGHT — reusable sticky sidebar (30%) */}
            <aside className="min-w-0">
              <div className="lg:sticky lg:top-[110px]">
                <BlogSidebar currentSlug="" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
