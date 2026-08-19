import { services } from "./services";
import { products } from "./products";

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const serviceLinks: { label: string; href: string; short: string }[] =
  services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
    short: s.shortName,
  }));

export const productLinks: { label: string; href: string; short: string }[] =
  products.map((p) => ({
    label: p.name,
    href: p.path,
    short: p.shortName,
  }));

export const footerServiceLinks = serviceLinks;
export const footerProductLinks = productLinks;
