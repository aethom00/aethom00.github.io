import { useState, type CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'
import { useGlassTheme } from '../theme/glassThemeState'
import { useLanguage, type Language } from '../i18n/languageState'

const links = [
  { key: 'home', page: 'home', href: '/', label: 'Home' },
  { key: 'projects', page: 'work', href: '/work', label: 'Work' },
  { key: 'about', page: 'about', href: '/about', label: 'About' },
  { key: 'resume', page: 'resume', href: '/resume', label: 'Resume' },
  { key: 'travel', page: 'travel', href: '/travel', label: 'Travel' },
  { key: 'contact', page: 'contact', href: '/contact', label: 'Contact' },
] as const

const languages: { code: Language, short: string }[] = [
  { code: 'en', short: 'EN' },
  { code: 'de', short: 'DE' },
  { code: 'fr', short: 'FR' },
  { code: 'pl', short: 'PL' },
  { code: 'es', short: 'ES' },
]

// `a { color: inherit }` in index.css is an unlayered rule, so it beats Tailwind's
// layered text-[...] utilities on anchors. Set anchor color inline instead, which
// always wins regardless of cascade-layer ordering.
const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const ink3Style: CSSProperties = { color: 'var(--g-ink3)' }

export default function Nav({ activePage }: { activePage: string }) {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useGlassTheme()
  const { language, setLanguage } = useLanguage()

  const navLinkStyle = (isActive: boolean): CSSProperties =>
    isActive ? { color: 'var(--g-pillink)', borderColor: 'var(--g-edge2)', background: 'var(--g-pill)', fontWeight: 500 } : { color: 'var(--g-ink3)', borderColor: 'transparent' }

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[18px]">
      <div className="glass-nav-pill flex items-center gap-1.5 rounded-full py-[9px] pl-5 pr-[10px]">
        <a href="/" style={inkStyle} className="glass-mono pr-3 text-xs uppercase tracking-[.13em]">Ashton E. Thomas</a>
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              aria-current={activePage === link.page ? 'page' : undefined}
              style={navLinkStyle(activePage === link.page)}
              className="glass-mono inline-flex items-center rounded-full border px-[15px] py-[9px] text-[11.5px] leading-none tracking-[.06em] transition-colors duration-300 hover:bg-[var(--g-hov)]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <label className="glass-mono ml-1 hidden items-center gap-1 rounded-full border border-[var(--g-edge)] bg-[var(--g-g2)] px-2 text-[10px] text-[var(--g-ink3)] md:flex">
          <span className="sr-only">Language</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="h-8 cursor-pointer bg-transparent text-[10px] font-semibold text-inherit outline-none">
            {languages.map((item) => <option key={item.code} value={item.code} className="bg-[#0f1116] text-white">{item.short}</option>)}
          </select>
        </label>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle light and dark"
          title="Toggle light and dark"
          className="grid h-8 w-8 place-items-center rounded-full border border-[var(--g-edge)] bg-[var(--g-g2)] text-[13px] text-[var(--g-ink)] transition hover:bg-[var(--g-hov)]"
        >
          {theme === 'light' ? '☾' : '☀'}
        </button>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="glass-mobile-nav"
          className="grid h-8 w-8 place-items-center rounded-full border border-[var(--g-edge)] bg-[var(--g-g2)] text-[var(--g-ink)] md:hidden"
        >
          {open ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>
      {open && (
        <div id="glass-mobile-nav" className="glass-panel-strong absolute inset-x-4 top-[72px] flex flex-col gap-1 rounded-[18px] p-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={activePage === link.page ? 'page' : undefined}
              style={activePage === link.page ? inkStyle : ink3Style}
              className={`glass-mono rounded-xl px-4 py-3 text-[13px] tracking-[.06em] ${activePage === link.page ? 'bg-[var(--g-hov)]' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-1 flex items-center justify-between gap-2 border-t border-[var(--g-rule)] px-4 pt-3">
            <span className="glass-mono text-[10px] uppercase tracking-[.14em] text-[var(--g-ink4)]">Language</span>
            <div className="flex gap-1.5">
              {languages.map((item) => (
                <button key={item.code} type="button" onClick={() => setLanguage(item.code)} aria-pressed={language === item.code} className={`glass-mono rounded-full border px-2.5 py-1.5 text-[10px] ${language === item.code ? 'border-[var(--g-edge2)] bg-[var(--g-pill)] text-[var(--g-pillink)]' : 'border-[var(--g-edge)] text-[var(--g-ink3)]'}`}>{item.short}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
