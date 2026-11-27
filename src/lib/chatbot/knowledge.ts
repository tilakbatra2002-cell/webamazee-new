/**
 * Knowledge base for the Webamazee assistant.
 *
 * Every answer here is assembled from facts that already exist on the site:
 * the service list, the published packages in `pricing-data.ts`, the contact
 * details in the header and footer, and the process described on the service
 * pages. Nothing is invented — there are no client counts, rankings, revenue
 * figures, timelines or guarantees that the business has not published, and
 * the assistant is written to hand off to a human rather than guess.
 *
 * The matcher is deliberately simple and predictable: keyword scoring over a
 * small set of intents, with a fallback that routes to WhatsApp or email.
 * That keeps answers accurate; a wrong answer from a sales assistant costs
 * more than an honest hand-off.
 */

export interface BotIntent {
  id: string;
  /** Words and phrases that should trigger this intent. */
  keywords: string[];
  /** Replies, in the order they are offered. The first is used by default. */
  replies: string[];
  /** Follow-up chips shown under the answer. */
  chips?: string[];
}

export const WHATSAPP_NUMBER = "918360532487";
export const WHATSAPP_DISPLAY = "+91 83605 32487";
export const CONTACT_EMAIL = "info@webamazee.com";

export const WHATSAPP_GREETING =
  "Hi Webamazee, I would like to talk about my website.";

export function whatsappHref(message: string = WHATSAPP_GREETING) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Shown before the visitor has said anything. */
export const BOT_GREETING =
  "Hi! I'm the Webamazee assistant. I can explain what we do, how projects run and how to get a quote — or put you straight through to the team.";

export const BOT_STARTER_CHIPS = [
  "What do you do?",
  "How much does a website cost?",
  "How long does it take?",
  "Talk to a human",
];

export const BOT_INTENTS: BotIntent[] = [
  {
    id: "services",
    keywords: [
      "what do you do",
      "services",
      "service",
      "offer",
      "kya karte",
      "kaam",
    ],
    replies: [
      "We build and grow websites. The work splits into three areas: websites (development, redesign, landing pages, e-commerce), search (SEO services, technical SEO, local SEO, AI SEO, link building, competitor analysis) and social (management, marketing, advertising on Instagram, Facebook and LinkedIn, plus AI content optimisation).",
      "If you tell me what you are trying to achieve, I can point you to the right service — or you can browse everything under Services.",
    ],
    chips: ["Website design", "SEO", "E-commerce", "See all services"],
  },
  {
    id: "website",
    keywords: ["website", "web design", "web development", "site banao", "new site"],
    replies: [
      "Website work covers new builds and redesigns. A build starts with a short discovery conversation about your offer and the customers you want to reach, then moves through structure, design, build and launch.",
      "Published packages start at Starter Website, Business Website, Professional Website and E-Commerce Website — each one is listed with what it includes on the pricing page.",
    ],
    chips: ["See pricing", "Website redesign", "How long does it take?"],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "budget", "kitna", "charge", "quote", "expensive"],
    replies: [
      "Every package and its price is published on the pricing page — website, SEO, AI SEO and social plans are all listed there with what each one includes. I won't guess at a number for your project because the right package depends on scope.",
      "If you share what you need, the team can confirm which package fits and quote accurately.",
    ],
    chips: ["See pricing", "Talk to a human"],
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "days", "weeks", "kitne din", "duration", "delivery time", "how soon"],
    replies: [
      "Timelines depend on scope — a landing page and a full e-commerce build are very different jobs. Specific deliverables and timelines are agreed in the proposal before work starts, so you always know the schedule up front.",
      "The quickest way to a real answer is a short conversation about what you need.",
    ],
    chips: ["Talk to a human", "What do you do?"],
  },
  {
    id: "seo",
    keywords: ["seo", "rank", "ranking", "google", "search engine", "traffic", "keyword"],
    replies: [
      "SEO work spans technical SEO, on-page work, local SEO, link building, competitor analysis and AI search optimisation. It starts with an audit of the live site rather than assumptions.",
      "You can run the free audit on this site and get a real read of technical SEO, on-page signals, performance, mobile, security, structured data and AI search readiness before talking to anyone.",
      "One honest note: no one can promise a ranking position. What we can do is fix what is measurably holding the site back.",
    ],
    chips: ["Run free audit", "Talk to a human"],
  },
  {
    id: "ecommerce",
    keywords: ["ecommerce", "e-commerce", "online store", "store", "shop", "products"],
    replies: [
      "E-commerce builds cover product catalogues, cart and checkout, payment options and the product structure that makes browsing straightforward on mobile. Kabir Oil Mill is a live example of a store built this way — there is a full case study on it.",
    ],
    chips: ["See the case study", "See pricing", "Talk to a human"],
  },
  {
    id: "redesign",
    keywords: ["redesign", "old website", "outdated", "refresh", "improve my site", "looks old"],
    replies: [
      "A redesign is not a repaint. It starts by looking at what the current site is actually doing — what people cannot find, where enquiries drop off, what breaks on mobile — and then restructures around that.",
      "Wellington Tours, Shine Gold Tours and the American-Lao Business Association are all documented redesigns on this site, with before-and-after detail.",
    ],
    chips: ["See case studies", "Talk to a human"],
  },
  {
    id: "process",
    keywords: ["process", "how does it work", "how do you work", "steps", "what happens", "workflow", "kaise kaam"],
    replies: [
      "Projects run in stages, with each stage reviewed before the next begins: discovery and planning, structure and content, design, build, then launch and handover. Nothing moves forward on assumption.",
      "Specific deliverables, timelines and pricing are agreed in your proposal, and where anything conflicts with the general terms, your signed agreement takes precedence.",
    ],
    chips: ["Talk to a human", "What do you do?"],
  },
  {
    id: "audit",
    keywords: ["audit", "free audit", "check my site", "scan", "score"],
    replies: [
      "The free website audit runs live checks on any URL and reports back on technical SEO, on-page signals, performance, mobile readiness, security, structured data and AI search readiness — with the specific issues it actually detected and how to fix each one.",
      "Nothing is invented: if a check could not run, it says so instead of guessing.",
    ],
    chips: ["Run free audit"],
  },
  {
    id: "contact",
    keywords: ["contact", "call you", "phone", "email", "reach you", "talk to", "human", "whatsapp", "baat karni"],
    replies: [
      `Fastest is WhatsApp on ${WHATSAPP_DISPLAY} — a real person replies there. You can also email ${CONTACT_EMAIL} or use the contact page.`,
    ],
    chips: ["Open WhatsApp", "Email instead"],
  },
  {
    id: "location",
    keywords: ["where are you", "location", "based", "office", "address", "kahan", "which city"],
    replies: [
      "We work with clients in India and overseas — recent projects include businesses in New Zealand and the United States alongside Indian clients. Most collaboration happens over email, calls and WhatsApp, so distance is not the obstacle it used to be.",
    ],
    chips: ["Talk to a human"],
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "shukriya", "dhanyavad", "much appreciated"],
    replies: [
      "Any time. If something else comes up, WhatsApp is the quickest route to the team.",
    ],
    chips: ["Open WhatsApp"],
  },
];

/** Replies used when nothing matches with enough confidence. */
export const BOT_FALLBACKS = [
  "I don't want to guess at that one. A person can answer it properly — WhatsApp is the quickest way to reach the team.",
  "That is outside what I can answer reliably. The team can help directly on WhatsApp or by email.",
];

/** One line per severity, used to keep the tone honest. */
export const BOT_DISCLAIMER =
  "These answers describe what Webamazee publishes. For anything specific to your project, confirm with the team.";

/** Score every intent against the visitor's message and return the best. */
export function matchIntent(input: string): BotIntent | null {
  const text = ` ${input.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ")} `;
  let best: { intent: BotIntent; score: number } | null = null;

  for (const intent of BOT_INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const needle = keyword.toLowerCase();
      /* Match on word boundaries so "search" does not fire inside another
         word, and so a stray substring cannot drag in an intent. */
      const pattern = new RegExp(`(^|[\\s-])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([\\s-]|$)`);
      if (pattern.test(text)) {
        // Longer phrases are more specific, so they weigh more.
        score += needle.split(" ").length * 3;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  /* Higher bar than before: a single generic word is no longer enough to
     answer, which is what let "airspeed velocity…" get a location reply. */
  return best && best.score >= 3 ? best.intent : null;
}
