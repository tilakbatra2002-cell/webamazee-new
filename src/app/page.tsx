import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { AISearch } from "@/components/sections/ai-search";
import { Why } from "@/components/sections/why";
import { AuditCta } from "@/components/sections/audit-cta";
import { Process } from "@/components/sections/process";
import { Storytelling } from "@/components/sections/storytelling";
import { AIFramework } from "@/components/sections/ai-framework";
import { CaseStudies } from "@/components/sections/case-studies";
import { Portfolio } from "@/components/sections/portfolio";
import { Statistics } from "@/components/sections/statistics";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Industries } from "@/components/sections/industries";
import { TechStack } from "@/components/sections/tech-stack";
import { FAQ } from "@/components/sections/faq";
import { Blog } from "@/components/sections/blog";
import { FinalCTA } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { homeFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: {
    absolute: "Web Development & SEO Agency | Webamazee",
  },
  description:
    "Webamazee helps businesses grow online with professional website development, SEO, AI SEO, eCommerce, web design and digital growth solutions.",
  keywords: [
    "web development agency",
    "website development agency",
    "web design agency",
    "website design agency",
    "SEO agency",
    "SEO services",
    "digital marketing agency",
    "digital growth agency",
    "website development services",
    "website design services",
    "professional web development",
    "professional website design",
    "custom website development",
    "custom web design",
    "business website development",
    "business website design",
    "responsive web design",
    "mobile responsive website",
    "modern website development",
    "website redesign services",
    "SEO agency for small business",
    "professional SEO services",
    "technical SEO services",
    "on page SEO services",
    "off page SEO services",
    "local SEO services",
    "international SEO services",
    "eCommerce SEO services",
    "SEO consulting services",
    "SEO optimization services",
    "website SEO services",
    "organic search optimization",
    "search engine optimization agency",
    "Google SEO services",
    "SEO strategy services",
    "SEO audit services",
    "SEO website audit",
    "keyword research services",
    "SEO content strategy",
    "SEO consulting agency",
    "AI SEO agency",
    "AI SEO services",
    "AI search optimization",
    "AI search SEO",
    "generative engine optimization",
    "GEO services",
    "GEO agency",
    "generative engine optimization agency",
    "AI search optimization services",
    "AI visibility optimization",
    "AI search visibility",
    "AI SEO consultant",
    "AI search marketing",
    "generative search optimization",
    "AI content optimization",
    "AI search readiness",
    "AI search marketing agency",
    "AI visibility services",
    "AI powered SEO",
    "SEO for AI search",
    "eCommerce website development",
    "eCommerce web design",
    "eCommerce development agency",
    "eCommerce SEO agency",
    "online store development",
    "online store design",
    "Shopify website development",
    "WooCommerce development",
    "WooCommerce SEO",
    "eCommerce website redesign",
    "conversion focused web design",
    "high converting websites",
    "lead generation website",
    "business growth website",
    "website conversion optimization",
    "landing page design",
    "landing page development",
    "website performance optimization",
    "website speed optimization",
    "website maintenance services",
    "web development agency USA",
    "SEO agency USA",
    "web development agency UK",
    "SEO agency UK",
    "web development agency Australia",
    "SEO agency Australia",
    "web development agency New Zealand",
    "SEO agency New Zealand",
    "international web development agency",
    "international SEO agency",
    "digital agency for small business",
    "website agency for small business",
    "SEO company for small business",
    "affordable web development agency",
    "affordable SEO services",
    "website development company",
    "website design company",
    "SEO company",
    "AI marketing agency",
    "digital marketing services",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <Services />
      <AISearch />
      <Why />
      <AuditCta />
      <Process />
      <Storytelling />
      <AIFramework />
      <CaseStudies />
      <Portfolio />
      <Statistics />
      <Testimonials />
      <Pricing />
      <Industries />
      <TechStack />
      <FAQ />
      <Blog />
      <FinalCTA />
    </>
  );
}
