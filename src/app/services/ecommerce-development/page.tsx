import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { pricingCategories } from "@/components/pricing/pricing-data";
import {
  MergedServicePage,
  projectFromCaseStudy,
  type LinkItem,
  type MergedServiceExtras,
} from "@/components/services/merged-service-page";

const SLUG = "ecommerce-development";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localWebsiteLinks: LinkItem[] = [
  {
    label: "E-commerce Website Development in Zirakpur",
    href: "/web-designing-company-zirakpur",
    description: "How Webamazee approaches online stores and shopping journeys for Zirakpur businesses.",
  },
  {
    label: "Website Design in Chandigarh",
    href: "/web-designing-company-chandigarh",
    description: "Regional website planning for businesses serving the Chandigarh market.",
  },
];

/**
 * The published E-Commerce Website package. Read from the site-wide pricing
 * catalogue so this page can never drift from /pricing or the central data.
 */
const ecommercePackage = pricingCategories
  .flatMap((category) => category.packages)
  .find((pkg) => pkg.name === "E-Commerce Website");

const extras: MergedServiceExtras = {
  heroProject: projectFromCaseStudy("kabiroilmill"),
  problemCards: [
    {
      title: "Difficult product discovery",
      text: "When categories, navigation or search are hard to understand, shoppers can struggle to reach the products that fit their needs.",
    },
    {
      title: "Complicated checkout",
      text: "Unclear steps, unexpected information requests or a confusing payment journey can interrupt a customer who is ready to order.",
    },
    {
      title: "Poor mobile experience",
      text: "Small controls, cramped product details and awkward forms make browsing and checkout harder on phones.",
    },
    {
      title: "Weak product pages",
      text: "Incomplete descriptions, unclear options or missing practical details leave shoppers with questions before they can decide.",
    },
    {
      title: "Slow storefront",
      text: "Heavy pages and poorly optimised assets can make a storefront feel sluggish and frustrating to use.",
    },
    {
      title: "Limited scalability",
      text: "A platform or catalogue structure that no longer fits the business can make new products, workflows or integrations harder to manage.",
    },
  ],
  industryNotes: [
    { name: "Fashion and apparel", text: "Product variants, sizing details and category browsing need to be easy to understand." },
    { name: "Home and lifestyle", text: "A varied range benefits from useful category structure and clear product specifications." },
    { name: "Beauty and personal care", text: "Product details, ingredients, options and usage information need clear presentation." },
    { name: "Electronics", text: "Specifications, compatibility details and filters can help shoppers compare products." },
    { name: "Food and beverage", text: "Product ranges, pack options and practical product information shape the catalogue." },
    { name: "Health and wellness", text: "Clear product information and careful, accurate wording matter throughout the experience." },
    { name: "Technology and accessories", text: "Compatibility, product attributes and organised categories can support product discovery." },
  ],
  projects: [projectFromCaseStudy("kabiroilmill")].filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  ),
  projectsTitle: "E-commerce work we have delivered",
  projectsNote:
    "A verified online store project, presented without sales, revenue, traffic or conversion claims.",
  pricing:
    ecommercePackage && ecommercePackage.usd && ecommercePackage.inr
      ? {
          packageName: ecommercePackage.name,
          intro:
            "A starting price for the published E-Commerce Website package, with scope confirmed around your product range and requirements. International and India prices are separate market rates, not currency conversions.",
          usd: ecommercePackage.usd,
          inr: ecommercePackage.inr,
          usdLabel: "International",
          inrLabel: "India",
          inclusions: ecommercePackage.features,
          note: "Custom development, ERP integrations, large catalogues, headless commerce and complex integrations are quoted separately. Other third-party or platform costs should be confirmed in your quote.",
          cta: ecommercePackage.cta,
        }
      : undefined,
  localWebsiteLinks,
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <MergedServicePage service={service} extras={extras} />;
}
