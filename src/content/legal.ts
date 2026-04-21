import type { LegalPage } from '../types.js';

export const legalPages: LegalPage[] = [
  {
    description:
      'How the Camp Dream Store sandbox storefront handles personal information, marketing preferences, and operator-dashboard access data.',
    sections: [
      {
        body: [
          'Camp Dream Store collects only the information needed to respond to inquiries, support order requests, deliver requested updates, and improve site operations. This can include contact details, order-intent information, device data, and limited analytics events when consent is granted.',
          'We do not sell personal information. We use data to provide the experience visitors ask for and to measure whether our public site is clear, trustworthy, and useful.',
        ],
        title: 'What we collect and why',
      },
      {
        body: [
          'Essential technical data helps us operate the site, detect abuse, and maintain hidden operator routes securely. Optional analytics and advertising data are loaded only after consent is granted through the site banner.',
          'If you submit an inquiry form, we use that information to respond to your request, prepare an order reply, or recommend the right next step.',
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
      'The terms that govern use of the Camp Dream Store website, order requests, digital resources, and operator tools.',
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
          'Public-facing copy, site design, and downloadable resources remain the property of Camp Dream Store unless otherwise stated. You may not reproduce or republish them as your own commercial material without written permission.',
          'Guide content and brand assets may not be copied into competing products or training datasets without consent.',
        ],
        title: 'Content ownership',
      },
      {
        body: [
          'Product availability, pricing, and shipping timelines may change. Submitting a form or starting a payment flow does not guarantee fulfillment until confirmed in writing.',
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
      'How Camp Dream Store uses essential cookies, analytics controls, and advertising preferences on content pages.',
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
          'When full consent is granted, Camp Dream Store may load analytics providers, tag managers, advertising scripts, and engagement tools that help us understand page performance and content-page monetization.',
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
      'Important notice that this website is a sandbox demo storefront.',
    sections: [
      {
        body: [
          'This website is an independent demo and test build.',
          'Nothing on this demo site should be treated as official product availability, pricing, shipping terms, or merchant commitments unless explicitly confirmed.',
        ],
        title: 'Sandbox storefront notice',
      },
      {
        body: [
          'Media assets are sourced from free-to-use providers where available, and attributions are included when practical.',
          'If a media source requires additional attribution or notices, those requirements should be honored on the relevant page.',
        ],
        title: 'Media and attribution',
      },
      {
        body: [
          'Forms, calls to action, and example content shown on this site are part of a demo storefront experience.',
          'Direct payment links, if present, are configured via environment variables and should be validated before public release.',
        ],
        title: 'Use of this demo',
      },
    ],
    slug: 'disclaimer',
    title: 'Site Disclaimer',
  },
];

export const getLegalPageBySlug = (slug: string): LegalPage | undefined =>
  legalPages.find((page) => page.slug === slug);
