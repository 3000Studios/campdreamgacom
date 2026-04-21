import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { products } from '@/content/products';
import { buildBreadcrumbSchema } from '@/lib/schema';

const categories = Array.from(new Set(products.map((product) => product.category))).sort((a, b) =>
  a.localeCompare(b),
);

export const ShopPage = (): JSX.Element => (
  <>
    <SeoHead
      description="A bright, joyful storefront filled with camp-inspired finds, cozy vibes, and daytrip essentials."
      path="/shop"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
      ])}
      title="Shop"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/shop', label: 'Shop' },
          ]}
        />
        <p className="eyebrow">Storefront</p>
        <h1>Shop the joyful stuff.</h1>
        <p className="lede">
          Bright gear, cozy favorites, and tiny gifts designed to feel like a good day outdoors.
        </p>
      </div>
    </section>

    <section className="section section-tight">
      <div className="container filter-row">
        {categories.map((category) => (
          <a className="pill" href={`#category-${category.toLowerCase().replaceAll(' ', '-')}`} key={category}>
            {category}
          </a>
        ))}
      </div>
    </section>

    <section className="section">
      <div className="container">
        {categories.map((category) => {
          const anchor = `category-${category.toLowerCase().replaceAll(' ', '-')}`;
          const categoryProducts = products.filter((product) => product.category === category);
          return (
            <section className="section-tight" id={anchor} key={category}>
              <div className="section-heading">
                <p className="eyebrow">{category}</p>
                <h2>{category === 'Digital' ? 'Instant joy' : 'Pick your favorites'}</h2>
              </div>
              <div className="product-grid">
                {categoryProducts.map((product) => {
                  const primaryMedia = product.media[0];
                  return (
                    <article className="panel product-card" key={product.slug}>
                      <Link className="product-card-media" to={`/shop/${product.slug}`}>
                        {primaryMedia?.kind === 'video' ? (
                          <video
                            autoPlay
                            className="product-card-img"
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
                            className="product-card-img"
                            loading="lazy"
                            src={primaryMedia?.url ?? ''}
                          />
                        )}
                      </Link>
                      <div className="product-card-body">
                        <div className="product-card-topline">
                          <div className="product-badges">
                            {product.badges.slice(0, 2).map((badge) => (
                              <span className="badge badge-soft" key={badge}>
                                {badge}
                              </span>
                            ))}
                          </div>
                          <strong className="product-price">{product.price.display}</strong>
                        </div>
                        <h3 className="product-title">
                          <Link to={`/shop/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <p className="product-tagline">{product.tagline}</p>
                        <Link className="text-link" to={`/shop/${product.slug}`}>
                          View details
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  </>
);

