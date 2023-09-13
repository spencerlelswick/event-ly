import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Auth0ProviderWithNavigate from './components/Auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </Router>
);
