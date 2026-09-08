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
    "SEO agency",
    "digital marketing agency",
    "web design services",
    "SEO services",
    "AI SEO agency",
    "eCommerce website development",
    "website development services",
    "digital growth agency",
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
