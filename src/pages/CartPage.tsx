import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { getProductBySlug } from '@/content/products';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { useCart } from '@/state/CartContext';

export const CartPage = (): JSX.Element => {
  const { clear, items, removeItem, setQuantity, subtotalDisplay, totalItems } = useCart();

  return (
    <>
      <SeoHead
        description="Your cart for the Camp Dream Store demo storefront."
        path="/cart"
        structuredData={buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Cart', path: '/cart' },
        ])}
        title="Cart"
      />

      <section className="section">
        <div className="container prose-shell">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/cart', label: 'Cart' },
            ]}
          />
          <p className="eyebrow">Cart</p>
          <h1>Your joyful haul.</h1>
          <p className="lede">
            {totalItems === 0
              ? 'Your cart is empty. Grab something bright.'
              : 'Review your picks, then head to checkout.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container cart-layout">
          <div className="panel cart-panel">
            {items.length === 0 ? (
              <div className="empty-panel">
                <p>No items yet.</p>
                <Link className="button" to="/shop">
                  Browse the shop
                </Link>
              </div>
            ) : (
              <div className="cart-list">
                {items.map((item) => {
                  const product = getProductBySlug(item.productSlug);
                  if (!product) {
                    return (
                      <div className="cart-row" key={item.productSlug}>
                        <div className="cart-row-main">
                          <strong>Unknown item</strong>
                          <span className="muted">{item.productSlug}</span>
                        </div>
                        <button className="button button-ghost" onClick={() => removeItem(item.productSlug)} type="button">
                          Remove
                        </button>
                      </div>
                    );
                  }

                  const media = product.media[0];
                  return (
                    <div className="cart-row" key={product.slug}>
                      <Link className="cart-thumb" to={`/shop/${product.slug}`}>
                        {media?.kind === 'image' ? (
                          <img alt={media.alt} loading="lazy" src={media.url} />
                        ) : (
                          <video autoPlay loop muted playsInline poster={media?.posterUrl}>
                            <source src={media?.url ?? ''} type="video/mp4" />
                          </video>
                        )}
                      </Link>
                      <div className="cart-row-main">
                        <strong>
                          <Link to={`/shop/${product.slug}`}>{product.name}</Link>
                        </strong>
                        <span className="muted">{product.price.display}</span>
                      </div>
                      <div className="cart-row-actions">
                        <label className="cart-qty">
                          <span className="sr-only">Quantity</span>
                          <input
                            inputMode="numeric"
                            max={99}
                            min={1}
                            onChange={(event) => setQuantity(product.slug, Number(event.target.value))}
                            type="number"
                            value={item.quantity}
                          />
                        </label>
                        <button className="button button-ghost" onClick={() => removeItem(product.slug)} type="button">
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="panel cart-summary">
            <p className="eyebrow">Summary</p>
            <h2>Subtotal</h2>
            <p className="cart-total">{subtotalDisplay}</p>
            <div className="hero-actions">
              <Link className="button" to="/checkout">
                Checkout
              </Link>
              <Link className="button button-secondary" to="/shop">
                Keep shopping
              </Link>
            </div>
            {items.length ? (
              <button className="text-link cart-clear" onClick={clear} type="button">
                Clear cart
              </button>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
};

