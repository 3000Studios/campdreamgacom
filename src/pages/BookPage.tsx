import { Breadcrumbs } from '@/components/Breadcrumbs';
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

    <section className="page-hero">
      <div className="page-hero-overlay" />
      <div className="container">
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
      <div className="container pricing-grid">
        <article className="panel pricing-card animate-on-scroll">
          <span className="badge">Primary</span>
          <h2>Online Donation</h2>
          <p>Donate securely to Camp Dream Foundation.</p>
          <a
            className="button"
            href="https://app.formassembly.com/4723988"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate
          </a>
        </article>
        <article className="panel pricing-card animate-on-scroll">
          <span className="badge">Monthly impact</span>
          <h2>Round-Up Program</h2>
          <p>Round up your change to support Camp Dream programs year-round.</p>
          <a
            className="button"
            href="https://donate.caringcent.com/#/go/campdream"
            rel="noopener noreferrer"
            target="_blank"
          >
            Join Round-Up
          </a>
        </article>
        <article className="panel pricing-card animate-on-scroll">
          <span className="badge">Volunteer support</span>
          <h2>Supplies Needed</h2>
          <p>Support Summer Camp and Camp Out by donating supplies from our list.</p>
          <a
            className="button"
            href="https://smile.amazon.com/gp/clpf"
            rel="noopener noreferrer"
            target="_blank"
          >
            View Supplies List
          </a>
        </article>
      </div>
    </section>
  </>
);
