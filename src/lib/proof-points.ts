import { caseStudies } from "@/lib/case-studies";

/**
 * Small, evidence-based trust points for the public site.
 * Counts are derived from the published case-study records rather than
 * marketing estimates; the labels make clear what the figures represent.
 */
const representedMarkets = new Set(caseStudies.map((project) => project.country));

export const companyProofPoints = [
  { value: String(caseStudies.length), label: "Published case studies" },
  {
    value: String(representedMarkets.size),
    label: "Markets represented in selected work",
  },
  {
    value: "Co-founded",
    label: "By Tilak Raj & Rajni Sharma",
  },
];
