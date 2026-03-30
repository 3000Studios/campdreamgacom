# Camp Dream GA

Camp Dream GA is a revenue-first public website and protected operator workspace built with Vite, React, TypeScript, Express, and Cloudflare Pages deployment conventions. The public surface is designed for premium camp-inspired storytelling, product-led monetization, and AdSense-ready resource pages. The hidden operator surface is designed for secure admin access, session-backed tooling, and a safe AI operator scaffold.

## What’s Included

- Public routes for home, about, programs, pricing, booking, resources, contact, and legal policies
- Original long-form resource content with ad eligibility limited to approved templates
- Canonical SEO, JSON-LD schema, sitemap generation, `robots.txt`, and `ads.txt`
- Consent-aware analytics hooks for GA4, GTM, Meta Pixel, Microsoft Clarity, and AdSense loading
- Express API for protected admin sessions, inquiry capture, and operator command previews
- Hidden operator dashboard with text and voice command input, proposal previews, and audit log scaffolding
- Tooling baseline with ESLint, Prettier, TypeScript, Vitest, Husky, lint-staged, and CI verification

## Stack

- Frontend: Vite, React, React Router, TypeScript
- Server: Express, Zod, cookie-based signed sessions
- Deployment target: Cloudflare Pages for the public build, separate Node runtime for the protected API unless you later adapt it to Workers
- Testing: Vitest, Testing Library, Supertest

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in placeholders:

```bash
cp .env.example .env
```

3. Start the public app and protected API together:

```bash
npm run dev
```

4. Validate the production-critical env contract before deploy:

```bash
npm run validate:env
```

5. Run the full local verification pass:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Required Environment Variables

The project uses placeholders only. Never commit real values.

- `SITE_DOMAIN`
- `SITE_URL`
- `WWW_SITE_URL`
- `API_BASE_URL`
- `CONTACT_EMAIL`
- `ADMIN_ROUTE_SLUG`
- `ADMIN_EMAIL`
- `ADMIN_PASSCODE`
- `SESSION_SECRET`
- `STRIPE_PAYMENT_LINK`
- `PAYPAL_PAYMENT_LINK`
- `ENABLE_ADS`
- `ADSENSE_CLIENT_ID`
- `GA4_MEASUREMENT_ID`
- `GTM_CONTAINER_ID`
- `META_PIXEL_ID`
- `CLARITY_PROJECT_ID`
- `SEARCH_CONSOLE_VERIFICATION`
- `BOOKING_URL`
- `HERO_VIDEO_URL`
- `OPENAI_API_KEY`
- `OPENAI_OPERATOR_MODEL`
- `GEMINI_API_KEY`
- `LEAD_WEBHOOK_URL`

## Commands

- `npm run dev`: Vite dev server plus Express API
- `npm run lint`: ESLint
- `npm run typecheck`: TypeScript project references
- `npm run test`: Vitest with coverage
- `npm run validate:env`: production env contract check
- `npm run generate:static`: writes `public/ads.txt`, `public/robots.txt`, and `public/sitemap.xml`
- `npm run build`: static generation, frontend build, and server bundle
- `npm run analyze`: Vite bundle visualizer build

## Deployment Notes

- **Branching:** `main` is the only production branch. Deploys run only for that branch (see `.github/workflows/deploy-pages.yml`). Merge all work through pull requests into `main`; avoid long-lived staging or release branches in this repository.
- Cloudflare Pages should deploy the `dist` directory produced by `npm run build`
- GitHub Actions deployment uses `CLOUDFLARE_MASTER_TOKEN` as the Cloudflare API token and `CLOUDFLARE_ACCOUNT_ID` for authentication
- Set `API_BASE_URL` as a GitHub repository variable before enabling the Pages workflow so the public site points at the real protected API origin
- The public host should use `campdreamga.com` as canonical and redirect `www.campdreamga.com` at the DNS or Cloudflare dashboard level
- The Express API should run with the same env contract on a protected origin and be surfaced to the frontend through `API_BASE_URL`
- `public/_redirects` is included for SPA routing
- `public/_headers` can be extended if you want stricter cache or security controls beyond the included baseline

For step-by-step deployment guidance, see [docs/deployment.md](/c:/Workspaces/campdreamgacom/docs/deployment.md).

## AI Operator

The operator dashboard is intentionally scaffolded, not fully autonomous publishing. Commands are parsed into structured proposals and audit entries first. Future integration with a hosted OpenAI assistant or custom GPT should preserve:

- approval before publish
- explicit diff payloads
- audit logging
- rollback paths
- guardrails around legal pages, pricing, ads, and secrets

The architecture and a starter instruction set live in [docs/ai-operator.md](/c:/Workspaces/campdreamgacom/docs/ai-operator.md).

## Security

Any secrets previously pasted into chat or other uncontrolled channels must be treated as compromised. This repository intentionally uses env templates only and documents the manual rotation work in [docs/secret-rotation.md](/c:/Workspaces/campdreamgacom/docs/secret-rotation.md).
