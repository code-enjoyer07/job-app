import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/custom.css'
import './css/bootstrap.css'
import Router from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
