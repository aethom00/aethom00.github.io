import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import WorkPage from './components/WorkPage'
import ResumePage from './components/ResumePage'
import ContactPage from './components/ContactPage'
import Volunteering from './components/Volunteering'
import Projects from './components/Projects'
import Research from './components/Research'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import MusicProfile from './components/MusicProfile'
import AppleMusicDock from './components/AppleMusicDock'
import SiteTranslator from './i18n/SiteTranslator'
import { getProjectBySlug } from './data/projects'

const Travel = lazy(() => import('./components/Travel'))
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education'))
const Timeline = lazy(() => import('./components/Timeline'))
const VisualEffectsLab = lazy(() => import('./components/VisualEffectsLab'))

const pages = ['home', 'work', 'about', 'resume', 'experience', 'volunteering', 'education', 'projects', 'research', 'timeline', 'travel', 'contact', 'effects'] as const
type Page = (typeof pages)[number]

const pageTitles: Partial<Record<Page, string>> = {
  timeline: 'Photos',
  work: 'Work',
}

function readRoute(): { page: Page, projectSlug?: string } {
  const path = window.location.pathname.replace(/\/+$/, '')
  const segments = path.split('/').filter(Boolean)
  const [candidate, rawSlug] = segments
  if (candidate === 'projects' && rawSlug) return { page: 'projects', projectSlug: decodeURIComponent(rawSlug) }
  return { page: pages.includes(candidate as Page) ? candidate as Page : 'home' }
}

function readPage(): Page {
  return readRoute().page
}

function isInternalPathHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function SectionFallback() {
  return <div className="section grid min-h-[50vh] place-items-center text-sm text-slate-500">Loading…</div>
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'home': return <HomePage />
    case 'work': return <WorkPage />
    case 'about': return <AboutPage />
    case 'resume': return <ResumePage />
    case 'experience': return <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
    case 'volunteering': return <Volunteering />
    case 'education': return <><Suspense fallback={<SectionFallback />}><Education /></Suspense><Suspense fallback={<SectionFallback />}><Timeline variant="education" /></Suspense></>
    case 'projects': return <Projects />
    case 'research': return <div className="glass-root relative min-h-screen overflow-hidden"><div aria-hidden="true" className="glass-bloom" /><div aria-hidden="true" className="glass-bloom-2" /><div className="relative mx-auto max-w-[1180px] px-7 pb-[120px] pt-[110px]"><Research /></div></div>
    case 'timeline': return <Suspense fallback={<SectionFallback />}><Timeline /></Suspense>
    case 'travel': return <Suspense fallback={<div className="glass-root grid min-h-screen place-items-center text-sm text-[var(--g-ink3)]">Loading travel atlas…</div>}><Travel /></Suspense>
    case 'contact': return <><ContactPage /><MusicProfile /></>
    case 'effects': return <Suspense fallback={<SectionFallback />}><VisualEffectsLab /></Suspense>
    default: return <HomePage />
  }
}

export default function App() {
  const [page, setPage] = useState<Page>(readPage)
  const [projectSlug, setProjectSlug] = useState(() => readRoute().projectSlug)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const updatePage = () => { const route = readRoute(); setPage(route.page); setProjectSlug(route.projectSlug) }
    window.addEventListener('popstate', updatePage)
    return () => window.removeEventListener('popstate', updatePage)
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || !isInternalPathHref(href)) return
      event.preventDefault()
      const url = new URL(href, window.location.origin)
      const nextUrl = url.pathname + url.search + url.hash
      if (window.location.pathname + window.location.search + window.location.hash !== nextUrl) {
        window.history.pushState(null, '', nextUrl)
      }
      const route = readRoute()
      setPage(route.page)
      setProjectSlug(route.projectSlug)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const title = pageTitles[page] ?? `${page[0].toUpperCase()}${page.slice(1)}`
    document.title = page === 'home' ? 'Ashton Thomas — Engineer & Researcher' : `${title} — Ashton Thomas`
  }, [page, projectSlug])

  const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('main')?.focus()
  }

  return (
    <div className="site-root min-h-screen text-slate-200">
      <SiteTranslator />
      <a className="skip-link" href="#main" onClick={skipToContent}>Skip to content</a>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500" style={{ scaleX }} />
      <Nav activePage={page} />
      <AppleMusicDock />
      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div key={projectSlug ?? page} className={page === 'home' ? '' : 'page-view'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }}>
            {projectSlug && getProjectBySlug(projectSlug) ? <ProjectDetail project={getProjectBySlug(projectSlug)!} /> : <PageContent page={page} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
