import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AnnouncementsProvider } from './context/AnnouncementsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnnouncementsProvider>
        <App />
      </AnnouncementsProvider>
    </BrowserRouter>
  </StrictMode>,
)
