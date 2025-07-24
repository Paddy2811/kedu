import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

// Detect and prevent browser extensions that might cause React hooks errors
// This specifically targets the ads.914af30a.js error
const detectBadExtensions = () => {
  // Check if any script with "ads" in the name is injected
  const scripts = document.querySelectorAll('script');
  const adScripts = Array.from(scripts).filter(script => 
    script.src && (script.src.includes('ads.') || script.src.includes('ad.'))
  );
  
  if (adScripts.length > 0) {
    console.warn('Detected potentially problematic browser extensions that may interfere with React. Consider disabling them for this site.');
    
    // Attempt to remove the scripts
    adScripts.forEach(script => {
      try {
        script.remove();
      } catch (e) {
        console.error('Failed to remove problematic script:', e);
      }
    });
  }
};

// Run the detection before mounting React
detectBadExtensions();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
