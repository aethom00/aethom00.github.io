import { type CSSProperties, useMemo, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, ChevronUp, Code2, Search } from 'lucide-react'
import { getProjectSlug, projectCategories, projects, type Project } from '../data/projects'
import Research from './Research'

const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const ink3Style: CSSProperties = { color: 'var(--g-ink3)' }

function projectMatches(project: Project, category: string, search: string) {
  const matchesCategory = category === 'All' || project.categories.includes(category)
  const matchesSearch = !search || [project.title, project.description, ...project.languages].join(' ').toLowerCase().includes(search)
  return matchesCategory && matchesSearch
}

function WorkCard({ project, delay }: { project: Project, delay: number }) {
  const href = `/projects/${encodeURIComponent(getProjectSlug(project))}`
  return (
    <a href={href} className="glass-panel glass-card-hover glass-fadeup group flex flex-col overflow-hidden" style={{ animationDelay: `${delay}s` }}>
      <div className="glass-slot relative aspect-[16/9] overflow-hidden rounded-none border-0 border-b" style={{ borderColor: 'var(--g-rule)' }}>
        {project.image
          ? <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03]" />
          : <div className="grid h-full place-items-center text-[10px] uppercase tracking-[.14em] text-[var(--g-ink4)]">[ project image ]</div>}
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border" style={{ ...inkStyle, borderColor: 'var(--g-edge)', background: 'var(--g-g1)' }}><ArrowUpRight size={14} /></span>
      </div>
      <div className="flex flex-1 flex-col p-[22px]">
        <p className="glass-mono text-[10px] uppercase tracking-[.16em] text-[var(--g-ink3)]">{project.categories[0]}</p>
        <h3 style={inkStyle} className="mt-2 text-[19px] font-medium tracking-[-.02em]">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-[1.6] text-[var(--g-ink3)]">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.languages.slice(0, 3).map((language) => (
            <span key={language} className="glass-mono rounded-full border px-2.5 py-1 text-[10px]" style={{ ...ink3Style, borderColor: 'var(--g-slotedge)' }}>{language}</span>
          ))}
        </div>
      </div>
    </a>
  )
}

export default function WorkPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [archiveLoaded, setArchiveLoaded] = useState(false)

  const highlightedProjectTitles = useMemo(() => [
    'Automated Engineering Agent', 'Geoguessr AI', 'Search Engine', 'Virtual Memory Pager',
    'Networked File Server', 'Invariant Learning Experiments', 'Quantum Study Group Coordinator',
    'MadiTaylorPhoto Website', 'Personal Website',
  ], [])
  const highlightedSet = useMemo(() => new Set(highlightedProjectTitles), [highlightedProjectTitles])
  const highlightedProjects = useMemo(() => highlightedProjectTitles.map((title) => projects.find((project) => project.title === title)).filter((project): project is Project => Boolean(project)), [highlightedProjectTitles])
  const archiveProjects = useMemo(() => projects.filter((project) => !highlightedSet.has(project.title)), [highlightedSet])
  const searchableProjects = useMemo(() => (archiveLoaded ? [...highlightedProjects, ...archiveProjects] : highlightedProjects), [archiveLoaded, highlightedProjects, archiveProjects])
  const availableCategories = useMemo(() => projectCategories.filter((item) => item === 'All' || searchableProjects.some((project) => project.categories.includes(item))), [searchableProjects])
  const search = query.trim().toLowerCase()
  const effectiveCategory = availableCategories.includes(category) ? category : 'All'
  const visibleHighlighted = useMemo(() => highlightedProjects.filter((project) => projectMatches(project, effectiveCategory, search)), [effectiveCategory, highlightedProjects, search])
  const visibleArchive = useMemo(() => (archiveLoaded ? archiveProjects.filter((project) => projectMatches(project, effectiveCategory, search)) : []), [archiveLoaded, archiveProjects, effectiveCategory, search])

  return (
    <div className="glass-root relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="glass-bloom" />
      <div aria-hidden="true" className="glass-bloom-2" />

      <div className="relative mx-auto max-w-[1180px] px-7 pb-[120px] pt-[110px]">
        <div className="glass-panel-strong glass-fadeup relative flex flex-col justify-between gap-6 overflow-hidden p-11 md:flex-row md:items-end">
          <div aria-hidden="true" className="glass-specular" />
          <div className="relative z-[2]">
            <div className="glass-mono mb-[16px] text-[10.5px] uppercase tracking-[.24em] text-[var(--g-ink3)]">Highlighted projects</div>
            <h1 style={inkStyle} className="max-w-[22ch] text-[clamp(30px,3.2vw,46px)] font-normal leading-[1.06] tracking-[-.03em]">The strongest work up front.</h1>
            <p className="mt-4 max-w-[50ch] text-[15px] font-light leading-[1.6] text-[var(--g-ink2)]">A curated set of the projects that best represent my current software engineering, AI, systems, web, and research work.</p>
          </div>
          <a href="https://github.com/aethom00" target="_blank" rel="noreferrer" style={{ ...inkStyle, borderColor: 'var(--g-edge2)' }} className="glass-mono relative z-[2] inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-[11px] uppercase tracking-[.1em]">
            <Code2 size={15} /> GitHub archive
          </a>
        </div>

        <div className="mt-[18px] space-y-3">
          <label className="glass-panel flex max-w-md items-center gap-3 rounded-full px-4 py-1">
            <Search size={16} className="text-[var(--g-ink3)]" />
            <span className="sr-only">Search projects</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or technologies" style={inkStyle} className="h-11 w-full bg-transparent text-[14px] placeholder:text-[var(--g-ink4)] focus:outline-none" />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">
            {availableCategories.map((item) => {
              const active = effectiveCategory === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  style={active ? { color: 'var(--g-pillink)', background: 'var(--g-pill)', borderColor: 'var(--g-edge2)' } : { color: 'var(--g-ink3)', borderColor: 'var(--g-edge)' }}
                  className="glass-mono inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] transition"
                >
                  {active && <Check size={11} strokeWidth={3} />}{item}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {visibleHighlighted.map((project, index) => <WorkCard key={project.title} project={project} delay={Math.min(index, 5) * .04} />)}
        </div>

        {!visibleHighlighted.length && <div className="glass-panel mt-8 p-10 text-center text-[var(--g-ink3)]">No projects match that filter.</div>}

        <div className="mt-12">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setArchiveLoaded((loaded) => !loaded)}
              style={{ color: 'var(--g-ink)', borderColor: 'var(--g-edge)', background: 'var(--g-g2)' }}
              className="glass-mono inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[11px] uppercase tracking-[.1em]"
            >
              {archiveLoaded ? 'Hide extra projects' : 'See more projects'}
              {archiveLoaded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {archiveLoaded && (
            <div className="mt-8 grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
              {visibleArchive.map((project, index) => <WorkCard key={project.title} project={project} delay={Math.min(index, 5) * .04} />)}
            </div>
          )}
          {archiveLoaded && !visibleArchive.length && <div className="glass-panel mt-8 p-10 text-center text-[var(--g-ink3)]">No projects match that filter.</div>}
        </div>

        <Research />
      </div>
    </div>
  )
}
