import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Chatbot } from '@/components/Chatbot';
import { ConsentBanner } from '@/components/ConsentBanner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { TopDisclaimerBar } from '@/components/TopDisclaimerBar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { bootAnalytics, loadAdsense, trackEvent } from '@/lib/analytics';
import { useConsent } from '@/state/ConsentContext';

export const PublicLayout = (): JSX.Element => {
  const location = useLocation();
  const { consent } = useConsent();

  useScrollAnimation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (consent.analytics) {
      bootAnalytics();
    }
  }, [consent.analytics]);

  useEffect(() => {
    if (consent.marketing) {
      loadAdsense();
    }
  }, [consent.marketing]);

  useEffect(() => {
    trackEvent('page_view', { page_path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <TopDisclaimerBar />
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <ConsentBanner />
    </div>
  );
};
