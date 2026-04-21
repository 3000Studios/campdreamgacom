import path from 'node:path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

const toBoolean = (value: string | undefined): boolean => value === 'true';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const analyze = toBoolean(env.ANALYZE);

  const publicConfig = {
    adminRouteSlug: env.ADMIN_ROUTE_SLUG ?? 'operator-portal',
    adsenseClientId: env.ADSENSE_CLIENT_ID ?? 'ca-pub-5800977493749262',
    apiBaseUrl: env.API_BASE_URL ?? 'http://localhost:8787',
    bookingUrl: env.BOOKING_URL ?? '',
    clarityProjectId: env.CLARITY_PROJECT_ID ?? '',
    contactEmail: env.CONTACT_EMAIL ?? 'hello@campdreamga.com',
    enableAds: toBoolean(env.ENABLE_ADS),
    ga4MeasurementId: env.GA4_MEASUREMENT_ID ?? '',
    gtmContainerId: env.GTM_CONTAINER_ID ?? '',
    heroVideoUrl: env.HERO_VIDEO_URL ?? '',
    metaPixelId: env.META_PIXEL_ID ?? '',
    paypalPaymentLink: env.PAYPAL_PAYMENT_LINK ?? '',
    searchConsoleVerification: env.SEARCH_CONSOLE_VERIFICATION ?? '',
    siteDomain: env.SITE_DOMAIN ?? 'campdreamga.com',
    siteUrl: env.SITE_URL ?? 'https://campdreamga.com',
    stripePaymentLink: env.STRIPE_PAYMENT_LINK ?? '',
    wwwSiteUrl: env.WWW_SITE_URL ?? 'https://www.campdreamga.com',
  };

  return {
    plugins: [
      react(),
      analyze &&
        visualizer({
          filename: 'build-report.html',
          gzipSize: true,
          open: false,
          template: 'treemap',
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __PUBLIC_CONFIG__: JSON.stringify(publicConfig),
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.API_BASE_URL ?? 'http://localhost:8787',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4173,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 850,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  };
});
