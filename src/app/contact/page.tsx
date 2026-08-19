import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { Mail, Phone, MapPin, Clock, MessageCircleQuestion } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = staticMetadata("contact");

const details = [
  { icon: Mail, title: "Email", value: "info@webamazee.com", href: "mailto:info@webamazee.com" },
  { icon: Phone, title: "Phone", value: "+91 83605 32487", href: "tel:+918360532487" },
  { icon: MapPin, title: "Locations", value: "Serving all over the world" },
  { icon: Clock, title: "Response time", value: "Within 24 hours, 7 days a week" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about"
        highlight="your growth"
        subtitle="Tell us about your business and we'll reply with a personalised roadmap — free, no strings attached."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* info */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="space-y-4">
                  {details.map((d) => {
                    const Icon = d.icon;
                    const inner = (
                      <div className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-500">{d.title}</p>
                          <p className="mt-0.5 font-semibold text-ink">{d.value}</p>
                        </div>
                      </div>
                    );
                    return d.href ? (
                      <a key={d.title} href={d.href}>
                        {inner}
                      </a>
                    ) : (
                      <div key={d.title}>{inner}</div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6 rounded-3xl bg-brand-gradient p-6 text-white shadow-glow-lg">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                    <MessageCircleQuestion className="h-3.5 w-3.5" /> Free 30-min Strategy Call
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    Not sure what you need?
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Book a free call and we'll recommend the best path for your business — even if it's not with us.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.05}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
