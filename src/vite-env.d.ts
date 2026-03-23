/// <reference types="vite/client" />

declare global {
  interface PublicRuntimeConfig {
    adminRouteSlug: string;
    adsenseClientId: string;
    apiBaseUrl: string;
    bookingUrl: string;
    clarityProjectId: string;
    contactEmail: string;
    enableAds: boolean;
    ga4MeasurementId: string;
    gtmContainerId: string;
    heroVideoUrl: string;
    metaPixelId: string;
    paypalPaymentLink: string;
    searchConsoleVerification: string;
    siteDomain: string;
    siteUrl: string;
    stripePaymentLink: string;
    wwwSiteUrl: string;
  }

    interface Window {
      adsbygoogle?: unknown[];
      clarity?: (action: string, payload?: unknown) => void;
      dataLayer?: Record<string, unknown>[];
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
      SpeechRecognition?: new () => SpeechRecognition;
      webkitSpeechRecognition?: new () => SpeechRecognition;
    }

    const __PUBLIC_CONFIG__: PublicRuntimeConfig;

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onerror: ((this: SpeechRecognition, event: Event) => void) | null;
    onresult: ((this: SpeechRecognition, event: SpeechRecognitionEvent) => void) | null;
    start: () => void;
    stop: () => void;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
  }
}

export {};
