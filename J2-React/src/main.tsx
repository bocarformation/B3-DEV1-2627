import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// StrictMode (DEV uniquement) : chaque effet est exécuté, nettoyé, puis ré-exécuté.
// C'est volontaire (vérifie vos cleanups). Ne PAS le retirer pour "corriger" un double appel.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
