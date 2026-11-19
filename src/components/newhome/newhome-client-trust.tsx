import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { REAL_CLIENT_LOGOS } from "./newhome-data";

export function NewHomeClientTrust() {
  return (
    <section
      aria-label="Client and portfolio brands"
      className="border-b border-slate-200/90 bg-[#f8fafc] py-10"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left editorial descriptor */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Selected Client Portfolio
            </p>
            <p className="mt-1.5 text-[14.5px] font-semibold leading-snug text-[#0b1528]">
              Websites &amp; digital experiences built for real organisations
            </p>
            <a
              href="#case-studies"
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#0f6dff]"
            >
              Inspect case studies
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Right 4-brand real client logo showcase */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:col-span-9">
            {REAL_CLIENT_LOGOS.map((client) => (
              <Link
                key={client.name}
                href={client.caseStudyHref}
                className="group flex flex-col items-center justify-between rounded-xl border border-slate-200/80 bg-white px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/40 hover:shadow-[0_10px_25px_-10px_rgba(15,109,255,0.16)]"
              >
                <div className="flex h-14 w-full items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={client.width}
                    height={client.height}
                    className="max-h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 w-full border-t border-slate-100 pt-2.5 text-center">
                  <p className="text-[12.5px] font-bold leading-snug text-[#0b1528] group-hover:text-[#0f6dff]">
                    {client.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium leading-snug text-slate-500">
                    {client.country} · {client.sector}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
