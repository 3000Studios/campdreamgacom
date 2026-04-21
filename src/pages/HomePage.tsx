import { Link } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';
import { collections, products } from '@/content/products';
import { resourceArticles } from '@/content/resources';
import { trackEvent } from '@/lib/analytics';
import { organizationSchema, websiteSchema } from '@/lib/schema';

export const HomePage = (): JSX.Element => {
  const featuredProducts = products.slice(0, 6);
  const featuredResources = resourceArticles.slice(0, 3);
  const heroCollection = collections[0];

  return (
    <>
      <SeoHead
        description="A bright, joyful storefront with camp-inspired finds, cozy vibes, and original guides—designed for AdSense review readiness."
        path="/"
        structuredData={[organizationSchema, websiteSchema]}
        title="Camp Dream Store"
      />

      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Storefront</p>
            <h1 className="display-title">Joyful gear for bright days outdoors.</h1>
            <p className="lede">
              Shop cozy favorites, tiny gifts, and daytrip essentials. Then dive into our guides
              for planning, packing, and keeping the vibe effortless.
            </p>
            <div className="hero-actions">
              <Link
                className="button"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/shop' })}
                to="/shop"
              >
                Shop now
              </Link>
              <Link
                className="button button-secondary"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/collections' })}
                to="/collections"
              >
                Explore collections
              </Link>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <strong>{products.length}+</strong>
                <span>joyful products</span>
              </div>
              <div className="stat-card">
                <strong>{collections.length}</strong>
                <span>curated collections</span>
              </div>
              <div className="stat-card">
                <strong>{resourceArticles.length}</strong>
                <span>original guides</span>
              </div>
            </div>
          </div>

          <div className="hero-visual panel">
            <video
              autoPlay
              className="hero-media"
              loop
              muted
              playsInline
              poster="/media/252131-poster.jpg"
            >
              <source src="/media/252131-web.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay-card panel">
              <p className="eyebrow">AdSense-ready content</p>
              <h2>Built to look good and read well.</h2>
              <p>Original guides plus a storefront structure designed for clean navigation.</p>
              <Link className="text-link" to="/resources">
                Browse guides
              </Link>
            </div>
          </div>
        </div>

        <div className="container trust-strip">
          <span>Bright visuals, responsive layout, joyful motion.</span>
          <span>Clear navigation + legal pages for AdSense review.</span>
          <span>Original guide content designed for readability.</span>
          <span>Storefront flow with cart + checkout request.</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured</p>
            <h2>Popular picks</h2>
            <p>Start with a few crowd-pleasers, then explore the full shop.</p>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => {
              const media = product.media[0];
              return (
                <article className="panel product-card" key={product.slug}>
                  <Link className="product-card-media" to={`/shop/${product.slug}`}>
                    {media?.kind === 'video' ? (
                      <video
                        autoPlay
                        className="product-card-img"
                        loop
                        muted
                        playsInline
                        poster={media.posterUrl}
                      >
                        <source src={media.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        alt={media?.alt ?? product.name}
                        className="product-card-img"
                        loading="lazy"
                        src={media?.url ?? ''}
                      />
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
                    <Link className="text-link" to={`/shop/${product.slug}`}>
                      View details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="section-cta-row">
            <Link className="button button-secondary" to="/shop">
              Shop all products
            </Link>
            <Link className="button" to="/collections">
              Browse collections
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Collections</p>
            <h2>Pick a vibe. We’ll hand you the highlights.</h2>
            <p>
              Collections are a faster way to shop—cozy sets, tiny gifts, and daytrip essentials
              bundled by mood.
            </p>
            <ul className="check-list">
              <li>Shortlists that feel curated, not cluttered</li>
              <li>Great for gifting (or treating yourself)</li>
              <li>Built for photos, joy, and easy decisions</li>
            </ul>
          </div>
          <div className="panel layered-panel">
            <p className="eyebrow">Featured collection</p>
            <h3>{heroCollection?.name ?? 'Collections'}</h3>
            <p>{heroCollection?.description ?? ''}</p>
            <div className="hero-actions">
              <Link className="button" to={heroCollection ? `/collections/${heroCollection.slug}` : '/collections'}>
                Shop this collection
              </Link>
              <Link className="button button-secondary" to="/checkout">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Guides</p>
            <h2>Read, plan, pack, and go.</h2>
            <p>
              Original guides designed for clarity and readability, with auto-playing video headers
              for a richer on-page experience.
            </p>
          </div>
          <div className="card-grid">
            {featuredResources.map((article) => (
              <article className="panel resource-card" key={article.slug}>
                <span className="badge">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <Link className="text-link" to={`/resources/${article.slug}`}>
                  Read the guide
                </Link>
              </article>
            ))}
          </div>
          <div className="section-cta-row">
            <Link className="button button-secondary" to="/resources">
              Browse all guides
            </Link>
            <Link className="button" to="/shop">
              Shop the picks
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

