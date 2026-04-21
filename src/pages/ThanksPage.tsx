import { Link, useLocation } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';

export const ThanksPage = (): JSX.Element => {
  const location = useLocation();
  const source = new URLSearchParams(location.search).get('source');

  return (
    <>
      <SeoHead
        description="Thank you for contacting the Camp Dream Store."
        noIndex
        path="/thanks"
        title="Thanks"
      />
      <section className="section">
        <div className="container narrow-panel panel">
          <p className="eyebrow">Thanks</p>
          <h1>We got your message.</h1>
          <p>
            If you used the email draft, your message is now in your mail client ready to send.
            Source: <strong>{source ?? 'general'}</strong>.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/shop">
              Back to shop
            </Link>
            <Link className="button button-secondary" to="/resources">
              Read the guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
