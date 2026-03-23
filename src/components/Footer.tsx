import { Link } from 'react-router-dom';

import { resourceArticles } from '@/content/resources';
import { footerNavigation, primaryNavigation } from '@/content/siteContent';
import { runtimeConfig } from '@/lib/runtime';

export const Footer = (): JSX.Element => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <p className="footer-kicker">Camp Dream GA</p>
        <h2 className="footer-heading">Premium camp experiences and enrollment-ready storytelling.</h2>
        <p className="footer-copy">
          Camp Dream GA blends outdoor hospitality, thoughtful program design, and a cleaner path
          from inspiration to booking. The public site stays trust-first while the operator side
          remains protected and off the public map.
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
        <p className="footer-list-title">Resources</p>
        <div className="footer-link-list">
          {resourceArticles.slice(0, 3).map((article) => (
            <Link key={article.slug} to={`/resources/${article.slug}`}>
              {article.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="footer-list-title">Trust and contact</p>
        <div className="footer-link-list">
          <a href={`mailto:${runtimeConfig.contactEmail}`}>{runtimeConfig.contactEmail}</a>
          {footerNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
    <div className="container footer-bar">
      <p>© 2026 Camp Dream GA. All rights reserved.</p>
      <p>Canonical domain: {runtimeConfig.siteDomain}</p>
    </div>
  </footer>
);
