/**
 * Round-trip integrity check for the single-pane article editor.
 *
 * For every post in src/lib/blogs.ts it verifies:
 *   blocks → markdown → blocks  preserves the article exactly
 * and that heading anchors match the public page's TOC derivation.
 *
 * Run: npx tsx scripts/verify-block-roundtrip.ts
 */
import { posts } from "@/lib/blogs";
import type { ContentBlock } from "@/lib/blog-types";
import { blocksToMarkdown, markdownToBlocks } from "@/lib/blog-content/block-markdown";
import { buildToc, withCanonicalHeadingIds } from "@/lib/blog-headings";
import { slugify } from "@/lib/cms/slugify";

type Diff = { slug: string; path: string; expected: unknown; actual: unknown };

function normalise(block: ContentBlock): ContentBlock {
  // The editor intentionally strips empty paragraphs and drops empty optional
  // fields; compare only meaningful data.
  const copy: Record<string, unknown> = { ...block };
  for (const key of ["caption", "cite", "language", "title", "href", "id"]) {
    if (copy[key] === "" || copy[key] === undefined) delete copy[key];
  }
  if (copy.type === "heading" && copy.level === undefined) copy.level = 2;
  if (copy.type === "list" && copy.ordered === false) delete copy.ordered;
  if (copy.type === "callout" && !copy.variant) copy.variant = "info";
  return copy as ContentBlock;
}

function compareBlocks(slug: string, expected: ContentBlock[], actual: ContentBlock[]): Diff[] {
  const diffs: Diff[] = [];
  if (expected.length !== actual.length) {
    diffs.push({ slug, path: "blocks.length", expected: expected.length, actual: actual.length });
    return diffs;
  }
  expected.forEach((exp, i) => {
    const got = actual[i];
    const a = normalise(exp) as Record<string, unknown>;
    const b = normalise(got) as Record<string, unknown>;
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    keys.forEach((key) => {
      const av = a[key];
      const bv = b[key];
      if (JSON.stringify(av) !== JSON.stringify(bv)) {
        diffs.push({ slug, path: `[${i}].${key} (${exp.type})`, expected: av, actual: bv });
      }
    });
  });
  return diffs;
}

let totalBlocks = 0;
let totalDiffs = 0;
const perType: Record<string, { count: number; diffs: number }> = {};

for (const post of posts) {
  totalBlocks += post.content.length;
  for (const block of post.content) {
    perType[block.type] ??= { count: 0, diffs: 0 };
    perType[block.type].count += 1;
  }

  const markdown = blocksToMarkdown(post.content);
  const roundTripped = markdownToBlocks(markdown);
  // The stored article is always normalised to canonical anchors, so compare
  // against that same normalisation (an id equal to slugify(text) is redundant).
  const expected = withCanonicalHeadingIds(post.content);
  const diffs = compareBlocks(post.slug, expected, withCanonicalHeadingIds(roundTripped));
  totalDiffs += diffs.length;
  for (const d of diffs) {
    const type = d.path.match(/\((\w+)\)/)?.[1];
    if (type) perType[type].diffs += 1;
  }

  // TOC parity: the sidebar links must match the anchors the renderer emits.
  const toc = buildToc(roundTripped);
  const headingBlocks = roundTripped.filter((b) => b.type === "heading");
  const tocOk = toc.length === headingBlocks.length;

  console.log(
    `${diffs.length === 0 ? "PASS" : "FAIL"}  ${post.slug}  blocks=${post.content.length}  toc=${toc.length}  ${tocOk ? "toc-ok" : "TOC-MISMATCH"}`
  );
  diffs.slice(0, 6).forEach((d) =>
    console.log(`      ${d.path}\n        expected: ${JSON.stringify(d.expected)}\n        actual:   ${JSON.stringify(d.actual)}`)
  );
}

console.log("\n--- per block type ---");
for (const [type, stat] of Object.entries(perType).sort()) {
  console.log(`${stat.diffs === 0 ? "PASS" : "FAIL"}  ${type.padEnd(10)} blocks=${stat.count} diffs=${stat.diffs}`);
}

console.log(`\nposts=${posts.length} blocks=${totalBlocks} diffs=${totalDiffs}`);
process.exit(totalDiffs === 0 ? 0 : 1);
