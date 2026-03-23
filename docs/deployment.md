# Deployment Handoff

## Public Build

1. Set the production variables in your Cloudflare Pages project:
   - `SITE_DOMAIN`
   - `SITE_URL`
   - `WWW_SITE_URL`
   - `CONTACT_EMAIL`
   - `ENABLE_ADS`
   - `ADSENSE_CLIENT_ID`
   - `GA4_MEASUREMENT_ID`
   - `GTM_CONTAINER_ID`
   - `META_PIXEL_ID`
   - `CLARITY_PROJECT_ID`
   - `SEARCH_CONSOLE_VERIFICATION`
   - `BOOKING_URL`
   - `HERO_VIDEO_URL`

2. If you are deploying from GitHub Actions instead of Cloudflare's native repo build, add these GitHub repository secrets:
   - `CLOUDFLARE_MASTER_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `ADSENSE_CLIENT_ID`
   - `GA4_MEASUREMENT_ID`
   - `GTM_CONTAINER_ID`
   - `META_PIXEL_ID`
   - `CLARITY_PROJECT_ID`
   - `SEARCH_CONSOLE_VERIFICATION`

3. Add these GitHub repository variables for the Pages workflow:
   - `API_BASE_URL`
   - `SITE_DOMAIN` if you need something other than `campdreamga.com`
   - `SITE_URL` if you need something other than `https://campdreamga.com`
   - `WWW_SITE_URL` if you need something other than `https://www.campdreamga.com`
   - `CONTACT_EMAIL` if you need something other than `hello@campdreamga.com`
   - `ENABLE_ADS`
   - `ADMIN_ROUTE_SLUG`
   - `BOOKING_URL`
   - `STRIPE_PAYMENT_LINK`
   - `PAYPAL_PAYMENT_LINK`
   - `HERO_VIDEO_URL`

4. Build command:

```bash
npm run build
```

5. Output directory:

```text
dist
```

6. Confirm the generated assets exist before publish:

```bash
public/ads.txt
public/robots.txt
public/sitemap.xml
```

7. The GitHub Actions workflow in [deploy-pages.yml](/c:/Workspaces/campdreamgacom/.github/workflows/deploy-pages.yml) deploys with `CLOUDFLARE_MASTER_TOKEN` mapped to Wrangler's `CLOUDFLARE_API_TOKEN`. `CLOUDFLARE_ZONE_ID` is not required for this Pages upload flow.

## Protected API

This repo includes an Express server bundle intended for a protected Node runtime.

Required variables:

- `API_BASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSCODE`
- `SESSION_SECRET`
- `STRIPE_PAYMENT_LINK`
- `PAYPAL_PAYMENT_LINK`
- `OPENAI_API_KEY`
- `OPENAI_OPERATOR_MODEL`
- `GEMINI_API_KEY`
- `LEAD_WEBHOOK_URL`

Build and run:

```bash
npm run build
node build/server/index.js
```

## Recommended Release Sequence

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run validate:env
npm run build
```

## Cloudflare Notes

- Keep `campdreamga.com` canonical
- Redirect `www.campdreamga.com` in Cloudflare DNS/rules
- Configure preview environments separately if they should be non-indexable
- Keep real secrets in Cloudflare or your server host, not in `wrangler.toml`

## Post-Deploy Checks

- Visit `/`, `/pricing`, `/resources`, and one resource article
- Confirm footer legal links resolve
- Confirm `robots.txt`, `ads.txt`, and `sitemap.xml` are reachable
- Confirm no ads appear on booking or operator routes
- Confirm `/api/health` responds on the protected API origin
- Confirm operator login rejects invalid credentials and accepts the configured account
