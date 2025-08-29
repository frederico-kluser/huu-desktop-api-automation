import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Debug: Check if we're in Electron environment
console.log('React App Starting...');
console.log('Electron API available:', typeof window.electronAPI !== 'undefined');
console.log('Running in Electron:', typeof window.electronEnv !== 'undefined');

// Wait for DOM to be ready
const initApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found!');
    return;
  }
  
  console.log('Root element found, rendering React app...');
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  
  console.log('React app rendered successfully');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
