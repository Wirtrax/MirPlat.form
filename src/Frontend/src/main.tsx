import './styles/main.scss';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupStore } from './service/store.ts';

import App from './App.tsx';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
);
