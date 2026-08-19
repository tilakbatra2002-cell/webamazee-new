import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { LegalLayout } from "@/components/layout/legal-page";

export const metadata: Metadata = staticMetadata("terms");

const sections = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing or using the Webamazee website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
    ],
  },
  {
    heading: "Our Services",
    body: [
      "Webamazee provides digital marketing and web development services, including website development, redesign, landing pages, e-commerce, SEO and related offerings.",
      "Specific deliverables, timelines and pricing are agreed in individual proposals and contracts. In the event of a conflict, the terms of your signed agreement take precedence.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "All content on this website, including text, graphics, logos and software, is the property of Webamazee or its licensors and is protected by intellectual property laws.",
      "Upon full payment, work products created for you are owned by you as set out in your agreement. We retain ownership of our underlying tools, frameworks and pre-existing materials.",
    ],
  },
  {
    heading: "Client Responsibilities",
    body: [
      "You agree to provide accurate information and timely feedback, and to grant us the access and approvals needed to perform our services.",
      "You are responsible for the accuracy and legality of any content or materials you provide to us.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Webamazee shall not be liable for indirect, incidental, consequential or punitive damages arising from the use of our services.",
      "Our total liability for any claim is limited to the amount you paid us for the relevant services, except where prohibited by law.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "Either party may terminate an engagement in accordance with the terms of the relevant agreement. On termination, you remain responsible for amounts due for services already provided.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms and Conditions are governed by the applicable laws of Webamazee's registered jurisdiction. Any disputes shall be subject to the exclusive jurisdiction of the applicable courts.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. The latest version will always be available on this page, and continued use of our services constitutes acceptance of any changes.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Terms & Conditions"
      title="Terms &"
      highlight="conditions"
      updated="August 6, 2026"
      sections={sections}
    />
  );
}
