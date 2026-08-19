import { organizationSchema } from "@/lib/schema";

/** Render one or more JSON-LD schema objects. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}

/** Global organization + website + search action schema, rendered on every page. */
export function GlobalSchema() {
  return <JsonLd data={organizationSchema()} />;
}
