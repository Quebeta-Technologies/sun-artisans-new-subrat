import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'

// Tiny path router; these paths are rewritten to index.html in vercel.json, everything else unknown gets public/404.html
const pages = { '/privacy-policy': PrivacyPolicy, '/terms': Terms }
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = pages[path] ?? App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
