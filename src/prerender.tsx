import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';

import App from '@/App';
import { getPublicRouteEntries } from '@/content/routes';
import { CartProvider } from '@/state/CartContext';
import { ConsentProvider } from '@/state/ConsentContext';

interface HelmetContext {
  helmet?: HelmetServerState;
}

export interface PrerenderedRoute {
  body: string;
  helmet: HelmetServerState;
}

export const prerenderRoutePaths: string[] = getPublicRouteEntries()
  .filter((entry) => !entry.noIndex)
  .map((entry) => entry.path);

export const renderRouteForPrerender = (path: string): PrerenderedRoute => {
  const helmetContext: HelmetContext = {};

  const body = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <ConsentProvider>
          <CartProvider>
            <StaticRouter location={path}>
              <App />
            </StaticRouter>
          </CartProvider>
        </ConsentProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );

  if (!helmetContext.helmet) {
    throw new Error(`Helmet did not produce server state for ${path}.`);
  }

  return {
    body,
    helmet: helmetContext.helmet,
  };
};
