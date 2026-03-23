import { Link } from 'react-router-dom';

import { useConsent } from '@/state/ConsentContext';

export const ConsentBanner = (): JSX.Element | null => {
  const { acceptAll, acceptEssential, consent } = useConsent();

  if (consent.status !== 'unset') {
    return null;
  }

  return (
    <aside aria-live="polite" className="consent-banner">
      <div>
        <p className="consent-title">Your privacy choices</p>
        <p className="consent-copy">
          We use essential storage for security and optional analytics or ad tools only after you
          say yes. Read the full details in our <Link to="/policy/cookies">Cookie Policy</Link>.
        </p>
      </div>
      <div className="consent-actions">
        <button className="button button-secondary" onClick={acceptEssential} type="button">
          Essentials only
        </button>
        <button className="button" onClick={acceptAll} type="button">
          Accept analytics and ads
        </button>
      </div>
    </aside>
  );
};
