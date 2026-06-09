# Camp Dream GA — Agent Instructions

## Overview

- **Domain:** campdreamga.com
- **Stack:** React 18 + Vite + TypeScript + Express 5 backend + Zod validation
- **Deploy:** Cloudflare Pages (via GitHub Actions CI + Deploy Pages workflow)
- **Package Manager:** npm
- **Description:** Camp Dream Georgia — camp/retreat site with inquiry system and admin panel

## Key Commands

```bash
npm install
npm run dev             # Runs frontend (Vite :5173) + backend (Express :8787) via concurrently
npm run dev:web         # Vite frontend only
npm run dev:server      # Express backend only (requires .env)
npm run build           # generate:static + vite build + tsup server build
npm run lint            # ESLint (zero warnings enforced)
npm run typecheck       # tsc -b
npm run test            # Vitest with coverage
npm run format          # Prettier write
npm run format:check    # Prettier check
npm run ci              # lint + typecheck + test + build (full pipeline)
```

## Structure

- `src/` — React frontend (pages, components, hooks, styles)
- `server/` — Express 5 API (routes, middleware, admin auth)
- `scripts/` — Static asset generators (ads.txt, robots.txt, sitemap.xml), env validation
- `public/` — Static files
- `build/server/` — Compiled server output (tsup)
- `dist/` — Vite build output

## Environment

- `.env` required for server — copy from `.env.example`
- Minimum required: `ADMIN_EMAIL`, `ADMIN_PASSCODE`, `SESSION_SECRET`
- Frontend uses `VITE_`-prefixed vars only

## Git Hooks

- **Husky** pre-commit hook configured
- **lint-staged** runs ESLint fix + Prettier on staged files
- If `.husky/pre-commit` breaks, use `--no-verify` temporarily

## Constraints

- Deploy through Cloudflare Pages only (push to `main` triggers GitHub Actions)
- Secrets from global.env, never hardcode
- `npm run build` generates static SEO files first — these are gitignored
- Server uses `tsx watch --env-file=.env` — restart after installing new packages
- Inquiry endpoint: `POST /api/inquiries` (name, email, intent, source, note)
- Admin login: `POST /api/admin/session`
- This is a sandbox/redesign repo — do not modify the live campdreamga.org site
