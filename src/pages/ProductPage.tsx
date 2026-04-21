import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { getProductBySlug } from '@/content/products';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { useCart } from '@/state/CartContext';

export const ProductPage = (): JSX.Element => {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCart();

  const pageTitle = product ? `${product.name} | Shop` : 'Shop';

  const primaryMedia = product?.media[0];
  const gallery = useMemo(() => (product ? product.media.slice(0, 6) : []), [product]);

  if (!product) {
    return <Navigate replace to="/shop" />;
  }

  return (
    <>
      <SeoHead
        description={product.description}
        path={`/shop/${product.slug}`}
        structuredData={buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Shop', path: '/shop' },
          { label: product.name, path: `/shop/${product.slug}` },
        ])}
        title={pageTitle}
      />

      <section className="section">
        <div className="container">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop' },
              { href: `/shop/${product.slug}`, label: product.name },
            ]}
          />

          <div className="product-detail">
            <div className="panel product-hero">
              {primaryMedia?.kind === 'video' ? (
                <video
                  autoPlay
                  className="product-hero-media"
                  loop
                  muted
                  playsInline
                  poster={primaryMedia.posterUrl}
                >
                  <source src={primaryMedia.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  alt={primaryMedia?.alt ?? product.name}
                  className="product-hero-media"
                  loading="eager"
                  src={primaryMedia?.url ?? ''}
                />
              )}
              <div className="product-hero-overlay">
                <div className="product-badges">
                  {product.badges.map((badge) => (
                    <span className="badge badge-soft" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
                <h1>{product.name}</h1>
                <p className="lede">{product.tagline}</p>
                <div className="product-buy-row">
                  <strong className="product-price product-price-lg">{product.price.display}</strong>
                  <button className="button" onClick={() => addItem(product.slug)} type="button">
                    Add to cart
                  </button>
                  <Link className="button button-secondary" to="/checkout">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>

            <div className="panel product-info">
              <p className="eyebrow">{product.category}</p>
              <h2>Why you’ll love it</h2>
              <p>{product.description}</p>
              <ul className="check-list">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              {gallery.length > 1 ? (
                <div className="product-gallery">
                  {gallery.slice(1).map((media) => (
                    <figure className="product-gallery-item" key={`${media.kind}:${media.url}`}>
                      {media.kind === 'video' ? (
                        <video
                          autoPlay
                          className="product-gallery-media"
                          loop
                          muted
                          playsInline
                          poster={media.posterUrl}
                        >
                          <source src={media.url} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          alt={media.alt}
                          className="product-gallery-media"
                          loading="lazy"
                          src={media.url}
                        />
                      )}
                      {media.attribution ? (
                        <figcaption className="media-attribution">
                          Media from{' '}
                          <a className="text-link" href={media.attribution.url} rel="noreferrer" target="_blank">
                            {media.attribution.name}
                          </a>
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

