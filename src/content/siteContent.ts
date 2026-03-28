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
  { href: '/about', label: 'What We Do' },
  { href: '/programs', label: 'Volunteer' },
  { href: '/pricing', label: 'Summer Camp' },
  { href: '/resources', label: 'Resources' },
  { href: '/book', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavigation: NavItem[] = [
  { href: '/policy/privacy', label: 'Privacy Policy' },
  { href: '/policy/terms', label: 'Terms of Service' },
  { href: '/policy/cookies', label: 'Cookie Policy' },
  { href: '/policy/disclaimer', label: 'Site Disclaimer' },
];

export const siteStats: SiteStat[] = [
  { label: 'Serving campers since', value: '1996' },
  { label: 'Volunteer-run programs', value: '100%' },
  { label: 'Summer camp counselor ratio', value: '1:1' },
];

export const programs: Program[] = [
  {
    audience:
      'Children and young adults with moderate to severe physical and developmental disabilities.',
    duration: 'Overnight summer sessions',
    highlights: [
      'Barrier-free camp setting at the Calvin Center in Hampton, Georgia',
      'Dedicated medical staff available in every session',
      'Activities include swimming, fishing, boating, crafts, dances, and more',
    ],
    priceLabel: 'Camp Dream Summer Camp',
    slug: 'summer-camp',
    summary:
      'A traditional overnight camp experience focused on joy, inclusion, life skills, and social connection.',
    title: 'Summer Camp',
  },
  {
    audience: 'Adults age 18+ who want to support campers one-on-one in a meaningful way.',
    duration: 'Single-session volunteer commitment',
    highlights: [
      'Background checks are conducted for all counselors and staff',
      'Counselors coach, assist, and support one assigned camper throughout camp',
      'Camp Dream volunteers are the backbone of every session',
    ],
    priceLabel: 'Volunteer opportunities',
    slug: 'counselors',
    summary:
      'Counselors provide personal care support, activity assistance, and friendship that help campers thrive.',
    title: 'Counselor Program',
  },
  {
    audience:
      'Individuals, families, groups, churches, and organizations who want to support campers.',
    duration: 'Year-round support',
    highlights: [
      'Help fund scholarships so no camper is turned away for financial reasons',
      'Support Summer Camp and Camp Out activities for Georgia families',
      'Contribute through one-time gifts, recurring donations, or in-kind support',
    ],
    priceLabel: 'Donor-supported mission',
    slug: 'donate',
    summary:
      'Donations provide recreational and social opportunities that many campers would otherwise miss.',
    title: 'Donate & Sponsor',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    cadence: '4-day overnight session',
    ctaHref: 'https://www.tfaforms.com/5109972',
    ctaLabel: 'Camper Application',
    id: 'summer-camp',
    name: 'Summer Camp',
    price: '$800 program cost',
    summary:
      'Families are asked to pay what they can. Scholarships and community support are available.',
    tag: 'Registration open',
  },
  {
    cadence: 'one-to-one support',
    ctaHref: 'https://www.tfaforms.com/4721374',
    ctaLabel: 'Counselor Application',
    id: 'volunteer',
    name: 'Volunteer Counselor',
    price: '100% volunteer',
    summary:
      'Counselors provide direct support, coaching, and care for campers throughout each session.',
    tag: '18+ years old',
  },
  {
    cadence: 'year-round support',
    ctaHref: '/book',
    ctaLabel: 'Donate to Camp Dream',
    highlight: 'Camp Dream Foundation is a 501(c)(3), EIN 58-1444915.',
    id: 'donate',
    name: 'Donate & Sponsor',
    price: 'Any amount',
    summary:
      'Donations support camper scholarships and Camp Dream programming throughout the year.',
    tag: 'Tax-deductible',
  },
];

export const pricingFeatureRows: PricingFeatureRow[] = [
  {
    label: 'Who it supports',
    values: {
      donate: 'Campers, families, and programs',
      'summer-camp': 'Campers with special needs',
      volunteer: 'Assigned camper one-on-one',
    },
  },
  {
    label: 'Primary action',
    values: {
      donate: 'Contribute online',
      'summer-camp': 'Submit camper application',
      volunteer: 'Submit counselor application',
    },
  },
  {
    label: 'Current status',
    values: {
      donate: 'Open year-round',
      'summer-camp': '2026 registration open',
      volunteer: '2026 registration open',
    },
  },
  {
    label: 'Program model',
    values: {
      donate: 'Community-funded nonprofit support',
      'summer-camp': 'Overnight camp experience',
      volunteer: 'One-to-one counselor support',
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    location: 'Georgia',
    name: 'Cathy Payne',
    quote:
      'Camp Dream means the world to my family and especially my daughter Ashley. The counselors there are God sent and wonderful with all the campers.',
    role: 'Parent',
  },
  {
    location: 'Georgia',
    name: 'Bryson Higgins',
    quote:
      'Being a counselor helped me grow as a person. I learned from the campers and look forward to being part of this camp for a very long time.',
    role: 'Counselor',
  },
];

export const homepageFaqs: FaqItem[] = [
  {
    answer:
      'Camp Dream offers an overnight Summer Camp program designed for children and young adults with moderate to severe physical and developmental disabilities.',
    question: 'What is Camp Dream?',
  },
  {
    answer:
      'Camp Dream accepts individuals with disabilities or special needs and has not refused anyone based on medical condition or financial capability.',
    question: 'Who attends Camp Dream?',
  },
  {
    answer:
      'Summer Camp sessions provide a dedicated medical team for medications, routine care, and emergency support.',
    question: 'What kind of medical support exists at camp?',
  },
  {
    answer:
      'Camp Dream Foundation asks families to pay what they can. Fundraising and donors help cover costs so more campers can attend.',
    question: 'How much does Summer Camp cost?',
  },
];

export const contactDetails = {
  availability: 'Camp inquiries accepted year-round',
  serviceArea: 'Serving campers and families across Georgia and beyond',
  supportNote:
    'For Summer Camp, volunteer, donor, and event questions, contact Camp Dream and we will route your inquiry to the right team member.',
};
