import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { programs } from '@/content/siteContent';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';

export const ProgramsPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Explore Dream Weekend, Trailblazer Cohort, and CampCraft Studio to find the best-fit Camp Dream GA program."
      path="/programs"
      structuredData={[
        buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Programs', path: '/programs' },
        ]),
        ...programs.map((program) =>
          buildServiceSchema(program.title, program.summary, `/programs#${program.slug}`),
        ),
      ]}
      title="Programs and Services"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[{ href: '/', label: 'Home' }, { href: '/programs', label: 'Programs' }]}
        />
        <p className="eyebrow">Programs and services</p>
        <h1>Choose a camp experience, a leadership pathway, or a launch partnership.</h1>
        <p className="lede">
          Each offer is built for a different buying moment. Families can book directly. Newcomers
          can start smaller. Organizations can move into a custom engagement without pushing through
          a consumer-style checkout flow that does not fit the work.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container stack-layout">
        {programs.map((program) => (
          <article className="panel program-detail" id={program.slug} key={program.slug}>
            <div>
              <span className="badge">{program.priceLabel}</span>
              <h2>{program.title}</h2>
              <p>{program.summary}</p>
              <p>
                <strong>Best fit:</strong> {program.audience}
              </p>
            </div>
            <div>
              <p className="card-meta">
                <strong>Duration:</strong> {program.duration}
              </p>
              <ul className="check-list">
                {program.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <Link className="button" to="/book">
                Take the next step
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);
