import { z } from 'zod';

const optionalUrl = z.union([z.literal(''), z.string().url()]);

const pagesEnvSchema = z.object({
  ADMIN_ROUTE_SLUG: z.string().default('operator-portal'),
  ADSENSE_CLIENT_ID: z.string().default(''),
  API_BASE_URL: z.string().url(),
  BOOKING_URL: optionalUrl.default(''),
  CLARITY_PROJECT_ID: z.string().default(''),
  CONTACT_EMAIL: z.string().email(),
  ENABLE_ADS: z.enum(['true', 'false']).default('false'),
  GA4_MEASUREMENT_ID: z.string().default(''),
  GTM_CONTAINER_ID: z.string().default(''),
  HERO_VIDEO_URL: optionalUrl.default(''),
  META_PIXEL_ID: z.string().default(''),
  PAYPAL_PAYMENT_LINK: optionalUrl.default(''),
  SEARCH_CONSOLE_VERIFICATION: z.string().default(''),
  SITE_DOMAIN: z.string().min(1),
  SITE_URL: z.string().url(),
  STRIPE_PAYMENT_LINK: optionalUrl.default(''),
  WWW_SITE_URL: z.string().url(),
});

const result = pagesEnvSchema.safeParse(process.env);

if (!result.success) {
  console.error('Pages environment validation failed. Missing or invalid values:');
  for (const [key, issues] of Object.entries(result.error.flatten().fieldErrors)) {
    if (!issues || issues.length === 0) {
      continue;
    }
    console.error(`- ${key}: ${issues.join(', ')}`);
  }
  process.exit(1);
}

console.log('Pages environment validation passed.');
