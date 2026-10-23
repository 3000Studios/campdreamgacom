import { Link } from 'react-router-dom';

import { BookingCta } from '@/components/BookingCta';
import { SeoHead } from '@/components/SeoHead';
import { collections, products } from '@/content/products';
import { resourceArticles } from '@/content/resources';
import { homepageFaqs, pricingPlans, programs, siteStats, testimonials } from '@/content/siteContent';
import { trackEvent } from '@/lib/analytics';
import { organizationSchema, websiteSchema } from '@/lib/schema';

export const HomePage = (): JSX.Element => {
  const featuredProducts = products.slice(0, 6);
  const featuredResources = resourceArticles.slice(0, 3);
  const heroCollection = collections[0];
  const summerCampPlan = pricingPlans.find((plan) => plan.id === 'summer-camp');

  return (
    <>
      <SeoHead
        description="Camp Dream is a joyful overnight summer camp in Hampton, Georgia for children and young adults with physical and developmental disabilities — volunteer-run since 1996, with 1:1 counselor support, full medical staff, and scholarships so no camper is turned away."
        path="/"
        structuredData={[organizationSchema, websiteSchema]}
        title="Camp Dream — Overnight Summer Camp in Hampton, Georgia"
      />

      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Camp Dream · Hampton, Georgia</p>
            <h1 className="display-title">A joyful overnight summer camp built around every camper.</h1>
            <p className="lede">
              Camp Dream serves children and young adults with moderate to severe physical and
              developmental disabilities in a barrier-free camp setting at the Calvin Center,
              with one-to-one counselor support and dedicated medical staff in every session.
            </p>
            <div className="hero-actions">
              {summerCampPlan ? (
                <a
                  className="button"
                  href={summerCampPlan.ctaHref}
                  onClick={() =>
                    trackEvent('cta_click', { placement: 'hero', target: summerCampPlan.ctaHref })
                  }
                  rel="noreferrer"
                  target="_blank"
                >
                  Book Summer Camp
                </a>
              ) : null}
              <Link
                className="button button-secondary"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/shop' })}
                to="/shop"
              >
                Shop Camp Dream gear
              </Link>
              <Link
                className="button button-secondary"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/resources' })}
                to="/resources"
              >
                Read family guides
              </Link>
            </div>
            <div className="stats-grid">
              {siteStats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
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
              <p className="eyebrow">Plan with confidence</p>
              <h2>Start with the guides families ask for most.</h2>
              <p>Original guides for choosing, packing, budgeting, and preparing for camp.</p>
              <Link className="text-link" to="/resources">
                Browse guides
              </Link>
            </div>
          </div>
        </div>

        <div className="container trust-strip">
          <span>Barrier-free camp setting in Hampton, Georgia.</span>
          <span>One-to-one counselor support throughout each session.</span>
          <span>Dedicated medical staff available in every session.</span>
          <span>Scholarships so no camper is turned away for financial reasons.</span>
        </div>
      </section>

      <BookingCta />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Ways to take part</p>
            <h2>Camp, volunteer, or help a camper get there.</h2>
            <p>
              Camp Dream is run by the Camp Dream Foundation, a 501(c)(3) nonprofit organization
              that has been serving campers since 1996.
            </p>
          </div>
          <div className="card-grid">
            {programs.map((program) => (
              <article className="panel" key={program.slug}>
                <p className="eyebrow">{program.priceLabel}</p>
                <h3>{program.title}</h3>
                <p>{program.summary}</p>
                <p>
                  <strong>Who it serves:</strong> {program.audience}
                </p>
                <p>
                  <strong>Format:</strong> {program.duration}
                </p>
                <ul className="check-list">
                  {program.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">What people say</p>
            <h2>Families and counselors remember the feeling.</h2>
            {testimonials.map((testimonial) => (
              <blockquote className="panel" key={testimonial.name}>
                <p>“{testimonial.quote}”</p>
                <p className="muted">
                  — {testimonial.name}, {testimonial.role}, {testimonial.location}
                </p>
              </blockquote>
            ))}
          </div>
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <h2>Before you apply</h2>
            {homepageFaqs.map((faq) => (
              <div key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
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

