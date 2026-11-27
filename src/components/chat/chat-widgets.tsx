"use client";

/**
 * The two fixed contact affordances: a WhatsApp button and the Webamazee
 * assistant.
 *
 * Why they are one component: both live in the same bottom-right corner and
 * would otherwise stack on top of each other, the SEO-audit trigger, or the
 * back-to-top control. This component owns that corner and resolves the
 * stacking itself, so adding or moving a widget never becomes a z-index hunt
 * elsewhere.
 *
 * Behaviour:
 *   - WhatsApp is a plain link to wa.me with a prefilled message. It never
 *     opens a modal, so it works on every page and survives JS failures.
 *   - The assistant is a scripted, offline-capable bot (see the knowledge
 *     module). It cannot invent prices or promises; when it has no confident
 *     answer it hands off to WhatsApp.
 *   - On mobile the two sit side by side in the corner, 44px targets, and the
 *     pair is lifted clear of the SEO-audit pill while that pill is visible.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from "lucide-react";
import {
  BOT_FALLBACKS,
  BOT_GREETING,
  BOT_STARTER_CHIPS,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  matchIntent,
  whatsappHref,
  type BotIntent,
} from "@/lib/chatbot/knowledge";

/** Official WhatsApp glyph, drawn inline so no icon package is needed. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type Message = {
  id: number;
  role: "bot" | "visitor";
  text: string;
  chips?: string[];
  /** Chips that perform an action rather than asking another question. */
  actions?: { label: string; href: string }[];
};

const ACTION_MAP: Record<string, { label: string; href: string }> = {
  "Open WhatsApp": { label: "Open WhatsApp", href: whatsappHref() },
  "Email instead": { label: "Email us", href: `mailto:${CONTACT_EMAIL}` },
  "Run free audit": { label: "Run the free audit", href: "/free-seo-audit" },
  "See pricing": { label: "See pricing", href: "/pricing" },
  "See all services": { label: "See all services", href: "/services" },
  "See the case study": { label: "Kabir Oil Mill case study", href: "/case-studies/kabiroilmill" },
  "See case studies": { label: "See case studies", href: "/case-studies" },
  "Website redesign": { label: "Website redesign", href: "/services/website-redesign" },
  "Website design": { label: "Website development", href: "/services/website-development" },
  SEO: { label: "SEO services", href: "/services/seo-services" },
  "E-commerce": { label: "E-commerce development", href: "/services/ecommerce-development" },
};

let nextId = 1;

export function ChatWidgets() {
  const [open, setOpen] = useState(false);
  /* The transcript is seeded once, lazily, rather than in an effect: the
     greeting must exist before the panel animates in. */
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: nextId++, role: "bot", text: BOT_GREETING, chips: BOT_STARTER_CHIPS },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fallbackIndex = useRef(0);

  /** Keep the newest message in view. */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  const push = useCallback((message: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: nextId++ }]);
  }, []);

  /** Answer a question using the knowledge base, or hand off honestly. */
  const respond = useCallback(
    (question: string) => {
      setTyping(true);
      const intent: BotIntent | null = matchIntent(question);

      window.setTimeout(
        () => {
          setTyping(false);
          if (!intent) {
            const text = BOT_FALLBACKS[fallbackIndex.current % BOT_FALLBACKS.length];
            fallbackIndex.current += 1;
            push({
              role: "bot",
              text,
              actions: [
                { label: "Chat on WhatsApp", href: whatsappHref(`Hi, I have a question: ${question}`) },
                { label: "Email us", href: `mailto:${CONTACT_EMAIL}` },
              ],
            });
            return;
          }

          const reply = intent.replies[0];
          const chips = intent.chips ?? [];
          const actions = chips
            .map((c) => ACTION_MAP[c])
            .filter((a): a is { label: string; href: string } => Boolean(a));

          push({ role: "bot", text: reply, chips, actions });
        },
        520 + Math.min(question.length * 8, 500)
      );
    },
    [push]
  );

  const send = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || typing) return;
      push({ role: "visitor", text: value });
      setDraft("");
      respond(value);
    },
    [push, respond, typing]
  );

  const waHref = useMemo(() => whatsappHref(), []);

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* The corner: WhatsApp first, assistant above it.               */}
      {/* ------------------------------------------------------------ */}
      <div className="pointer-events-none fixed bottom-4 right-3 z-[75] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-5">
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label="Webamazee assistant"
              className="pointer-events-auto flex h-[min(560px,calc(100dvh-9rem))] w-[min(380px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="relative flex items-center gap-3 bg-[#0b1528] px-4 py-3.5">
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b1528] bg-success" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold leading-tight text-white">
                    Webamazee assistant
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                    Online · replies instantly
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Transcript */}
              <div
                ref={scrollRef}
                className="flex-1 space-y-3 overflow-y-auto bg-surface/40 px-3.5 py-4"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <div key={m.id} className="space-y-2">
                    <div
                      className={
                        m.role === "visitor"
                          ? "ml-auto w-fit max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-[#0f6dff] px-3.5 py-2.5 text-[13px] leading-relaxed text-white"
                          : "w-fit max-w-[88%] whitespace-pre-line rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-2.5 text-[13px] leading-relaxed text-slate-700 shadow-soft"
                      }
                    >
                      {m.text}
                    </div>

                    {m.actions && m.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.actions.map((a) => (
                          <a
                            key={a.href + a.label}
                            href={a.href}
                            target={a.href.startsWith("http") ? "_blank" : undefined}
                            rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#0f6dff] px-3 py-1.5 text-[11.5px] font-semibold text-white transition-colors hover:bg-[#0b57d0]"
                          >
                            {a.label}
                            <ArrowUpRight className="h-3 w-3" aria-hidden />
                          </a>
                        ))}
                      </div>
                    )}

                    {m.chips && m.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.chips
                          .filter((c) => !ACTION_MAP[c])
                          .map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => send(c)}
                              className="rounded-full border border-line bg-white px-3 py-1.5 text-[11.5px] font-medium text-slate-600 transition-colors hover:border-brand-600/40 hover:text-brand-700"
                            >
                              {c}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}

                {typing && (
                  <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-3 shadow-soft">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(draft);
                }}
                className="border-t border-line bg-white px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Ask about services, pricing, timelines…"
                    aria-label="Your message"
                    className="h-10 min-w-0 flex-1 rounded-full border border-line bg-surface/60 px-3.5 text-[13px] text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-600 focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim() || typing}
                    aria-label="Send message"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0f6dff] text-white transition-colors hover:bg-[#0b57d0] disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <p className="mt-1.5 px-1 text-[10px] leading-relaxed text-slate-400">
                  Scripted assistant. For anything specific to your project, talk to the team.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with Webamazee on WhatsApp at ${WHATSAPP_DISPLAY}`}
            className="group grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:h-13 sm:w-13"
          >
            <WhatsAppGlyph className="h-6 w-6" />
          </a>

          <button
            type="button"
            onClick={() => { setOpen((v) => !v); setUnread(false); }}
            aria-label={open ? "Close assistant" : "Open the Webamazee assistant"}
            aria-expanded={open}
            className="group relative grid h-12 w-12 place-items-center rounded-full bg-[#0b1528] text-white shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:h-13 sm:w-13"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <MessageCircle className="h-5 w-5" aria-hidden />
            )}
            {unread && !open && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-brand-600 text-[9px] font-bold text-white ring-2 ring-white">
                1
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
