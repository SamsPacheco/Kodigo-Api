import React from 'react';
import ReactDOM from 'react-dom/client';
import { KodigoApiApp } from './KodigoApiApp.jsx'
import { BrowserRouter } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css'; // <-- Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- JS Bundle (con Popper)
import './styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <KodigoApiApp />
    </BrowserRouter>
  </React.StrictMode>,
);
