import { runtimeConfig } from '@/lib/runtime';

type ConsentLevel = 'all' | 'essential' | 'unset';

export interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | undefined;
}

const consentStorageKey = 'campdreamga-consent';

const getConsentLevel = (): ConsentLevel => {
  if (typeof window === 'undefined') {
    return 'unset';
  }

  const stored = window.localStorage.getItem(consentStorageKey);
  if (stored === 'all' || stored === 'essential') {
    return stored;
  }

  return 'unset';
};

const injectScript = (id: string, options: { inlineText?: string; src?: string }): void => {
  if (typeof document === 'undefined' || document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;

  if (options.src) {
    script.src = options.src;
    if (options.src.includes('googlesyndication')) {
      script.crossOrigin = 'anonymous';
    }
  }

  if (options.inlineText) {
    script.text = options.inlineText;
  }

  document.head.appendChild(script);
};

export const bootAnalytics = (): void => {
  if (getConsentLevel() !== 'all') {
    return;
  }

  if (runtimeConfig.ga4MeasurementId) {
    injectScript('ga4-library', {
      src: `https://www.googletagmanager.com/gtag/js?id=${runtimeConfig.ga4MeasurementId}`,
    });
    injectScript('ga4-inline', {
      inlineText: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = window.gtag || gtag;
        gtag('js', new Date());
        gtag('config', '${runtimeConfig.ga4MeasurementId}', { send_page_view: false });
      `,
    });
  }

  if (runtimeConfig.gtmContainerId) {
    injectScript('gtm-inline', {
      inlineText: `
        window.dataLayer = window.dataLayer || [];
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${runtimeConfig.gtmContainerId}');
      `,
    });
  }

  if (runtimeConfig.metaPixelId) {
    injectScript('meta-pixel-inline', {
      inlineText: `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${runtimeConfig.metaPixelId}');
        fbq('track', 'PageView');
      `,
    });
  }

  if (runtimeConfig.clarityProjectId) {
    injectScript('clarity-inline', {
      inlineText: `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${runtimeConfig.clarityProjectId}");
      `,
    });
  }
};

export const loadAdsense = (): void => {
  if (!runtimeConfig.enableAds || !runtimeConfig.adsenseClientId || getConsentLevel() !== 'all') {
    return;
  }

  injectScript('adsense-script', {
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${runtimeConfig.adsenseClientId}`,
  });
};

export const trackEvent = (eventName: string, params: AnalyticsEventPayload = {}): void => {
  if (typeof window === 'undefined' || getConsentLevel() !== 'all') {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });
  window.gtag?.('event', eventName, params);
  window.fbq?.('trackCustom', eventName, params);
  window.clarity?.('event', eventName);
};
