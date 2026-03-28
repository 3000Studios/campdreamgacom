import { Link } from 'react-router-dom';

export const TopDisclaimerBar = (): JSX.Element => (
  <div className="top-disclaimer" role="note">
    <div className="container top-disclaimer-inner">
      <p>
        Disclaimer: Camp Dream is operated by the Camp Dream Foundation (501(c)(3), EIN 58-1444915).
        Program details, dates, and availability may change.
      </p>
      <Link to="/policy/disclaimer">Read full disclaimer</Link>
    </div>
  </div>
);
