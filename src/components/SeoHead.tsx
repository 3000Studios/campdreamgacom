import type { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { runtimeConfig } from '@/lib/runtime';
import { buildCanonicalUrl } from '@/lib/seo';

interface SeoHeadProps extends PropsWithChildren {
  description: string;
  image?: string;
  noIndex?: boolean;
  path: string;
  structuredData?: object | object[];
  title: string;
}

export const SeoHead = ({
  description,
  image,
  noIndex = false,
  path,
  structuredData,
  title,
}: SeoHeadProps): JSX.Element => {
  const canonicalUrl = buildCanonicalUrl(path);
  const fullTitle = `${title} | Camp Dream GA`;
  const structuredDataEntries = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta content={description} name="description" />
      <meta content={noIndex ? 'noindex,nofollow' : 'index,follow'} name="robots" />
      <meta content={fullTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={canonicalUrl} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content="Camp Dream GA" property="og:site_name" />
      <meta content={fullTitle} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content="summary_large_image" name="twitter:card" />
      <link href={canonicalUrl} rel="canonical" />
      {image ? <meta content={image} property="og:image" /> : null}
      {runtimeConfig.searchConsoleVerification ? (
        <meta content={runtimeConfig.searchConsoleVerification} name="google-site-verification" />
      ) : null}
      {structuredDataEntries.map((entry, index) => (
        <script
          key={`${path}-schema-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(entry)}
        </script>
      ))}
      {runtimeConfig.siteUrl ? <meta content={runtimeConfig.siteUrl} property="og:locale" /> : null}
    </Helmet>
  );
};
