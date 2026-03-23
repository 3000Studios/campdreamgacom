import { Link } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';

export const NotFoundPage = (): JSX.Element => (
  <>
    <SeoHead
      description="The page you requested could not be found."
      noIndex
      path="/404"
      title="Page not found"
    />
    <section className="section">
      <div className="container narrow-panel panel">
        <p className="eyebrow">404</p>
        <h1>That page is not on the trail map.</h1>
        <p>
          The public site may have moved, or the link may be outdated. Use the homepage or
          resources hub to continue.
        </p>
        <div className="hero-actions">
          <Link className="button" to="/">
            Go home
          </Link>
          <Link className="button button-secondary" to="/resources">
            Browse resources
          </Link>
        </div>
      </div>
    </section>
  </>
);
