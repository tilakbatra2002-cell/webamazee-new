"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Phone, Mail, Linkedin, Instagram, Facebook, CalendarDays } from "lucide-react";
import { Logo } from "./logo";
import { mainNav, productLinks, serviceLinks } from "@/lib/nav";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { useSeoAudit } from "../seo-audit/seo-audit-provider";

const links = mainNav.filter((link) => link.label !== "Services" && link.label !== "Products").map((link) => ({
  ...link,
  label: link.label === "About" ? "About Us" : link.label === "Work" ? "Portfolio" : link.label,
}));

const serviceGroups = [
  { title: "Web Development", slugs: ["website-development", "website-redesign", "landing-page-development", "ecommerce-development"] },
  { title: "Search & SEO", slugs: ["seo-services", "local-seo", "technical-seo", "google-ranking-growth", "competitor-analysis", "link-building"] },
  { title: "AI & Content", slugs: ["ai-seo", "ai-content-optimization"] },
  { title: "Social Media", slugs: ["social-media-management", "social-media-marketing", "instagram-marketing", "facebook-marketing", "linkedin-marketing", "social-media-advertising"] },
];
const groupedServices = serviceGroups.map((group) => ({
  ...group,
  items: group.slugs.map((slug) => serviceLinks.find((service) => service.href === `/services/${slug}`)).filter((service): service is (typeof serviceLinks)[number] => Boolean(service)),
}));
const remainingServices = serviceLinks.filter((service) => !serviceGroups.some((group) => group.slugs.some((slug) => service.href === `/services/${slug}`)));
const menuGroups = remainingServices.length ? [...groupedServices, { title: "More Services", slugs: [], items: remainingServices }] : groupedServices;

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/webamazee-tech-15113a3bb/" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/webamazee/" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/people/Webamazee/61589420618603/" },
  { label: "Calendly", icon: CalendarDays, href: "https://calendly.com/webamazee0411/30min" },
];

const navLink = "inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-2 text-[13px] font-medium transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 min-[1600px]:px-2.5 min-[1600px]:text-sm";
const menuLink = "block rounded-xl px-3 py-2 text-[13px] font-medium leading-snug text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600";
const mobileLink = "flex min-h-12 items-center justify-between rounded-xl px-2 font-display text-[23px] font-bold tracking-tight transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600 sm:text-[27px]";

type DesktopMenu = "services" | "products" | null;

export function Navbar() {
  const pathname = usePathname();
  const { openAudit } = useSeoAudit();
  const reduceMotion = useReducedMotion();
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [serviceCategory, setServiceCategory] = useState(menuGroups[0].title);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const hoverOpenedRef = useRef<DesktopMenu>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDesktopMenu(null);
    setMobileOpen(false);
    setMobileServices(false);
    setMobileProducts(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopMenu) return;
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!servicesRef.current?.contains(target) && !productsRef.current?.contains(target)) setDesktopMenu(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        const trigger = desktopMenu === "services" ? servicesRef.current : productsRef.current;
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
      "/products": ["/newproducts"],
      "/services": ["/newservices"],
      "/portfolio": ["/work", "/newportfolio"],
      "/case-studies": ["/newcasestudies"],
      "/blog": ["/newblogs"],
      "/faq": ["/newfaq"],
      "/contact": ["/newcontact"],
    };
    return [href, ...(aliases[href] ?? [])].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  }

  const serviceActive = isActive("/services");
  const productsActive = isActive("/products");
  const closeMobile = () => { setMobileOpen(false); setMobileServices(false); setMobileProducts(false); };

  function desktopLink(item: (typeof links)[number]) {
    const active = isActive(item.href);
    return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`${navLink} ${active ? "text-[#0f6dff]" : "text-slate-700"}`}>{item.label}</Link>;
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 motion-reduce:transition-none ${scrolled ? "py-2.5" : "py-5"}`}>
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className={`relative flex items-center justify-between gap-2 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow,height] duration-300 motion-reduce:transition-none sm:px-5 ${scrolled ? "h-[60px] border-[#dce6f3] bg-white shadow-[0_12px_30px_-16px_rgba(15,40,80,0.3),0_2px_8px_rgba(15,40,80,0.06)]" : "h-16 border-transparent"}`}>
            <Link href="/" aria-label="Webamazee home" onClick={() => { setDesktopMenu(null); closeMobile(); }} className="inline-flex shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"><Logo className={`[&_img]:transition-[height] [&_img]:duration-300 motion-reduce:[&_img]:transition-none ${scrolled ? "[&_img]:h-[32px] sm:[&_img]:h-[36px] lg:[&_img]:h-[38px]" : "[&_img]:h-[34px] sm:[&_img]:h-[38px] lg:[&_img]:h-[40px]"}`} /></Link>
            <nav aria-label="Primary navigation" className="hidden min-w-0 items-center justify-center gap-x-1.5 xl:flex">
              {desktopLink(links[0])}
              {desktopLink(links[1])}
              <div ref={servicesRef} className="relative" onPointerEnter={(event) => { if (event.pointerType === "mouse") { hoverOpenedRef.current = "services"; setDesktopMenu("services"); } }} onPointerLeave={(event) => { if (event.pointerType === "mouse") { hoverOpenedRef.current = null; setDesktopMenu((current) => current === "services" ? null : current); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopMenu((current) => current === "services" ? null : current); }}>
                <div className={`flex items-center ${serviceActive || desktopMenu === "services" ? "text-brand-700" : "text-slate-600"}`}>
                  <Link href="/services" onClick={() => setDesktopMenu(null)} aria-current={pathname === "/services" ? "page" : undefined} className={`${navLink} pr-0 min-[1600px]:pr-0`}>Services</Link>
                  <button type="button" aria-label="Toggle services menu" aria-expanded={desktopMenu === "services"} aria-controls="desktop-services" onClick={(event) => { if (event.detail > 0 && hoverOpenedRef.current === "services" && desktopMenu === "services") { hoverOpenedRef.current = null; return; } hoverOpenedRef.current = null; setDesktopMenu((current) => current === "services" ? null : "services"); }} className="inline-flex min-h-10 items-center rounded-full px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"><ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${desktopMenu === "services" ? "rotate-180" : ""}`} /></button>
                </div>
                <div id="desktop-services" aria-hidden={desktopMenu !== "services"} inert={desktopMenu !== "services"} className={`absolute left-1/2 top-full w-[800px] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 motion-reduce:transition-none ${desktopMenu === "services" ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}>
                  <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lift-lg">
                    <div className="grid grid-cols-[210px_1fr]">
                      <div className="border-r border-slate-100 bg-[#f7f9fc] p-4">
                        <p className="px-3 pb-3 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Explore Services</p>
                        <div role="group" aria-label="Service categories" className="space-y-1">
                          {menuGroups.map((group) => (
                            <button key={group.title} type="button" aria-pressed={serviceCategory === group.title} onClick={() => setServiceCategory(group.title)} onPointerEnter={(event) => { if (event.pointerType === "mouse") setServiceCategory(group.title); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600 ${serviceCategory === group.title ? "bg-white text-brand-700 shadow-sm" : "text-slate-600 hover:bg-white hover:text-brand-700"}`}>
                              {group.title}<ArrowRight aria-hidden="true" className={`h-3.5 w-3.5 ${serviceCategory === group.title ? "text-brand-600" : "text-slate-300"}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="min-w-0 p-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700">Our Expertise</p><p className="mt-1 font-display text-lg font-bold text-ink">{serviceCategory}</p></div>
                          <Link href="/services" onClick={() => setDesktopMenu(null)} className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-brand-700 hover:underline">All services <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {(menuGroups.find((group) => group.title === serviceCategory) ?? menuGroups[0]).items.map((service) => {
                            const detail = services.find((item) => `/services/${item.slug}` === service.href);
                            return <Link key={service.href} href={service.href} onClick={() => setDesktopMenu(null)} className="group rounded-xl border border-slate-100 bg-white p-3 transition-colors hover:border-brand-600/25 hover:bg-brand-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"><span className="flex items-start justify-between gap-2 text-[13px] font-bold leading-snug text-ink group-hover:text-brand-700">{service.label}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-brand-700" /></span>{detail?.shortDesc && <span className="mt-1.5 line-clamp-2 block text-[12px] leading-[1.45] text-slate-500">{detail.shortDesc}</span>}</Link>;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-slate-100 px-5 py-3 text-[12px] font-semibold">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-brand-700"><Link href="/free-seo-audit" onClick={() => setDesktopMenu(null)} className="hover:underline">Free SEO Audit</Link><button type="button" onClick={() => { setDesktopMenu(null); openAudit(); }} className="hover:underline">Free Website Audit</button></div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-slate-500"><a href="tel:+918360532487" onClick={() => setDesktopMenu(null)} className="hover:text-brand-700">+91 83605 32487</a><a href="mailto:info@webamazee.com" onClick={() => setDesktopMenu(null)} className="hover:text-brand-700">info@webamazee.com</a></div>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={productsRef} className="relative" onPointerEnter={(event) => { if (event.pointerType === "mouse") { hoverOpenedRef.current = "products"; setDesktopMenu("products"); } }} onPointerLeave={(event) => { if (event.pointerType === "mouse") { hoverOpenedRef.current = null; setDesktopMenu((current) => current === "products" ? null : current); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopMenu((current) => current === "products" ? null : current); }}>
                <div className={`flex items-center ${productsActive || desktopMenu === "products" ? "text-brand-700" : "text-slate-600"}`}>
                  <Link href="/products" onClick={() => setDesktopMenu(null)} aria-current={pathname === "/products" ? "page" : undefined} className={`${navLink} pr-0 min-[1600px]:pr-0`}>Products</Link>
                  <button type="button" aria-label="Toggle products menu" aria-expanded={desktopMenu === "products"} aria-controls="desktop-products" onClick={(event) => { if (event.detail > 0 && hoverOpenedRef.current === "products" && desktopMenu === "products") { hoverOpenedRef.current = null; return; } hoverOpenedRef.current = null; setDesktopMenu((current) => current === "products" ? null : "products"); }} className="inline-flex min-h-10 items-center rounded-full px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"><ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${desktopMenu === "products" ? "rotate-180" : ""}`} /></button>
                </div>
                <div id="desktop-products" aria-hidden={desktopMenu !== "products"} inert={desktopMenu !== "products"} className={`absolute left-0 top-full w-[500px] max-w-[calc(100vw-2rem)] pt-3 transition-[opacity,transform] duration-200 motion-reduce:transition-none ${desktopMenu === "products" ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}>
                  <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lift-lg">
                    <div className="px-5 pb-4 pt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700">Our Products</p>
                      <p className="mt-1 font-display text-lg font-bold text-ink">Explore our products.</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {products.map((product) => <Link key={product.path} href={product.path} onClick={() => setDesktopMenu(null)} className="group rounded-xl border border-slate-100 bg-[#f7f9fc] p-4 transition-colors hover:border-brand-600/25 hover:bg-brand-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"><span className="text-[10px] font-bold uppercase tracking-[0.11em] text-brand-700">{product.industry}</span><span className="mt-2 flex items-center justify-between gap-2 font-display text-base font-bold text-ink group-hover:text-brand-700">{product.shortName}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-700" /></span><span className="mt-1.5 block text-[12px] leading-relaxed text-slate-500">{product.tagline}</span></Link>)}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 px-5 py-3"><Link href="/products" onClick={() => setDesktopMenu(null)} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-700 hover:underline">View all products <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link></div>
                  </div>
                </div>
              </div>
              {links.slice(2).map(desktopLink)}
            </nav>
            <div className="hidden shrink-0 items-center gap-3 xl:flex">
              <div className="hidden items-center gap-2 min-[1440px]:flex">
                <a href="tel:+918360532487" aria-label="Call Webamazee at +91 83605 32487" className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700"><Phone className="h-4 w-4" /></a>
                <span className="flex flex-col leading-tight"><a href="tel:+918360532487" className="whitespace-nowrap text-[13px] font-semibold text-ink hover:text-brand-700">+91 83605 32487</a><a href="mailto:info@webamazee.com" className="whitespace-nowrap text-[11px] text-slate-500 hover:text-brand-700">info@webamazee.com</a></span>
              </div>
              <Link href="/contact" className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-brand-600 px-5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Let&apos;s Talk</Link>
            </div>
            <button ref={mobileTriggerRef} type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="new-mobile-navigation" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 xl:hidden"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div id="new-mobile-navigation" ref={mobileRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="fixed inset-0 z-[80] flex flex-col bg-white xl:hidden">
            <div className="flex h-[84px] shrink-0 items-center justify-between px-8 sm:h-24">
              <Link href="/" aria-label="Webamazee home" onClick={closeMobile}><Logo /></Link>
              <button ref={mobileCloseRef} type="button" onClick={() => { closeMobile(); mobileTriggerRef.current?.focus(); }} aria-label="Close navigation menu" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Mobile navigation links" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-10 sm:px-8">
              <div className="mx-auto max-w-xl space-y-1">
                {links.slice(0, 2).map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} aria-current={isActive(item.href) ? "page" : undefined} className={`${mobileLink} ${isActive(item.href) ? "text-brand-700" : "text-ink"}`}>{item.label}</Link>)}
                <div>
                  <div className="flex items-center justify-between">
                    <Link href="/services" onClick={closeMobile} aria-current={pathname === "/services" ? "page" : undefined} className={`${mobileLink} flex-1 ${serviceActive ? "text-brand-700" : "text-ink"}`}>Services</Link>
                    <button type="button" aria-label="Toggle services menu" aria-expanded={mobileServices} aria-controls="mobile-services" onClick={() => setMobileServices((value) => !value)} className="grid h-12 w-12 place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"><ChevronDown aria-hidden="true" className={`h-5 w-5 text-brand-600 transition-transform ${mobileServices ? "rotate-180" : ""}`} /></button>
                  </div>
                  <motion.div id="mobile-services" initial={false} animate={{ height: mobileServices ? "auto" : 0, opacity: mobileServices ? 1 : 0 }} aria-hidden={!mobileServices} inert={!mobileServices} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="overflow-hidden"><div className="ml-3 border-l border-line pb-2 pl-3"><Link href="/services" onClick={closeMobile} className={menuLink}>View all services</Link>{serviceLinks.map((service) => <Link key={service.href} href={service.href} onClick={closeMobile} className={menuLink}>{service.label}</Link>)}<Link href="/free-seo-audit" onClick={closeMobile} className={menuLink}>Free SEO Audit</Link></div></motion.div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Link href="/products" onClick={closeMobile} aria-current={pathname === "/products" ? "page" : undefined} className={`${mobileLink} flex-1 ${productsActive ? "text-brand-700" : "text-ink"}`}>Products</Link>
                    <button type="button" aria-label="Toggle products menu" aria-expanded={mobileProducts} aria-controls="mobile-products" onClick={() => setMobileProducts((value) => !value)} className="grid h-12 w-12 place-items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"><ChevronDown aria-hidden="true" className={`h-5 w-5 text-brand-600 transition-transform ${mobileProducts ? "rotate-180" : ""}`} /></button>
                  </div>
                  <motion.div id="mobile-products" initial={false} animate={{ height: mobileProducts ? "auto" : 0, opacity: mobileProducts ? 1 : 0 }} aria-hidden={!mobileProducts} inert={!mobileProducts} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="overflow-hidden"><div className="ml-3 border-l border-line pb-2 pl-3"><Link href="/products" onClick={closeMobile} className={menuLink}>View all products</Link>{productLinks.map((product) => <Link key={product.href} href={product.href} onClick={closeMobile} className={menuLink}>{product.label}</Link>)}</div></motion.div>
                </div>
                {links.slice(2).map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} aria-current={isActive(item.href) ? "page" : undefined} className={`${mobileLink} ${isActive(item.href) ? "text-brand-700" : "text-ink"}`}>{item.label}</Link>)}
                <div className="space-y-3 pt-5">
                  <Link href="/contact" onClick={closeMobile} className="inline-flex h-14 w-full items-center justify-center rounded-full bg-brand-600 px-6 text-base font-semibold text-white shadow-glow transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Let&apos;s Talk</Link>
                  <button type="button" onClick={() => { closeMobile(); openAudit(); }} className="inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-600/25 bg-white px-6 text-sm font-semibold text-brand-700 hover:bg-brand-50">Free Website Audit</button>
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                  <a href="tel:+918360532487" onClick={closeMobile} className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-brand-700"><Phone className="h-4 w-4 text-brand-700" /> +91 83605 32487</a>
                  <a href="mailto:info@webamazee.com" onClick={closeMobile} className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-brand-700"><Mail className="h-4 w-4 text-brand-700" /> info@webamazee.com</a>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" onClick={closeMobile} aria-label={social.label === "Calendly" ? "Book a meeting on Calendly" : `Webamazee on ${social.label}`} className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-slate-500 transition-colors hover:border-brand-600/30 hover:text-brand-700"><social.icon className="h-4 w-4" /></a>)}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
