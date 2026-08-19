import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { ServicePage } from "@/components/services/service-page";
import { getServiceSeo } from "@/lib/content-seo";

const SLUG = "competitor-analysis";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <ServicePage service={service} />;
}
