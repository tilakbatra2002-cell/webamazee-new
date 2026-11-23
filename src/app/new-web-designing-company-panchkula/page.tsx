import type { Metadata } from "next";
import { PanchkulaWeb } from "@/components/panchkula-preview/panchkula-web";
import { panchkulaPreviewMetadata } from "@/components/panchkula-preview/panchkula-shared";

export const metadata: Metadata = panchkulaPreviewMetadata(
  "Website Design & Development in Panchkula | Webamazee",
  "Plan a responsive business website, custom development, e-commerce build or careful redesign for Panchkula customers with Webamazee.",
  "/web-designing-company-panchkula",
  ["website design Panchkula", "web development Panchkula", "e-commerce development Panchkula", "website redesign Panchkula"],
);

export default function NewPanchkulaWebDesignPage() {
  return <PanchkulaWeb />;
}
