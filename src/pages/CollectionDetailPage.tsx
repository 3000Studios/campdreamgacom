import { Link, Navigate, useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { getCollectionBySlug, getProductBySlug } from '@/content/products';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { useCart } from '@/state/CartContext';

export const CollectionDetailPage = (): JSX.Element => {
  const { slug } = useParams();
  const collection = slug ? getCollectionBySlug(slug) : undefined;
  const { addItem } = useCart();

  if (!collection) {
    return <Navigate replace to="/collections" />;
  }

  return (
    <>
      <SeoHead
        description={collection.description}
        path={`/collections/${collection.slug}`}
        structuredData={buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Collections', path: '/collections' },
          { label: collection.name, path: `/collections/${collection.slug}` },
        ])}
        title={collection.name}
      />

      <section className="section">
        <div className="container">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/collections', label: 'Collections' },
              { href: `/collections/${collection.slug}`, label: collection.name },
            ]}
          />
          <div className="panel collection-hero">
            {collection.heroMedia.kind === 'video' ? (
              <video
                autoPlay
                className="collection-hero-media"
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
                className="collection-hero-media"
                loading="eager"
                src={collection.heroMedia.url}
              />
            )}
            <div className="collection-hero-overlay">
              <p className="eyebrow">Collection</p>
              <h1>{collection.name}</h1>
              <p className="lede">{collection.description}</p>
              <div className="hero-actions">
                <Link className="button" to="/shop">
                  Browse all products
                </Link>
                <Link className="button button-secondary" to="/cart">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container product-grid">
          {collection.productSlugs.map((productSlug) => {
            const product = getProductBySlug(productSlug);
            if (!product) return null;
            const media = product.media[0];
            return (
              <article className="panel product-card" key={product.slug}>
                <Link className="product-card-media" to={`/shop/${product.slug}`}>
                  {media?.kind === 'video' ? (
                    <video autoPlay className="product-card-img" loop muted playsInline poster={media.posterUrl}>
                      <source src={media.url} type="video/mp4" />
                    </video>
                  ) : (
                    <img alt={media?.alt ?? product.name} className="product-card-img" loading="lazy" src={media?.url ?? ''} />
                  )}
                </Link>
                <div className="product-card-body">
                  <div className="product-card-topline">
                    <span className="badge badge-soft">{product.category}</span>
                    <strong className="product-price">{product.price.display}</strong>
                  </div>
                  <h3 className="product-title">
                    <Link to={`/shop/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="product-tagline">{product.tagline}</p>
                  <div className="hero-actions">
                    <button className="button" onClick={() => addItem(product.slug)} type="button">
                      Add to cart
                    </button>
                    <Link className="button button-secondary" to={`/shop/${product.slug}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

