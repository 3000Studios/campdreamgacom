import { Link, Navigate, useParams } from 'react-router-dom';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { SeoHead } from '@/components/SeoHead';
import { StickyCtaRail } from '@/components/StickyCtaRail';
import { getResourceBySlug, resourceArticles } from '@/content/resources';
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';

export const ResourceArticlePage = (): JSX.Element => {
  const { slug } = useParams();
  const article = slug ? getResourceBySlug(slug) : undefined;

  if (!article) {
    return <Navigate replace to="/resources" />;
  }

  const relatedArticles = article.related
    .map((relatedSlug) => getResourceBySlug(relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      <SeoHead
        description={article.description}
        path={`/resources/${article.slug}`}
        structuredData={[
          buildBreadcrumbSchema([
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: article.title, path: `/resources/${article.slug}` },
          ]),
          buildArticleSchema(article),
          buildFaqSchema(article.faq),
        ]}
        title={article.title}
      />

      <section className="section">
        <div className="container article-layout">
          <div className="article-main">
            <Breadcrumbs
              items={[
                { href: '/', label: 'Home' },
                { href: '/resources', label: 'Resources' },
                { href: `/resources/${article.slug}`, label: article.title },
              ]}
            />
            <span className="badge">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="lede">{article.intro}</p>
            <div className="panel article-hero-media">
              <video
                autoPlay
                className="article-hero-video"
                loop
                muted
                playsInline
                poster="/media/252131-poster.jpg"
              >
                <source src="/media/252131-web.mp4" type="video/mp4" />
              </video>
              <p className="media-attribution">
                Video from{' '}
                <a className="text-link" href="https://coverr.co" rel="noreferrer" target="_blank">
                  Coverr
                </a>
              </p>
            </div>
            <div className="article-meta">
              <span>{article.readTime}</span>
              <span>Published {article.publishedAt}</span>
              <span>Updated {article.updatedAt}</span>
            </div>
            <ul className="summary-points">
              {article.summaryPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="article-body">
              {article.sections.map((section, index) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {article.adEligible && index === 1 ? <AdSlot slotId="resource-inline-1" /> : null}
                </section>
              ))}
            </div>

            <div className="panel cta-panel">
              <p className="eyebrow">Conversion bridge</p>
              <h2>{article.ctaTitle}</h2>
              <p>{article.ctaBody}</p>
              <div className="hero-actions">
                <Link className="button" to="/shop">
                  Shop the picks
                </Link>
                <Link className="button button-secondary" to="/checkout">
                  Checkout
                </Link>
              </div>
            </div>

            <section className="section-tight">
              <div className="section-heading">
                <p className="eyebrow">FAQ</p>
                <h2>Questions readers usually ask next</h2>
              </div>
              <FaqAccordion items={article.faq} />
            </section>

            <LeadCaptureForm source={`resource:${article.slug}`} title="Need a recommendation or quote?" />

            <section className="section-tight">
              <div className="section-heading">
                <p className="eyebrow">Related content</p>
                <h2>Keep exploring</h2>
              </div>
              <div className="card-grid">
                {(relatedArticles.length ? relatedArticles : resourceArticles.slice(0, 2)).map((entry) => (
                  <article className="panel resource-card" key={entry.slug}>
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    <Link className="text-link" to={`/resources/${entry.slug}`}>
                      Read next
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="article-aside">
            <StickyCtaRail />
            {article.adEligible ? <AdSlot slotId="resource-sidebar-1" /> : null}
          </div>
        </div>
      </section>
    </>
  );
};
