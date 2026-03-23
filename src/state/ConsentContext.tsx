import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  status: 'all' | 'essential' | 'unset';
}

interface ConsentContextValue {
  acceptAll: () => void;
  acceptEssential: () => void;
  consent: ConsentState;
}

const consentStorageKey = 'campdreamga-consent';

const defaultConsent: ConsentState = {
  analytics: false,
  marketing: false,
  status: 'unset',
};

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

const deriveConsent = (value: 'all' | 'essential' | 'unset'): ConsentState => {
  if (value === 'all') {
    return {
      analytics: true,
      marketing: true,
      status: value,
    };
  }

  if (value === 'essential') {
    return {
      analytics: false,
      marketing: false,
      status: value,
    };
  }

  return defaultConsent;
};

export const ConsentProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);

  useEffect(() => {
    const stored = window.localStorage.getItem(consentStorageKey);
    if (stored === 'all' || stored === 'essential') {
      setConsent(deriveConsent(stored));
    }
  }, []);

  const contextValue = useMemo<ConsentContextValue>(
    () => ({
      acceptAll: () => {
        window.localStorage.setItem(consentStorageKey, 'all');
        setConsent(deriveConsent('all'));
      },
      acceptEssential: () => {
        window.localStorage.setItem(consentStorageKey, 'essential');
        setConsent(deriveConsent('essential'));
      },
      consent,
    }),
    [consent],
  );

  return <ConsentContext.Provider value={contextValue}>{children}</ConsentContext.Provider>;
};

export const useConsent = (): ConsentContextValue => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider.');
  }

  return context;
};
