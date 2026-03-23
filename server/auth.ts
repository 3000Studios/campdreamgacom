import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const sessionLifetimeMs = 1000 * 60 * 60 * 12;

interface SessionPayload {
  email: string;
  expiresAt: number;
  issuedAt: number;
}

const toBase64Url = (value: string): string => Buffer.from(value).toString('base64url');

const sign = (value: string, secret: string): string =>
  createHmac('sha256', secret).update(value).digest('base64url');

export const safeCompare = (left: string, right: string): boolean => {
  const leftHash = createHash('sha256').update(left).digest();
  const rightHash = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
};

export const createSessionToken = (email: string, secret: string): string => {
  const payload: SessionPayload = {
    email,
    expiresAt: Date.now() + sessionLifetimeMs,
    issuedAt: Date.now(),
  };

  const body = toBase64Url(JSON.stringify(payload));
  const signature = sign(body, secret);
  return `${body}.${signature}`;
};

export const verifySessionToken = (
  token: string | undefined,
  secret: string,
): SessionPayload | null => {
  if (!token) {
    return null;
  }

  const [body, signature] = token.split('.');
  if (!body || !signature) {
    return null;
  }

  const expectedSignature = sign(body, secret);
  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionPayload;
  if (payload.expiresAt < Date.now()) {
    return null;
  }

  return payload;
};

export const getSessionCookieOptions = (isProduction: boolean, expiresAt: number) => ({
  expires: new Date(expiresAt),
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: isProduction,
});
