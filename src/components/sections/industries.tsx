"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  ShoppingBag,
  Stethoscope,
  Building2,
  GraduationCap,
  Plane,
  Landmark,
  Home,
  HeartPulse,
  Utensils,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";

const industries = [
  { icon: Briefcase, label: "B2B Services", href: "/seo-for-professional-services" },
  { icon: ShoppingBag, label: "E-Commerce", href: "/seo-for-ecommerce" },
  { icon: Stethoscope, label: "Healthcare", href: "/seo-for-healthcare" },
  { icon: Building2, label: "Real Estate", href: "/seo-for-local-business" },
  { icon: GraduationCap, label: "Education" },
  { icon: Plane, label: "Travel & Tourism", href: "/seo-for-tourism" },
  { icon: Landmark, label: "Finance & Legal", href: "/seo-for-professional-services" },
  { icon: Home, label: "Home Services", href: "/seo-for-local-business" },
  { icon: HeartPulse, label: "Fitness & Wellness", href: "/seo-for-local-business" },
  { icon: Utensils, label: "Restaurants", href: "/seo-for-local-business" },
];

export function Industries() {
  return (
    <Section id="industries" className="bg-surface py-16 sm:py-20">
      <SectionHeading
        eyebrow={
          <Eyebrow>
            <Briefcase className="h-3.5 w-3.5" /> Industries
          </Eyebrow>
        }
        title="We grow businesses in"
        highlight="any industry"
        subtitle="From local services to global e-commerce, our strategies adapt to your market."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 flex flex-wrap justify-center gap-4"
      >
        {industries.map((ind) => (
          <motion.div key={ind.label} variants={staggerItem}>
            <SpotlightCard className="rounded-2xl">
              {ind.href ? (
                <Link
                  href={ind.href}
                  aria-label={`Explore SEO services for ${ind.label}`}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow"
                >
                  <ind.icon className="h-5 w-5 text-brand-700 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-700">{ind.label}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3.5 shadow-soft">
                  <ind.icon className="h-5 w-5 text-brand-700" />
                  <span className="text-sm font-medium text-slate-600">{ind.label}</span>
                </div>
              )}
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
