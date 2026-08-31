import type { Project } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/seo";

export function CaseStudySchema({ project }: { project: Project }) {
  const url = absoluteUrl(`/work/${project.slug}`);

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} — Webamazee Case Study`,
    headline: `${project.title} — Webamazee Case Study`,
    about: project.summary,
    genre: project.category,
    creator: { "@type": "Organization", name: "Webamazee", url: absoluteUrl() },
    url,
    dateCreated: `${project.year}-01-01`,
    inLanguage: "en",
    thumbnailUrl: absoluteUrl("/og-image.png"),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: absoluteUrl("/portfolio") },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
