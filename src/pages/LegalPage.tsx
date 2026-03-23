import { Navigate, useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { getLegalPageBySlug } from '@/content/legal';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const LegalPageView = (): JSX.Element => {
  const { slug } = useParams();
  const page = slug ? getLegalPageBySlug(slug) : undefined;

  if (!page) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <SeoHead
        description={page.description}
        path={`/policy/${page.slug}`}
        structuredData={buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: page.title, path: `/policy/${page.slug}` },
        ])}
        title={page.title}
      />
      <section className="section">
        <div className="container prose-shell legal-prose">
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { href: `/policy/${page.slug}`, label: page.title }]}
          />
          <p className="eyebrow">Legal and trust</p>
          <h1>{page.title}</h1>
          <p className="lede">{page.description}</p>
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
};
