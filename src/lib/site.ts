/** Central site configuration — single source of truth for brand + SEO. */
export const site = {
  name: "Webamazee",
  legalName: "Webamazee",
  tagline: "AI-Powered Digital Marketing Company",
  url: "https://webamazee.com",
  defaultLocale: "en_US",
  lang: "en",
  email: "info@webamazee.com",
  phone: "+91 83605 32487",
  phoneIntl: "+918360532487",
  logo: "/images/logo-lockup.webp",
  ogImage: "/og-image.png",
  twitterHandle: "@webamazee",
  address: {
    streetAddress: "Webamazee HQ",
    addressLocality: "Mohali",
    addressRegion: "Punjab",
    postalCode: "160055",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  areaServed: ["Worldwide"],
  socialProfiles: [
    "https://www.facebook.com/people/Webamazee/61589420618603/",
    "https://www.instagram.com/webamazee/",
    "https://www.linkedin.com/in/webamazee-tech-15113a3bb/",
  ],
  services: [
    "Website Development",
    "Website Redesign",
    "Landing Page Development",
    "E-Commerce Development",
    "SEO",
    "AI SEO",
    "Technical SEO",
    "Local SEO",
    "AI Content Optimization",
    "Google Ranking Growth",
    "Competitor Analysis",
    "Link Building",
  ],
} as const;

/** Reusable site-level defaults shared by all metadata generators. */
export const siteDefaults = {
  robots: { index: true, follow: true },
  category: "Digital Marketing",
  publisher: site.name,
  authors: ["Webamazee Team"],
  creator: site.name,
} as const;
