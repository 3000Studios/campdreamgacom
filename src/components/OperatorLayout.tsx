import { Outlet } from 'react-router-dom';

import { SiteVideoBackdrop } from '@/components/SiteVideoBackdrop';
import { TopDisclaimerBar } from '@/components/TopDisclaimerBar';

export const OperatorLayout = (): JSX.Element => (
  <div className="operator-shell">
    <SiteVideoBackdrop />
    <TopDisclaimerBar />
    <div className="operator-shell-panel">
      <Outlet />
    </div>
  </div>
);
