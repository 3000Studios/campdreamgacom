import { Link, useLocation } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';

export const ThanksPage = (): JSX.Element => {
  const location = useLocation();
  const source = new URLSearchParams(location.search).get('source');

  return (
    <>
      <SeoHead
        description="Thank you for contacting Camp Dream GA."
        noIndex
        path="/thanks"
        title="Thanks for reaching out"
      />
      <section className="section">
        <div className="container narrow-panel panel">
          <p className="eyebrow">Demo page</p>
          <h1>Submissions are disabled on this test site.</h1>
          <p>
            No inquiry was sent from this demo. If you need official Camp Dream information, use{' '}
            <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
              campdreamga.org
            </a>
            . Demo source: <strong>{source ?? 'general inquiry'}</strong>.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/pricing">
              Review pricing
            </Link>
            <Link className="button button-secondary" to="/resources">
              Keep exploring resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
