import { Link } from 'react-router-dom';

import { resourceArticles } from '@/content/resources';
import { footerNavigation, primaryNavigation } from '@/content/siteContent';

export const Footer = (): JSX.Element => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <p className="footer-kicker">Camp Dream Store</p>
        <h2 className="footer-heading">A joyful, camp-inspired storefront.</h2>
        <p className="footer-copy">
          This repo is a sandbox storefront concept with curated visuals and original guide content
          designed to be AdSense-review-ready.
        </p>
      </div>

      <div>
        <p className="footer-list-title">Explore</p>
        <div className="footer-link-list">
          {primaryNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="footer-list-title">Latest Guides</p>
        <div className="footer-link-list">
          {resourceArticles.slice(0, 3).map((article) => (
            <Link key={article.slug} to={`/resources/${article.slug}`}>
              {article.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="footer-list-title">Contact and Policies</p>
        <div className="footer-link-list">
          <Link to="/contact">Contact</Link>
          <span className="muted">Media sources: Unsplash + Coverr</span>
          {footerNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
    <div className="container footer-bar">
      <p>© 2026 Camp Dream Store. All rights reserved.</p>
      <p>campdreamga.com</p>
    </div>
  </footer>
);
