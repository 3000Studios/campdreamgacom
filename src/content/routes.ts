import { legalPages } from '@/content/legal';
import { resourceArticles } from '@/content/resources';
import type { RouteEntry } from '@/types';

const staticRoutes: RouteEntry[] = [
  { changeFrequency: 'weekly', path: '/', priority: 1.0 },
  { changeFrequency: 'monthly', path: '/about', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/programs', priority: 0.9 },
  { changeFrequency: 'weekly', path: '/pricing', priority: 0.9 },
  { changeFrequency: 'weekly', path: '/book', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/contact', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/resources', priority: 0.9 },
  { changeFrequency: 'monthly', path: '/thanks', priority: 0.4, noIndex: true },
  { changeFrequency: 'monthly', path: '/booking/success', priority: 0.3, noIndex: true },
  { changeFrequency: 'monthly', path: '/booking/cancel', priority: 0.3, noIndex: true },
];

export const getPublicRouteEntries = (): RouteEntry[] => [
  ...staticRoutes,
  ...resourceArticles.map<RouteEntry>((article) => ({
    changeFrequency: 'monthly',
    path: `/resources/${article.slug}`,
    priority: 0.7,
  })),
  ...legalPages.map<RouteEntry>((page) => ({
    changeFrequency: 'monthly',
    path: `/policy/${page.slug}`,
    priority: 0.5,
  })),
];
