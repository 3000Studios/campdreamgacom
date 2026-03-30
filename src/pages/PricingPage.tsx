import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoNotice } from '@/components/DemoNotice';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SeoHead } from '@/components/SeoHead';
import { homepageFaqs, pricingFeatureRows, pricingPlans } from '@/content/siteContent';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';

export const PricingPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Summer Camp dates, facilities, and application details for Camp Dream."
      path="/pricing"
      structuredData={[
        buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Pricing', path: '/pricing' },
        ]),
        buildFaqSchema(homepageFaqs),
      ]}
      title="Summer Camp"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/pricing', label: 'Pricing' },
          ]}
        />
        <p className="eyebrow">Summer Camp</p>
        <h1>Camp Dream Summer Camp serves children and young adults with disabilities.</h1>
        <p className="lede">
          Summer Camp is held at the Calvin Center, 13550 Woolsey Rd, Hampton, GA 30228. 2026
          registration is open, with session dates in July.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <DemoNotice className="section-heading">
          Applications and enrollment actions are disabled on this demo site. Use{' '}
          <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
            campdreamga.org
          </a>{' '}
          for official Camp Dream application details.
        </DemoNotice>
      </div>
      <div className="container pricing-grid">
        {pricingPlans.map((plan) => (
          <article className="panel pricing-card" key={plan.id}>
            <span className="badge">{plan.tag}</span>
            <h2>{plan.name}</h2>
            <strong className="pricing-amount">{plan.price}</strong>
            <p className="pricing-cadence">{plan.cadence}</p>
            <p>{plan.summary}</p>
            {plan.highlight ? <p className="pricing-highlight">{plan.highlight}</p> : null}
            <button className="button button-disabled" disabled type="button">
              {plan.ctaLabel}
            </button>
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
          <p className="eyebrow">Camp details</p>
          <h2>What families ask before applying</h2>
          <p>
            Campers sleep in dormitory-style cabins with private baths. Meals are provided three
            times daily with dietary accommodations communicated in the application process.
          </p>
        </div>
        <div className="panel">
          <FaqAccordion items={homepageFaqs.slice(0, 2)} />
        </div>
      </div>
    </section>
  </>
);
