import { runtimeConfig } from '@/lib/runtime';
import type { RouteEntry } from '@/types';

export const buildCanonicalUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, runtimeConfig.siteUrl).toString();
};

export const buildBreadcrumbs = (
  items: Array<{ label: string; path: string }>,
): Array<{ item: string; name: string; position: number }> =>
  items.map((item, index) => ({
    item: buildCanonicalUrl(item.path),
    name: item.label,
    position: index + 1,
  }));

export const buildSitemapXml = (entries: RouteEntry[]): string => {
  const urls = entries
    .map((entry) => {
      const loc = buildCanonicalUrl(entry.path);
      return [
        '<url>',
        `<loc>${loc}</loc>`,
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
