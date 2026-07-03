import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Yenileyince tarayıcının eski scroll konumunu hatırlamasını engelle → her zaman en üst
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
