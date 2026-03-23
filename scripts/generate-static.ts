import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rootDirectory = process.cwd();
const publicDirectory = path.join(rootDirectory, 'public');

const siteUrl = process.env.SITE_URL ?? 'https://campdreamga.com';
const adsenseClientId = process.env.ADSENSE_CLIENT_ID ?? '';
const resourceSlugs = [
  'choose-the-right-georgia-camp-experience',
  'camp-packing-list-georgia',
  'first-overnight-camp-questions',
  'budget-for-camp-without-stress',
];
const legalSlugs = ['privacy', 'terms', 'cookies', 'disclaimer'];

const routeEntries = [
  { changeFrequency: 'weekly', path: '/', priority: 1.0 },
  { changeFrequency: 'monthly', path: '/about', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/programs', priority: 0.9 },
  { changeFrequency: 'weekly', path: '/pricing', priority: 0.9 },
  { changeFrequency: 'weekly', path: '/book', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/contact', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/resources', priority: 0.9 },
  ...resourceSlugs.map((slug) => ({ changeFrequency: 'monthly', path: `/resources/${slug}`, priority: 0.7 })),
  ...legalSlugs.map((slug) => ({ changeFrequency: 'monthly', path: `/policy/${slug}`, priority: 0.5 })),
];

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

const adsTxtContent = adsenseClientId.startsWith('ca-pub-')
  ? `google.com, ${adsenseClientId.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`
  : '# Add your Google AdSense publisher id as ADSENSE_CLIENT_ID to generate a production ads.txt file.\n';

const robotsContent = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;

const run = async (): Promise<void> => {
  await mkdir(publicDirectory, { recursive: true });
  await writeFile(path.join(publicDirectory, 'ads.txt'), adsTxtContent, 'utf8');
  await writeFile(path.join(publicDirectory, 'robots.txt'), robotsContent, 'utf8');
  await writeFile(path.join(publicDirectory, 'sitemap.xml'), buildSitemapXml(), 'utf8');
};

void run();
