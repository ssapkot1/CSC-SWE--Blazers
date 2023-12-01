import React from 'react';
//import { createRoot } from 'react-dom/client';
//import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
//import * as serviceWorker from './serviceWorker';

//const container = document.getElementById('root');
//const root = createRoot(container); // create the root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//serviceWorker.unregister();
