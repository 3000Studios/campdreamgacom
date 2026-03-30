import { Outlet } from 'react-router-dom';

import { TopDisclaimerBar } from '@/components/TopDisclaimerBar';

export const OperatorLayout = (): JSX.Element => (
  <div className="operator-shell">
    <TopDisclaimerBar />
    <div className="operator-shell-panel">
      <Outlet />
    </div>
  </div>
);
