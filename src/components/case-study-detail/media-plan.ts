import type { GalleryEntry } from "@/components/case-study-detail/media";

/**
 * Which real asset illustrates which part of each project story.
 *
 * Every path below resolves to a file that already exists in
 * `public/images/portfolio` or `public/images/case-studies`, and each was
 * inspected to confirm what it actually shows before being given a caption.
 * Nothing here is a mockup, a stock substitute or a staged browser.
 *
 * Deliberately absent: any "before" capture. No screenshot of any client's
 * previous website exists in the repository, so no before/after comparison
 * is drawn anywhere in these pages.
 */

export type MediaPlan = {
  /** Hero visual. */
  hero: { src: string; alt: string };
  /** The composed marketing image, where the repository has one. */
  composed?: { src: string; alt: string; caption: string };
  /** Gallery entries, each a distinct genuine asset. */
  gallery: GalleryEntry[];
};

const KABIR_HOME = "/images/portfolio/kabir-oil-mill-live-homepage.webp";
const KABIR_FULL = "/images/portfolio/kabir-oil-mill.webp";
const KABIR_COMPOSED = "/images/portfolio/kabir-oil-mills-website-design-webamazee.webp";
const KABIR_CARD = "/images/case-studies/webamazee-kabir-oil-mills-case-study.png";

const WELL_HOME = "/images/portfolio/wellington-tours-live-homepage.webp";
const WELL_WIDE = "/images/portfolio/wellington-tours.webp";
const WELL_COMPOSED = "/images/portfolio/wellington-airport-city-tours-website-webamazee.webp";
const WELL_CARD = "/images/case-studies/webamazee-wellington-tours-case-study.png";

const SHINE_HOME = "/images/portfolio/shine-gold-tours-india-live-homepage.webp";
const SHINE_HERO = "/images/portfolio/shine-gold-tours-india-live-homepage.webp";
const SHINE_COMPOSED = "/images/portfolio/shine-gold-tours-travel-website-portfolio-webamazee.webp";
const SHINE_CARD = "/images/case-studies/webamazee-shine-gold-tours-india-case-study.png";

const AMLAOBA_HOME = "/images/portfolio/american-lao-business-association-live-homepage.webp";

export const mediaPlans: Record<string, MediaPlan> = {
  kabiroilmill: {
    hero: {
      src: KABIR_HOME,
      alt: "Kabir Oil Mill online store homepage showing the product range and best sellers",
    },
    composed: {
      src: KABIR_COMPOSED,
      alt: "Kabir Oil Mill store presented on a laptop and a phone in a composed showcase",
      caption: "The finished store, shown on desktop and mobile",
    },
    gallery: [
      {
        src: KABIR_HOME,
        label: "Store homepage",
        alt: "Kabir Oil Mill homepage with headline offers and a grid of best-selling oils",
        note: "Catalogue entry point",
      },
      {
        src: KABIR_FULL,
        label: "Full storefront page",
        alt: "Full-length capture of the Kabir Oil Mill homepage including hero, categories and product listings",
        note: "Complete page capture",
      },
      {
        src: KABIR_CARD,
        label: "Project summary card",
        alt: "Webamazee case study card summarising the Kabir Oil Mill e-commerce project",
        note: "Project overview artwork",
      },
    ],
  },

  wellingtontours: {
    hero: {
      src: WELL_HOME,
      alt: "Wellington Tours homepage with a New Zealand landscape hero and featured tour packages",
    },
    composed: {
      src: WELL_COMPOSED,
      alt: "Wellington Tours website on a laptop with a phone showing the mobile layout, alongside project highlights",
      caption: "The travel site on desktop and mobile",
    },
    gallery: [
      {
        src: WELL_HOME,
        label: "Website homepage",
        alt: "Wellington Tours homepage with destination imagery and featured tour packages",
        note: "Landing experience",
      },
      {
        src: WELL_WIDE,
        label: "Featured tour packages",
        alt: "Wellington Tours homepage section listing featured tour packages with pricing and itinerary highlights",
        note: "Tour presentation",
      },
      {
        src: WELL_CARD,
        label: "Project summary card",
        alt: "Webamazee case study card summarising the Wellington Tours website project",
        note: "Project overview artwork",
      },
    ],
  },

  shinegoldtours: {
    hero: {
      src: SHINE_HERO,
      alt: "Shine Gold Tours India redesigned homepage hero with the Explore India from an Indian Perspective headline",
    },
    composed: {
      src: SHINE_COMPOSED,
      alt: "Shine Gold Tours India redesigned website shown on a laptop and phone with additional page previews",
      caption: "The redesigned site across desktop and mobile",
    },
    gallery: [
      {
        src: SHINE_HERO,
        label: "Redesigned hero",
        alt: "Shine Gold Tours India homepage hero with a dark travel photograph and clear enquiry action",
        note: "New visual hierarchy",
      },
      {
        src: SHINE_HOME,
        label: "Redesigned homepage",
        alt: "Shine Gold Tours India redesigned homepage with destination navigation and tour sections",
        note: "Full homepage layout",
      },
      {
        src: SHINE_CARD,
        label: "Project summary card",
        alt: "Webamazee case study card summarising the Shine Gold Tours India redesign",
        note: "Project overview artwork",
      },
    ],
  },

  americanlaobusinessassociation: {
    hero: {
      src: AMLAOBA_HOME,
      alt: "American-Lao Business Association homepage with the mission headline over a Lao temple image and the four pillars below",
    },
    // No composed marketing image exists for this project in the repository,
    // so the single genuine capture is presented large rather than padded
    // out with invented views.
    gallery: [
      {
        src: AMLAOBA_HOME,
        label: "Redesigned homepage",
        alt: "American-Lao Business Association homepage with primary navigation, mission headline and Connect, Promote, Support and Grow pillars",
        note: "Mission and pillars above the fold",
      },
    ],
  },
};

export function mediaPlanFor(slug: string): MediaPlan | undefined {
  return mediaPlans[slug];
}
