"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { ContentBlock } from "@/lib/blog-types";

interface BlockPropertiesPanelProps {
  blocks: ContentBlock[];
  onChange: (next: ContentBlock[]) => void;
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12.5px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff]";
const labelCls = "block text-[11px] font-semibold text-slate-500";

const TYPE_LABEL: Record<string, string> = {
  callout: "Callout",
  cta: "CTA banner",
  checklist: "Checklist",
  image: "Image",
  code: "Code block",
  quote: "Quote",
  list: "List",
  toc: "Inline table of contents",
};

/**
 * Settings for blocks whose attributes cannot be expressed in the Markdown
 * body (callout variant, CTA link, image alt text, code language…).
 *
 * Content itself stays editable in the main editor; this panel only exposes the
 * metadata so nothing is lost when an article is re-saved. Collapsed by default
 * so the article editor remains the primary surface.
 */
export function BlockPropertiesPanel({ blocks, onChange }: BlockPropertiesPanelProps) {
  const [open, setOpen] = useState(false);

  const editable = useMemo(
    () =>
      blocks
        .map((block, index) => ({ block, index }))
        .filter(({ block }) =>
          ["callout", "cta", "checklist", "image", "code", "quote", "list", "toc"].includes(
            block.type
          )
        ),
    [blocks]
  );

  if (editable.length === 0) return null;

  function patch(index: number, updater: (block: ContentBlock) => ContentBlock) {
    onChange(blocks.map((b, i) => (i === index ? updater(b) : b)));
  }

  return (
    <div className="border-t border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-[#fbfcfe]"
      >
        <span className="flex items-center gap-2 text-[12.5px] font-semibold text-[#0b1528]">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#0f6dff]" aria-hidden="true" />
          Block settings
          <span className="rounded-full bg-[#f4f8ff] px-2 py-0.5 text-[11px] font-bold text-[#0f6dff]">
            {editable.length}
          </span>
        </span>
        <span className="flex items-center gap-2 text-[11.5px] text-slate-500">
          Callouts, CTAs, images, quotes, code
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <div className="space-y-3 px-5 pb-5">
          <p className="text-[11.5px] leading-relaxed text-slate-500">
            Body text of these blocks is edited in the article above. Adjust their settings here —
            changes save with the article.
          </p>

          {editable.map(({ block, index }) => (
            <article
              key={`${block.type}-${index}`}
              className="rounded-xl border border-slate-200 bg-[#fbfcfe] p-3.5"
            >
              <header className="mb-2.5 flex items-center justify-between gap-2">
                <h3 className="text-[12px] font-bold text-[#0b1528]">
                  {TYPE_LABEL[block.type] ?? block.type}
                </h3>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                  block {index + 1}
                </span>
              </header>

              {block.type === "callout" && (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label className={labelCls}>Title</label>
                    <input
                      className={inputCls}
                      value={block.title}
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "callout" ? { ...b, title: e.target.value } : b
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Style</label>
                    <select
                      className={inputCls}
                      value={block.variant ?? "info"}
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "callout"
                            ? {
                                ...b,
                                variant: e.target.value as
                                  | "info"
                                  | "tip"
                                  | "warning"
                                  | "highlight",
                              }
                            : b
                        )
                      }
                    >
                      <option value="info">Info</option>
                      <option value="tip">Tip</option>
                      <option value="warning">Note</option>
                      <option value="highlight">Key insight</option>
                    </select>
                  </div>
                </div>
              )}

              {block.type === "cta" && (
                <div className="grid gap-2.5 sm:grid-cols-3">
                  <div>
                    <label className={labelCls}>Title</label>
                    <input
                      className={inputCls}
                      value={block.title}
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "cta" ? { ...b, title: e.target.value } : b
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Button label</label>
                    <input
                      className={inputCls}
                      value={block.button}
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "cta" ? { ...b, button: e.target.value } : b
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Button link</label>
                    <input
                      className={inputCls}
                      value={block.href ?? ""}
                      placeholder="/contact"
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "cta" ? { ...b, href: e.target.value } : b
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {block.type === "checklist" && (
                <div>
                  <label className={labelCls}>Title (optional)</label>
                  <input
                    className={inputCls}
                    value={block.title ?? ""}
                    onChange={(e) =>
                      patch(index, (b) =>
                        b.type === "checklist" ? { ...b, title: e.target.value } : b
                      )
                    }
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Items are the bullet lines inside this block in the editor.
                  </p>
                </div>
              )}

              {block.type === "image" && (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Alt text (required for accessibility)</label>
                    <input
                      className={inputCls}
                      value={block.alt}
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "image" ? { ...b, alt: e.target.value } : b
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Caption</label>
                    <input
                      className={inputCls}
                      value={block.caption ?? ""}
                      onChange={(e) =>
                        patch(index, (b) =>
                          b.type === "image" ? { ...b, caption: e.target.value } : b
                        )
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelCls}>Width</label>
                      <input
                        className={inputCls}
                        inputMode="numeric"
                        value={block.width ?? ""}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          patch(index, (b) =>
                            b.type === "image"
                              ? { ...b, width: Number.isFinite(v) && v > 0 ? v : undefined }
                              : b
                          );
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Height</label>
                      <input
                        className={inputCls}
                        inputMode="numeric"
                        value={block.height ?? ""}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          patch(index, (b) =>
                            b.type === "image"
                              ? { ...b, height: Number.isFinite(v) && v > 0 ? v : undefined }
                              : b
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {block.type === "code" && (
                <div className="sm:max-w-[220px]">
                  <label className={labelCls}>Language</label>
                  <input
                    className={inputCls}
                    value={block.language ?? ""}
                    placeholder="bash, ini, ts…"
                    onChange={(e) =>
                      patch(index, (b) =>
                        b.type === "code" ? { ...b, language: e.target.value } : b
                      )
                    }
                  />
                </div>
              )}

              {block.type === "quote" && (
                <div>
                  <label className={labelCls}>Attribution (optional)</label>
                  <input
                    className={inputCls}
                    value={block.cite ?? ""}
                    onChange={(e) =>
                      patch(index, (b) =>
                        b.type === "quote" ? { ...b, cite: e.target.value } : b
                      )
                    }
                  />
                </div>
              )}

              {block.type === "list" && (
                <label className="inline-flex items-center gap-2 text-[12.5px] font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(block.ordered)}
                    onChange={(e) =>
                      patch(index, (b) =>
                        b.type === "list" ? { ...b, ordered: e.target.checked } : b
                      )
                    }
                  />
                  Numbered list
                </label>
              )}

              {block.type === "toc" && (
                <p className="text-[11.5px] leading-relaxed text-slate-500">
                  Legacy inline table of contents. It stays on this article only; new articles use
                  the automatically generated sidebar TOC.
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
