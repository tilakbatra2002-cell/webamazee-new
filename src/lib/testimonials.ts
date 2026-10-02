export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
};

/** Official Webamazee Google Business Profile listing — the source of the reviews below. */
export const GOOGLE_REVIEWS_URL = "https://share.google/l25rLLRohLCWDO7re";

/**
 * Genuine Google Business Profile reviews for
 * "Webamazee | AI Marketing and Web Development Company".
 *
 * Copied verbatim from the Google listing — reviewer names, star ratings and
 * review text are exactly as written by the reviewers (including their own
 * spelling). Google reviews carry no job titles, so the role line states the
 * source without a relative review age that could become stale.
 *
 * Note: four additional 5-star reviewers (Prince Saini, Gurpreet Kaur,
 * Kamakshi Sharma, Harman Kaur) exist on the profile without published review
 * text, so they are intentionally not listed here — no text is invented.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I Got my business website development from Webamzee and I am happy with the result. Clean designing and fast service.",
    name: "Sagar Rawat",
    role: "Google Review",
    initials: "SR",
    rating: 5,
  },
  {
    quote:
      "Thanks to Webamazee for building my website. The process was easy and the final result was exactly what I needed.",
    name: "Santosh Kumari",
    role: "Google Review",
    initials: "SK",
    rating: 5,
  },
  {
    quote:
      "Webamzee helped me improve my online presence. The team was responsive and delivered on time.",
    name: "Ajay Kumar",
    role: "Google Review",
    initials: "AK",
    rating: 5,
  },
  {
    quote:
      "Really impressed with Webamzee’s work. The website looks modern and professional. Highly recommended for business owners.",
    name: "moksh sharma",
    role: "Google Review",
    initials: "MS",
    rating: 5,
  },
];
