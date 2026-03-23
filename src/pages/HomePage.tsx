import { Link } from 'react-router-dom';

import { FaqAccordion } from '@/components/FaqAccordion';
import { SeoHead } from '@/components/SeoHead';
import { resourceArticles } from '@/content/resources';
import {
  homepageFaqs,
  pricingPlans,
  programs,
  siteStats,
  testimonials,
} from '@/content/siteContent';
import { trackEvent } from '@/lib/analytics';
import { runtimeConfig } from '@/lib/runtime';
import { buildFaqSchema, buildServiceSchema, organizationSchema, websiteSchema } from '@/lib/schema';

export const HomePage = (): JSX.Element => {
  const featuredResources = resourceArticles.slice(0, 3);

  return (
    <>
      <SeoHead
        description="Camp Dream GA blends premium outdoor programs, conversion-ready booking paths, and AdSense-safe resource content for families and retreat founders."
        path="/"
        structuredData={[
          organizationSchema,
          websiteSchema,
          buildFaqSchema(homepageFaqs),
          buildServiceSchema(
            'Camp Dream GA premium camp programs',
            'Premium family weekends, youth cohorts, and retreat launch support rooted in Georgia camp culture.',
            '/',
          ),
        ]}
        title="Premium Camp Experiences and Enrollment-Ready Storytelling"
      />

      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Revenue-first public site with camp-inspired trust</p>
            <h1 className="display-title">
              Premium Georgia camp experiences designed to convert with warmth, clarity, and
              polish.
            </h1>
            <p className="lede">
              Camp Dream GA helps families book memorable outdoor experiences and helps founders
              launch programs with better pages, better offers, and a cleaner path from interest to
              checkout.
            </p>
            <div className="hero-actions">
              <Link
                className="button"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/book' })}
                to="/book"
              >
                Book or enroll
              </Link>
              <Link
                className="button button-secondary"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/pricing' })}
                to="/pricing"
              >
                Compare offers
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
            {runtimeConfig.heroVideoUrl ? (
              <video
                autoPlay
                className="hero-media"
                loop
                muted
                playsInline
                poster="/media/hero-forest-mobile.svg"
              >
                <source src={runtimeConfig.heroVideoUrl} />
              </video>
            ) : (
              <picture>
                <source media="(max-width: 720px)" srcSet="/media/hero-forest-mobile.svg" />
                <img
                  alt="Illustrated Georgia camp landscape"
                  className="hero-media"
                  loading="eager"
                  src="/media/hero-forest-desktop.svg"
                />
              </picture>
            )}
            <div className="hero-overlay-card">
              <p className="eyebrow">Why it converts</p>
              <p>
                Product-led booking flows stay front and center while long-form guides, FAQs, and
                legal trust pages create the depth AdSense expects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container trust-strip">
          <span>Built for families, founders, schools, and retreat teams.</span>
          <span>Clear legal foundation, strong editorial UX, and compliant ad zones.</span>
          <span>Operator tools stay hidden, protected, and excluded from public discovery.</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured programs</p>
            <h2>Three ways to buy, book, or build with Camp Dream GA</h2>
            <p>
              The public site is structured around real offers first. Resource pages support demand
              generation, but revenue comes from polished enrollment and inquiry paths.
            </p>
          </div>
          <div className="card-grid">
            {programs.map((program) => (
              <article className="panel program-card" key={program.slug}>
                <span className="badge">{program.priceLabel}</span>
                <h3>{program.title}</h3>
                <p>{program.summary}</p>
                <ul className="check-list">
                  {program.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <p className="card-meta">
                  <strong>Best for:</strong> {program.audience}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Why families and founders choose us</p>
            <h2>Editorial storytelling on the front end. Operational clarity underneath.</h2>
            <p>
              Camp Dream GA is designed to feel premium without feeling vague. We use original copy,
              scannable sections, visible trust signals, and grounded pricing context so visitors
              can make decisions without friction.
            </p>
            <ul className="check-list">
              <li>Original content templates with clear H1s, summaries, FAQs, and next-step blocks</li>
              <li>No ad clutter above the fold and no ads on checkout, admin, or sensitive routes</li>
              <li>Conversion bridges from resources into booking, pricing, and inquiry flows</li>
            </ul>
          </div>
          <div className="panel layered-panel">
            <p className="eyebrow">Proof of polish</p>
            <div className="testimonial-stack">
              {testimonials.slice(0, 2).map((testimonial) => (
                <blockquote key={testimonial.name}>
                  <p>“{testimonial.quote}”</p>
                  <footer>
                    {testimonial.name}, {testimonial.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Resource funnel</p>
            <h2>Content built for SEO depth, AdSense readiness, and conversion support</h2>
            <p>
              Every resource page is substantial, original, and designed to move readers toward the
              right offer without feeling like a thin ad container.
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
        </div>
      </section>

      <section className="section">
        <div className="container pricing-callout">
          <div>
            <p className="eyebrow">Monetization system</p>
            <h2>Direct purchase, inquiry capture, and custom engagement pathways</h2>
            <p>
              Stripe and PayPal stay in clean, intent-specific paths. Higher-ticket work uses
              guided inquiry capture. Resource pages stay helpful and premium even when ad slots are
              enabled.
            </p>
          </div>
          <div className="pricing-mini-grid">
            {pricingPlans.map((plan) => (
              <div className="panel pricing-mini-card" key={plan.id}>
                <span className="badge">{plan.tag}</span>
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Questions we answer before you have to ask them</h2>
          </div>
          <FaqAccordion items={homepageFaqs} />
        </div>
      </section>
    </>
  );
};
