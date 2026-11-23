"use client";

import { useCallback, useMemo, useRef, useState, type ClipboardEvent } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Plus,
  Quote,
  Table2,
  TerminalSquare,
  Info,
  ClipboardPaste,
  Eye,
  Pencil,
  ChevronDown,
} from "lucide-react";
import type { ContentBlock } from "@/lib/blog-types";
import { blocksToMarkdown, markdownToBlocks } from "@/lib/blog-content/block-markdown";
import { pasteToMarkdown } from "@/lib/blog-content/paste";
import { buildToc } from "@/lib/blog-headings";
import { RichContent } from "@/components/blog/rich-content";
import { MediaPickerModal } from "./media-picker-modal";
import { BlockPropertiesPanel } from "./block-properties-panel";

interface ArticleContentEditorProps {
  blocks: ContentBlock[];
  onChange: (next: ContentBlock[]) => void;
}

type EditorMode = "write" | "preview";

const TOOLBAR_BUTTON =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[12.5px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

/** Applies a line-prefix action to every selected line (or the current line). */
function prefixLines(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  prefix: (index: number) => string
): { next: string; caretStart: number; caretEnd: number } {
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const sliceEnd = value.indexOf("\n", selectionEnd);
  const lineEnd = sliceEnd === -1 ? value.length : sliceEnd;
  const block = value.slice(lineStart, lineEnd);
  const lines = block.split("\n");
  const prefixed = lines.map((line, i) => `${prefix(i)}${line}`).join("\n");
  const next = value.slice(0, lineStart) + prefixed + value.slice(lineEnd);
  return {
    next,
    caretStart: lineStart + prefix(0).length,
    caretEnd: lineStart + prefixed.length,
  };
}

function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  placeholder: string
): { next: string; caretStart: number; caretEnd: number } {
  const selected = value.slice(start, end);
  const inner = selected || placeholder;
  const next = value.slice(0, start) + before + inner + after + value.slice(end);
  return {
    next,
    caretStart: start + before.length,
    caretEnd: start + before.length + inner.length,
  };
}

export function ArticleContentEditor({ blocks, onChange }: ArticleContentEditorProps) {
  const [markdown, setMarkdown] = useState(() => blocksToMarkdown(blocks));
  const [mode, setMode] = useState<EditorMode>("write");
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [pasteNotice, setPasteNotice] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toc = useMemo(() => buildToc(blocks), [blocks]);
  const wordCount = useMemo(
    () =>
      markdown
        .replace(/[#>*`|-]/g, " ")
        .split(/\s+/)
        .filter(Boolean).length,
    [markdown]
  );

  const commit = useCallback(
    (nextMarkdown: string) => {
      setMarkdown(nextMarkdown);
      onChange(markdownToBlocks(nextMarkdown));
    },
    [onChange]
  );

  const replaceSelection = useCallback(
    (result: { next: string; caretStart: number; caretEnd: number }) => {
      commit(result.next);
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(result.caretStart, result.caretEnd);
      });
    },
    [commit]
  );

  const withSelection = useCallback(
    (fn: (value: string, start: number, end: number) => { next: string; caretStart: number; caretEnd: number }) => {
      const el = textareaRef.current;
      if (!el) return;
      replaceSelection(fn(el.value, el.selectionStart, el.selectionEnd));
    },
    [replaceSelection]
  );

  const insertAtCursor = useCallback(
    (snippet: string) => {
      withSelection((value, start, end) => {
        const before = value.slice(0, start);
        const after = value.slice(end);
        const needsLeading =
          before.length > 0 && !before.endsWith("\n\n")
            ? before.endsWith("\n")
              ? "\n"
              : "\n\n"
            : "";
        const needsTrailing = after.length > 0 && !after.startsWith("\n") ? "\n\n" : "";
        const text = `${needsLeading}${snippet}${needsTrailing}`;
        return {
          next: before + text + after,
          caretStart: start + needsLeading.length + snippet.length,
          caretEnd: start + needsLeading.length + snippet.length,
        };
      });
    },
    [withSelection]
  );

  /**
   * One-shot paste: HTML from Word / Google Docs / ChatGPT / a browser page is
   * normalised into the editor's Markdown dialect and inserted at the caret.
   * Pasting into an empty editor therefore replaces the whole article body.
   */
  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLTextAreaElement>) => {
      const clipboard = event.clipboardData;
      if (!clipboard) return;
      const html = clipboard.getData("text/html");
      const text = clipboard.getData("text/plain");
      if (!html && !text) return;

      const { markdown: converted, source } = pasteToMarkdown({ html, text });
      if (!converted.trim()) return;

      event.preventDefault();

      const el = event.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const value = el.value;
      const needsLeading =
        value.length === 0
          ? ""
          : value.slice(0, start).trim().length > 0
            ? value.slice(0, start).endsWith("\n\n")
              ? ""
              : value.slice(0, start).endsWith("\n")
                ? "\n"
                : "\n\n"
            : "";
      const needsTrailing =
        value.slice(end).length > 0 && !value.slice(end).startsWith("\n") ? "\n\n" : "";
      const inserted = `${needsLeading}${converted}${needsTrailing}`;
      const next = value.slice(0, start) + inserted + value.slice(end);

      const label =
        source === "html"
          ? "Pasted rich content — headings, lists, links, tables and quotes preserved."
          : source === "markdown"
            ? "Pasted Markdown — structure detected and preserved."
            : "Pasted plain text — split into paragraphs.";
      setPasteNotice(label);
      window.setTimeout(() => setPasteNotice(""), 6000);

      commit(next);
      requestAnimationFrame(() => {
        const caret = start + inserted.length;
        el.focus();
        el.setSelectionRange(caret, caret);
      });
    },
    [commit]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const meta = event.metaKey || event.ctrlKey;
      if (!meta) return;
      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        withSelection((v, s, e) => wrapSelection(v, s, e, "**", "**", "bold text"));
      } else if (event.key.toLowerCase() === "i") {
        event.preventDefault();
        withSelection((v, s, e) => wrapSelection(v, s, e, "*", "*", "italic text"));
      }
    },
    [withSelection]
  );

  const headingCount = toc.length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 p-5">
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold text-[#0b1528]">Article Content</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
            Paste the whole article here in one go. Formatting, headings, lists, links, images,
            tables and quotes are converted automatically.
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] font-medium text-slate-500">
            <span>{wordCount.toLocaleString("en-IN")} words</span>
            <span aria-hidden="true">·</span>
            <span>{blocks.length} blocks</span>
            <span aria-hidden="true">·</span>
            <span>
              {headingCount} heading{headingCount === 1 ? "" : "s"} in table of contents
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Editor mode"
            className="flex rounded-xl border border-slate-200 bg-[#f7f9fc] p-0.5"
          >
            {(
              [
                { id: "write", label: "Write", icon: Pencil },
                { id: "preview", label: "Preview", icon: Eye },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(item.id)}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-semibold transition-colors ${
                    active ? "bg-white text-[#0b1528] shadow-sm" : "text-slate-600 hover:text-[#0b1528]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setHelpOpen((v) => !v)}
            aria-expanded={helpOpen}
            className={TOOLBAR_BUTTON}
          >
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            Formatting guide
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${helpOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {helpOpen && (
        <div className="border-b border-slate-200 bg-[#f7f9fc] px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">
          <p className="font-semibold text-[#0b1528]">What you can paste or type</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            <li>
              <code className="rounded bg-white px-1">## Heading 2</code> ·{" "}
              <code className="rounded bg-white px-1">### Heading 3</code>
            </li>
            <li>
              <code className="rounded bg-white px-1">**bold**</code> ·{" "}
              <code className="rounded bg-white px-1">*italic*</code>
            </li>
            <li>
              <code className="rounded bg-white px-1">- bullet</code> ·{" "}
              <code className="rounded bg-white px-1">1. numbered</code>
            </li>
            <li>
              <code className="rounded bg-white px-1">[text](https://…)</code> ·{" "}
              <code className="rounded bg-white px-1">![alt](/images/…)</code>
            </li>
            <li>
              <code className="rounded bg-white px-1">&gt; quote</code> ·{" "}
              <code className="rounded bg-white px-1">```lang</code> for code
            </li>
            <li>
              Tables: paste from Word/Docs, or use the Table button for a template.
            </li>
          </ul>
          <p className="mt-3">
            Callouts, CTA banners, checklists and image details are edited in{" "}
            <span className="font-semibold text-[#0b1528]">Block settings</span> below the editor —
            they are never removed automatically.
          </p>
        </div>
      )}

      {mode === "write" ? (
        <>
          {/* Toolbar */}
          <div
            role="toolbar"
            aria-label="Text formatting"
            className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-[#fbfcfe] px-4 py-2.5"
          >
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                withSelection((v, s, e) => prefixLines(v, s, e, () => "## "))
              }
              title="Heading 2"
            >
              <Heading2 className="h-3.5 w-3.5" aria-hidden="true" /> H2
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                withSelection((v, s, e) => prefixLines(v, s, e, () => "### "))
              }
              title="Heading 3"
            >
              <Heading3 className="h-3.5 w-3.5" aria-hidden="true" /> H3
            </button>
            <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() => withSelection((v, s, e) => wrapSelection(v, s, e, "**", "**", "bold text"))}
              title="Bold (Ctrl+B)"
              aria-label="Bold"
            >
              <Bold className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() => withSelection((v, s, e) => wrapSelection(v, s, e, "*", "*", "italic text"))}
              title="Italic (Ctrl+I)"
              aria-label="Italic"
            >
              <Italic className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                withSelection((v, s, e) => wrapSelection(v, s, e, "[", "](https://)", "link text"))
              }
              title="Link"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> Link
            </button>
            <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() => withSelection((v, s, e) => prefixLines(v, s, e, () => "- "))}
              title="Bullet list"
            >
              <List className="h-3.5 w-3.5" aria-hidden="true" /> Bullets
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() => withSelection((v, s, e) => prefixLines(v, s, e, (i) => `${i + 1}. `))}
              title="Numbered list"
            >
              <ListOrdered className="h-3.5 w-3.5" aria-hidden="true" /> Numbers
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() => withSelection((v, s, e) => prefixLines(v, s, e, () => "> "))}
              title="Blockquote"
            >
              <Quote className="h-3.5 w-3.5" aria-hidden="true" /> Quote
            </button>
            <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                insertAtCursor(
                  "| Column 1 | Column 2 |\n| --- | --- |\n| First value | Second value |\n| Third value | Fourth value |"
                )
              }
              title="Insert table"
            >
              <Table2 className="h-3.5 w-3.5" aria-hidden="true" /> Table
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() => setImagePickerOpen(true)}
              title="Insert image"
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" /> Image
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                insertAtCursor("```bash\n# your code here\n```")
              }
              title="Insert code block"
            >
              <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" /> Code
            </button>
            <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                insertAtCursor(':::callout{title="Key point" variant="tip"}\nYour note here.\n:::')
              }
              title="Insert callout box"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              Callout
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                insertAtCursor(
                  ':::cta{title="Need help with this?" button="Talk to our team" href="/contact"}\nTell us what you are trying to achieve.\n:::'
                )
              }
              title="Insert CTA banner"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              CTA
            </button>
            <button
              type="button"
              className={TOOLBAR_BUTTON}
              onClick={() =>
                insertAtCursor(':::checklist{title="Checklist"}\n- First item\n- Second item\n:::')
              }
              title="Insert checklist"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              Checklist
            </button>
          </div>

          {pasteNotice && (
            <p
              role="status"
              className="flex items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-5 py-2 text-[12.5px] font-medium text-emerald-800"
            >
              <ClipboardPaste className="h-3.5 w-3.5" aria-hidden="true" />
              {pasteNotice}
            </p>
          )}

          <div className="p-4">
            <label htmlFor="article-content-input" className="sr-only">
              Article content
            </label>
            <textarea
              id="article-content-input"
              ref={textareaRef}
              value={markdown}
              onChange={(e) => commit(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={onKeyDown}
              spellCheck
              placeholder={
                "Paste your complete article here…\n\nExample:\n## First section heading\nA normal paragraph with **bold**, *italic* and a [link](https://www.webamazee.com/services).\n\n- Bullet one\n- Bullet two"
              }
              className="min-h-[520px] w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-mono text-[13.5px] leading-[1.7] text-[#0b1528] outline-none transition-colors placeholder:font-sans placeholder:text-slate-400 focus:border-[#0f6dff]"
            />
            <p className="mt-2 text-[11.5px] text-slate-500">
              Paste from ChatGPT, Google Docs, Word or any website. Use the toolbar for individual
              edits, or just keep typing.
            </p>
          </div>
        </>
      ) : (
        <div className="p-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <RichContent blocks={blocks} absoluteImageUrls />
          </div>
          <p className="mt-3 text-[11.5px] text-slate-500">
            Preview of the saved article body. The public page adds the cover image, author box and
            sticky sidebar automatically.
          </p>
        </div>
      )}

      <BlockPropertiesPanel
        blocks={blocks}
        onChange={(next) => {
          // Settings edits happen outside the textarea, so re-serialise the body
          // to keep the editor text and the stored blocks in step.
          onChange(next);
          setMarkdown(blocksToMarkdown(next));
        }}
      />

      <MediaPickerModal
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={({ url, alt }) => {
          insertAtCursor(`![${alt || "Article image"}](${url})`);
          setImagePickerOpen(false);
        }}
      />
    </section>
  );
}
