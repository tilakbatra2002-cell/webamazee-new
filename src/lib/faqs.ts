export type Faq = { q: string; a: string; category: string };
export type FaqItem = Pick<Faq, "q" | "a">;

/** Six homepage FAQs. The homepage UI and FAQ schema both consume this array. */
export const homeFaqs: FaqItem[] = [
  {
    q: "How is Webamazee different from a typical agency?",
    a: "We combine premium design and engineering with an AI-driven SEO engine — giving you faster, more measurable results while keeping human expertise in charge of strategy.",
  },
  {
    q: "How long before I see results?",
    a: "Website builds typically launch in 3–6 weeks. SEO is compounding: most clients see meaningful ranking movement within 60–90 days and significant growth within 6 months.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We serve clients worldwide, with teams aligned to your timezone and local market nuances.",
  },
  {
    q: "What does your pricing look like?",
    a: "We provide transparent, fixed-price proposals tailored to your goals — no hidden fees, no surprise billing. Book a free call for a custom quote.",
  },
  {
    q: "Will you follow safe, white-hat SEO?",
    a: "Absolutely. We use only ethical, Google-approved tactics. Your rankings are protected for the long term, never at risk from shady shortcuts.",
  },
  {
    q: "Do you provide reporting?",
    a: "Yes. You get a live dashboard plus clear monthly reports on rankings, traffic, conversions and ROI — so you always know what your investment is delivering.",
  },
];

/** Visible FAQ content used by the FAQ page and its matching FAQPage schema. */
export const faqs: Faq[] = [
  { q: "What does Webamazee do?", a: "Webamazee provides website development, e-commerce development, website redesign, SEO, AI SEO, technical SEO and related digital growth services.", category: "General" },
  { q: "Who does Webamazee work with?", a: "We work with startups, established businesses, online stores, service companies and organisations that need a stronger website or search presence.", category: "General" },
  { q: "Does Webamazee work with international clients?", a: "Yes. Webamazee serves clients remotely across India and international markets through structured calls, shared updates and clear review stages.", category: "General" },
  { q: "Does Webamazee have an office in every market it serves?", a: "No. Our international location pages describe markets we serve and do not claim a physical office where one has not been established.", category: "General" },
  { q: "How does a project begin?", a: "We begin with a conversation about your business, audience, current website and desired outcome, then define an appropriate scope.", category: "General" },
  { q: "Will I receive a fixed project scope?", a: "For defined projects, we provide a written proposal describing the agreed work, responsibilities, timing and price before development begins.", category: "General" },
  { q: "Can Webamazee support both a website and its marketing?", a: "Yes. Website, SEO and content services can be planned together when that combination fits the business goal.", category: "General" },
  { q: "Can I hire Webamazee for one service only?", a: "Yes. Services can be scoped individually, such as a website redesign, technical SEO review or landing page build.", category: "General" },
  { q: "How will we communicate during the work?", a: "Communication is organised through agreed calls, written updates and review milestones so decisions and feedback remain clear.", category: "General" },
  { q: "Does Webamazee guarantee business results?", a: "No. We provide professional work and a transparent process, but results depend on factors such as the market, offer, competition and ongoing execution.", category: "General" },

  { q: "What is included in SEO services?", a: "The scope can include technical review, keyword and intent research, on-page improvements, content planning, internal linking and performance measurement.", category: "SEO" },
  { q: "How long does SEO take?", a: "SEO is an ongoing process. Timing varies with the website, competition, technical condition and content, so we set expectations after reviewing the situation.", category: "SEO" },
  { q: "Do you guarantee first-position rankings?", a: "No ethical SEO provider can guarantee a particular organic position. We focus on defensible improvements and transparent reporting.", category: "SEO" },
  { q: "What is technical SEO?", a: "Technical SEO improves how a site can be crawled, understood and used, including indexability, canonicals, internal structure, performance and structured data where appropriate.", category: "SEO" },
  { q: "What is AI SEO?", a: "AI SEO uses AI-assisted research and analysis to support search strategy. Human review remains responsible for accuracy, usefulness and final decisions.", category: "SEO" },
  { q: "Can you improve an existing website's SEO?", a: "Yes. We can assess the current foundation and prioritise technical, content and structural work based on the site's needs.", category: "SEO" },
  { q: "Do you provide local SEO?", a: "Yes. Local SEO can cover factual business information, useful service and location pages, review processes and location-relevant website signals.", category: "SEO" },
  { q: "Does SEO include content writing?", a: "Content work can be included when agreed in the scope. We plan it around audience questions and search intent rather than keyword repetition.", category: "SEO" },
  { q: "How do you report SEO progress?", a: "Reporting is tailored to the engagement and can cover implementation, search visibility, relevant traffic and meaningful website actions.", category: "SEO" },
  { q: "Will a website redesign affect SEO?", a: "It can if URLs, content or technical signals are changed carelessly. We plan redirects, metadata, internal links and indexability as part of an SEO-conscious migration.", category: "SEO" },

  { q: "What types of websites does Webamazee build?", a: "We build business websites, online stores, landing pages and other conversion-focused website experiences based on the required functionality.", category: "Web" },
  { q: "How long does website development take?", a: "Timing depends on page count, functionality, content readiness and review speed. We provide a project schedule after defining the scope.", category: "Web" },
  { q: "Will my website work on mobile devices?", a: "Yes. Responsive behaviour is planned and tested across common mobile, tablet and desktop sizes.", category: "Web" },
  { q: "Can Webamazee build an e-commerce store?", a: "Yes. We build online stores with product discovery, product details, cart and checkout journeys suited to the agreed platform and requirements.", category: "Web" },
  { q: "Can you redesign my current website?", a: "Yes. We review the existing content, customer journey and search considerations before planning the redesign.", category: "Web" },
  { q: "Can I update the website after launch?", a: "Where content management is part of the build, we provide a practical setup for maintaining pages, products or articles.", category: "Web" },
  { q: "Is basic SEO considered during development?", a: "Yes. We consider semantic structure, headings, metadata, internal links, responsive delivery and technical foundations during the build.", category: "Web" },
  { q: "Do you provide website content and images?", a: "Content planning or production can be included in scope. We clarify which text and image assets are supplied by each party before work begins.", category: "Web" },
  { q: "What happens before a website launches?", a: "We review important pages, navigation, responsive layouts, forms, metadata and key user journeys before release.", category: "Web" },
  { q: "Do you offer support after launch?", a: "Post-launch support can be included or arranged separately based on the platform and the level of ongoing help required.", category: "Web" },

  { q: "How can I contact Webamazee?", a: "Use the contact page, email info@webamazee.com or call the phone number shown on the website.", category: "Contact" },
  { q: "What information should I include in my enquiry?", a: "Share your business, current website if available, target audience, required service and the main outcome you want the project to support.", category: "Contact" },
  { q: "Can I request a website review?", a: "Yes. Send the website URL and the concerns you want reviewed so we can understand the most useful next step.", category: "Contact" },
  { q: "Can I discuss more than one service?", a: "Yes. We can discuss a connected scope covering services such as development, redesign, e-commerce and SEO.", category: "Contact" },
  { q: "Do you provide a proposal before work starts?", a: "Yes. Once the requirements are understood, we can provide a proposal that explains the recommended scope and commercial terms.", category: "Contact" },
  { q: "Can meetings be held remotely?", a: "Yes. Remote meetings and shared project updates support clients in different cities and countries.", category: "Contact" },
  { q: "What if I am not sure which service I need?", a: "Explain the problem you are trying to solve. We can help distinguish whether it calls for development, redesign, SEO or a combination.", category: "Contact" },
  { q: "Can you work with an existing website team?", a: "Yes, where responsibilities and access are clear. We can coordinate with internal teams or other specialists for an agreed scope.", category: "Contact" },
  { q: "Should I prepare a budget before contacting you?", a: "A budget range is helpful but not essential. Clear priorities allow us to discuss a realistic scope and phased options where appropriate.", category: "Contact" },
  { q: "What happens after I submit an enquiry?", a: "We review the information, clarify the requirements and suggest an appropriate next conversation or project step.", category: "Contact" },
];
