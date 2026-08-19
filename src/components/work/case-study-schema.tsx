import type { Project } from "@/lib/portfolio";

export function CaseStudySchema({ project }: { project: Project }) {
  const url = `https://webamazee.com/work/${project.slug}`;

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} — Webamazee Case Study`,
    headline: `${project.title} — Webamazee Case Study`,
    about: project.summary,
    genre: project.category,
    creator: { "@type": "Organization", name: "Webamazee", url: "https://webamazee.com" },
    url,
    dateCreated: `${project.year}-01-01`,
    inLanguage: "en",
    thumbnailUrl: "https://webamazee.com/og-image.png",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://webamazee.com" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://webamazee.com/portfolio" },
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
