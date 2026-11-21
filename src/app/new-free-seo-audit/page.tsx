import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  FreeSeoAuditRedesign,
  type AuditFaqItem,
} from "./free-seo-audit-redesign";

const pagePath = "/new-free-seo-audit";
const pageUrl = `${site.url}${pagePath}`;
const pageTitle = "Free Website SEO Audit";
const pageDescription =
  "Run a free website SEO audit with Webamazee. Check technical SEO, on-page SEO, performance, mobile readiness, structured data and AI search readiness.";

const faqs: AuditFaqItem[] = [
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

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "free SEO audit",
    "website audit",
    "technical SEO check",
    "AI search readiness",
    "free website SEO audit",
  ],
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: false },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: site.name,
    locale: site.defaultLocale,
    type: "website",
    images: [
      {
        url: absoluteUrl(site.ogImage),
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    site: site.twitterHandle,
    images: [absoluteUrl(site.ogImage)],
  },
};

export default function NewFreeSeoAuditPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ label: "Free SEO Audit", href: pagePath }]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: pageTitle,
            description: pageDescription,
            url: pageUrl,
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />
      <FreeSeoAuditRedesign faqs={faqs} />
    </>
  );
}
