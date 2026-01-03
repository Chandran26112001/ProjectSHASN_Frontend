import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Debug: Add console log to verify script execution
console.log('🚀 SHASN App Loading...');

const rootElement = document.getElementById('root');

if (rootElement) {
  console.log('✅ Root element found, mounting React app...');
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
  console.log('✅ React app mounted!');
} else {
  console.error('❌ Root element not found!');
}
