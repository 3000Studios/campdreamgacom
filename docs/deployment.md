# Deployment Handoff

For the sandbox-safe, bot-friendly publish checklist used in this repo, see [AGENTS.md](/mnt/c/Workspaces/campdreamgacom/AGENTS.md).

## Public Build

The production site must be served only on **`campdreamga.com`** and **`www.campdreamga.com`**. Attach those custom domains in Cloudflare Pages and configure a redirect so one hostname redirects to your chosen canonical (typically apex → `www` or the reverse). Avoid attaching unrelated preview domains to production.

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

3. Add these GitHub repository **variables** *or* **secrets** for the Pages workflow (either works; `scripts/write-pages-env-ci.sh` merges `vars.*` with `secrets.*`):
   - `API_BASE_URL` (required)
   - `SITE_DOMAIN`, `SITE_URL`, `WWW_SITE_URL` (must match production hosts when `CI=true`; see `scripts/validate-pages-env.ts`)
   - `CONTACT_EMAIL`, `ENABLE_ADS` (or `VITE_ENABLE_ADS` as a secret)
   - `ADMIN_ROUTE_SLUG`, `BOOKING_URL`, `STRIPE_PAYMENT_LINK`, `PAYPAL_PAYMENT_LINK`, `HERO_VIDEO_URL`
   - Optional analytics/payment: `ADSENSE_CLIENT_ID` or `VITE_ADSENSE_CLIENT_ID`, `GA4_MEASUREMENT_ID`, `GTM_CONTAINER_ID`, `META_PIXEL_ID`, `CLARITY_PROJECT_ID`, `SEARCH_CONSOLE_VERIFICATION`

4. Cloudflare deploy secrets (also with fallbacks in the workflow): `CLOUDFLARE_MASTER_TOKEN` (or `CLOUDFLARE_API_TOKEN` or `CLOUD_FLARE_API_TOKEN`), `CLOUDFLARE_ACCOUNT_ID` (or fix a typo duplicate `CLLOUDFLARE_ACCOUNT_ID`), optional `CLOUDFLARE_PAGES_PROJECT_NAME` (defaults to `campdreamga`).

5. **Not used by this repository:** Secrets you store in GitHub for other apps (e.g. `RAILWAY_*`, `TELEGRAM_*`, `GH_*`, `ADMIN_API_*`, `JWT_*`, PayPal/Stripe server keys for a backend, etc.) are **ignored** by the Camp Dream GA frontend build unless we add code to read them. Only the names above are wired into `.github/workflows/deploy-pages.yml` and the Vite `__PUBLIC_CONFIG__` bundle.

6. Build command:

```bash
npm run build
```

7. Output directory:

```text
dist
```

8. Confirm the generated assets exist before publish:

```bash
public/ads.txt
public/robots.txt
public/sitemap.xml
```

9. The GitHub Actions workflow in [deploy-pages.yml](/c:/Workspaces/campdreamgacom/.github/workflows/deploy-pages.yml) deploys with `CLOUDFLARE_MASTER_TOKEN` mapped to Wrangler's `CLOUDFLARE_API_TOKEN`. `CLOUDFLARE_ZONE_ID` is not required for this Pages upload flow.

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
- `HERO_VIDEO_SEARCH_QUERY` (optional, defaults to `summer camp outdoors`)
- `PEXELS_API_KEY` (optional, enables automatic hero video search)
- `PIXABAY_API_KEY` (optional, enables automatic hero video search)

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
