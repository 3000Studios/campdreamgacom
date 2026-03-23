import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SeoHead } from '@/components/SeoHead';
import { homepageFaqs, pricingFeatureRows, pricingPlans } from '@/content/siteContent';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';

export const PricingPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Compare direct purchase, inquiry-first, and premium engagement options across Camp Dream GA pricing paths."
      path="/pricing"
      structuredData={[
        buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Pricing', path: '/pricing' },
        ]),
        buildFaqSchema(homepageFaqs),
      ]}
      title="Pricing and Booking Paths"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[{ href: '/', label: 'Home' }, { href: '/pricing', label: 'Pricing' }]}
        />
        <p className="eyebrow">Pricing built around intent</p>
        <h1>Direct purchase where it helps. Inquiry-led guidance where it converts better.</h1>
        <p className="lede">
          Camp Dream GA separates family bookings, youth enrollments, and higher-ticket launch work
          so that each path feels natural. This keeps checkout clean, trust intact, and ad placement
          completely out of the way.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container pricing-grid">
        {pricingPlans.map((plan) => (
          <article className="panel pricing-card" key={plan.id}>
            <span className="badge">{plan.tag}</span>
            <h2>{plan.name}</h2>
            <strong className="pricing-amount">{plan.price}</strong>
            <p className="pricing-cadence">{plan.cadence}</p>
            <p>{plan.summary}</p>
            {plan.highlight ? <p className="pricing-highlight">{plan.highlight}</p> : null}
            <Link className="button" to={plan.ctaHref}>
              {plan.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Comparison table</p>
          <h2>Compare what each path is optimized to do</h2>
        </div>
        <div className="comparison-table-wrapper panel">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Decision factor</th>
                {pricingPlans.map((plan) => (
                  <th key={plan.id}>{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingFeatureRows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {pricingPlans.map((plan) => (
                    <td key={plan.id}>{row.values[plan.id]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container split-layout">
        <div>
          <p className="eyebrow">Monetization clarity</p>
          <h2>Why we keep ads off pricing and checkout pages</h2>
          <p>
            Pricing pages exist to help people buy with confidence. Ads stay on approved resource
            templates only, which protects conversion, avoids deceptive placement, and keeps the
            premium feel intact.
          </p>
        </div>
        <div className="panel">
          <FaqAccordion items={homepageFaqs.slice(0, 2)} />
        </div>
      </div>
    </section>
  </>
);
