import '@/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { CartProvider } from '@/state/CartContext';
import { ConsentProvider } from '@/state/ConsentContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConsentProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ConsentProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
