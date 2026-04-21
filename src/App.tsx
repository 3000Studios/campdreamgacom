import { Route, Routes } from 'react-router-dom';

import { OperatorLayout } from '@/components/OperatorLayout';
import { PublicLayout } from '@/components/PublicLayout';
import { runtimeConfig } from '@/lib/runtime';
import { AboutPage } from '@/pages/AboutPage';
import { BookingStatusPage } from '@/pages/BookingStatusPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { CollectionDetailPage } from '@/pages/CollectionDetailPage';
import { CollectionsPage } from '@/pages/CollectionsPage';
import { ContactPage } from '@/pages/ContactPage';
import { HomePage } from '@/pages/HomePage';
import { LegalPageView } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OperatorDashboardPage } from '@/pages/OperatorDashboardPage';
import { OperatorLoginPage } from '@/pages/OperatorLoginPage';
import { ProductPage } from '@/pages/ProductPage';
import { ResourceArticlePage } from '@/pages/ResourceArticlePage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { ShopPage } from '@/pages/ShopPage';
import { ThanksPage } from '@/pages/ThanksPage';

const App = (): JSX.Element => {
  const adminRoute = runtimeConfig.adminRouteSlug;

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:slug" element={<ProductPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/programs" element={<CollectionsPage />} />
        <Route path="/pricing" element={<ShopPage />} />
        <Route path="/book" element={<CheckoutPage />} />
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
