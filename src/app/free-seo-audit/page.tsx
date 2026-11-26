import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { staticMetadata } from "@/lib/static-pages";
import { site } from "@/lib/site";
import { FreeSeoAuditRedesign } from "@/components/seo-audit/free-seo-audit-redesign";

export const metadata: Metadata = staticMetadata("freeSeoAudit");

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
    a: "The initial checks run automatically. Performance checks can take longer because they depend on an external lab test, and timeouts are handled without failing the whole report.",
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
      <FreeSeoAuditRedesign faqs={faqs} />
    </>
  );
}
