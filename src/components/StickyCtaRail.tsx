import { Link } from 'react-router-dom';

import { trackEvent } from '@/lib/analytics';

export const StickyCtaRail = (): JSX.Element => (
  <aside className="sticky-rail">
    <p className="eyebrow">Next step</p>
    <h3>Ready to turn ideas into a cart?</h3>
    <p>
      Browse the shop, add a few favorites, and use checkout to send an order request (or pay
      directly when payment links are configured).
    </p>
    <div className="sticky-rail-actions">
      <Link
        className="button"
        onClick={() => trackEvent('cta_click', { placement: 'sticky_rail', target: '/shop' })}
        to="/shop"
      >
        Shop now
      </Link>
      <Link
        className="button button-secondary"
        onClick={() => trackEvent('cta_click', { placement: 'sticky_rail', target: '/checkout' })}
        to="/checkout"
      >
        Checkout
      </Link>
    </div>
  </aside>
);
