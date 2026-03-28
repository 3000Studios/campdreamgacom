import { Link } from 'react-router-dom';

import { resourceArticles } from '@/content/resources';
import { footerNavigation, primaryNavigation } from '@/content/siteContent';
import { runtimeConfig } from '@/lib/runtime';

export const Footer = (): JSX.Element => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <p className="footer-kicker">Camp Dream Foundation</p>
        <h2 className="footer-heading">
          Recreational and social experiences for campers with disabilities.
        </h2>
        <p className="footer-copy">
          Since 1996, Camp Dream has provided traditional Summer Camp experiences for children and
          young adults with moderate to severe disabilities, regardless of financial situation.
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
          <a href={`mailto:${runtimeConfig.contactEmail}`}>{runtimeConfig.contactEmail}</a>
          <a href="tel:+16783670040">678-367-0040</a>
          {footerNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
    <div className="container footer-bar">
      <p>© 2026 Camp Dream Foundation. All rights reserved.</p>
      <p>{runtimeConfig.siteDomain}</p>
    </div>
  </footer>
);
