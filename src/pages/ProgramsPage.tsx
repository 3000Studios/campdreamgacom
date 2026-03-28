import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { programs } from '@/content/siteContent';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';

export const ProgramsPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Volunteer as a Camp Dream counselor and support campers one-to-one."
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
      title="Volunteer and Counselors"
    />

    <section className="page-hero">
      <div className="page-hero-overlay" />
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/programs', label: 'Programs' },
          ]}
        />
        <p className="eyebrow">Volunteer</p>
        <h1>Counselors are the backbone of every Camp Dream session.</h1>
        <p className="lede">
          Counselors provide one-on-one interaction, coaching, and support to a specific camper.
          Anyone age 18 or older may serve as a counselor after background checks are completed.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container stack-layout">
        {programs.map((program) => (
          <article
            className="panel program-detail animate-on-scroll"
            id={program.slug}
            key={program.slug}
          >
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
              {program.slug === 'counselors' ? (
                <a
                  className="button"
                  href="https://www.tfaforms.com/4721374"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Counselor Application
                </a>
              ) : (
                <Link className="button" to="/book">
                  Take the next step
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);
