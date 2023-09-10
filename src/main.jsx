import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as  HashRouter } from 'react-router-dom';

import App from './components/App/App';

import './styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </Provider>
);
