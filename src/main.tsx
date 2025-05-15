import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Update the title
document.title = 'Luna - Menstrual Cycle Tracker';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);