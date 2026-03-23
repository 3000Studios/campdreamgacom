const fallbackRuntimeConfig: PublicRuntimeConfig = {
  adminRouteSlug: 'operator-portal',
  adsenseClientId: '',
  apiBaseUrl: 'http://localhost:8787',
  bookingUrl: '',
  clarityProjectId: '',
  contactEmail: 'hello@campdreamga.com',
  enableAds: false,
  ga4MeasurementId: '',
  gtmContainerId: '',
  heroVideoUrl: '',
  metaPixelId: '',
  paypalPaymentLink: '',
  searchConsoleVerification: '',
  siteDomain: 'campdreamga.com',
  siteUrl: 'https://campdreamga.com',
  stripePaymentLink: '',
  wwwSiteUrl: 'https://www.campdreamga.com',
};

export const runtimeConfig: PublicRuntimeConfig =
  typeof __PUBLIC_CONFIG__ !== 'undefined' ? __PUBLIC_CONFIG__ : fallbackRuntimeConfig;
