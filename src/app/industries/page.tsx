import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { staticEntries, staticMetadata } from "@/lib/static-pages";
import { IndustriesPageClient, type IndustriesFaqItem } from "./industries-page-client";

export const metadata: Metadata = staticMetadata("industries");

const faqs: IndustriesFaqItem[] = [
  {
    q: "Which industries does Webamazee serve?",
    a: "Webamazee works with businesses across E-Commerce, SaaS and technology, local businesses, travel and tourism, healthcare clinics and providers, and professional services firms, as well as sectors such as B2B services, real estate, education, finance and legal, home services, fitness and wellness, and hospitality.",
  },
  {
    q: "Can Webamazee customise solutions for my industry?",
    a: "Yes. Rather than applying a single template across every sector, we structure website architecture, search intent targeting, content strategy and conversion paths around how customers in your specific industry evaluate and enquire.",
  },
  {
    q: "Does Webamazee work with international businesses?",
    a: "Yes. Webamazee partners with startups, SMEs and growing companies across India, the USA, the UK, the UAE, Australia, New Zealand and other international markets.",
  },
  {
    q: "Can I combine website development and SEO?",
    a: "Yes. Many clients engage our team for website development and SEO together so technical structure, page speed, internal linking, schema and conversion journeys are built cohesively from day one.",
  },
  {
    q: "Does every industry need a different SEO strategy?",
    a: "Yes. An online store competing on product and category queries requires a very different architecture and content strategy from a local clinic relying on Google Business Profile visibility or a SaaS product targeting comparison and solution searches.",
  },
  {
    q: "Can Webamazee help businesses that are not listed here?",
    a: "Yes. Even if your sector does not have a dedicated industry overview page, our core website development, technical SEO, AI SEO, local SEO and conversion optimisation services can be tailored to your audience and commercial goals.",
  },
  {
    q: "How do I choose the right digital services for my business?",
    a: "Start by reviewing where your current website or organic visibility falls short. You can discuss your goals with our team or run our free website SEO audit to inspect technical, on-page and search readiness signals first.",
  },
  {
    q: "How can I get started with Webamazee?",
    a: "Reach out through our contact page with details about your business, website and objectives. We will review your situation and outline a clear scope covering recommended website, SEO or digital growth steps.",
  },
];

const featuredIndustrySchemaLinks = [
  { name: "E-Commerce SEO & Website Solutions", url: absoluteUrl("/seo-for-ecommerce") },
  { name: "SaaS & Technology SEO Solutions", url: absoluteUrl("/seo-for-saas") },
  { name: "Local Business SEO Solutions", url: absoluteUrl("/seo-for-local-business") },
  { name: "Travel & Tourism SEO Solutions", url: absoluteUrl("/seo-for-tourism") },
  { name: "Healthcare SEO Solutions", url: absoluteUrl("/seo-for-healthcare") },
  { name: "Professional Services SEO Solutions", url: absoluteUrl("/seo-for-professional-services") },
];

export default function IndustriesPage() {
  const entry = staticEntries.industries;
  const pageUrl = absoluteUrl("/industries");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ label: "Industries", href: "/industries" }]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: entry.metaTitle ?? entry.title,
            description: entry.metaDescription,
            url: pageUrl,
            isPartOf: { "@id": `${site.url}/#website` },
            about: { "@id": `${site.url}/#organization` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: featuredIndustrySchemaLinks.map((item, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: item.name,
                url: item.url,
              })),
            },
          },
        ]}
      />
      <IndustriesPageClient faqs={faqs} />
    </>
  );
}
