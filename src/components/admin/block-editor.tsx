"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  Code2,
  Copy,
  FileCode2,
  Heading2,
  Image as ImageIcon,
  Info,
  List,
  ListOrdered,
  Megaphone,
  Pilcrow,
  Plus,
  Quote,
  Table2,
  Trash2,
} from "lucide-react";
import type { ContentBlock } from "@/lib/blog-types";
import { extractTocFromBlocks } from "@/lib/cms/reading-time";
import { slugify } from "@/lib/cms/slugify";
import { MediaPickerModal } from "./media-picker-modal";

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (next: ContentBlock[]) => void;
}

type BlockType = ContentBlock["type"];

const BLOCK_CATALOG: { type: BlockType; label: string; icon: typeof Pilcrow }[] = [
  { type: "paragraph", label: "Paragraph", icon: Pilcrow },
  { type: "heading", label: "Heading", icon: Heading2 },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "list", label: "List", icon: List },
  { type: "checklist", label: "Checklist", icon: CheckSquare },
  { type: "quote", label: "Quote", icon: Quote },
  { type: "code", label: "Code", icon: Code2 },
  { type: "callout", label: "Callout", icon: Info },
  { type: "table", label: "Table", icon: Table2 },
  { type: "cta", label: "CTA Banner", icon: Megaphone },
  { type: "toc", label: "Inline TOC", icon: ListOrdered },
];

function createEmptyBlock(type: BlockType, currentBlocks: ContentBlock[]): ContentBlock {
  switch (type) {
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "heading":
      return { type: "heading", text: "", level: 2, id: "" };
    case "image":
      return { type: "image", src: "", alt: "", caption: "" };
    case "list":
      return { type: "list", ordered: false, items: [""] };
    case "checklist":
      return { type: "checklist", title: "", items: [""] };
    case "quote":
      return { type: "quote", text: "", cite: "" };
    case "code":
      return { type: "code", language: "bash", code: "" };
    case "callout":
      return { type: "callout", variant: "tip", title: "", text: "" };
    case "table":
      return {
        type: "table",
        head: ["Column 1", "Column 2"],
        rows: [["", ""]],
      };
    case "cta":
      return {
        type: "cta",
        title: "Need help executing this strategy?",
        text: "Talk to Webamazee's growth team for a tailored roadmap.",
        button: "Book a Free Strategy Call",
        href: "/contact",
      };
    case "toc": {
      const derived = extractTocFromBlocks(currentBlocks);
      return {
        type: "toc",
        title: "In This Guide",
        items: derived.length > 0 ? derived : [{ text: "Overview", id: "overview", level: 2 }],
      };
    }
  }
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13.5px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff]";

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonError, setJsonError] = useState("");

  function updateBlock(index: number, nextBlock: ContentBlock) {
    const copy = [...blocks];
    copy[index] = nextBlock;
    onChange(copy);
  }

  function moveBlock(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= blocks.length) return;
    const copy = [...blocks];
    const [removed] = copy.splice(index, 1);
    copy.splice(target, 0, removed);
    onChange(copy);
  }

  function duplicateBlock(index: number) {
    const copy = [...blocks];
    copy.splice(index + 1, 0, structuredClone(copy[index]));
    onChange(copy);
  }

  function deleteBlock(index: number) {
    const copy = [...blocks];
    copy.splice(index, 1);
    onChange(copy);
  }

  function appendBlock(type: BlockType) {
    onChange([...blocks, createEmptyBlock(type, blocks)]);
  }

  function openJsonDrawer() {
    setJsonDraft(JSON.stringify(blocks, null, 2));
    setJsonError("");
    setJsonMode(true);
  }

  function applyJsonBlocks() {
    try {
      const parsed = JSON.parse(jsonDraft);
      if (!Array.isArray(parsed)) {
        setJsonError("Content blocks JSON must be an array.");
        return;
      }
      onChange(parsed as ContentBlock[]);
      setJsonError("");
      setJsonMode(false);
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : "Invalid JSON syntax.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-[#0b1528]">
            Article Content Blocks ({blocks.length})
          </h3>
          <p className="text-xs text-slate-500">
            Supports bold (**text**), links ([label](url)), and inline code (`code`) inside text fields.
          </p>
        </div>
        <button
          type="button"
          onClick={() => (jsonMode ? setJsonMode(false) : openJsonDrawer())}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
        >
          <FileCode2 className="h-3.5 w-3.5 text-[#0f6dff]" />
          {jsonMode ? "Back to Visual Blocks" : "JSON Blocks Mode"}
        </button>
      </div>

      {jsonMode ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
          <textarea
            value={jsonDraft}
            onChange={(e) => setJsonDraft(e.target.value)}
            rows={18}
            className="w-full rounded-xl border border-slate-200 bg-[#0b1528] p-3.5 font-mono text-xs text-slate-100 outline-none focus:border-[#0f6dff]"
          />
          {jsonError && (
            <p className="text-xs font-semibold text-rose-600">{jsonError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyJsonBlocks}
              className="rounded-xl bg-[#0f6dff] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0b57d0]"
            >
              Apply JSON Blocks
            </button>
            <button
              type="button"
              onClick={() => setJsonMode(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map((block, index) => (
            <div
              key={`${block.type}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-[#f4f8ff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0f6dff]">
                    #{index + 1} · {block.type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveBlock(index, -1)}
                    aria-label="Move block up"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-35"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === blocks.length - 1}
                    onClick={() => moveBlock(index, 1)}
                    aria-label="Move block down"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-35"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateBlock(index)}
                    aria-label="Duplicate block"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteBlock(index)}
                    aria-label="Delete block"
                    className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {block.type === "paragraph" && (
                <textarea
                  rows={3}
                  value={block.text}
                  onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                  placeholder="Write paragraph text..."
                  className={inputCls}
                />
              )}

              {block.type === "heading" && (
                <div className="grid gap-3 sm:grid-cols-[110px_minmax(0,1fr)_180px]">
                  <select
                    value={block.level ?? 2}
                    onChange={(e) =>
                      updateBlock(index, {
                        ...block,
                        level: Number(e.target.value) === 3 ? 3 : 2,
                      })
                    }
                    className={inputCls}
                  >
                    <option value={2}>H2 Heading</option>
                    <option value={3}>H3 Heading</option>
                  </select>
                  <input
                    type="text"
                    value={block.text}
                    onChange={(e) => {
                      const nextText = e.target.value;
                      updateBlock(index, {
                        ...block,
                        text: nextText,
                        id: block.id || slugify(nextText),
                      });
                    }}
                    placeholder="Section heading..."
                    className={inputCls}
                  />
                  <input
                    type="text"
                    value={block.id ?? ""}
                    onChange={(e) => updateBlock(index, { ...block, id: slugify(e.target.value) })}
                    placeholder="anchor-id"
                    className={inputCls}
                  />
                </div>
              )}

              {block.type === "image" && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      value={block.src}
                      onChange={(e) => updateBlock(index, { ...block, src: e.target.value })}
                      placeholder="Image URL or /images/..."
                      className={`${inputCls} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={() => setMediaTargetIndex(index)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f6dff] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0b57d0]"
                    >
                      <ImageIcon className="h-3.5 w-3.5" /> Media Library / Upload
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={block.alt}
                      onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                      placeholder="Image alt text (required)"
                      className={inputCls}
                    />
                    <input
                      type="text"
                      value={block.caption ?? ""}
                      onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                      placeholder="Optional image caption"
                      className={inputCls}
                    />
                  </div>
                  {block.src && (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#f7f9fc] p-2">
                      <img
                        src={block.src}
                        alt={block.alt || "Preview"}
                        className="max-h-48 w-auto rounded-lg object-contain mx-auto"
                      />
                    </div>
                  )}
                </div>
              )}

              {(block.type === "list" || block.type === "checklist") && (
                <div className="space-y-2.5">
                  {block.type === "list" ? (
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <input
                        type="checkbox"
                        checked={Boolean(block.ordered)}
                        onChange={(e) =>
                          updateBlock(index, { ...block, ordered: e.target.checked })
                        }
                      />
                      Numbered (ordered) list
                    </label>
                  ) : (
                    <input
                      type="text"
                      value={block.title ?? ""}
                      onChange={(e) => updateBlock(index, { ...block, title: e.target.value })}
                      placeholder="Optional checklist title"
                      className={inputCls}
                    />
                  )}
                  <div className="space-y-2">
                    {block.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const nextItems = [...block.items];
                            nextItems[itemIdx] = e.target.value;
                            updateBlock(index, { ...block, items: nextItems });
                          }}
                          placeholder={`Item ${itemIdx + 1}`}
                          className={inputCls}
                        />
                        <button
                          type="button"
                          disabled={block.items.length <= 1}
                          onClick={() => {
                            const nextItems = block.items.filter((_, i) => i !== itemIdx);
                            updateBlock(index, { ...block, items: nextItems });
                          }}
                          className="rounded-xl border border-slate-200 px-2.5 text-rose-500 hover:bg-rose-50 disabled:opacity-40"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(index, { ...block, items: [...block.items, ""] })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-[#f4f8ff] px-3 py-1.5 text-xs font-semibold text-[#0f6dff]"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Item
                    </button>
                  </div>
                </div>
              )}

              {block.type === "quote" && (
                <div className="space-y-2.5">
                  <textarea
                    rows={2}
                    value={block.text}
                    onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                    placeholder="Quote text..."
                    className={inputCls}
                  />
                  <input
                    type="text"
                    value={block.cite ?? ""}
                    onChange={(e) => updateBlock(index, { ...block, cite: e.target.value })}
                    placeholder="Optional attribution / author"
                    className={inputCls}
                  />
                </div>
              )}

              {block.type === "code" && (
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={block.language ?? ""}
                    onChange={(e) => updateBlock(index, { ...block, language: e.target.value })}
                    placeholder="Language (e.g., php, ts, bash, html)"
                    className={inputCls}
                  />
                  <textarea
                    rows={5}
                    value={block.code}
                    onChange={(e) => updateBlock(index, { ...block, code: e.target.value })}
                    placeholder="Paste code snippet..."
                    className={`${inputCls} font-mono text-xs`}
                  />
                </div>
              )}

              {block.type === "callout" && (
                <div className="space-y-2.5">
                  <div className="grid gap-3 sm:grid-cols-[160px_minmax(0,1fr)]">
                    <select
                      value={block.variant ?? "info"}
                      onChange={(e) =>
                        updateBlock(index, {
                          ...block,
                          variant: e.target.value as "info" | "tip" | "warning" | "highlight",
                        })
                      }
                      className={inputCls}
                    >
                      <option value="info">Info</option>
                      <option value="tip">Tip</option>
                      <option value="warning">Warning</option>
                      <option value="highlight">Highlight</option>
                    </select>
                    <input
                      type="text"
                      value={block.title}
                      onChange={(e) => updateBlock(index, { ...block, title: e.target.value })}
                      placeholder="Callout title"
                      className={inputCls}
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={block.text}
                    onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                    placeholder="Callout body text..."
                    className={inputCls}
                  />
                </div>
              )}

              {block.type === "table" && (
                <div className="space-y-3 overflow-x-auto">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(index, {
                          ...block,
                          head: [...block.head, `Col ${block.head.length + 1}`],
                          rows: block.rows.map((r) => [...r, ""]),
                        })
                      }
                      className="rounded-lg bg-[#f4f8ff] px-2.5 py-1 text-xs font-semibold text-[#0f6dff]"
                    >
                      + Column
                    </button>
                    <button
                      type="button"
                      disabled={block.head.length <= 1}
                      onClick={() =>
                        updateBlock(index, {
                          ...block,
                          head: block.head.slice(0, -1),
                          rows: block.rows.map((r) => r.slice(0, -1)),
                        })
                      }
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 disabled:opacity-40"
                    >
                      - Column
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(index, {
                          ...block,
                          rows: [...block.rows, new Array(block.head.length).fill("")],
                        })
                      }
                      className="rounded-lg bg-[#f4f8ff] px-2.5 py-1 text-xs font-semibold text-[#0f6dff]"
                    >
                      + Row
                    </button>
                  </div>

                  <table className="w-full min-w-[460px] border-collapse text-xs">
                    <thead>
                      <tr>
                        {block.head.map((header, colIdx) => (
                          <th key={colIdx} className="p-1">
                            <input
                              type="text"
                              value={header}
                              onChange={(e) => {
                                const nextHead = [...block.head];
                                nextHead[colIdx] = e.target.value;
                                updateBlock(index, { ...block, head: nextHead });
                              }}
                              className="w-full rounded-lg border border-slate-200 bg-[#f4f8ff] px-2.5 py-1.5 font-semibold text-[#0b1528]"
                            />
                          </th>
                        ))}
                        <th className="w-8" />
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {row.map((cell, colIdx) => (
                            <td key={colIdx} className="p-1">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) => {
                                  const nextRows = block.rows.map((r, ri) =>
                                    ri === rowIdx
                                      ? r.map((c, ci) => (ci === colIdx ? e.target.value : c))
                                      : r
                                  );
                                  updateBlock(index, { ...block, rows: nextRows });
                                }}
                                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5"
                              />
                            </td>
                          ))}
                          <td className="p-1 text-center">
                            <button
                              type="button"
                              disabled={block.rows.length <= 1}
                              onClick={() =>
                                updateBlock(index, {
                                  ...block,
                                  rows: block.rows.filter((_, ri) => ri !== rowIdx),
                                })
                              }
                              className="rounded p-1 text-rose-500 hover:bg-rose-50 disabled:opacity-35"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {block.type === "cta" && (
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => updateBlock(index, { ...block, title: e.target.value })}
                    placeholder="CTA Headline"
                    className={inputCls}
                  />
                  <textarea
                    rows={2}
                    value={block.text}
                    onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                    placeholder="CTA supporting text"
                    className={inputCls}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={block.button}
                      onChange={(e) => updateBlock(index, { ...block, button: e.target.value })}
                      placeholder="Button label"
                      className={inputCls}
                    />
                    <input
                      type="text"
                      value={block.href ?? "/contact"}
                      onChange={(e) => updateBlock(index, { ...block, href: e.target.value })}
                      placeholder="/contact or https://..."
                      className={inputCls}
                    />
                  </div>
                </div>
              )}

              {block.type === "toc" && (
                <div className="space-y-2.5">
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      value={block.title ?? ""}
                      onChange={(e) => updateBlock(index, { ...block, title: e.target.value })}
                      placeholder="TOC box title (e.g., Table of Contents)"
                      className={`${inputCls} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const extracted = extractTocFromBlocks(blocks);
                        if (extracted.length > 0) {
                          updateBlock(index, { ...block, items: extracted });
                        }
                      }}
                      className="rounded-xl bg-[#f4f8ff] px-3 py-2 text-xs font-semibold text-[#0f6dff]"
                    >
                      Auto-fill from Headings
                    </button>
                  </div>
                  <div className="space-y-2">
                    {block.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="grid gap-2 sm:grid-cols-[80px_minmax(0,1fr)_160px_36px]">
                        <select
                          value={item.level ?? 2}
                          onChange={(e) => {
                            const next = [...block.items];
                            next[itemIdx] = {
                              ...item,
                              level: Number(e.target.value) === 3 ? 3 : 2,
                            };
                            updateBlock(index, { ...block, items: next });
                          }}
                          className={inputCls}
                        >
                          <option value={2}>H2</option>
                          <option value={3}>H3</option>
                        </select>
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => {
                            const next = [...block.items];
                            next[itemIdx] = {
                              ...item,
                              text: e.target.value,
                              id: item.id || slugify(e.target.value),
                            };
                            updateBlock(index, { ...block, items: next });
                          }}
                          placeholder="TOC heading label"
                          className={inputCls}
                        />
                        <input
                          type="text"
                          value={item.id}
                          onChange={(e) => {
                            const next = [...block.items];
                            next[itemIdx] = { ...item, id: slugify(e.target.value) };
                            updateBlock(index, { ...block, items: next });
                          }}
                          placeholder="anchor-id"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          disabled={block.items.length <= 1}
                          onClick={() =>
                            updateBlock(index, {
                              ...block,
                              items: block.items.filter((_, idx) => idx !== itemIdx),
                            })
                          }
                          className="grid place-items-center rounded-xl border border-slate-200 text-rose-500 hover:bg-rose-50 disabled:opacity-40"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(index, {
                          ...block,
                          items: [...block.items, { text: "", id: "", level: 2 }],
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-[#f4f8ff] px-3 py-1.5 text-xs font-semibold text-[#0f6dff]"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add TOC Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Block Bar */}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-[#f7f9fc] p-4">
            <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Add Content Block
            </p>
            <div className="flex flex-wrap gap-2">
              {BLOCK_CATALOG.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => appendBlock(item.type)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#0f6dff]" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <MediaPickerModal
        open={mediaTargetIndex !== null}
        onClose={() => setMediaTargetIndex(null)}
        initialUrl={
          mediaTargetIndex !== null && blocks[mediaTargetIndex]?.type === "image"
            ? blocks[mediaTargetIndex].src
            : ""
        }
        onSelect={({ url, alt }) => {
          if (mediaTargetIndex === null) return;
          const target = blocks[mediaTargetIndex];
          if (target?.type === "image") {
            updateBlock(mediaTargetIndex, {
              ...target,
              src: url,
              alt: alt || target.alt,
            });
          }
        }}
      />
    </div>
  );
}
