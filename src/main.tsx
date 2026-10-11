import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './glass.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'
import { ThemeProvider } from './theme/ThemeContext.tsx'
import { GlassThemeProvider } from './theme/GlassThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider><GlassThemeProvider><LanguageProvider><App /></LanguageProvider></GlassThemeProvider></ThemeProvider>
  </StrictMode>,
)
