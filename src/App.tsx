import { Route, Routes } from 'react-router-dom';

import { OperatorLayout } from '@/components/OperatorLayout';
import { PublicLayout } from '@/components/PublicLayout';
import { runtimeConfig } from '@/lib/runtime';
import { AboutPage } from '@/pages/AboutPage';
import { BookingStatusPage } from '@/pages/BookingStatusPage';
import { BookPage } from '@/pages/BookPage';
import { ContactPage } from '@/pages/ContactPage';
import { HomePage } from '@/pages/HomePage';
import { LegalPageView } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OperatorDashboardPage } from '@/pages/OperatorDashboardPage';
import { OperatorLoginPage } from '@/pages/OperatorLoginPage';
import { PricingPage } from '@/pages/PricingPage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ResourceArticlePage } from '@/pages/ResourceArticlePage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { ThanksPage } from '@/pages/ThanksPage';

const App = (): JSX.Element => {
  const adminRoute = runtimeConfig.adminRouteSlug;

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ResourceArticlePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/booking/:status" element={<BookingStatusPage />} />
        <Route path="/policy/:slug" element={<LegalPageView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path={adminRoute} element={<OperatorLayout />}>
        <Route index element={<OperatorLoginPage />} />
        <Route path="dashboard" element={<OperatorDashboardPage />} />
      </Route>
    </Routes>
  );
};

export default App;
