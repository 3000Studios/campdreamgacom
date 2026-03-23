import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { resourceArticles } from '@/content/resources';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const ResourcesPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Explore original planning guides, budgeting resources, and first-time camp content designed for SEO depth and compliant ad placement."
      path="/resources"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Resources', path: '/resources' },
      ])}
      title="Blog and Resources"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[{ href: '/', label: 'Home' }, { href: '/resources', label: 'Resources' }]}
        />
        <p className="eyebrow">Resources</p>
        <h1>Helpful camp planning guides that support better decisions and cleaner conversions.</h1>
        <p className="lede">
          These guides are written to be genuinely useful first. When ads are enabled, they appear
          only on eligible long-form templates and never replace the main next step.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container card-grid">
        {resourceArticles.map((article) => (
          <article className="panel resource-card" key={article.slug}>
            <span className="badge">{article.category}</span>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p className="card-meta">
              {article.readTime} · Updated {article.updatedAt}
            </p>
            <Link className="text-link" to={`/resources/${article.slug}`}>
              Read the guide
            </Link>
          </article>
        ))}
      </div>
    </section>
  </>
);
