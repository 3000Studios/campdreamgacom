import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cookieParser from 'cookie-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { z } from 'zod';

import {
  createSessionToken,
  getSessionCookieOptions,
  safeCompare,
  verifySessionToken,
} from './auth.js';
import type { ServerEnv } from './config.js';
import {
  buildOperatorLogEntry,
  buildOperatorProposal,
  operatorCommandSchema,
} from './operator.js';

const sessionCookieName = 'campdreamga_operator_session';

const inquirySchema = z.object({
  email: z.string().email(),
  intent: z.string().min(2),
  name: z.string().min(2),
  note: z.string().max(1200).default(''),
  source: z.string().min(2),
});

export const createApp = (env: ServerEnv): express.Express => {
  const app = express();
  const operatorLogs: ReturnType<typeof buildOperatorLogEntry>[] = [];

  const requireSession: express.RequestHandler = (request, response, next) => {
    const sessionToken = request.cookies[sessionCookieName] as string | undefined;
    const session = verifySessionToken(sessionToken, env.SESSION_SECRET);

    if (!session) {
      response.status(401).json({ message: 'Operator authentication required.' });
      return;
    }

    response.locals.session = session;
    next();
  };

  const loginLimiter = rateLimit({
    legacyHeaders: false,
    max: 10,
    standardHeaders: 'draft-8',
    windowMs: 1000 * 60 * 15,
  });

  const operatorLimiter = rateLimit({
    legacyHeaders: false,
    max: 40,
    standardHeaders: 'draft-8',
    windowMs: 1000 * 60 * 10,
  });

  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_request, response) => {
    response.json({
      ok: true,
      timestamp: new Date().toISOString(),
    });
  });

  app.post('/api/inquiries', async (request, response) => {
    const payload = inquirySchema.parse(request.body);

    if (env.LEAD_WEBHOOK_URL) {
      await fetch(env.LEAD_WEBHOOK_URL, {
        body: JSON.stringify({
          ...payload,
          receivedAt: new Date().toISOString(),
          site: env.SITE_DOMAIN,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }

    response.status(201).json({ ok: true });
  });

  app.post('/api/admin/session', loginLimiter, (request, response) => {
    const schema = z.object({
      email: z.string().email(),
      passcode: z.string().min(4),
    });
    const payload = schema.parse(request.body);

    if (!safeCompare(payload.email, env.ADMIN_EMAIL) || !safeCompare(payload.passcode, env.ADMIN_PASSCODE)) {
      response.status(401).json({ message: 'Invalid operator credentials.' });
      return;
    }

    const token = createSessionToken(payload.email, env.SESSION_SECRET);
    const session = verifySessionToken(token, env.SESSION_SECRET);
    if (!session) {
      response.status(500).json({ message: 'Session creation failed.' });
      return;
    }

    response.cookie(
      sessionCookieName,
      token,
      getSessionCookieOptions(env.NODE_ENV === 'production', session.expiresAt),
    );
    response.status(201).json({ authenticated: true, email: payload.email });
  });

  app.get('/api/admin/session', (request, response) => {
    const token = request.cookies[sessionCookieName] as string | undefined;
    const session = verifySessionToken(token, env.SESSION_SECRET);

    if (!session) {
      response.status(401).json({ authenticated: false });
      return;
    }

    response.json({ authenticated: true, email: session.email });
  });

  app.delete('/api/admin/session', (_request, response) => {
    response.clearCookie(sessionCookieName, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
    response.status(204).send();
  });

  app.get('/api/admin/summary', requireSession, (_request, response) => {
    response.json({
      recentLogs: operatorLogs.slice(0, 8),
      summaryCards: [
        { label: 'Canonical domain', value: env.SITE_DOMAIN },
        { label: 'AdSense mode', value: env.ENABLE_ADS === 'true' ? 'Enabled' : 'Disabled' },
        { label: 'Protected route', value: `/${env.ADMIN_ROUTE_SLUG}` },
      ],
    });
  });

  app.post('/api/operator/command', operatorLimiter, requireSession, (request, response) => {
    const payload = operatorCommandSchema.parse(request.body);
    const proposal = buildOperatorProposal(payload.message);
    const logEntry = buildOperatorLogEntry(payload.message, proposal);

    operatorLogs.unshift(logEntry);
    if (operatorLogs.length > 20) {
      operatorLogs.length = 20;
    }

    response.status(201).json({
      logs: operatorLogs.slice(0, 10),
      proposal,
    });
  });

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const localDistDirectory = path.resolve(__dirname, '..', 'dist');
  const builtDistDirectory = path.resolve(__dirname, '..', '..', 'dist');
  const distDirectory = existsSync(localDistDirectory) ? localDistDirectory : builtDistDirectory;
  const clientIndexFile = path.join(distDirectory, 'index.html');

  app.use(express.static(distDirectory));
  app.use((request, response, next) => {
    if (request.path.startsWith('/api')) {
      next();
      return;
    }

    response.sendFile(clientIndexFile, (error) => {
      if (error) {
        next();
      }
    });
  });

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    if (error instanceof z.ZodError) {
      response.status(400).json({
        issues: error.flatten(),
        message: 'Validation failed.',
      });
      return;
    }

    response.status(500).json({
      message: env.NODE_ENV === 'production' ? 'Internal server error.' : String(error),
    });
  });

  return app;
};
