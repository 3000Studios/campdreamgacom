import type {
  FaqItem,
  NavItem,
  PricingFeatureRow,
  PricingPlan,
  Program,
  SiteStat,
  Testimonial,
} from '@/types';

export const primaryNavigation: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavigation: NavItem[] = [
  { href: '/policy/privacy', label: 'Privacy Policy' },
  { href: '/policy/terms', label: 'Terms of Service' },
  { href: '/policy/cookies', label: 'Cookie Policy' },
  { href: '/policy/disclaimer', label: 'Advertising Disclosure' },
];

export const siteStats: SiteStat[] = [
  { label: 'Families guided through camp planning', value: '120+' },
  { label: 'Custom retreat itineraries launched', value: '36' },
  { label: 'Average launch timeline for enrollment-ready pages', value: '14 days' },
];

export const programs: Program[] = [
  {
    audience: 'Families who want a premium outdoor reset without piecing together logistics alone.',
    duration: 'Three-day experience',
    highlights: [
      'Cabin allocation, meal planning, welcome kit, and curated activity pacing',
      'Optional photography, keepsake merch, and family leadership circles',
      'Designed for busy households who want the feel of camp with boutique hospitality',
    ],
    priceLabel: 'From $899 per family',
    slug: 'dream-weekend',
    summary:
      'A hosted North Georgia family-camp weekend that blends outdoor fun, camp traditions, and polished planning support.',
    title: 'Dream Weekend',
  },
  {
    audience: 'Campers ages 10-14 who want confidence-building adventure and practical leadership practice.',
    duration: 'Five-session cohort',
    highlights: [
      'Outdoor skill progression, storytelling labs, and challenge-by-choice facilitation',
      'Parent communication plan and pre-arrival readiness checklist',
      'Built for schools, homeschool pods, and families who want structured growth',
    ],
    priceLabel: 'From $249 per camper',
    slug: 'trailblazer-cohort',
    summary:
      'A leadership-forward youth program built around resilience, teamwork, and camp confidence.',
    title: 'Trailblazer Cohort',
  },
  {
    audience: 'Schools, nonprofits, churches, and brands planning retreats or camp-inspired experiences.',
    duration: 'Custom scope',
    highlights: [
      'Offer design, pricing strategy, enrollment UX, and trust-building public pages',
      'Lead funnels, payment-routing guidance, and operator support for launch week',
      'Ideal for teams that need camp energy with premium execution standards',
    ],
    priceLabel: 'Custom quote',
    slug: 'campcraft-studio',
    summary:
      'A done-with-you launch partnership for organizations turning outdoor programming into revenue.',
    title: 'CampCraft Studio',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    cadence: 'one-time enrollment',
    ctaHref: '/book',
    ctaLabel: 'Reserve a Dream Weekend',
    id: 'dream-weekend',
    name: 'Dream Weekend',
    price: '$899',
    summary:
      'Best for families who want a polished, joy-filled weekend with planning support and premium camp touches.',
    tag: 'Most popular',
  },
  {
    cadence: 'per camper',
    ctaHref: '/book',
    ctaLabel: 'Enroll in Trailblazer',
    id: 'trailblazer',
    name: 'Trailblazer Cohort',
    price: '$249',
    summary:
      'A lower-friction way to experience Camp Dream GA through guided leadership programming and skill building.',
    tag: 'Best entry point',
  },
  {
    cadence: 'custom engagement',
    ctaHref: '/contact',
    ctaLabel: 'Request a custom scope',
    highlight: 'Includes pricing architecture, launch UX, and operator support.',
    id: 'campcraft-studio',
    name: 'CampCraft Studio',
    price: 'Custom',
    summary:
      'For teams building revenue-generating camp, retreat, or outdoor education offers that need a premium front door.',
    tag: 'For organizations',
  },
];

export const pricingFeatureRows: PricingFeatureRow[] = [
  {
    label: 'Planning support',
    values: {
      'campcraft-studio': 'Full launch partnership',
      'dream-weekend': 'Hosted pre-arrival guide',
      trailblazer: 'Parent prep checklist',
    },
  },
  {
    label: 'Enrollment experience',
    values: {
      'campcraft-studio': 'Custom booking flow',
      'dream-weekend': 'Priority booking',
      trailblazer: 'Single-step signup',
    },
  },
  {
    label: 'Operator access',
    values: {
      'campcraft-studio': 'Yes, with rollout support',
      'dream-weekend': 'No',
      trailblazer: 'No',
    },
  },
  {
    label: 'Ideal use case',
    values: {
      'campcraft-studio': 'Launch a paid program',
      'dream-weekend': 'Book a premium family weekend',
      trailblazer: 'Try the brand with a smaller commitment',
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    location: 'Roswell, Georgia',
    name: 'Maya R.',
    quote:
      'Camp Dream GA felt like someone finally built camp for modern families. The weekend had structure, warmth, and none of the usual planning scramble.',
    role: 'Parent of two',
  },
  {
    location: 'Athens, Georgia',
    name: 'Derrick L.',
    quote:
      'The Trailblazer program gave our middle-school group a clear arc from nerves to confidence. The communication with families was especially strong.',
    role: 'Youth program coordinator',
  },
  {
    location: 'Atlanta, Georgia',
    name: 'Keisha W.',
    quote:
      'The CampCraft engagement sharpened our offer, pricing, and checkout path. We launched with a site that felt premium instead of patched together.',
    role: 'Retreat founder',
  },
];

export const homepageFaqs: FaqItem[] = [
  {
    answer:
      'Camp Dream GA combines outdoor-program planning, premium storytelling, and conversion-ready enrollment experiences. Families get a polished camp weekend, while organizations get launch support that turns camp energy into a clear offer.',
    question: 'What makes Camp Dream GA different from a typical camp website?',
  },
  {
    answer:
      'Yes. Direct purchases and booking flows stay product-first, while ads remain limited to long-form resource pages and only appear when they support discovery rather than distract from enrollment.',
    question: 'Is this designed for revenue first or AdSense first?',
  },
  {
    answer:
      'Absolutely. The CampCraft Studio offer is built for schools, churches, founders, and community teams who want to launch or reposition camp-style programming with stronger UX and clearer monetization.',
    question: 'Do you only work with families, or can organizations book support too?',
  },
  {
    answer:
      'The public pages stay content-rich and trustworthy while the operator dashboard remains hidden, protected by server-side authentication, and excluded from sitemaps and ad-bearing templates.',
    question: 'How is the operator/admin side handled without surfacing it publicly?',
  },
];

export const contactDetails = {
  availability: 'Monday to Friday, 9 AM to 5 PM Eastern',
  serviceArea: 'Serving Atlanta, North Georgia, and remote planning clients across the Southeast.',
  supportNote:
    'For enrollment help, retreat scoping, or partnership questions, use the form below and we will route you to the fastest next step.',
};
