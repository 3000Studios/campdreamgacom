import { runtimeConfig } from '@/lib/runtime';
import { buildBreadcrumbs, buildCanonicalUrl } from '@/lib/seo';
import type { FaqItem, ResourceArticle } from '@/types';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  description:
    'Camp Dream GA builds premium camp experiences, enrollment-ready public pages, and operator support for Georgia families and outdoor program founders.',
  name: 'Camp Dream GA',
  sameAs: [runtimeConfig.siteUrl, runtimeConfig.wwwSiteUrl],
  url: runtimeConfig.siteUrl,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Camp Dream GA',
  potentialAction: {
    '@type': 'SearchAction',
    query: 'required name=search_term_string',
    target: `${runtimeConfig.siteUrl}/resources?query={search_term_string}`,
  },
  url: runtimeConfig.siteUrl,
};

export const buildBreadcrumbSchema = (items: Array<{ label: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: buildBreadcrumbs(items),
});

export const buildFaqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
    name: item.question,
  })),
});

export const buildArticleSchema = (article: ResourceArticle) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  author: {
    '@type': 'Organization',
    name: 'Camp Dream GA',
  },
  dateModified: article.updatedAt,
  datePublished: article.publishedAt,
  description: article.description,
  headline: article.title,
  mainEntityOfPage: buildCanonicalUrl(`/resources/${article.slug}`),
  publisher: organizationSchema,
});

export const buildServiceSchema = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  description,
  name,
  provider: organizationSchema,
  url: buildCanonicalUrl(path),
});
