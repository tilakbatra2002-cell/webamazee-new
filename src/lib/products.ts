/**
 * Centralized product registry.
 *
 * Each product is a fully data-driven entry used to derive:
 * - navigation ("Products" dropdown)
 * - the products index (showcase cards)
 * - the individual product landing pages
 * - SEO metadata / OpenGraph / canonical
 * - the sitemap (XML + HTML) and internal links
 *
 * To add a future product: add a new object here, create its route folder
 * under `src/app/products/{slug}/`, and it appears in the navbar + sitemap
 * automatically (see src/components/layout/navbar.tsx and src/app/sitemap.ts).
 */

export type ProductFeatureSection = {
  title: string;
  desc: string;
  icon: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  /** One-line industry/category label shown on cards. */
  industry: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  /** Optional curated meta-keyword set (mapping layer); falls back to generated keywords. */
  metaKeywords?: string[];
  /** Icon key resolved via the project's ServiceIcon-style registry. */
  icon: string;
  eyebrow: string;
  heading: string;
  supportingCopy: string;
  /** Short positioning line used on the products index card. */
  positioning: string;
  /** Longer product description used on cards and detail hero. */
  description: string;
  primaryCta: string;
  secondaryCta: string;
  /** Badge shown on the product card + hero (e.g. "LIVE"). */
  badge: string;
  status: string;
  path: string;
  /** Feature highlights shown on the products index card. */
  cardFeatures: string[];
  /** Full capability list shown on the detail page features grid. */
  capabilities: ProductFeatureSection[];
  /** Real-world operational problems this product solves. */
  problems: { title: string; desc: string; icon: string }[];
  /** Workflow steps shown in "The Solution" section. */
  workflow: string[];
  /** Example team roles with different access levels. */
  teamRoles: { role: string; desc: string }[];
  /** Who the product is suitable for (used on Academy CRM detail page). */
  suitableFor?: string[];
};

export const products: Product[] = [
  {
    slug: "logistics-crm",
    name: "Logistics CRM",
    shortName: "Logistics CRM",
    industry: "Logistics & Transport",
    tagline: "Logistics CRM for Smarter Operations",
    metaTitle: "Logistics CRM Software for Transport & Logistics Businesses",
    metaDescription:
      "Logistics CRM by Webamazee: a logistics management software for transport businesses to manage customers, quotations, orders, shipments, fleet, invoices and payments from one platform.",
    metaKeywords: [
      "logistics CRM",
      "logistics management software",
      "transport CRM",
      "logistics operations software",
    ],
    icon: "Truck",
    eyebrow: "LIVE PRODUCT",
    heading: "Logistics CRM for Smarter Operations",
    supportingCopy:
      "Manage your logistics business from leads and customers to shipments, fleet, invoices and payments — all from one centralized platform.",
    positioning:
      "A complete CRM and operations platform for logistics and transport businesses.",
    description:
      "Manage customers, quotations, orders, shipments, drivers, vehicles, fleet, invoices, payments and logistics operations from one centralized platform.",
    primaryCta: "Try for Free",
    secondaryCta: "Book a Demo",
    badge: "LIVE",
    status: "LIVE",
    path: "/products/logistics-crm",
    cardFeatures: [
      "Shipment tracking",
      "Fleet & driver management",
      "Quotations & orders",
      "Invoicing & payments",
    ],
    capabilities: [
      { title: "Dashboard", desc: "A real-time overview of orders, shipments, fleet and revenue.", icon: "LayoutDashboard" },
      { title: "Leads", desc: "Capture and track new business enquiries in one place.", icon: "Users" },
      { title: "Customers", desc: "A complete record of every customer and their history.", icon: "Building2" },
      { title: "Quotes", desc: "Create and send quotations quickly and consistently.", icon: "FileText" },
      { title: "Orders", desc: "Track every order from confirmation to completion.", icon: "ClipboardList" },
      { title: "Shipments", desc: "Manage shipments from pickup to final delivery.", icon: "Package" },
      { title: "Tracking", desc: "Real-time shipment status visible to your whole team.", icon: "MapPin" },
      { title: "Routes", desc: "Plan and organize delivery routes efficiently.", icon: "Route" },
      { title: "Drivers", desc: "Keep driver details, assignments and availability organized.", icon: "UserCog" },
      { title: "Vehicles", desc: "Track vehicle details, documents and assignments.", icon: "Car" },
      { title: "Fleet", desc: "Manage your entire fleet from a single dashboard.", icon: "Warehouse" },
      { title: "Invoices", desc: "Generate accurate invoices directly from orders.", icon: "Receipt" },
      { title: "Payments", desc: "Track payments received and outstanding balances.", icon: "Wallet" },
      { title: "Expenses", desc: "Record and monitor operational expenses.", icon: "Banknote" },
      { title: "Documents", desc: "Store shipment and compliance documents centrally.", icon: "FileStack" },
      { title: "Communications", desc: "Keep customer and team communication in context.", icon: "MessageSquare" },
      { title: "Tasks", desc: "Assign and track tasks across your team.", icon: "ListChecks" },
      { title: "Reports", desc: "Reporting across operations, sales and finance.", icon: "BarChart3" },
    ],
    problems: [
      { title: "Data scattered across spreadsheets", desc: "Customer, order and shipment details live in disconnected files that are hard to keep in sync.", icon: "FileStack" },
      { title: "Manual shipment tracking", desc: "Without a shared system, tracking where a shipment is means phone calls and guesswork.", icon: "MapPin" },
      { title: "Missed customer follow-ups", desc: "Quotes and enquiries fall through the cracks when there's no structured follow-up process.", icon: "Users" },
      { title: "Disconnected fleet information", desc: "Vehicle and driver details are managed separately from orders, making planning harder.", icon: "Warehouse" },
      { title: "Manual invoicing", desc: "Creating invoices by hand from order details is slow and prone to errors.", icon: "Receipt" },
      { title: "Difficult payment tracking", desc: "Without a central ledger, it's hard to know what's been paid and what's outstanding.", icon: "Wallet" },
      { title: "Difficult reporting", desc: "Pulling numbers from multiple tools makes it hard to see how the business is really performing.", icon: "BarChart3" },
    ],
    workflow: ["Lead", "Customer", "Quote", "Order", "Shipment", "Delivery", "Invoice", "Payment"],
    teamRoles: [
      { role: "Admin", desc: "Full access to configure the workspace and oversee every module." },
      { role: "Sales", desc: "Manage leads, customers and quotations." },
      { role: "Operations", desc: "Coordinate orders, shipments and routes." },
      { role: "Accounts", desc: "Handle invoices, payments and expenses." },
      { role: "Drivers", desc: "View assigned shipments and update delivery status." },
      { role: "Managers", desc: "Oversee performance across teams with reporting access." },
    ],
  },
  {
    slug: "academy-crm",
    name: "Academy CRM",
    shortName: "Academy CRM",
    industry: "Coaching & Education",
    tagline: "Academy CRM for Modern Education Businesses",
    metaTitle: "Academy CRM Software for Coaching Institutes & Academies",
    metaDescription:
      "Academy CRM by Webamazee: a coaching institute CRM and education CRM to manage students, admissions, batches, attendance and fees from one student management CRM platform.",
    metaKeywords: [
      "academy CRM",
      "coaching institute CRM",
      "education CRM",
      "student management CRM",
    ],
    icon: "GraduationCap",
    eyebrow: "LIVE PRODUCT",
    heading: "Academy CRM for Modern Education Businesses",
    supportingCopy:
      "Manage students, leads, admissions, batches, attendance, fees and academy operations from one centralized platform.",
    positioning:
      "A complete CRM and management platform for coaching institutes and academies.",
    description:
      "Manage students, admissions, courses, batches, teachers, attendance, fees, communication and daily academy operations from one platform.",
    primaryCta: "Try for Free",
    secondaryCta: "Book a Demo",
    badge: "LIVE",
    status: "LIVE",
    path: "/products/academy-crm",
    cardFeatures: [
      "Admissions & enquiries",
      "Batches & attendance",
      "Fees & payments",
      "Follow-ups & reports",
    ],
    capabilities: [
      { title: "Dashboard", desc: "A real-time overview of students, admissions and fee collection.", icon: "LayoutDashboard" },
      { title: "Leads", desc: "Capture and track enquiries from every source.", icon: "Users" },
      { title: "Students", desc: "A complete academic and contact record for every student.", icon: "GraduationCap" },
      { title: "Admissions", desc: "Move enquiries through a clear admissions process.", icon: "ClipboardCheck" },
      { title: "Courses", desc: "Organize the courses and programs your academy offers.", icon: "BookOpen" },
      { title: "Batches", desc: "Manage batch schedules, capacity and enrollment.", icon: "Presentation" },
      { title: "Teachers", desc: "Keep teacher assignments and schedules organized.", icon: "UserCog" },
      { title: "Attendance", desc: "Record and track attendance for every batch.", icon: "CalendarCheck" },
      { title: "Fees", desc: "Track fee structures, dues and collection status.", icon: "Receipt" },
      { title: "Payments", desc: "Record payments and keep a clear financial history.", icon: "Wallet" },
      { title: "Follow-ups", desc: "Stay on top of enquiry and fee follow-ups.", icon: "MessageSquare" },
      { title: "Notifications", desc: "Keep students, parents and staff informed automatically.", icon: "Bell" },
      { title: "Reports", desc: "Reporting across admissions, attendance and fees.", icon: "BarChart3" },
      { title: "Staff management", desc: "Manage staff roles and responsibilities in one place.", icon: "Users2" },
    ],
    problems: [
      { title: "Student data spread across spreadsheets", desc: "Enquiry, admission and academic details are scattered across files that are hard to maintain.", icon: "FileStack" },
      { title: "Manual admission tracking", desc: "Without a structured process, enquiries and admissions are easy to lose track of.", icon: "ClipboardCheck" },
      { title: "Fee follow-ups", desc: "Tracking who has paid, and who needs a reminder, becomes a manual, repetitive task.", icon: "Wallet" },
      { title: "Attendance tracking", desc: "Manually recording attendance across batches is slow and inconsistent.", icon: "CalendarCheck" },
      { title: "Batch management", desc: "Coordinating schedules, capacity and teachers across batches gets complicated fast.", icon: "Presentation" },
      { title: "Staff coordination", desc: "Without shared visibility, staff responsibilities and handovers get missed.", icon: "Users2" },
      { title: "Manual reporting", desc: "Building reports from scattered records takes time away from running the academy.", icon: "BarChart3" },
    ],
    workflow: ["Lead", "Enquiry", "Admission", "Student", "Batch", "Attendance", "Fees", "Follow-up"],
    teamRoles: [
      { role: "Admin", desc: "Full access to configure the workspace and oversee every module." },
      { role: "Admissions", desc: "Manage enquiries and move students through admissions." },
      { role: "Teachers", desc: "Mark attendance and view assigned batches." },
      { role: "Accounts", desc: "Manage fee structures, payments and dues." },
      { role: "Front desk", desc: "Handle enquiries, follow-ups and day-to-day coordination." },
      { role: "Managers", desc: "Oversee performance across the academy with reporting access." },
    ],
    suitableFor: [
      "Coaching institutes",
      "Training academies",
      "Skill institutes",
      "Computer institutes",
      "IELTS/PTE institutes",
      "Competitive exam institutes",
      "Other education/training businesses",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
