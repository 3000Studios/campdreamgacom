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
          <p className="eyebrow">Inquiry received</p>
          <h1>Thanks. We have your request.</h1>
          <p>
            We will use the details you shared to recommend the best next step. Source:{' '}
            <strong>{source ?? 'general inquiry'}</strong>.
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
