import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { collections } from '@/content/products';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const CollectionsPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Shop curated collections with big joy energy: cozy, tiny gifts, and daytrip essentials."
      path="/collections"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Collections', path: '/collections' },
      ])}
      title="Collections"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/collections', label: 'Collections' },
          ]}
        />
        <p className="eyebrow">Collections</p>
        <h1>Curated vibes, ready to shop.</h1>
        <p className="lede">Pick a mood. We’ll hand you the perfect handful of favorites.</p>
      </div>
    </section>

    <section className="section">
      <div className="container product-grid">
        {collections.map((collection) => (
          <article className="panel product-card collection-card" key={collection.slug}>
            <Link className="product-card-media" to={`/collections/${collection.slug}`}>
              {collection.heroMedia.kind === 'video' ? (
                <video
                  autoPlay
                  className="product-card-img"
                  loop
                  muted
                  playsInline
                  poster={collection.heroMedia.posterUrl}
                >
                  <source src={collection.heroMedia.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  alt={collection.heroMedia.alt}
                  className="product-card-img"
                  loading="lazy"
                  src={collection.heroMedia.url}
                />
              )}
            </Link>
            <div className="product-card-body">
              <div className="product-card-topline">
                <span className="badge badge-soft">{collection.productSlugs.length} picks</span>
              </div>
              <h3 className="product-title">
                <Link to={`/collections/${collection.slug}`}>{collection.name}</Link>
              </h3>
              <p className="product-tagline">{collection.description}</p>
              <Link className="text-link" to={`/collections/${collection.slug}`}>
                Shop this collection
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);

