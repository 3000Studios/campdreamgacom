import type { LegalPage } from '@/types';

export const legalPages: LegalPage[] = [
  {
    description:
      'How Camp Dream GA handles personal information, marketing preferences, and operator-dashboard access data.',
    sections: [
      {
        body: [
          'Camp Dream GA collects only the information needed to respond to inquiries, support bookings, deliver requested updates, and improve site operations. This can include contact details, booking-intent information, device data, and limited analytics events when consent is granted.',
          'We do not sell personal information. We use data to provide the experience visitors ask for and to measure whether our public site is clear, trustworthy, and useful.',
        ],
        title: 'What we collect and why',
      },
      {
        body: [
          'Essential technical data helps us operate the site, detect abuse, and maintain hidden operator routes securely. Optional analytics and advertising data are loaded only after consent is granted through the site banner.',
          'If you submit an inquiry form, we use that information to respond to your request, prepare a quote, or recommend the right next step.',
        ],
        title: 'How information is used',
      },
      {
        body: [
          'You may request access, correction, or deletion of your inquiry information by contacting the address listed on the Contact page. For consent-controlled tracking, you can revisit your cookie choices at any time from the footer-linked policy pages.',
          'Where third-party services are used for analytics, payments, or ad delivery, their policies also apply to the data they process on our behalf.',
        ],
        title: 'Your choices',
      },
    ],
    slug: 'privacy',
    title: 'Privacy Policy',
  },
  {
    description:
      'The terms that govern use of the Camp Dream GA website, booking requests, digital resources, and operator tools.',
    sections: [
      {
        body: [
          'By using this website, you agree to use it for lawful purposes and not to interfere with the experience of other visitors. You may browse public pages, request information, and use resources for personal or business evaluation purposes only.',
          'Hidden operator routes, admin tools, and protected APIs are not public resources. Attempting to access them without authorization is prohibited.',
        ],
        title: 'Acceptable use',
      },
      {
        body: [
          'Public-facing copy, site design, downloadable resources, and program descriptions remain the property of Camp Dream GA unless otherwise stated. You may not reproduce or republish them as your own commercial material without written permission.',
          'Testimonials, guide content, and brand assets may not be copied into competing products or training datasets without consent.',
        ],
        title: 'Content ownership',
      },
      {
        body: [
          'Program availability, pricing, and schedule details may change. Submitting a form or starting a payment flow does not guarantee placement until confirmed by the appropriate booking or enrollment process.',
          'We reserve the right to refuse service, pause an engagement, or close access to operator tools where misuse, abuse, or fraudulent behavior is detected.',
        ],
        title: 'Availability and service boundaries',
      },
    ],
    slug: 'terms',
    title: 'Terms of Service',
  },
  {
    description:
      'How Camp Dream GA uses essential cookies, analytics controls, and advertising preferences on content pages.',
    sections: [
      {
        body: [
          'The site uses a small set of essential browser storage features to remember cookie preferences, maintain operator sessions, and protect sensitive routes. These are required for the site to function safely.',
          'Optional analytics and advertising technologies are disabled until you opt in using the site consent banner.',
        ],
        title: 'Essential cookies and storage',
      },
      {
        body: [
          'When full consent is granted, Camp Dream GA may load analytics providers, tag managers, advertising scripts, and engagement tools that help us understand page performance and resource-page monetization.',
          'These tools are limited to approved templates and are intentionally excluded from checkout, admin, and sensitive pages.',
        ],
        title: 'Optional analytics and advertising tools',
      },
      {
        body: [
          'You can choose essentials only or accept all non-essential tracking. Future visits will remember that choice until you clear your browser storage or change your selection through the site interface.',
          'If you need assistance changing your preferences, use the Contact page and include the browser or device where the issue occurred.',
        ],
        title: 'Managing your preferences',
      },
    ],
    slug: 'cookies',
    title: 'Cookie Policy',
  },
  {
    description:
      'A disclosure explaining how Camp Dream GA uses advertising, recommendations, and monetized content responsibly.',
    sections: [
      {
        body: [
          'Camp Dream GA is a revenue-generating website. We may earn income from paid programs, custom engagements, affiliate-style recommendations, advertising placements, or future sponsorships where clearly disclosed.',
          'That does not change our commitment to publishing useful, original content. Resource pages are designed to educate first and monetize second.',
        ],
        title: 'How monetization works',
      },
      {
        body: [
          'Advertising, where enabled, appears only on approved public content templates. We do not place ads on operator pages, payment pages, or sensitive forms, and we do not style ads to look like navigation or primary calls to action.',
          'Any sponsored, partner, or materially compensated recommendation will be labeled clearly so readers can evaluate it in context.',
        ],
        title: 'Advertising standards',
      },
      {
        body: [
          'Content on this website is offered for informational and planning purposes. It does not replace professional medical, legal, educational, or financial advice, and readers should make decisions using their own judgment and any qualified experts relevant to their situation.',
          'If we update an offer or policy, we will do so through the public site and, where appropriate, through direct communication with active clients.',
        ],
        title: 'Reader responsibility and limitations',
      },
    ],
    slug: 'disclaimer',
    title: 'Advertising Disclosure and Disclaimer',
  },
];

export const getLegalPageBySlug = (slug: string): LegalPage | undefined =>
  legalPages.find((page) => page.slug === slug);
