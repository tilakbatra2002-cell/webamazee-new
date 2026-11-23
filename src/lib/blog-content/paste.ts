import { htmlToMarkdown, normaliseImageMarkdown } from "./html-to-markdown";
import { blocksToMarkdown, markdownToBlocks } from "./block-markdown";
import type { ContentBlock } from "@/lib/blog-types";

export type PasteSource = "html" | "markdown" | "text" | "empty";

/**
 * Detects whether pasted plain text is already Markdown-ish (so we don't wrap
 * it in escape characters) or an unstyled wall of text from Notepad.
 */
function looksLikeMarkdown(text: string): boolean {
  return (
    /^#{2,4}\s+/m.test(text) ||
    /^\s*[-*+]\s+/m.test(text) ||
    /^\s*\d+[.)]\s+/m.test(text) ||
    /^>\s+/m.test(text) ||
    /^```/m.test(text) ||
    /!\s?\[[^\]]*\]\([^)]+\)/.test(text) ||
    /\[[^\]]+\]\([^)]+\)/.test(text) ||
    /\*\*[^*\n]+\*\*/.test(text) ||
    /^\s*\|.+\|\s*$/m.test(text)
  );
}

/** Plain text → Markdown: blank-line separated paragraphs, single newlines kept. */
function plainTextToMarkdown(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .split(/\n{2,}/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n")
    )
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Converts a clipboard paste into editor Markdown.
 * `html` wins whenever it carries usable structure, matching what users expect
 * from Word / Google Docs / ChatGPT / website copies.
 */
export function pasteToMarkdown(input: {
  html?: string;
  text: string;
}): { markdown: string; source: PasteSource } {
  const text = input.text.replace(/\r\n?/g, "\n");

  if (input.html && input.html.trim() && input.html.includes("<")) {
    const fromHtml = normaliseImageMarkdown(htmlToMarkdown(input.html));
    if (fromHtml.trim()) {
      return { markdown: fromHtml, source: "html" };
    }
  }

  if (!text.trim()) return { markdown: "", source: "empty" };

  if (looksLikeMarkdown(text)) {
    return { markdown: normaliseImageMarkdown(text), source: "markdown" };
  }

  return { markdown: plainTextToMarkdown(text), source: "text" };
}

/** Convenience wrapper used by the editor's "Import whole article" action. */
export function pasteToBlocks(input: { html?: string; text: string }): {
  blocks: ContentBlock[];
  markdown: string;
  source: PasteSource;
} {
  const { markdown, source } = pasteToMarkdown(input);
  return { blocks: markdownToBlocks(markdown), markdown, source };
}

export { blocksToMarkdown, markdownToBlocks };
