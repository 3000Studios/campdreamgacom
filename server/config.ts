import { z } from 'zod';

const optionalUrl = z.union([z.literal(''), z.string().url()]);

const serverEnvSchema = z.object({
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSCODE: z.string().min(4),
  ADMIN_ROUTE_SLUG: z.string().default('operator-portal'),
  ADSENSE_CLIENT_ID: z.string().default(''),
  API_BASE_URL: z.string().url().default('http://localhost:8787'),
  BOOKING_URL: optionalUrl.default(''),
  CLARITY_PROJECT_ID: z.string().default(''),
  CONTACT_EMAIL: z.string().email().default('hello@campdreamga.com'),
  ENABLE_ADS: z.string().default('false'),
  GA4_MEASUREMENT_ID: z.string().default(''),
  GEMINI_API_KEY: z.string().default(''),
  GTM_CONTAINER_ID: z.string().default(''),
  HERO_VIDEO_URL: optionalUrl.default(''),
  LEAD_WEBHOOK_URL: optionalUrl.default(''),
  META_PIXEL_ID: z.string().default(''),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  OPENAI_API_KEY: z.string().default(''),
  OPENAI_OPERATOR_MODEL: z.string().default('gpt-4.1-mini'),
  PAYPAL_PAYMENT_LINK: optionalUrl.default(''),
  PORT: z.coerce.number().default(8787),
  SEARCH_CONSOLE_VERIFICATION: z.string().default(''),
  SESSION_SECRET: z.string().min(32),
  SITE_DOMAIN: z.string().min(1),
  SITE_URL: z.string().url(),
  STRIPE_PAYMENT_LINK: optionalUrl.default(''),
  WWW_SITE_URL: z.string().url(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const readServerEnv = (rawEnv: NodeJS.ProcessEnv): ServerEnv => serverEnvSchema.parse(rawEnv);
