import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createApp } from './app.js';
import type { ServerEnv } from './config.js';

const baseEnv: ServerEnv = {
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
  HERO_VIDEO_SEARCH_QUERY: 'summer camp outdoors',
  LEAD_WEBHOOK_URL: '',
  META_PIXEL_ID: '',
  NODE_ENV: 'test',
  OPENAI_API_KEY: '',
  OPENAI_OPERATOR_MODEL: 'gpt-4.1-mini',
  PAYPAL_PAYMENT_LINK: 'https://www.paypal.com/paypalme/example',
  PEXELS_API_KEY: '',
  PORT: 8787,
  PIXABAY_API_KEY: '',
  SEARCH_CONSOLE_VERIFICATION: '',
  SESSION_SECRET: '12345678901234567890123456789012',
  SITE_DOMAIN: 'campdreamga.com',
  SITE_URL: 'https://campdreamga.com',
  STRIPE_PAYMENT_LINK: 'https://buy.stripe.com/test_example',
  WWW_SITE_URL: 'https://www.campdreamga.com',
};

const buildEnv = (overrides: Partial<ServerEnv> = {}): ServerEnv => ({
  ...baseEnv,
  ...overrides,
});

const originalFetch = global.fetch;

afterEach(() => {
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

describe('server app', () => {
  it('protects the admin summary until a session exists', async () => {
    const env = buildEnv();
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
    const env = buildEnv();
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

  it('returns an empty hero-media payload when no provider keys are configured', async () => {
    const app = createApp(buildEnv());

    const response = await request(app).get('/api/hero-media');

    expect(response.status).toBe(200);
    expect(response.body.selected).toBeNull();
    expect(response.body.results).toEqual([]);
    expect(response.body.query).toBe('summer camp outdoors');
  });

  it('maps a Pexels hero video result into the shared response shape', async () => {
    global.fetch = vi.fn(async (input, init) => {
      expect(String(input)).toContain('https://api.pexels.com/v1/videos/search');
      expect(init?.headers).toMatchObject({
        Authorization: 'pexels-test-key',
      });

      return new Response(
        JSON.stringify({
          videos: [
            {
              duration: 11,
              id: 1093662,
              image: 'https://images.pexels.com/videos/1093662/free-video-1093662.jpg',
              url: 'https://www.pexels.com/video/campers-running-through-the-woods-1093662/',
              user: {
                name: 'Peter Fowler',
                url: 'https://www.pexels.com/@peter-fowler-417939',
              },
              video_files: [
                {
                  file_type: 'video/mp4',
                  height: 720,
                  link: 'https://player.vimeo.com/external/example-720.mp4',
                  quality: 'hd',
                  width: 1280,
                },
              ],
            },
          ],
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 200,
        },
      );
    }) as typeof fetch;

    const app = createApp(
      buildEnv({
        PEXELS_API_KEY: 'pexels-test-key',
      }),
    );

    const response = await request(app).get('/api/hero-media?query=summer%20camp');

    expect(response.status).toBe(200);
    expect(response.body.selected).toMatchObject({
      attributionName: 'Peter Fowler',
      provider: 'pexels',
      videoUrl: 'https://player.vimeo.com/external/example-720.mp4',
    });
    expect(response.body.results).toHaveLength(1);
    expect(response.body.query).toBe('summer camp');
  });
});
