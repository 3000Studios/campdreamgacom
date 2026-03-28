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
import {
  buildFaqSchema,
  buildServiceSchema,
  organizationSchema,
  websiteSchema,
} from '@/lib/schema';

export const HomePage = (): JSX.Element => {
  const featuredResources = resourceArticles.slice(0, 3);

  return (
    <>
      <SeoHead
        description="Camp Dream believes all children and young adults with moderate to severe disabilities deserve recreational and social experiences."
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
        title="Camp Dream Georgia"
      />

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="animate-on-scroll slide-in-left">
            <p className="eyebrow">Camp Dream Foundation</p>
            <h1 className="display-title">
              Camp Dream believes every child and young adult with disabilities deserves camp.
            </h1>
            <p className="lede">
              Since 1996, Camp Dream has provided traditional summer camp experiences for children
              and young adults with moderate to severe disabilities regardless of financial
              situation.
            </p>
            <div className="hero-actions">
              <Link
                className="button"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/book' })}
                to="/book"
              >
                Donate
              </Link>
              <Link
                className="button button-secondary"
                onClick={() => trackEvent('cta_click', { placement: 'hero', target: '/programs' })}
                to="/programs"
              >
                Volunteer
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

          <div className="hero-visual panel animate-on-scroll slide-in-right">
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
                  alt="Camp Dream Georgia outdoor camp"
                  className="hero-media"
                  loading="eager"
                  src="/media/hero-forest-desktop.svg"
                />
              </picture>
            )}
            <div className="hero-overlay-card">
              <p className="eyebrow">Mission</p>
              <p>
                We never turn away a camper because of the severity of disability or inability to
                pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight animate-on-scroll">
        <div className="container trust-strip">
          <span>Summer Camp and Camp Out programs.</span>
          <span>100% volunteer-led with one-to-one counselor support.</span>
          <span>Supported by donors, sponsors, and community partners.</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading animate-on-scroll">
            <p className="eyebrow">Featured programs</p>
            <h2>Three ways to get involved with Camp Dream</h2>
            <p>
              Camp Dream serves campers through Summer Camp, empowers volunteers through one-to-one
              counselor experiences, and grows access through donor support.
            </p>
          </div>
          <div className="card-grid">
            {programs.map((program) => (
              <article className="panel program-card animate-on-scroll" key={program.slug}>
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
          <div className="animate-on-scroll slide-in-left">
            <p className="eyebrow">Why families and founders choose us</p>
            <h2>Camp Dream creates joy, dignity, and belonging.</h2>
            <p>
              Campers build friendships and confidence through safe, engaging activities that reduce
              social isolation and reinforce life skills.
            </p>
            <ul className="check-list">
              <li>Inclusive programs designed for moderate to severe disabilities</li>
              <li>Medical and counselor support in every session</li>
              <li>Barrier-free camp opportunities funded by community generosity</li>
            </ul>
          </div>
          <div className="panel layered-panel animate-on-scroll slide-in-right">
            <p className="eyebrow">Camp Dream voices</p>
            <div className="testimonial-stack">
              {testimonials.slice(0, 2).map((testimonial) => (
                <blockquote key={testimonial.name}>
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
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
          <div className="section-heading animate-on-scroll">
            <p className="eyebrow">Resource funnel</p>
            <h2>Helpful resources for families, volunteers, and donors</h2>
            <p>
              Use these guides and updates to plan for camp, answer common questions, and support
              the mission.
            </p>
          </div>
          <div className="card-grid">
            {featuredResources.map((article) => (
              <article className="panel resource-card animate-on-scroll" key={article.slug}>
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
        <div className="container pricing-callout animate-on-scroll">
          <div>
            <p className="eyebrow">Summer Camp 2026</p>
            <h2>Camper registration and volunteer applications are open</h2>
            <p>
              Camp is held at the Calvin Center in Hampton, Georgia. Contact the Camp Director at
              summercamp@campdreamga.org or 678-367-0040 for session questions.
            </p>
          </div>
          <div className="pricing-mini-grid">
            {pricingPlans.map((plan) => (
              <div className="panel pricing-mini-card animate-on-scroll" key={plan.id}>
                <span className="badge">{plan.tag}</span>
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section animate-on-scroll">
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
