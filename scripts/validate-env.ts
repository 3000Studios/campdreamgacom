import { z } from 'zod';

const validationSchema = z.object({
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSCODE: z.string().min(4),
  CONTACT_EMAIL: z.string().email(),
  PAYPAL_PAYMENT_LINK: z.string().url(),
  SESSION_SECRET: z.string().min(32),
  SITE_DOMAIN: z.string().min(1),
  SITE_URL: z.string().url(),
  STRIPE_PAYMENT_LINK: z.string().url(),
  WWW_SITE_URL: z.string().url(),
});

const result = validationSchema.safeParse(process.env);

if (!result.success) {
  console.error('Environment validation failed. Missing or invalid values:');
  for (const [key, issues] of Object.entries(result.error.flatten().fieldErrors)) {
    if (!issues || issues.length === 0) {
      continue;
    }
    console.error(`- ${key}: ${issues.join(', ')}`);
  }
  process.exit(1);
}

console.log('Environment validation passed.');
