import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { staticMetadata } from "@/lib/static-pages";
import { SeoAuditWidget } from "@/components/seo-audit/seo-audit-widget";
import { site } from "@/lib/site";

export const metadata: Metadata = staticMetadata("freeSeoAudit");

const checks = [
  {
    title: "Technical SEO",
    desc: "HTTP status, HTTPS, redirects, canonicals, robots.txt, sitemaps and indexability signals.",
    icon: Workflow,
  },
  {
    title: "On-page SEO",
    desc: "Title, meta description, headings, content length, images, alt text and internal links.",
    icon: SearchCheck,
  },
  {
    title: "Performance",
    desc: "PageSpeed metrics where available — LCP, CLS, INP, FCP and TTFB. Otherwise we say so.",
    icon: Gauge,
  },
  {
    title: "Mobile & security",
    desc: "Viewport and responsive signals, HTTPS, mixed content and basic transport security headers.",
    icon: Smartphone,
  },
  {
    title: "Structured data",
    desc: "JSON-LD and Schema.org types such as Organization, LocalBusiness, Product, Article, FAQ and breadcrumbs.",
    icon: ShieldCheck,
  },
  {
    title: "AI Search Readiness",
    desc: "Entity, about/contact, crawlability and content-structure signals that can support modern search experiences.",
    icon: Sparkles,
  },
];

const steps = [
  { n: "01", title: "Enter your URL", desc: "Use example.com or a full https:// address. We normalise missing HTTPS." },
  { n: "02", title: "We fetch the homepage", desc: "The audit requests the live page, robots.txt and sitemap — with SSRF protections." },
  { n: "03", title: "Scores are calculated", desc: "Each category is scored from checks we could actually run. Nothing is randomised." },
  { n: "04", title: "Request the full report", desc: "If you want a deeper review, share your details after the overview." },
];

const faqs = [
  {
    q: "What does the free SEO audit check?",
    a: "It inspects the submitted homepage for technical SEO, on-page SEO, mobile readiness, security signals, structured data and AI search readiness. Performance uses Google PageSpeed Insights when an API key is configured.",
  },
  {
    q: "Is the score a Google ranking score?",
    a: "No. It is a Webamazee website health score based on detectable signals. It is not a Google ranking, a Core Web Vitals guarantee or a prediction of AI-search placement.",
  },
  {
    q: "Do you invent issues to create a sales pitch?",
    a: "No. Findings are generated only from checks that ran on the live page. If a category cannot be measured we show Not enough data rather than filling in a number.",
  },
  {
    q: "Is a credit card required?",
    a: "No. The overview is free. Requesting the full report does not require payment details.",
  },
  {
    q: "How long does an audit take?",
    a: "Most audits complete in a few seconds. Performance checks can take longer because they depend on an external lab test. Timeouts are handled without failing the whole report.",
  },
  {
    q: "Are individual audit results indexed by search engines?",
    a: "No. Results live in the session and are not published as indexable pages. Submitted URLs are not turned into public result URLs.",
  },
];

export default function FreeSeoAuditPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ label: "Free SEO Audit", href: "/free-seo-audit" }]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Website SEO Audit",
            description:
              "Run a free website SEO audit with Webamazee. Check technical SEO, on-page SEO, performance, mobile readiness, structured data and AI search readiness.",
            url: `${site.url}/free-seo-audit`,
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />

      <PageHero
        eyebrow="Free Website Audit"
        title="How healthy is"
        highlight="your website?"
        subtitle="Get a free website and SEO audit to uncover technical issues, SEO opportunities, performance problems, and areas that may be limiting your growth."
        crumbs={[{ label: "Free SEO Audit" }]}
      />

      <section className="bg-white pb-8">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SeoAuditWidget />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-ink">How the audit works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              A live fetch of your homepage — not a placeholder score.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                  <p className="text-xs font-bold tracking-[0.16em] text-brand-600">{step.n}</p>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-ink">What we check</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Seven categories. If a metric cannot be measured, we say so.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-ink">How to read the result</h2>
            <p className="mt-4 text-center text-slate-500">
              The overall score is a weighted blend of Technical SEO (25%), On-Page SEO (20%),
              Performance (20%), Mobile (10%), Security (10%), Structured Data (5%) and AI Search
              Readiness (10%). Categories we cannot measure — such as Core Web Vitals when PageSpeed
              data is unavailable — are shown as Not enough data and excluded from the overall score.
              We never use a fixed number such as 72/100.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-3">
              {[
                "Findings are grouped into Critical, High priority and Opportunities.",
                "Each issue explains why it matters and how to fix it, without ranking promises.",
                "We also list what is already working, so a healthy site is not forced into a problem list.",
                "AI Search Readiness is a signal score, not a claim that the site will appear in ChatGPT.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-ink">Questions</h2>
            <Accordion items={faqs} defaultOpen={0} />
          </Reveal>
          <p className="mt-8 text-center text-sm text-slate-500">
            Prefer to talk it through?{" "}
            <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
              Talk to Webamazee <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <CTABanner
        title="Want a deeper SEO growth plan?"
        subtitle="The free audit is an overview of one page. If you want a full technical, content and visibility review, we will map the next steps with you."
        cta="Talk to Webamazee"
      />
    </>
  );
}
