import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function loadFonts() {
  if (document && document.fonts && document.fonts.load) {
    try {
      await document.fonts.load('16px "Caveat"');
    } catch (e) {
      console.error('Error loading font:', e);
    }
  }
}

loadFonts().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
});
