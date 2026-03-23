import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { buildBreadcrumbSchema, organizationSchema } from '@/lib/schema';

export const AboutPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Learn how Camp Dream GA combines premium camp storytelling, thoughtful operations, and product-led monetization."
      path="/about"
      structuredData={[
        organizationSchema,
        buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' },
        ]),
      ]}
      title="About Camp Dream GA"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/about', label: 'About' }]} />
        <p className="eyebrow">About the brand</p>
        <h1>Camp Dream GA is where premium camp energy meets practical launch discipline.</h1>
        <p className="lede">
          The brand exists for two groups at once: families looking for meaningful outdoor
          experiences and founders or organizations shaping their own camp-inspired offers. The
          throughline is the same in both cases: make the experience feel trustworthy before anyone
          arrives on site.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container split-layout">
        <div>
          <h2>We believe the public site is part of the hospitality experience.</h2>
          <p>
            Families often decide whether a camp feels safe, warm, and worth the investment long
            before they speak to a human. A clear website, thoughtful policies, and strong
            preparation tools are not just marketing assets. They are part of the experience itself.
          </p>
          <p>
            That is why Camp Dream GA leads with original storytelling, scannable page architecture,
            and visible legal trust. It is also why the operator tooling stays hidden and protected:
            visitors should feel care, not internal machinery.
          </p>
        </div>
        <div className="panel">
          <p className="eyebrow">What this brand prioritizes</p>
          <ul className="check-list">
            <li>Warm, outdoors-inspired design that feels elevated rather than rustic-by-default</li>
            <li>Original content and resource hubs that can support SEO and AdSense approval</li>
            <li>Product-first revenue paths with ads limited to compliant educational templates</li>
            <li>Operational tooling that improves launch quality without leaking into the public UX</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Local roots</p>
          <h2>Grounded in Georgia pace, hospitality, and outdoor culture</h2>
          <p>
            Camp Dream GA draws from North Georgia weekend rhythms, Atlanta-family expectations,
            and the kind of community storytelling that makes people feel welcomed instead of sold
            to. That local grounding gives the site more texture and helps resource content feel
            more useful than generic national advice.
          </p>
        </div>
        <div className="card-grid">
          <article className="panel">
            <h3>For families</h3>
            <p>
              We help turn a camp decision into a clear, confident yes by reducing ambiguity around
              readiness, logistics, and value.
            </p>
          </article>
          <article className="panel">
            <h3>For founders</h3>
            <p>
              We shape offer architecture, public trust pages, and hidden operator systems that make
              a launch feel premium from day one.
            </p>
          </article>
          <article className="panel">
            <h3>For long-term growth</h3>
            <p>
              We design the content system so that guides, FAQs, and comparison pages can support
              organic discovery without becoming thin traffic traps.
            </p>
          </article>
        </div>
      </div>
    </section>
  </>
);
