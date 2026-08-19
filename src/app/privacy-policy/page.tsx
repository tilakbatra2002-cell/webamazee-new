import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { LegalLayout } from "@/components/layout/legal-page";

export const metadata: Metadata = staticMetadata("privacy");

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "When you use our website or services, we may collect information you provide directly — such as your name, email address, phone number and the details of your enquiry.",
      "We also collect certain information automatically, including your IP address, browser type, device information and pages you visit, to help us improve our website and services.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use your information to respond to enquiries, provide our services, process transactions, send relevant communications you have requested, and improve our website and offerings.",
      "We may also use aggregated, anonymised data for analytics and marketing purposes.",
    ],
  },
  {
    heading: "Cookies & Tracking",
    body: [
      "We use cookies and similar technologies to enhance your experience, remember your preferences and understand how our site is used.",
      "You can control or disable cookies through your browser settings. Note that some features may not function fully without cookies.",
    ],
  },
  {
    heading: "Data Sharing & Security",
    body: [
      "We do not sell your personal information. We may share data with trusted service providers who help us operate our business, subject to appropriate safeguards.",
      "We take reasonable measures to protect your information, but no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Depending on your location, you may have rights to access, correct, delete or restrict the use of your personal information. To exercise these rights, contact us at info@webamazee.com.",
      "You may also opt out of marketing communications at any time by following the unsubscribe instructions in our emails.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your data, please contact us at info@webamazee.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title="Your privacy"
      highlight="matters to us"
      updated="August 6, 2026"
      sections={sections}
    />
  );
}
