import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { resourceArticles } from '@/content/resources';
import { buildBreadcrumbSchema } from '@/lib/schema';

const sortedArticles = [...resourceArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const ResourcesPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Original guides, FAQs, and planning resources—built to be readable and AdSense-ready."
      path="/resources"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Guides', path: '/resources' },
      ])}
      title="Guides"
    />

    <section className="section">
      <div className="container prose-shell">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/resources', label: 'Guides' },
          ]}
        />
        <p className="eyebrow">Guides</p>
        <h1>Original reads that make decisions easier.</h1>
        <p className="lede">
          This index is chronological and numbered so it stays clean as the library grows.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <ol className="guide-index">
          {sortedArticles.map((article, index) => (
            <li className="panel guide-index-row" key={article.slug}>
              <div className="guide-index-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="guide-index-main">
                <span className="badge badge-soft">{article.category}</span>
                <h2 className="guide-index-title">
                  <Link to={`/resources/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="muted">{article.description}</p>
                <div className="guide-index-meta">
                  <span>{article.readTime}</span>
                  <span>Published {article.publishedAt}</span>
                  <span>Updated {article.updatedAt}</span>
                </div>
              </div>
              <div className="guide-index-actions">
                <Link className="button button-secondary" to={`/resources/${article.slug}`}>
                  Read
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </>
);

