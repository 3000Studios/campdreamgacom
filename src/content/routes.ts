import type { RouteEntry } from '../types.js';
import { legalPages } from './legal.js';
import { collections, products } from './products.js';
import { resourceArticles } from './resources.js';

const staticRoutes: RouteEntry[] = [
  { changeFrequency: 'weekly', path: '/', priority: 1.0 },
  { changeFrequency: 'monthly', path: '/about', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/shop', priority: 0.95 },
  { changeFrequency: 'weekly', path: '/collections', priority: 0.9 },
  { changeFrequency: 'weekly', path: '/contact', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/resources', priority: 0.9 },
  { changeFrequency: 'monthly', path: '/cart', priority: 0.2, noIndex: true },
  { changeFrequency: 'monthly', path: '/checkout', priority: 0.2, noIndex: true },
  { changeFrequency: 'monthly', path: '/thanks', priority: 0.4, noIndex: true },
  { changeFrequency: 'monthly', path: '/booking/success', priority: 0.3, noIndex: true },
  { changeFrequency: 'monthly', path: '/booking/cancel', priority: 0.3, noIndex: true },
];

export const getPublicRouteEntries = (): RouteEntry[] => [
  ...staticRoutes,
  ...products.map<RouteEntry>((product) => ({
    changeFrequency: 'weekly',
    path: `/shop/${product.slug}`,
    priority: 0.7,
  })),
  ...collections.map<RouteEntry>((collection) => ({
    changeFrequency: 'weekly',
    path: `/collections/${collection.slug}`,
    priority: 0.65,
  })),
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
