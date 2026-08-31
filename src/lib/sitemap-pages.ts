/**
 * Human-readable HTML sitemap data.
 *
 * Every link is derived from the SAME content registries that drive the
 * website's pages and the technical XML sitemap (see src/data/index.ts and
 * src/app/sitemap.ts). No URLs are hand-written here — adding or removing a
 * page in the underlying data automatically keeps this sitemap in sync, with no
 * duplicate or broken links.
 */
import {
  services,
  posts,
  caseStudies,
  projects,
  products,
  locationPages,
  industries,
  locationHubs,
} from "@/data";

export type SitemapLink = {
  label: string;
  href: string;
  /** Optional supporting line shown under the label (kept short). */
  description?: string;
};

export type SitemapSection = {
  id: string;
  title: string;
  description?: string;
  links?: SitemapLink[];
  /** When present, this section is split into labelled subgroups. */
  groups?: { title: string; links: SitemapLink[] }[];
};

/** Deduplicate by href (preserve first occurrence / label). */
function dedupe(links: SitemapLink[]): SitemapLink[] {
  const seen = new Set<string>();
  const out: SitemapLink[] = [];
  for (const link of links) {
    // Normalise trailing slash ("/" stays, everything else is slash-less).
    const href = link.href === "/" ? "/" : link.href.replace(/\/+$/, "");
    if (seen.has(href)) continue;
    seen.add(href);
    out.push({ ...link, href });
  }
  return out;
}

/** Split the flat location landing pages by the service they target. */
function locationGroups() {
  const web: SitemapLink[] = [];
  const seo: SitemapLink[] = [];
  const digital: SitemapLink[] = [];
  const ai: SitemapLink[] = [];

  for (const p of locationPages) {
    const link = { label: p.location, href: `/${p.slug}` };
    if (p.slug.startsWith("web-designing-company-")) web.push(link);
    else if (p.slug.startsWith("seo-services-")) seo.push(link);
    else if (p.slug.startsWith("digital-marketing-company-")) digital.push(link);
    else if (p.slug.startsWith("ai-marketing-company-")) ai.push(link);
  }

  const byLabel = (a: SitemapLink, b: SitemapLink) => a.label.localeCompare(b.label);
  return [
    { title: "Web Design & Development", links: web.sort(byLabel) },
    { title: "SEO Services", links: seo.sort(byLabel) },
    { title: "Digital Marketing", links: digital.sort(byLabel) },
    { title: "AI Marketing", links: ai.sort(byLabel) },
  ];
}

/**
 * Build the full organised sitemap. Kept as a function so it always reflects
 * the latest imported content.
 */
export function buildSitemap(): SitemapSection[] {
  const mainPages: SitemapLink[] = dedupe([
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about", description: "Who we are and how we work" },
    { label: "Services", href: "/services", description: "All our digital marketing services" },
    { label: "Pricing", href: "/pricing", description: "Transparent packages for websites, SEO, AI SEO and branding" },
    { label: "Products", href: "/products", description: "Software built for modern agencies" },
    { label: "Portfolio", href: "/portfolio", description: "Websites and stores we have built" },
    { label: "Case Studies", href: "/case-studies", description: "Real client project breakdowns" },
    { label: "Blog & Insights", href: "/blog", description: "Guides on SEO, marketing and the web" },
    { label: "Testimonials", href: "/testimonials", description: "What clients say about us" },
    { label: "FAQ", href: "/faq", description: "Answers to common questions" },
    { label: "Contact", href: "/contact", description: "Start a free website audit" },
  ]);

  const socialSlugs = new Set<string>([
    "social-media-management",
    "social-media-marketing",
    "instagram-marketing",
    "facebook-marketing",
    "linkedin-marketing",
    "social-media-advertising",
  ]);

  const serviceLinks: SitemapLink[] = services
    .filter((s) => !socialSlugs.has(s.slug))
    .map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    }));

  const socialLinks: SitemapLink[] = services
    .filter((s) => socialSlugs.has(s.slug))
    .map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    }));

  const productLinks: SitemapLink[] = products.map((p) => ({
    label: p.name,
    href: p.path,
  }));

  const industryLinks: SitemapLink[] = industries.map((i) => ({
    label: `SEO for ${i.name}`,
    href: `/${i.slug}`,
  }));

  const hubLinks: SitemapLink[] = locationHubs.map((h) => ({
    label: h.location,
    href: `/${h.slug}`,
  }));

  const blogLinks: SitemapLink[] = posts.map((p) => ({
    label: p.title,
    href: `/blog/${p.slug}`,
  }));

  const caseStudyLinks: SitemapLink[] = caseStudies.map((c) => ({
    label: c.name,
    href: `/case-studies/${c.slug}`,
  }));

  const portfolioLinks: SitemapLink[] = projects.map((p) => ({
    label: p.title,
    href: `/work/${p.slug}`,
  }));

  const legalLinks: SitemapLink[] = dedupe([
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ]);

  return [
    {
      id: "main",
      title: "Main Pages",
      description: "The core pages of the Webamazee website.",
      links: mainPages,
    },
    {
      id: "services",
      title: "Services",
      description: "Web development, design and growth services.",
      links: serviceLinks,
    },
    {
      id: "social",
      title: "Social Media Management",
      description: "Social media marketing, platform-specific campaigns and paid social.",
      links: socialLinks,
    },
    {
      id: "products",
      title: "Products",
      description: "Software products built for digital marketing agencies.",
      links: productLinks,
    },
    {
      id: "industries",
      title: "SEO Services by Industry",
      description: "Sector specific SEO strategies.",
      links: industryLinks,
    },
    {
      id: "work",
      title: "Our Work",
      description: "Portfolio projects and detailed case studies.",
      groups: [
        { title: "Portfolio", links: portfolioLinks },
        { title: "Case Studies", links: caseStudyLinks },
      ],
    },
    {
      id: "blog",
      title: "Blog & Insights",
      description: "Guides, checklists and strategy notes.",
      links: blogLinks,
    },
    {
      id: "locations",
      title: "Locations & Service Areas",
      description:
        "Location and market focused pages. First browse our regional service hubs, then explore pages by service type.",
      groups: [
        { title: "Regional Service Hubs", links: hubLinks },
        ...locationGroups(),
      ],
    },
    {
      id: "legal",
      title: "Legal & Company",
      description: "Policies and company information.",
      links: legalLinks,
    },
  ];
}

/** Total number of links across the sitemap (for the hero summary). */
export function countSitemapLinks(sections: SitemapSection[]): number {
  let count = 0;
  for (const section of sections) {
    count += section.links?.length ?? 0;
    for (const group of section.groups ?? []) count += group.links.length;
  }
  return count;
}
