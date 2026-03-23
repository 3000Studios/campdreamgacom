import { useEffect } from 'react';

import { loadAdsense } from '@/lib/analytics';
import { runtimeConfig } from '@/lib/runtime';
import { useConsent } from '@/state/ConsentContext';

interface AdSlotProps {
  className?: string;
  label?: string;
  slotId: string;
}

export const AdSlot = ({ className = '', label = 'Sponsored', slotId }: AdSlotProps): JSX.Element | null => {
  const { consent } = useConsent();

  useEffect(() => {
    if (!runtimeConfig.enableAds || !runtimeConfig.adsenseClientId || !consent.marketing) {
      return;
    }

    loadAdsense();
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // Ignore double-push attempts during hot reload or preview mode.
    }
  }, [consent.marketing]);

  if (!runtimeConfig.enableAds) {
    return null;
  }

  return (
    <aside className={`ad-slot ${className}`.trim()}>
      <span className="ad-slot-label">{label}</span>
      {runtimeConfig.adsenseClientId && consent.marketing ? (
        <ins
          className="adsbygoogle"
          data-ad-client={runtimeConfig.adsenseClientId}
          data-ad-format="auto"
          data-ad-slot={slotId}
          data-full-width-responsive="true"
          style={{ display: 'block' }}
        />
      ) : (
        <div className="ad-slot-placeholder">
          Reserved ad placement for approved resource pages. Ads stay off checkout, admin, and
          other sensitive flows.
        </div>
      )}
    </aside>
  );
};
