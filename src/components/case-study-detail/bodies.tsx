"use client";

/**
 * Page bodies for the four detailed case studies.
 *
 * Every string is drawn from the project record in `src/lib/case-studies.ts`
 * or is factual prose about the work described there. Nothing is shared
 * between the four bodies: each composes the shared section primitives in its
 * own order and writes its own copy, so no paragraph repeats across projects.
 */
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import {
  BrowserFrame,
  CaptureCaption,
} from "@/components/case-study-detail/media";
import { mediaPlanFor } from "@/components/case-study-detail/media-plan";
import {
  CaseStudyCta,
  ChallengeGrid,
  container,
  DeliverableList,
  FaqSection,
  NumberedList,
  ProcessRail,
  ProjectAccount,
  GlancePanel,
  ProjectFacts,
  RelatedStudies,
  SectionHead,
  ServiceRefs,
  StackChips,
} from "@/components/case-study-detail/sections";

function Band({
  children,
  bg = "bg-white",
  id,
  py = "py-14 sm:py-16",
}: {
  children: React.ReactNode;
  bg?: string;
  id?: string;
  py?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${bg} ${py}`}>
      <div className={container}>{children}</div>
    </section>
  );
}

/** Small inline cross-reference to the concise portfolio version. */
function WorkCrossLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 transition-colors hover:border-brand-700"
    >
      {label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}

/**
 * Uses the project's own recorded `related` list so the cross-links that
 * existed before the redesign are preserved exactly, and pads with the
 * remaining studies only if that list is short.
 */
function RelatedFor({ cs }: { cs: CaseStudy }) {
  const bySlug = new Map(getAllCaseStudies().map((c) => [c.slug, c]));
  const ordered = cs.related.map((slug) => bySlug.get(slug)).filter(Boolean) as CaseStudy[];
  const extra = getAllCaseStudies().filter(
    (c) => c.slug !== cs.slug && !cs.related.includes(c.slug)
  );
  return (
    <RelatedStudies
      studies={[...ordered, ...extra].slice(0, 2).map((c) => ({
        slug: c.slug,
        name: c.name,
        summary: c.summary,
        image: c.image,
        service: c.service,
      }))}
    />
  );
}

/* ------------------------------------------------------------------ */
/* A. Kabir Oil Mill — e-commerce                                       */
/* ------------------------------------------------------------------ */

export function KabirBody({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Project overview" title="An oil business, given a storefront of its own" />
            <div className="mt-5 space-y-4">
              {cs.overviewClient.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">{cs.overviewBusiness}</p>
            <div className="mt-6 space-y-4">
              {cs.before.map((p) => (
                <p key={p} className="text-[14.5px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <WorkCrossLink
                href="/work/kabir-oil-mill"
                label="Portfolio version of this project"
              />
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
              >
                More of our work <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <SectionHead eyebrow="The brief" title="What the business asked for" />
            <div className="mt-4">
              <NumberedList items={cs.objectives} />
            </div>
          </div>
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="The engagement"
          title="Challenge, solution and outcome"
          intro="The project in the three parts the brief was agreed in."
        />
        <div className="mt-6"><ProjectAccount exec={cs.exec} /></div>
      </Band>

      <Band bg="bg-white" py="py-8">
        <ProjectFacts
          timeline={cs.timeline}
          team={cs.team}
          industryHref="/seo-for-ecommerce"
          industryLabel="SEO for E-commerce"
        />
      </Band>

      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead
              eyebrow="Challenge"
              title="Selling oil online is not the same as listing it"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{cs.exec.challenge}</p>
          </div>
          <div className="min-w-0">
            <ChallengeGrid items={cs.challenges} />
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead
          eyebrow="Strategy"
          title="Discovery first, then the build"
          intro="The engagement opened with the range, the audience and the role the store needed to play in sales — not with layout."
        />
        <div className="mt-8 space-y-10">
          <ProcessRail steps={cs.discovery} label="Discovery and strategy" />
          <div className="h-px w-full bg-line" aria-hidden />
          <ProcessRail steps={cs.design} label="Design approach" />
        </div>
      </Band>

      {/* The storefront capture that used to sit here duplicated the hero, so
          this band is now purely the build process. */}
      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="Build process"
          title="How the store was put together"
          intro="The storefront was built in sequence, with each stage reviewed before the next began."
        />
        <div className="mt-8">
          <ProcessRail steps={cs.development} />
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead
          eyebrow="Features delivered"
          title="What the storefront can do"
          intro="Each item below is part of the delivered site, described in terms of what a customer or the business can actually do with it."
        />
        <div className="mt-8 grid gap-x-9 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {cs.features.map((f, i) => (
            <div key={f.title} className="min-w-0 border-t border-line pt-4">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[11px] font-bold tabular-nums text-brand-600/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[14.5px] font-bold leading-snug text-ink">{f.title}</h3>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Performance and SEO" title="Built to be found" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.scope}</p>
          </div>
          <div className="min-w-0">
            <ChallengeGrid items={cs.seo} />
          </div>
        </div>
      </Band>

      <Band bg="bg-[#0b1528]">
        <SectionHead
          eyebrow="Business outcomes"
          title="What the project delivered"
          tone="dark"
          intro="These are the outcomes recorded for the project. No traffic, revenue or conversion figures are reported, because none are verified."
        />
        <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {cs.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-2.5 border-b border-white/10 pb-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
              <span className="text-[14px] leading-relaxed text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Technology stack" title="Built with" />
            <div className="mt-4"><StackChips stack={cs.techStack} /></div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Related services" title="The work behind this project" />
            <div className="mt-4">
              <ServiceRefs
                services={cs.services}
                intro="A storefront only earns its place if people can find it, so search foundations ran alongside the build."
              />
            </div>
            <div className="mt-4">
              <Link
                href="/services/seo-services"
                className="inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
              >
                SEO services for online stores <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead eyebrow="Related case studies" title="More projects" />
        <div className="mt-7"><RelatedFor cs={cs} /></div>
      </Band>

      <Band bg="bg-surface/50">
        <FaqSection
          faqs={cs.faqs}
          note="The questions we are asked most about this project and how the work was delivered."
          contact={{ label: "Ask us about a similar project", href: "/contact" }}
        />
      </Band>

      <CaseStudyCta
        title="Building a store that has to sell, not just look good?"
        body="Tell us about the product range and how your customers buy. We will map the storefront around that."
        secondary={{ label: "View all case studies", href: "/case-studies" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* B. Wellington Tours — travel editorial                              */
/* ------------------------------------------------------------------ */

export function WellingtonBody({ cs }: { cs: CaseStudy }) {
  const media = mediaPlanFor(cs.slug)!;
  return (
    <>
      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Project overview" title="A travel operator's first real digital home" />
            <div className="mt-5 space-y-4">
              {cs.overviewClient.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">{cs.overviewBusiness}</p>
            <div className="mt-6 space-y-4">
              {cs.before.map((p) => (
                <p key={p} className="text-[14.5px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <WorkCrossLink
                href="/work/wellington-tours"
                label="Portfolio version of this project"
              />
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
              >
                More of our work <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Business objectives" title="What the site had to achieve" />
            <div className="mt-4"><NumberedList items={cs.objectives} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="The engagement"
          title="Challenge, solution and outcome"
          intro="The project in the three parts the brief was agreed in."
        />
        <div className="mt-6"><ProjectAccount exec={cs.exec} /></div>
      </Band>

      <Band bg="bg-surface/50" py="py-8">
        <ProjectFacts
          timeline={cs.timeline}
          team={cs.team}
          industryHref="/seo-for-tourism"
          industryLabel="SEO for Tourism"
        />
      </Band>

      {/* Destination-led: the wide capture carries this band. */}
      <Band bg="bg-surface/50">
        <div className="grid items-center gap-9 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div className="min-w-0">
            <BrowserFrame
              src={media.gallery[1].src}
              alt={media.gallery[1].alt}
              ratio="aspect-[16/10]"
            />
            <CaptureCaption
              label="Featured tour packages on the live site"
              note="destinations, durations and pricing presented as scannable packages"
            />
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="The challenge" title="Many trips, one clear front door" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.exec.challenge}</p>
          </div>
        </div>
        <div className="mt-9"><ChallengeGrid items={cs.challenges} /></div>
      </Band>

      <Band bg="bg-white">
        <SectionHead
          eyebrow="Discovery and strategy"
          title="Planning around the traveller's questions"
          intro="Travellers arrive with practical questions — where a tour goes, how long it takes, what it costs, how to book. The structure was planned around those questions."
        />
        <div className="mt-8 space-y-10">
          <ProcessRail steps={cs.discovery} label="Research and planning" />
          <div className="h-px w-full bg-line" aria-hidden />
          <ProcessRail steps={cs.design} label="Design direction" />
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="Tour and transport presentation"
          title="The website as a travel brochure"
          intro={cs.development[0]?.desc}
        />
        <div className="mt-7">
          <BrowserFrame src={media.hero.src} alt={media.hero.alt} url={cs.liveUrl} ratio="aspect-[16/9]" />
          <CaptureCaption
            label="The live homepage at desktop width"
            note="the destination hero and package sections"
          />
        </div>
        <div className="mt-12 rounded-3xl border border-line bg-white px-5 py-7 sm:px-8 sm:py-9">
          <SectionHead eyebrow="Build process" title="How the site was put together" />
          <div className="mt-7">
            <ProcessRail steps={cs.development} />
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Enquiry journey" title="From browsing to asking" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.exec.solution}</p>
            <div className="mt-5">
              <DeliverableList items={["Direct enquiry paths from relevant tour content", "Visible booking and contact actions", "A mobile-friendly route for travellers researching on phones"]} />
            </div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Features delivered" title="What the site includes" />
            <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {cs.features.map((f) => (
                <div key={f.title} className="min-w-0">
                  <h3 className="font-display text-[13.5px] font-bold text-ink">{f.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Performance and SEO" title="Set up to be discovered" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.scope}</p>
          </div>
          <div className="min-w-0"><ChallengeGrid items={cs.seo} /></div>
        </div>
      </Band>

      <Band bg="bg-[#0b1528]">
        <SectionHead
          eyebrow="Business outcomes"
          title="What the project delivered"
          tone="dark"
          intro="The outcomes recorded for this project. No booking volumes or enquiry percentages are claimed."
        />
        <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {cs.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-2.5 border-b border-white/10 pb-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
              <span className="text-[14px] leading-relaxed text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Technology stack" title="Built with" />
            <div className="mt-4"><StackChips stack={cs.techStack} /></div>
            <div className="mt-6">
              <Link
                href="/web-designing-company-new-zealand"
                className="inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
              >
                Web design for New Zealand businesses <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Related services" title="The work behind this project" />
            <div className="mt-4"><ServiceRefs services={cs.services} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead eyebrow="Related case studies" title="More projects" />
        <div className="mt-7"><RelatedFor cs={cs} /></div>
      </Band>

      <Band bg="bg-surface/50">
        <FaqSection
          faqs={cs.faqs}
          note="The questions we are asked most about this project and how the work was delivered."
          contact={{ label: "Ask us about a similar project", href: "/contact" }}
        />
      </Band>

      <CaseStudyCta
        title="Running tours and need the website to match?"
        body="We build travel sites around real trip information, clear pricing and an enquiry path travellers can actually follow."
        secondary={{ label: "View all case studies", href: "/case-studies" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* D. Shine Gold Tours India — redesign                                */
/* ------------------------------------------------------------------ */

export function ShineGoldBody({ cs }: { cs: CaseStudy }) {
  const media = mediaPlanFor(cs.slug)!;
  return (
    <>
      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Project overview" title="A working website, rebuilt around its visitors" />
            <div className="mt-5 space-y-4">
              {cs.overviewClient.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <div className="mt-5">
              <GlancePanel text={cs.overviewBusiness} label="Business at a glance" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <WorkCrossLink
                href="/work/shine-gold-tours-india"
                label="Portfolio version of this project"
              />
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
              >
                More of our work <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <SectionHead eyebrow="Redesign objectives" title="What the redesign had to fix" />
            <div className="mt-4"><NumberedList items={cs.objectives} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="The engagement"
          title="Challenge, solution and outcome"
          intro="The project in the three parts the brief was agreed in."
        />
        <div className="mt-6"><ProjectAccount exec={cs.exec} /></div>
      </Band>

      <Band bg="bg-surface/50" py="py-8">
        <ProjectFacts
          timeline={cs.timeline}
          team={cs.team}
          industryHref="/seo-for-tourism"
          industryLabel="SEO for Tourism"
        />
      </Band>

      {/* Previous experience — stated in prose, with no fabricated screenshot. */}
      <Band bg="bg-surface/50">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead
              eyebrow="Previous website"
              title="What the old site was doing to the business"
            />
            <div className="mt-4 space-y-4">
              {cs.before.map((p) => (
                <p key={p} className="text-[14.5px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-line bg-white p-4">
              <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                No screenshot of the previous website is published with this case study. The problems
                above are described from the project record rather than illustrated with a
                reconstruction.
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="The challenge" title="Why a redesign, and why then" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.exec.challenge}</p>
            <div className="mt-5"><ChallengeGrid items={cs.challenges} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead
          eyebrow="Discovery and strategy"
          title="An audit before any design"
          intro="The redesign started with an honest account of what the existing site was doing — hierarchy, navigation, performance and where visitors lost context."
        />
        <div className="mt-8 space-y-10">
          <ProcessRail steps={cs.discovery} label="Audit and planning" />
          <div className="h-px w-full bg-line" aria-hidden />
          <ProcessRail steps={cs.design} label="UI and UX direction" />
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="The redesign"
          title="The new interface"
          intro="The capture below is the delivered site. It is presented on its own terms, not as half of a staged comparison."
        />
        <div className="mt-7">
          <BrowserFrame src={media.hero.src} alt={media.hero.alt} url={cs.liveUrl} ratio="aspect-[16/9]" />
          <CaptureCaption
            label="The redesigned homepage at desktop width"
            note="the new visual hierarchy and enquiry actions"
          />
        </div>
        <div className="mt-12 rounded-3xl border border-line bg-[#f7f9fc] px-5 py-7 sm:px-8 sm:py-9">
          <SectionHead eyebrow="Delivery" title="How the redesign was implemented" />
          <div className="mt-7"><ProcessRail steps={cs.development} /></div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead eyebrow="Features delivered" title="What changed for visitors" />
        <div className="mt-8 grid gap-x-9 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {cs.features.map((f) => (
            <div key={f.title} className="min-w-0 border-t border-line pt-4">
              <h3 className="font-display text-[14px] font-bold leading-snug text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Performance and SEO" title="Faster, and easier to index" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.scope}</p>
          </div>
          <div className="min-w-0"><ChallengeGrid items={cs.seo} /></div>
        </div>
      </Band>

      <Band bg="bg-[#0b1528]">
        <SectionHead
          eyebrow="Business outcomes"
          title="What the redesign delivered"
          tone="dark"
          intro="The outcomes recorded for this project. No traffic or lead-generation figures are reported."
        />
        <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {cs.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-2.5 border-b border-white/10 pb-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
              <span className="text-[14px] leading-relaxed text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Technology stack" title="Built with" />
            <div className="mt-4"><StackChips stack={cs.techStack} /></div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Related services" title="The work behind this project" />
            <div className="mt-4"><ServiceRefs services={cs.services} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead eyebrow="Related case studies" title="More projects" />
        <div className="mt-7"><RelatedFor cs={cs} /></div>
      </Band>

      <Band bg="bg-surface/50">
        <FaqSection
          faqs={cs.faqs}
          note="The questions we are asked most about this project and how the work was delivered."
          contact={{ label: "Ask us about a similar project", href: "/contact" }}
        />
      </Band>

      <CaseStudyCta
        title="Does your website still look like 2015?"
        body="Send us the URL. We will tell you what is holding it back before anyone starts redesigning."
        secondary={{ label: "View all case studies", href: "/case-studies" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* C. American-Lao Business Association — institution                  */
/* ------------------------------------------------------------------ */

export function AssociationBody({ cs }: { cs: CaseStudy }) {
  const media = mediaPlanFor(cs.slug)!;
  return (
    <>
      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Organisation background" title="A public front door for a bilateral business body" />
            <div className="mt-5 space-y-4">
              {cs.overviewClient.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">{cs.overviewBusiness}</p>
            <div className="mt-6 space-y-4">
              {cs.before.map((p) => (
                <p key={p} className="text-[14.5px] leading-relaxed text-slate-600">{p}</p>
              ))}
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <SectionHead eyebrow="Project brief" title="Objectives" />
            <div className="mt-4"><NumberedList items={cs.objectives} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="The engagement"
          title="Challenge, solution and outcome"
          intro="The project in the three parts the brief was agreed in."
        />
        <div className="mt-6"><ProjectAccount exec={cs.exec} /></div>
      </Band>

      <Band bg="bg-white" py="py-8">
        <ProjectFacts
          timeline={cs.timeline}
          team={cs.team}
          industryHref="/services/seo-services"
          industryLabel="SEO Services"
        />
      </Band>

      <Band bg="bg-surface/50">
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Challenges" title="More activity than the site could carry" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.exec.challenge}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-500">{cs.exec.solution}</p>
          </div>
          <div className="min-w-0"><ChallengeGrid items={cs.challenges} /></div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead
          eyebrow="Information architecture"
          title="Ordering the association's content"
          intro="A membership body carries a lot at once: mission, pillars, events, news, sponsors, members and membership paths. The structure had to make all of it findable."
        />
        <div className="mt-7">
          <ProcessRail steps={cs.discovery} label="Content review and structure" />
        </div>
        <div className="mt-9 grid gap-9 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <div className="rounded-2xl border border-line bg-surface/60 p-5">
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Sections the website presents
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  "Mission and four pillars",
                  "Upcoming events",
                  "News & insights",
                  "Sponsors and members",
                  "Membership paths",
                  "Jobs and internships",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-slate-700">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-400">
                Listed from the navigation and section content visible in the delivered site.
              </p>
            </div>
          </div>
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <SectionHead
          eyebrow="Website design"
          title="The redesigned homepage"
          intro="The live website presents the association's mission, pillars, events, news and community in one clear, responsive experience."
        />
        <div className="mt-7">
          <BrowserFrame src={media.hero.src} alt={media.hero.alt} url={cs.liveUrl} ratio="aspect-[16/9]" />
          <CaptureCaption
            label="The live homepage at desktop width"
            note="mission, tagline and the Connect, Promote, Support and Grow pillars"
          />
        </div>
        <div className="mt-12 rounded-3xl border border-line bg-white px-5 py-7 sm:px-8 sm:py-9">
          <SectionHead eyebrow="Process" title="How the redesign came together" />
          <div className="mt-7">
            <ProcessRail steps={cs.design} />
            <div className="my-8 h-px w-full bg-line" aria-hidden />
            <ProcessRail steps={cs.development} />
          </div>
        </div>
        <div className="mt-9 space-y-10">
          <ProcessRail steps={cs.design} label="Design approach" />
          <div className="h-px w-full bg-line" aria-hidden />
          <ProcessRail steps={cs.development} label="Implementation" />
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead eyebrow="Features delivered" title="What the site now presents" />
        <div className="mt-8 grid gap-x-9 gap-y-6 sm:grid-cols-2">
          {cs.features.map((f) => (
            <div key={f.title} className="min-w-0 border-t border-line pt-4">
              <h3 className="font-display text-[14px] font-bold leading-snug text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-white">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Performance and SEO" title="Structured to be understood" />
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">{cs.scope}</p>
          </div>
          <div className="min-w-0"><ChallengeGrid items={cs.seo} /></div>
        </div>
      </Band>

      <Band bg="bg-[#0b1528]">
        <SectionHead
          eyebrow="Project outcomes"
          title="What the redesign delivered"
          tone="dark"
          intro="Recorded outcomes for this project. No member counts, traffic figures or organisational achievements are claimed."
        />
        <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {cs.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-2.5 border-b border-white/10 pb-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
              <span className="text-[14px] leading-relaxed text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Band>

      <Band bg="bg-surface/50">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHead eyebrow="Technology stack" title="Built with" />
            <div className="mt-4"><StackChips stack={cs.techStack} /></div>
          </div>
          <div className="min-w-0">
            <SectionHead eyebrow="Related services" title="The work behind this project" />
            <div className="mt-4"><ServiceRefs services={cs.services} /></div>
          </div>
        </div>
      </Band>

      <Band bg="bg-white">
        <SectionHead eyebrow="Related case studies" title="More projects" />
        <div className="mt-7"><RelatedFor cs={cs} /></div>
      </Band>

      <Band bg="bg-surface/50">
        <FaqSection
          faqs={cs.faqs}
          note="The questions we are asked most about this project and how the work was delivered."
          contact={{ label: "Ask us about a similar project", href: "/contact" }}
        />
      </Band>

      <CaseStudyCta
        title="An organisation whose website has fallen behind its work?"
        body="We redesign association and membership sites around the content their members and partners need to find."
        secondary={{ label: "View all case studies", href: "/case-studies" }}
      />
    </>
  );
}
