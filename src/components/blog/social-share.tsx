"use client";

import { useState } from "react";
import { Linkedin, Twitter, Facebook, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function SocialShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "https://webamazee.com";
  const enc = encodeURIComponent;

  const links = [
    { icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { icon: Twitter, label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { icon: Facebook, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="flex items-center gap-1.5">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white text-slate-500 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:bg-brand-50 hover:text-brand-700"
        >
          <l.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl border shadow-soft transition-all duration-300 hover:-translate-y-0.5",
          copied
            ? "border-success/30 bg-success/10 text-success"
            : "border-line bg-white text-slate-500 hover:border-brand-600/30 hover:bg-brand-50 hover:text-brand-700"
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
