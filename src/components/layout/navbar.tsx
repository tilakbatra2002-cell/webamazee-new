"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { productLinks, serviceLinks } from "@/lib/nav";
import { useSeoAudit } from "../seo-audit/seo-audit-provider";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

const serviceGroups = [
  { title: "Web", slugs: ["website-development", "website-redesign", "landing-page-development", "ecommerce-development"] },
  { title: "Search", slugs: ["seo-services", "local-seo", "technical-seo", "google-ranking-growth", "competitor-analysis", "link-building"] },
  { title: "AI", slugs: ["ai-seo", "ai-content-optimization"] },
  { title: "Social", slugs: ["social-media-management", "social-media-marketing", "instagram-marketing", "facebook-marketing", "linkedin-marketing", "social-media-advertising"] },
];
const groupedServices = serviceGroups.map((group) => ({
  ...group,
  items: group.slugs.map((slug) => serviceLinks.find((service) => service.href === `/services/${slug}`)).filter((service): service is (typeof serviceLinks)[number] => Boolean(service)),
}));
const remainingServices = serviceLinks.filter((service) => !serviceGroups.some((group) => group.slugs.some((slug) => service.href === `/services/${slug}`)));

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/webamazee-tech-15113a3bb/" },
  { label: "Instagram", href: "https://www.instagram.com/webamazee/" },
  { label: "Facebook", href: "https://www.facebook.com/people/Webamazee/61589420618603/" },
  { label: "Calendly", href: "https://calendly.com/webamazee0411/30min" },
];

const navLink = "inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-2 text-[13px] font-semibold transition-colors hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] 2xl:px-2.5 2xl:text-[14px]";
const menuLink = "block rounded-lg px-3 py-2 text-[13px] font-medium leading-snug text-slate-600 transition-colors hover:bg-[#f4f8ff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff]";
const mobileLink = "flex min-h-12 items-center justify-between rounded-lg px-3 text-[16px] font-semibold transition-colors hover:bg-[#f4f8ff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff]";

type DesktopMenu = "services" | "more" | null;

export function Navbar() {
  const pathname = usePathname();
  const { openAudit } = useSeoAudit();
  const reduceMotion = useReducedMotion();
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileMore, setMobileMore] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDesktopMenu(null);
    setMobileOpen(false);
    setMobileServices(false);
    setMobileMore(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopMenu) return;
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!servicesRef.current?.contains(target) && !moreRef.current?.contains(target)) setDesktopMenu(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        const trigger = desktopMenu === "services" ? servicesRef.current : moreRef.current;
        setDesktopMenu(null);
        trigger?.querySelector("button")?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width };
    // Position-lock the background without touching overflow, which is also managed by the enquiry popup.
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, left: "0", right: "0", width: "100%" });
    const timer = window.setTimeout(() => mobileCloseRef.current?.focus(), 0);
    function onKeyDown(event: KeyboardEvent) {
      // The enquiry popup and audit modal sit above the menu and manage their own focus.
      if (document.querySelector('[role="dialog"][aria-modal="true"]:not(#new-mobile-navigation)')) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
      } else if (event.key === "Tab" && mobileRef.current) {
        const focusable = Array.from(mobileRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((el) => !el.closest("[inert]") && el.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !mobileRef.current.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !mobileRef.current.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [mobileOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (media.matches) setMobileOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    const aliases: Record<string, string[]> = {
      "/about": ["/about-us", "/newaboutus"],
      "/portfolio": ["/work", "/newportfolio"],
      "/case-studies": ["/newcasestudies"],
      "/blog": ["/newblogs"],
      "/faq": ["/newfaq"],
      "/contact": ["/newcontact"],
    };
    return [href, ...(aliases[href] ?? [])].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  }

  const serviceActive = isActive("/services");
  const moreActive = isActive("/products") || isActive("/free-seo-audit");
  const closeMobile = () => { setMobileOpen(false); setMobileServices(false); setMobileMore(false); };

  function desktopLink(item: (typeof links)[number]) {
    const active = isActive(item.href);
    return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`${navLink} ${active ? "text-[#0f6dff]" : "text-slate-700"}`}>{item.label}</Link>;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[inset_0_-1px_0_0_rgba(226,232,240,0.8),0_4px_18px_-14px_rgba(11,21,40,0.18)]">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Webamazee home" onClick={() => { setDesktopMenu(null); closeMobile(); }} className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]">
            <Image src="/images/logo-header.webp" alt="Webamazee" width={1339} height={336} priority className="h-auto w-[155px] sm:w-[175px]" />
          </Link>
          <nav aria-label="Primary navigation" className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
            {desktopLink(links[0])}
            {desktopLink(links[1])}
            <div ref={servicesRef} className="relative" onPointerEnter={(e) => { if (e.pointerType === "mouse") setDesktopMenu("services"); }} onPointerLeave={(e) => { if (e.pointerType === "mouse") setDesktopMenu((current) => current === "services" ? null : current); }} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDesktopMenu((current) => current === "services" ? null : current); }}>
              <button type="button" aria-expanded={desktopMenu === "services"} aria-controls="desktop-services" onClick={() => setDesktopMenu((current) => current === "services" ? null : "services")} className={`${navLink} gap-1 ${serviceActive || desktopMenu === "services" ? "text-[#0f6dff]" : "text-slate-700"}`}>Services <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${desktopMenu === "services" ? "rotate-180" : ""}`} /></button>
              <div id="desktop-services" aria-hidden={desktopMenu !== "services"} inert={desktopMenu !== "services"} className={`absolute left-1/2 top-full w-[800px] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2 transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${desktopMenu === "services" ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`}>
                <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_55px_-20px_rgba(11,21,40,0.24)]">
                  <div className="grid grid-cols-4 gap-4">
                    {groupedServices.map((group) => <div key={group.title}><p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">{group.title}</p>{group.items.map((service) => <Link key={service.href} href={service.href} onClick={() => setDesktopMenu(null)} className={menuLink}>{service.label}</Link>)}</div>)}
                  </div>
                  {remainingServices.length > 0 && <div className="mt-3 border-t border-slate-100 pt-3"><p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">More Services</p><div className="grid grid-cols-4 gap-2">{remainingServices.map((service) => <Link key={service.href} href={service.href} onClick={() => setDesktopMenu(null)} className={menuLink}>{service.label}</Link>)}</div></div>}
                  <div className="mt-3 flex flex-wrap gap-5 border-t border-slate-100 px-3 pt-4 text-[13px] font-bold text-[#0f6dff]"><Link href="/services" onClick={() => setDesktopMenu(null)} className="hover:underline">View all services</Link><Link href="/free-seo-audit" onClick={() => setDesktopMenu(null)} className="hover:underline">Free SEO Audit</Link></div>
                </div>
              </div>
            </div>
            {links.slice(2).map(desktopLink)}
            <div ref={moreRef} className="relative" onPointerEnter={(e) => { if (e.pointerType === "mouse") setDesktopMenu("more"); }} onPointerLeave={(e) => { if (e.pointerType === "mouse") setDesktopMenu((current) => current === "more" ? null : current); }} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDesktopMenu((current) => current === "more" ? null : current); }}>
              <button type="button" aria-expanded={desktopMenu === "more"} aria-controls="desktop-more" onClick={() => setDesktopMenu((current) => current === "more" ? null : "more")} className={`${navLink} gap-1 ${moreActive || desktopMenu === "more" ? "text-[#0f6dff]" : "text-slate-700"}`}>More <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${desktopMenu === "more" ? "rotate-180" : ""}`} /></button>
              <div id="desktop-more" aria-hidden={desktopMenu !== "more"} inert={desktopMenu !== "more"} className={`absolute right-0 top-full w-64 pt-2 transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${desktopMenu === "more" ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`}>
                <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_55px_-20px_rgba(11,21,40,0.24)]">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">Products</p>
                  <Link href="/products" onClick={() => setDesktopMenu(null)} className={menuLink}>All Products</Link>
                  {productLinks.map((product) => <Link key={product.href} href={product.href} onClick={() => setDesktopMenu(null)} className={menuLink}>{product.label}</Link>)}
                  <div className="my-2 border-t border-slate-100" />
                  <button type="button" onClick={() => { setDesktopMenu(null); openAudit(); }} className={`${menuLink} w-full text-left`}>Free Website Audit</button>
                  <a href="tel:+918360532487" onClick={() => setDesktopMenu(null)} className={menuLink}>+91 83605 32487</a>
                  <a href="mailto:info@webamazee.com" onClick={() => setDesktopMenu(null)} className={menuLink}>info@webamazee.com</a>
                  <div className="my-2 border-t border-slate-100" />
                  {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" onClick={() => setDesktopMenu(null)} className={menuLink}>{social.label}</a>)}
                </div>
              </div>
            </div>
          </nav>
          <Link href="/contact" className="hidden h-11 shrink-0 items-center justify-center rounded-xl bg-[#0f6dff] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] xl:inline-flex">Let&apos;s Talk</Link>
          <button ref={mobileTriggerRef} type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="new-mobile-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0b1528] transition-colors hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] xl:hidden"><Menu className="h-5 w-5" /></button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div id="new-mobile-navigation" ref={mobileRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} className="fixed inset-0 z-[80] flex flex-col bg-white xl:hidden">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4 sm:h-20 sm:px-6">
              <Link href="/" aria-label="Webamazee home" onClick={closeMobile}><Image src="/images/logo-header.webp" alt="Webamazee" width={1339} height={336} className="h-auto w-[155px] sm:w-[175px]" /></Link>
              <button ref={mobileCloseRef} type="button" onClick={() => { closeMobile(); mobileTriggerRef.current?.focus(); }} aria-label="Close navigation menu" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-[#0b1528] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Mobile navigation links" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
              <div className="mx-auto max-w-xl space-y-1">
                {links.slice(0, 2).map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} aria-current={isActive(item.href) ? "page" : undefined} className={`${mobileLink} ${isActive(item.href) ? "text-[#0f6dff]" : "text-[#0b1528]"}`}>{item.label}</Link>)}
                <div>
                  <button type="button" aria-expanded={mobileServices} aria-controls="mobile-services" onClick={() => setMobileServices((value) => !value)} className={`${mobileLink} w-full text-left ${serviceActive ? "text-[#0f6dff]" : "text-[#0b1528]"}`}>Services <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} /></button>
                  <motion.div id="mobile-services" initial={false} animate={{ height: mobileServices ? "auto" : 0, opacity: mobileServices ? 1 : 0 }} aria-hidden={!mobileServices} inert={!mobileServices} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="overflow-hidden"><div className="ml-3 border-l border-slate-200 pb-2 pl-3"><Link href="/services" onClick={closeMobile} className={menuLink}>View all services</Link>{serviceLinks.map((service) => <Link key={service.href} href={service.href} onClick={closeMobile} className={menuLink}>{service.label}</Link>)}<Link href="/free-seo-audit" onClick={closeMobile} className={menuLink}>Free SEO Audit</Link></div></motion.div>
                </div>
                {links.slice(2).map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} aria-current={isActive(item.href) ? "page" : undefined} className={`${mobileLink} ${isActive(item.href) ? "text-[#0f6dff]" : "text-[#0b1528]"}`}>{item.label}</Link>)}
                <div>
                  <button type="button" aria-expanded={mobileMore} aria-controls="mobile-more" onClick={() => setMobileMore((value) => !value)} className={`${mobileLink} w-full text-left ${moreActive ? "text-[#0f6dff]" : "text-[#0b1528]"}`}>More <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${mobileMore ? "rotate-180" : ""}`} /></button>
                  <motion.div id="mobile-more" initial={false} animate={{ height: mobileMore ? "auto" : 0, opacity: mobileMore ? 1 : 0 }} aria-hidden={!mobileMore} inert={!mobileMore} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="overflow-hidden"><div className="ml-3 border-l border-slate-200 pb-2 pl-3"><Link href="/products" onClick={closeMobile} className={menuLink}>All Products</Link>{productLinks.map((product) => <Link key={product.href} href={product.href} onClick={closeMobile} className={menuLink}>{product.label}</Link>)}<button type="button" onClick={() => { closeMobile(); openAudit(); }} className={`${menuLink} w-full text-left`}>Free Website Audit</button><a href="tel:+918360532487" onClick={closeMobile} className={menuLink}>+91 83605 32487</a><a href="mailto:info@webamazee.com" onClick={closeMobile} className={menuLink}>info@webamazee.com</a>{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" onClick={closeMobile} className={menuLink}>{social.label}</a>)}</div></motion.div>
                </div>
                <div className="pt-4"><Link href="/contact" onClick={closeMobile} className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-[#0f6dff] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]">Let&apos;s Talk</Link></div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
