import type { ContentBlock } from "@/lib/blog-types";

export interface SeoCheckItem {
  id: string;
  label: string;
  status: "good" | "warning" | "info";
  detail: string;
}

export function analyzeSeoGuidance(input: {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  primaryKeyword?: string;
  image?: string;
  alt?: string;
  content: ContentBlock[];
}): {
  seoTitleLength: number;
  metaDescriptionLength: number;
  h2Count: number;
  checks: SeoCheckItem[];
} {
  const effectiveTitle = (input.seoTitle?.trim() || input.title.trim());
  const effectiveDesc = (input.metaDescription?.trim() || input.excerpt.trim());
  const seoTitleLength = effectiveTitle.length;
  const metaDescriptionLength = effectiveDesc.length;
  const h2Count = input.content.filter(
    (b) => b.type === "heading" && (b.level === 2 || !b.level)
  ).length;
  const kw = input.primaryKeyword?.trim().toLowerCase() ?? "";

  const firstParagraph =
    input.content.find((b): b is Extract<ContentBlock, { type: "paragraph" }> => b.type === "paragraph")
      ?.text.toLowerCase() ?? "";

  const checks: SeoCheckItem[] = [
    {
      id: "seo-title",
      label: "SEO Title Length",
      status:
        seoTitleLength >= 40 && seoTitleLength <= 65
          ? "good"
          : seoTitleLength > 0
            ? "warning"
            : "warning",
      detail: `${seoTitleLength} chars (recommended 45–60 chars)`,
    },
    {
      id: "meta-desc",
      label: "Meta Description Length",
      status:
        metaDescriptionLength >= 120 && metaDescriptionLength <= 165
          ? "good"
          : metaDescriptionLength > 0
            ? "warning"
            : "warning",
      detail: `${metaDescriptionLength} chars (recommended 135–160 chars)`,
    },
    {
      id: "cover-alt",
      label: "Featured Image & Alt Text",
      status: input.image?.trim() && input.alt?.trim() ? "good" : "warning",
      detail:
        input.image?.trim() && input.alt?.trim()
          ? "Featured image and descriptive alt text are set."
          : "Missing featured image URL or alt text.",
    },
    {
      id: "headings",
      label: "Section Heading Structure",
      status: h2Count >= 2 ? "good" : "info",
      detail: `${h2Count} H2 heading${h2Count === 1 ? "" : "s"} detected in article body.`,
    },
    {
      id: "keyword",
      label: "Primary Keyword Presence",
      status: !kw
        ? "info"
        : effectiveTitle.toLowerCase().includes(kw) || firstParagraph.includes(kw)
          ? "good"
          : "warning",
      detail: !kw
        ? "No primary focus keyword specified yet."
        : effectiveTitle.toLowerCase().includes(kw) || firstParagraph.includes(kw)
          ? `"${input.primaryKeyword}" appears in title or intro.`
          : `"${input.primaryKeyword}" not found in title or opening paragraph.`,
    },
    {
      id: "headings",
      label: "Heading Structure",
      status: input.content.some((b) => b.type === "heading") ? "good" : "warning",
      detail: input.content.some((b) => b.type === "heading")
        ? "H2/H3 headings found — the sidebar table of contents is generated automatically."
        : "Add H2 or H3 headings so readers get an automatic table of contents.",
    },
    {
      id: "canonical",
      label: "Canonical Target",
      status: "good",
      detail: input.canonicalUrl?.trim() || `/blog/${input.slug || "your-slug"}`,
    },
  ];

  return { seoTitleLength, metaDescriptionLength, h2Count, checks };
}
