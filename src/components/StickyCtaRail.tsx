import { Link } from 'react-router-dom';

import { trackEvent } from '@/lib/analytics';

export const StickyCtaRail = (): JSX.Element => (
  <aside className="sticky-rail">
    <p className="eyebrow">Next step</p>
    <h3>Ready to move from research to booking?</h3>
    <p>
      Camp Dream GA keeps product-led paths front and center. Use the booking page when you are
      ready to enroll or send an inquiry if you need a more custom recommendation.
    </p>
    <div className="sticky-rail-actions">
      <Link
        className="button"
        onClick={() => trackEvent('cta_click', { placement: 'sticky_rail', target: '/book' })}
        to="/book"
      >
        Book or enroll
      </Link>
      <Link
        className="button button-secondary"
        onClick={() => trackEvent('cta_click', { placement: 'sticky_rail', target: '/pricing' })}
        to="/pricing"
      >
        Compare pricing
      </Link>
    </div>
  </aside>
);
