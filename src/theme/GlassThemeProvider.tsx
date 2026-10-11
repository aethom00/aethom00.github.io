import { useEffect, useState, type ReactNode } from 'react'
import { GLASS_THEME_STORAGE_KEY, GlassThemeContext, initialGlassTheme, type GlassTheme } from './glassThemeState'

export function GlassThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<GlassTheme>(initialGlassTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-glass-theme', theme)
    window.localStorage.setItem(GLASS_THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  return <GlassThemeContext.Provider value={{ theme, toggleTheme }}>{children}</GlassThemeContext.Provider>
}
