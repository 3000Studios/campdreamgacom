import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { SeoHead } from '@/components/SeoHead';
import { runtimeConfig } from '@/lib/runtime';
import { buildBreadcrumbSchema } from '@/lib/schema';

const renderPaymentLink = (href: string, label: string): JSX.Element =>
  href ? (
    <a className="button" href={href} rel="noreferrer" target="_blank">
      {label}
    </a>
  ) : (
    <Link className="button" to="/contact">
      {label}
    </Link>
  );

export const BookPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Choose a direct purchase, guided inquiry, or custom planning path for Camp Dream GA offers."
      path="/book"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Book', path: '/book' },
      ])}
      title="Book, Enroll, or Request a Scope"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/book', label: 'Book' }]} />
        <p className="eyebrow">Booking and enrollment</p>
        <h1>Pick the payment or inquiry path that matches your buying intent.</h1>
        <p className="lede">
          This page exists to make the decision simple. There are no ads here, no distractions, and
          no unclear pricing paths. Direct purchases stay direct, while custom engagements move into
          a guided scoping flow.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container pricing-grid">
        <article className="panel pricing-card">
          <span className="badge">Direct purchase</span>
          <h2>Dream Weekend</h2>
          <p>Use Stripe for the fastest reservation path when you already know you are ready.</p>
          {renderPaymentLink(runtimeConfig.stripePaymentLink, 'Reserve with Stripe')}
        </article>
        <article className="panel pricing-card">
          <span className="badge">Alternative payment</span>
          <h2>Trailblazer Cohort</h2>
          <p>Use PayPal when that is the easier fit for your family or organization.</p>
          {renderPaymentLink(runtimeConfig.paypalPaymentLink, 'Pay with PayPal')}
        </article>
        <article className="panel pricing-card">
          <span className="badge">Higher-ticket work</span>
          <h2>CampCraft Studio</h2>
          <p>Custom projects start with scope and timing rather than a generic checkout page.</p>
          <Link className="button" to="/contact">
            Request a custom scope
          </Link>
        </article>
      </div>
    </section>

    <section className="section">
      <div className="container split-layout">
        <div>
          <p className="eyebrow">Need help choosing?</p>
          <h2>We can still recommend the best-fit path before you buy.</h2>
          <p>
            If you are unsure whether you need a family weekend, a youth cohort, or a launch
            partnership, use the guided form and we will route your request manually.
          </p>
        </div>
        <LeadCaptureForm compact source="book-page" title="Recommend the right path for me" />
      </div>
    </section>
  </>
);
