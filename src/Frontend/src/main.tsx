import './styles/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupStore } from './service/store.ts';

import App from './App.tsx';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
);
