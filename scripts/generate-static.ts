import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { getPublicRouteEntries } from '../src/content/routes.js';

const rootDirectory = process.cwd();
const publicDirectory = path.join(rootDirectory, 'public');

const normalizeSiteUrl = (value: string | undefined): string => {
  if (!value) return 'https://campdreamga.com';

  const trimmed = value.trim();
  const candidate = trimmed.includes('=')
    ? (trimmed.split('=').filter(Boolean).pop() ?? '').trim()
    : trimmed;

  return candidate.startsWith('http://') || candidate.startsWith('https://') ? candidate : 'https://campdreamga.com';
};

const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
const adsenseClientIdFromEnv = (process.env.ADSENSE_CLIENT_ID ?? '').trim();
const adsenseClientId = adsenseClientIdFromEnv.length > 0 ? adsenseClientIdFromEnv : 'ca-pub-5800977493749262';
const routeEntries = getPublicRouteEntries().filter((entry) => !entry.noIndex);

const buildSitemapXml = (): string => {
  const urls = routeEntries
    .map((entry) => {
      const canonicalUrl = new URL(entry.path, siteUrl).toString();
      return [
        '<url>',
        `<loc>${canonicalUrl}</loc>`,
        `<changefreq>${entry.changeFrequency}</changefreq>`,
        `<priority>${entry.priority.toFixed(1)}</priority>`,
        '</url>',
      ].join('');
    })
    .join('');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls +
    '</urlset>'
  );
};

const adsTxtContent = `google.com, ${adsenseClientId.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`;

const robotsContent = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;

const run = async (): Promise<void> => {
  await mkdir(publicDirectory, { recursive: true });
  await writeFile(path.join(publicDirectory, 'ads.txt'), adsTxtContent, 'utf8');
  await writeFile(path.join(publicDirectory, 'robots.txt'), robotsContent, 'utf8');
  await writeFile(path.join(publicDirectory, 'sitemap.xml'), buildSitemapXml(), 'utf8');
};

void run();
