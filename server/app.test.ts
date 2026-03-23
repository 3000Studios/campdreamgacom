import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from './app.js';
import type { ServerEnv } from './config.js';

const env: ServerEnv = {
  ADMIN_EMAIL: 'operator@campdreamga.com',
  ADMIN_PASSCODE: 'super-secure-passcode',
  ADMIN_ROUTE_SLUG: 'operator-portal',
  ADSENSE_CLIENT_ID: '',
  API_BASE_URL: 'http://localhost:8787',
  BOOKING_URL: '',
  CLARITY_PROJECT_ID: '',
  CONTACT_EMAIL: 'hello@campdreamga.com',
  ENABLE_ADS: 'false',
  GA4_MEASUREMENT_ID: '',
  GEMINI_API_KEY: '',
  GTM_CONTAINER_ID: '',
  HERO_VIDEO_URL: '',
  LEAD_WEBHOOK_URL: '',
  META_PIXEL_ID: '',
  NODE_ENV: 'test',
  OPENAI_API_KEY: '',
  OPENAI_OPERATOR_MODEL: 'gpt-4.1-mini',
  PAYPAL_PAYMENT_LINK: 'https://www.paypal.com/paypalme/example',
  PORT: 8787,
  SEARCH_CONSOLE_VERIFICATION: '',
  SESSION_SECRET: '12345678901234567890123456789012',
  SITE_DOMAIN: 'campdreamga.com',
  SITE_URL: 'https://campdreamga.com',
  STRIPE_PAYMENT_LINK: 'https://buy.stripe.com/test_example',
  WWW_SITE_URL: 'https://www.campdreamga.com',
};

describe('server app', () => {
  it('protects the admin summary until a session exists', async () => {
    const app = createApp(env);

    const unauthenticated = await request(app).get('/api/admin/summary');
    expect(unauthenticated.status).toBe(401);

    const loginResponse = await request(app)
      .post('/api/admin/session')
      .send({ email: env.ADMIN_EMAIL, passcode: env.ADMIN_PASSCODE });

    expect(loginResponse.status).toBe(201);
    expect(loginResponse.headers['set-cookie']).toBeDefined();

    const cookie = loginResponse.headers['set-cookie']?.[0];
    expect(cookie).toBeTruthy();
    if (!cookie) {
      throw new Error('Missing session cookie.');
    }
    const authenticated = await request(app).get('/api/admin/summary').set('Cookie', cookie);

    expect(authenticated.status).toBe(200);
    expect(authenticated.body.summaryCards).toHaveLength(3);
  });

  it('returns a structured operator proposal', async () => {
    const app = createApp(env);

    const loginResponse = await request(app)
      .post('/api/admin/session')
      .send({ email: env.ADMIN_EMAIL, passcode: env.ADMIN_PASSCODE });

    const cookie = loginResponse.headers['set-cookie']?.[0];
    expect(cookie).toBeTruthy();
    if (!cookie) {
      throw new Error('Missing session cookie.');
    }
    const operatorResponse = await request(app)
      .post('/api/operator/command')
      .set('Cookie', cookie)
      .send({ message: 'Change the homepage headline to focus on summer family weekends.' });

    expect(operatorResponse.status).toBe(201);
    expect(operatorResponse.body.proposal.intent).toBe('update_page_copy');
    expect(operatorResponse.body.logs).toHaveLength(1);
  });
});
