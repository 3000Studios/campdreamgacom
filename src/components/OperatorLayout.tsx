import { Outlet } from 'react-router-dom';

export const OperatorLayout = (): JSX.Element => (
  <div className="operator-shell">
    <div className="operator-shell-panel">
      <Outlet />
    </div>
  </div>
);
