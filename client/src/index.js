import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container); // create the root

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

serviceWorker.unregister();
