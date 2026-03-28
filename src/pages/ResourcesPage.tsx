import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const ResourcesPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Camp Dream resources, FAQs, location details, and events."
      path="/resources"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Resources', path: '/resources' },
      ])}
      title="Resources"
    />

    <section className="page-hero">
      <div className="page-hero-overlay" />
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/resources', label: 'Resources' },
          ]}
        />
        <p className="eyebrow">Resources</p>
        <h1>Frequently asked questions, location details, and event updates.</h1>
        <p className="lede">
          Camp Dream resources help families, volunteers, and supporters prepare for Summer Camp and
          year-round events.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container card-grid">
        <article className="panel resource-card animate-on-scroll">
          <span className="badge">Summer Camp FAQ</span>
          <h2>Get answers before applying</h2>
          <p>
            Learn about age ranges, medical support, housing, meals, activities, and camper-to-staff
            ratio.
          </p>
          <a
            className="text-link"
            href="https://www.campdreamga.org/summer-camp-faqs"
            rel="noopener noreferrer"
            target="_blank"
          >
            View Summer Camp FAQs
          </a>
        </article>
        <article className="panel resource-card animate-on-scroll">
          <span className="badge">Location</span>
          <h2>Calvin Center, Hampton GA</h2>
          <p>
            Camp Dream Summer Camp is held at the Calvin Center, a scenic 536-acre retreat and
            conference facility.
          </p>
          <a
            className="text-link"
            href="https://www.campdreamga.org/location"
            rel="noopener noreferrer"
            target="_blank"
          >
            View location details
          </a>
        </article>
        <article className="panel resource-card animate-on-scroll">
          <span className="badge">Events</span>
          <h2>Community events and fundraisers</h2>
          <p>
            Follow Camp Dream events in Georgia, including fundraisers and outreach opportunities.
          </p>
          <a
            className="text-link"
            href="https://www.campdreamga.org/events"
            rel="noopener noreferrer"
            target="_blank"
          >
            View events calendar
          </a>
        </article>
      </div>
    </section>
  </>
);
