import './styles/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupStore } from './service/store.ts';

import App from './App.tsx';

const tg = window.Telegram?.WebApp;
const store = setupStore();

if (tg) {
  tg.ready();
  tg.expand();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
