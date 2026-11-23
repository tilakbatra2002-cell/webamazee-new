import type { ReactNode } from "react";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ListOrdered,
  ShieldCheck,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ContentBlock } from "@/lib/blog-types";
import { isSafeLinkOrPath } from "@/lib/cms/url-safety";
import { headingIdsByIndex } from "@/lib/blog-headings";
import { cn } from "@/lib/utils";

/**
 * Minimal inline formatter. Supports markdown features used inside
 * paragraph / list text:
 *   - links:  [anchor text](https://www.webamazee.com/services/...)
 *   - bold:   **text**
 *   - code:   `code`
 * Internal webamazee.com links are rendered as Next <Link> (converted to
 * relative paths so they stay on-site); external links open in a new tab.
 */
function renderInlineText(text: string, keyPrefix = "inline"): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Order matters: **bold** must win over *italic* so nested emphasis renders.
  const tokenRe = /(\[[^\]]+\]\([^)]+\)|\*\*[\s\S]+?\*\*|\*[^*\s][^*\n]*\*|`[^`]+`)/g;
  const parts = text.split(tokenRe);

  parts.forEach((part, i) => {
    if (!part) return;
    const key = `${keyPrefix}-${i}`;

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, anchor, rawHref] = linkMatch;
      const href = rawHref.trim();

      if (!isSafeLinkOrPath(href)) {
        // Defense-in-depth: never emit javascript:/data:/vbscript: links from stored markdown
        nodes.push(<span key={key}>{anchor}</span>);
        return;
      }

      const isWebamazeeUrl = /^https?:\/\/(www\.)?webamazee\.com(\/|$)/i.test(href);
      const isRelativeInternal = href.startsWith("/") || href.startsWith("#");

      if (isWebamazeeUrl || isRelativeInternal) {
        const internalHref = isWebamazeeUrl
          ? href.replace(/^https?:\/\/(www\.)?webamazee\.com/i, "") || "/"
          : href;
        nodes.push(
          <Link
            key={key}
            href={internalHref}
            className="font-semibold text-[#0f6dff] underline decoration-[#0f6dff]/35 underline-offset-4 transition-colors hover:text-[#0b57d0] hover:decoration-[#0b57d0]"
          >
            {anchor}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#0f6dff] underline decoration-[#0f6dff]/35 underline-offset-4 transition-colors hover:text-[#0b57d0]"
          >
            {anchor}
          </a>
        );
      }
      return;
    }

    const italicMatch = part.match(/^\*([^*\s][^*\n]*)\*$/);
    if (italicMatch) {
      nodes.push(
        <em key={key} className="italic">
          {renderInlineText(italicMatch[1], `${key}-em`)}
        </em>
      );
      return;
    }

    const boldMatch = part.match(/^\*\*([\s\S]+)\*\*$/);
    if (boldMatch) {
      nodes.push(
        <strong key={key} className="font-bold text-[#0b1528]">
          {renderInlineText(boldMatch[1], `${key}-strong`)}
        </strong>
      );
      return;
    }

    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      nodes.push(
        <code
          key={key}
          className="rounded-md border border-slate-200 bg-[#f7f9fc] px-1.5 py-0.5 font-mono text-[0.86em] font-medium text-[#0b1528]"
        >
          {codeMatch[1]}
        </code>
      );
      return;
    }

    nodes.push(<span key={key}>{part}</span>);
  });

  return nodes;
}

function InlineText({ text }: { text: string }) {
  return <>{renderInlineText(text)}</>;
}

function Callout({
  variant = "info",
  title,
  text,
}: {
  variant?: "info" | "tip" | "warning" | "highlight";
  title: string;
  text: string;
}) {
  const styles: Record<
    string,
    {
      icon: typeof Info;
      border: string;
      bg: string;
      accent: string;
      label: string;
    }
  > = {
    info: {
      icon: Info,
      border: "border-slate-200 border-l-[#0f6dff]",
      bg: "bg-[#f4f8ff]",
      accent: "text-[#0f6dff]",
      label: "Info",
    },
    tip: {
      icon: Lightbulb,
      border: "border-emerald-200 border-l-emerald-600",
      bg: "bg-emerald-50/50",
      accent: "text-emerald-700",
      label: "Tip",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-amber-200 border-l-amber-600",
      bg: "bg-amber-50/60",
      accent: "text-amber-800",
      label: "Note",
    },
    highlight: {
      icon: Sparkles,
      border: "border-[#cfe0ff] border-l-[#0f6dff]",
      bg: "bg-[#f4f8ff]",
      accent: "text-[#0f6dff]",
      label: "Key insight",
    },
  };
  const s = styles[variant];
  const Icon = s.icon;

  return (
    <aside className={cn("my-7 flex gap-3.5 rounded-xl border border-l-4 p-5", s.border, s.bg)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.accent)} aria-hidden="true" />
      <div>
        <p className={cn("text-[11px] font-bold uppercase tracking-[0.14em]", s.accent)}>
          {s.label} · {title}
        </p>
        <p className="mt-1.5 text-[15px] leading-[1.7] text-slate-700">{text}</p>
      </div>
    </aside>
  );
}

function InlineCTA({
  title,
  text,
  button,
  href,
}: {
  title: string;
  text: string;
  button: string;
  href?: string;
}) {
  const safeHref = href && isSafeLinkOrPath(href) ? href : "/contact";
  return (
    <div className="my-8 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-lg">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">
            Free Audit
          </p>
          <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-slate-300">{text}</p>
        </div>
        <Link
          href={safeHref}
          className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0]"
        >
          {button}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

interface RenderOptions {
  /** Canonical heading anchors derived by `deriveHeadings()`. */
  headingIds?: Map<number, string>;
  /** Editor previews live under /admin, so local /images paths need an origin. */
  absoluteImageUrls?: boolean;
}

function imageSrc(src: string, absolute: boolean): string {
  if (!absolute) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

function renderBlock(
  block: ContentBlock,
  i: number,
  options: RenderOptions = {}
): ReactNode {
  switch (block.type) {
    case "image":
      const src = imageSrc(block.src, Boolean(options.absoluteImageUrls));
      return (
        <figure
          key={i}
          className="my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <Image
            src={src}
            alt={block.alt}
            width={block.width ?? 1200}
            height={block.height ?? 630}
            sizes="(max-width: 1024px) 100vw, 820px"
            className="h-auto w-full bg-white"
          />
          {block.caption && (
            <figcaption className="border-t border-slate-100 bg-[#f7f9fc] px-4 py-2.5 text-center text-[13px] text-slate-600">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "paragraph":
      return (
        <p key={i} className="text-[16.5px] leading-[1.82] text-slate-700 sm:text-[17px]">
          <InlineText text={block.text} />
        </p>
      );
    case "heading": {
      const headingId = options.headingIds?.get(i) ?? block.id ?? `section-${i}`;
      if (block.level === 3) {
        return (
          <h3
            key={i}
            id={headingId}
            className="scroll-mt-24 pt-4 font-display text-[1.22rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#0b1528] sm:text-[1.32rem]"
          >
            {block.text}
          </h3>
        );
      }
      return (
        <h2
          key={i}
          id={headingId}
          className="scroll-mt-24 border-b border-slate-200/80 pb-2.5 pt-7 font-display text-[1.55rem] font-bold leading-[1.2] tracking-[-0.022em] text-[#0b1528] sm:text-[1.8rem]"
        >
          {block.text}
        </h2>
      );
    }
    case "list":
      return block.ordered ? (
        <ol key={i} className="my-4 space-y-3 pl-0.5">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-[16px] leading-[1.75] text-slate-700"
            >
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[#cfe0ff] bg-[#f4f8ff] font-display text-[12px] font-bold text-[#0f6dff]">
                {j + 1}
              </span>
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ul key={i} className="my-4 space-y-2.5 pl-0.5">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-[16px] leading-[1.75] text-slate-700"
            >
              <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-7 rounded-r-xl border-l-[3px] border-[#0f6dff] bg-[#f7f9fc] px-6 py-5"
        >
          <p className="text-[17px] font-medium italic leading-[1.75] text-[#0b1528]">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && (
            <footer className="mt-2.5 text-[13px] font-bold text-[#0f6dff]">
              — {block.cite}
            </footer>
          )}
        </blockquote>
      );
    case "code":
      return (
        <div
          key={i}
          className="my-6 overflow-hidden rounded-xl border border-slate-800 bg-[#0b1528]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {block.language ?? "code"}
            </span>
          </div>
          <pre className="overflow-x-auto p-4 text-[13.5px] leading-relaxed text-slate-100">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "table": {
      const minW = block.head.length >= 3 ? "min-w-[580px]" : "min-w-[440px]";
      return (
        <div
          key={i}
          className="my-7 overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div className="overflow-x-auto">
            <table className={cn("w-full text-left text-[14px] sm:min-w-full", minW)}>
              <thead className="border-b border-slate-200 bg-[#f4f8ff]">
                <tr>
                  {block.head.map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3 font-display text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#0b1528] sm:px-5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {block.rows.map((row, r) => (
                  <tr key={r} className="transition-colors hover:bg-[#f7f9fc]">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={cn(
                          "px-4 py-3.5 align-top leading-relaxed text-slate-600 sm:px-5",
                          c === 0 && "font-semibold text-[#0b1528]"
                        )}
                      >
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    case "callout":
      return (
        <Callout
          key={i}
          variant={block.variant}
          title={block.title}
          text={block.text}
        />
      );
    case "cta":
      return (
        <InlineCTA
          key={i}
          title={block.title}
          text={block.text}
          button={block.button}
          href={block.href}
        />
      );
    case "toc":
      return (
        <nav
          key={i}
          aria-label="Table of contents"
          className="my-7 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5 sm:p-6"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3.5">
            <ListOrdered className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
            <h3 className="font-display text-[15px] font-bold text-[#0b1528] sm:text-base">
              {block.title ?? "Table of Contents"}
            </h3>
          </div>
          <ol className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {block.items.map((item, idx) => (
              <li
                key={idx}
                className={cn(
                  item.level === 3 ? "pl-4 text-[13px]" : "text-[14px]"
                )}
              >
                <a
                  href={`#${item.id}`}
                  className="group flex items-start gap-2 text-slate-700 transition-colors hover:text-[#0f6dff]"
                >
                  <span
                    className={cn(
                      "mt-2 shrink-0 rounded-full",
                      item.level === 3
                        ? "h-1 w-1 bg-slate-400 group-hover:bg-[#0f6dff]"
                        : "h-1.5 w-1.5 bg-[#0f6dff]"
                    )}
                  />
                  <span className="leading-snug group-hover:underline underline-offset-4">
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      );
    case "checklist":
      return (
        <div
          key={i}
          className="my-6 rounded-xl border border-slate-200 bg-[#f7f9fc] p-5 sm:p-6"
        >
          {block.title && (
            <h4 className="mb-3.5 flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-[#0b1528]">
              <ShieldCheck className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
              {block.title}
            </h4>
          )}
          <ul className="space-y-2.5">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-3 text-[15.5px] leading-relaxed text-slate-700"
              >
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-[#0f6dff]"
                  aria-hidden="true"
                />
                <span>
                  <InlineText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export function RichContent({
  blocks,
  absoluteImageUrls = false,
}: {
  blocks: ContentBlock[];
  absoluteImageUrls?: boolean;
}) {
  const rendered: ReactNode[] = [];
  // Heading anchors always come from the shared derivation so TOC links match.
  const options: RenderOptions = { headingIds: headingIdsByIndex(blocks), absoluteImageUrls };

  // Article bodies render in document order. The FAQ card layout that used to be
  // assembled here was removed with the CMS FAQ editor, so FAQ-style H3
  // questions now render as regular headings and keep valid TOC anchors.
  blocks.forEach((block, i) => {
    rendered.push(renderBlock(block, i, options));
  });

  return <div className="space-y-5">{rendered}</div>;
}
