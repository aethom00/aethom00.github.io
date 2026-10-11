import { createContext, useContext } from 'react'

export type GlassTheme = 'light' | 'dark'

export type GlassThemeContextValue = {
  theme: GlassTheme
  toggleTheme: () => void
}

export const GLASS_THEME_STORAGE_KEY = 'glass-theme'

export const GlassThemeContext = createContext<GlassThemeContextValue | null>(null)

export function initialGlassTheme(): GlassTheme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(GLASS_THEME_STORAGE_KEY)
  return stored === 'dark' ? 'dark' : 'light'
}

export function useGlassTheme() {
  const context = useContext(GlassThemeContext)
  if (!context) throw new Error('useGlassTheme must be used within GlassThemeProvider')
  return context
}
