# AGENTS.md

## Cursor Cloud specific instructions

This is a single-repo Node.js/TypeScript project (Vite + React SPA frontend, Express 5 API backend). No Docker, databases, or external services are required for local development.

### Quick reference

Standard commands are documented in `README.md` under **Commands**. Key ones:

- `npm run dev` — starts both Vite (port 5173) and Express (port 8787) concurrently
- `npm run lint` — ESLint with `--max-warnings=0`
- `npm run typecheck` — TypeScript project references check
- `npm run test` — Vitest with coverage
- `npm run build` — static generation + frontend build + server bundle

### Environment setup

A `.env` file is required (copy from `.env.example`). Three fields must be filled for the server to start:

| Variable         | Constraint                                 |
| ---------------- | ------------------------------------------ |
| `ADMIN_EMAIL`    | Valid email (e.g. `admin@campdreamga.com`) |
| `ADMIN_PASSCODE` | Min 4 characters                           |
| `SESSION_SECRET` | Min 32 characters                          |

All other variables have defaults or are optional. The `.env` file is gitignored.

### Dev server notes

- `npm run dev` uses `concurrently` to run `vite` (frontend) and `tsx watch --env-file=.env server/index.ts` (backend) in parallel.
- Vite proxies `/api` requests to the Express server at `http://localhost:8787`.
- The Express server validates all env vars on startup via Zod (`server/config.ts`). If required vars are missing or malformed, the server crashes immediately with a Zod error.
- The operator dashboard is at `/<ADMIN_ROUTE_SLUG>` (default: `/operator-portal`).

### Git hooks

Husky pre-commit hook runs `lint-staged` (ESLint fix + Prettier on staged files). Husky is set up via `npm install` (`prepare` script).
