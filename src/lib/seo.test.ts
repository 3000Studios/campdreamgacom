import { describe, expect, it } from 'vitest';

import { buildCanonicalUrl, buildSitemapXml } from '@/lib/seo';

describe('seo helpers', () => {
  it('builds canonical urls from relative paths', () => {
    expect(buildCanonicalUrl('/pricing')).toBe('https://campdreamga.com/pricing');
  });

  it('builds a sitemap document', () => {
    const xml = buildSitemapXml([
      { changeFrequency: 'weekly', path: '/', priority: 1.0 },
      { changeFrequency: 'monthly', path: '/resources', priority: 0.7 },
    ]);

    expect(xml).toContain('<loc>https://campdreamga.com/</loc>');
    expect(xml).toContain('<loc>https://campdreamga.com/resources</loc>');
  });
});
