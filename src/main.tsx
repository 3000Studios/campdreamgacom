import '@/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { ConsentProvider } from '@/state/ConsentContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConsentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConsentProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
