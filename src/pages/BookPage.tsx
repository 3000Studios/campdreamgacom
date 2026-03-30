import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoNotice } from '@/components/DemoNotice';
import { SeoHead } from '@/components/SeoHead';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const BookPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Donate to Camp Dream Foundation and support camper scholarships and programs."
      path="/book"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Book', path: '/book' },
      ])}
      title="Donate"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/book', label: 'Book' },
          ]}
        />
        <p className="eyebrow">Donate</p>
        <h1>The fuel for a lifetime of memories.</h1>
        <p className="lede">
          Camp Dream depends on donors, sponsors, and partners to provide social and recreational
          opportunities to campers with disabilities. Your gift helps ensure families can pay what
          they can and still participate.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <DemoNotice className="section-heading">
          Donations and supply requests are disabled on this demo site. Visit{' '}
          <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
            campdreamga.org
          </a>{' '}
          for official Camp Dream donation options.
        </DemoNotice>
      </div>
      <div className="container pricing-grid">
        <article className="panel pricing-card">
          <span className="badge">Primary</span>
          <h2>Online Donation</h2>
          <p>Donate securely to Camp Dream Foundation.</p>
          <button className="button button-disabled" disabled type="button">
            Donate
          </button>
        </article>
        <article className="panel pricing-card">
          <span className="badge">Monthly impact</span>
          <h2>Round-Up Program</h2>
          <p>Round up your change to support Camp Dream programs year-round.</p>
          <button className="button button-disabled" disabled type="button">
            Join Round-Up
          </button>
        </article>
        <article className="panel pricing-card">
          <span className="badge">Volunteer support</span>
          <h2>Supplies Needed</h2>
          <p>Support Summer Camp and Camp Out by donating supplies from our list.</p>
          <button className="button button-disabled" disabled type="button">
            View Supplies List
          </button>
        </article>
      </div>
    </section>
  </>
);
