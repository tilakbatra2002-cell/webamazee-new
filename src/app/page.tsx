import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { Storytelling } from "@/components/sections/storytelling";
import { AIFramework } from "@/components/sections/ai-framework";
import { CaseStudies } from "@/components/sections/case-studies";
import { Portfolio } from "@/components/sections/portfolio";
import { Statistics } from "@/components/sections/statistics";
import { Testimonials } from "@/components/sections/testimonials";
import { Industries } from "@/components/sections/industries";
import { TechStack } from "@/components/sections/tech-stack";
import { FAQ } from "@/components/sections/faq";
import { Blog } from "@/components/sections/blog";
import { FinalCTA } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { homeFaqs } from "@/lib/faqs";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <Services />
      <Why />
      <Process />
      <Storytelling />
      <AIFramework />
      <CaseStudies />
      <Portfolio />
      <Statistics />
      <Testimonials />
      <Industries />
      <TechStack />
      <FAQ />
      <Blog />
      <FinalCTA />
    </>
  );
}
