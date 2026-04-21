import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { getProductBySlug } from '@/content/products';
import { runtimeConfig } from '@/lib/runtime';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { useCart } from '@/state/CartContext';

const buildOrderEmailBody = (lines: string[]): string => lines.join('\n');

const buildOrderMailto = (subject: string, body: string): string => {
  const to = runtimeConfig.contactEmail;
  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', body);
  return `mailto:${to}?${params.toString()}`;
};

export const CheckoutPage = (): JSX.Element => {
  const { items, subtotalDisplay, totalItems } = useCart();

  const orderMailto = useMemo(() => {
    const orderLines = items
      .map((item) => {
        const product = getProductBySlug(item.productSlug);
        if (!product) {
          return `- ${item.productSlug} x${item.quantity}`;
        }
        return `- ${product.name} (${product.price.display}) x${item.quantity}`;
      })
      .slice(0, 32);

    const body = buildOrderEmailBody([
      'Hi!',
      '',
      'I would like to place an order for:',
      ...orderLines,
      '',
      `Cart subtotal: ${subtotalDisplay}`,
      '',
      'My name:',
      'My preferred contact method (email or phone):',
      'Shipping city/state (optional):',
      '',
      'Notes:',
      '',
      `Sent from: ${runtimeConfig.siteUrl}`,
    ]);

    return buildOrderMailto('Store order request', body);
  }, [items, subtotalDisplay]);

  const hasStripe = runtimeConfig.stripePaymentLink.trim().length > 0;
  const hasPaypal = runtimeConfig.paypalPaymentLink.trim().length > 0;

  return (
    <>
      <SeoHead
        description="Checkout and order request flow for the Camp Dream Store demo storefront."
        path="/checkout"
        structuredData={buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Checkout', path: '/checkout' },
        ])}
        title="Checkout"
      />

      <section className="section">
        <div className="container prose-shell">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/checkout', label: 'Checkout' },
            ]}
          />
          <p className="eyebrow">Checkout</p>
          <h1>Ready to make it official?</h1>
          <p className="lede">
            {totalItems === 0
              ? 'Add a few items first, then come back here for checkout.'
              : 'This storefront supports direct checkout when payment links are configured, plus an always-on order request option.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container cart-layout">
          <div className="panel cart-panel">
            <p className="eyebrow">Order request</p>
            <h2>Send your cart to the store inbox</h2>
            <p>
              Click the button below to open a pre-filled email. This works even when the site is
              hosted as a static storefront.
            </p>
            <div className="hero-actions">
              <a className={`button ${totalItems === 0 ? 'button-disabled' : ''}`} href={totalItems === 0 ? undefined : orderMailto}>
                Email my order request
              </a>
              <Link className="button button-secondary" to="/cart">
                Review cart
              </Link>
            </div>

            {hasStripe || hasPaypal ? (
              <div className="checkout-links">
                <p className="eyebrow">Direct checkout</p>
                <p className="muted">
                  These links appear only when configured via environment variables.
                </p>
                <div className="hero-actions">
                  {hasStripe ? (
                    <a className="button" href={runtimeConfig.stripePaymentLink} rel="noreferrer" target="_blank">
                      Pay with Stripe
                    </a>
                  ) : null}
                  {hasPaypal ? (
                    <a className="button button-secondary" href={runtimeConfig.paypalPaymentLink} rel="noreferrer" target="_blank">
                      Pay with PayPal
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="panel cart-summary">
            <p className="eyebrow">Summary</p>
            <h2>Cart subtotal</h2>
            <p className="cart-total">{subtotalDisplay}</p>
            <p className="muted">Taxes and shipping are confirmed in the order reply.</p>
            <div className="hero-actions">
              <Link className="button" to="/shop">
                Back to shop
              </Link>
              <Link className="button button-secondary" to="/resources">
                Read the guides
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

