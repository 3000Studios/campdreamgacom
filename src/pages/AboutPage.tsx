import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { buildBreadcrumbSchema, organizationSchema } from '@/lib/schema';

export const AboutPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Learn about the Camp Dream Store sandbox storefront: joyful design, original guides, and AdSense-ready structure."
      path="/about"
      structuredData={[
        organizationSchema,
        buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' },
        ]),
      ]}
      title="About"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
          ]}
        />
        <p className="eyebrow">About</p>
        <h1>A sandbox storefront built for joy, motion, and clean navigation.</h1>
        <p className="lede">
          This repository is a concept store: product pages, collections, a cart flow, and a growing
          library of original guides designed to be readable and AdSense-review-ready.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container split-layout">
        <div>
          <h2>What we’re building</h2>
          <p>
            A playful storefront experience that feels premium and light: responsive layout, hover
            glow, animated backdrops, and video-forward storytelling that stays behind readable
            content.
          </p>
          <p>
            The goal is to keep the site simple for visitors while keeping it technically ready for
            monetization review: clear navigation, legal pages, crawlable content, and a clean
            index for guides.
          </p>
        </div>
        <div className="panel">
          <p className="eyebrow">What’s included</p>
          <ul className="check-list">
            <li>Storefront: shop, product pages, cart, checkout request</li>
            <li>Collections: curated “pick a vibe” shopping</li>
            <li>Guides: chronological, numbered index + article pages</li>
            <li>AdSense readiness: policies, sitemap, robots, ads loader gates</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Design ethos</p>
          <h2>Joyful, readable, and fast.</h2>
          <p>
            Motion and 3D-style visuals should support delight without compromising accessibility,
            performance, or clarity.
          </p>
        </div>
        <div className="card-grid">
          <article className="panel">
            <h3>For shoppers</h3>
            <p>Fast scanning, clean product pages, and easy “email order request” checkout.</p>
          </article>
          <article className="panel">
            <h3>For readers</h3>
            <p>Original guides with consistent structure and auto-playing video headers.</p>
          </article>
          <article className="panel">
            <h3>For growth</h3>
            <p>Ad-ready templates, SEO metadata, and content that can expand over time.</p>
          </article>
        </div>
      </div>
    </section>
  </>
);
