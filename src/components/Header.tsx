import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { primaryNavigation } from '@/content/siteContent';
import { trackEvent } from '@/lib/analytics';
import { playClickSound } from '@/lib/sounds';

export const Header = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavClick = (href: string, label: string, mode?: string): void => {
    playClickSound();
    trackEvent('nav_click', { href, label, ...(mode ? { mode } : {}) });
  };

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="container nav-shell">
        <Link className="brand-mark" to="/">
          <span className="brand-mark-kicker">Camp Dream Foundation</span>
          <span className="brand-mark-title">Camp Dream Georgia</span>
        </Link>

        <nav aria-label="Primary" className="desktop-nav">
          {primaryNavigation.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
              onClick={() => handleNavClick(item.href, item.label)}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link
            className="button button-ghost desktop-book-cta"
            onClick={() => {
              playClickSound();
              trackEvent('cta_click', { placement: 'header', target: '/book' });
            }}
            to="/book"
          >
            Donate
          </Link>
          <button
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-label="Open navigation menu"
            className={`mobile-toggle ${menuOpen ? 'mobile-toggle-open' : ''}`}
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav aria-label="Mobile primary">
            {primaryNavigation.map((item) => (
              <NavLink
                key={item.href}
                className="mobile-nav-link"
                onClick={() => {
                  setMenuOpen(false);
                  handleNavClick(item.href, item.label, 'mobile');
                }}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            className="button"
            onClick={() => {
              setMenuOpen(false);
              playClickSound();
              trackEvent('cta_click', { placement: 'mobile_nav', target: '/book' });
            }}
            to="/book"
          >
            Donate to Camp Dream
          </Link>
        </div>
      </div>
    </header>
  );
};
