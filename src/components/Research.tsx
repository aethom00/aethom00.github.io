import { type CSSProperties } from 'react'
import { ArrowUpRight, BrainCircuit, Code2, Database, GitBranch, Microscope } from 'lucide-react'

const researchMethods = [
  { icon: BrainCircuit, title: 'Computational Neuroscience', text: 'Cognition, behavior, and computational models.' },
  { icon: Code2, title: 'MATLAB + analysis tooling', text: 'Data processing, analysis, and result evaluation.' },
  { icon: Database, title: 'Research data tooling', text: 'Interactive CSV workflows for selecting, filtering, and exporting large research datasets.' },
  { icon: GitBranch, title: 'Research workflows', text: 'Organized, version-controlled, reproducible work.' },
]

const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const ink3Style: CSSProperties = { color: 'var(--g-ink3)' }

export default function Research() {
  return (
    <div className="mt-[18px]">
      <div className="glass-mono text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Research</div>
      <h2 style={inkStyle} className="mt-3 max-w-[24ch] text-[clamp(24px,2.4vw,32px)] font-normal tracking-[-.03em]">Computational cognition in practice.</h2>
      <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--g-ink2)]">My research experience is rooted in the Polk Lab at the University of Michigan, where I contributed to computational neuroscience work using MATLAB, Python, Git, and structured research workflows.</p>

      <article className="glass-panel glass-fadeup mt-8 overflow-hidden p-0">
        <div className="grid md:grid-cols-[14rem_1fr]">
          <aside className="border-b p-6 md:border-b-0 md:border-r md:p-8" style={{ borderColor: 'var(--g-rule)' }}>
            <div className="grid h-10 w-10 place-items-center rounded-full border" style={{ ...inkStyle, borderColor: 'var(--g-slotedge)', background: 'var(--g-slot)' }}><Microscope size={18} /></div>
            <p className="glass-mono mt-6 text-xs font-semibold uppercase tracking-[.16em] text-[var(--g-ink3)]">Polk Lab</p>
            <p style={ink3Style} className="mt-2 text-sm leading-6">University of Michigan</p>
            <div className="mt-8 h-px w-16 md:h-20 md:w-px" style={{ background: 'var(--g-rule)' }} />
            <span style={ink3Style} className="glass-mono mt-6 inline-flex rounded-full border px-3 py-1 text-xs font-semibold" >Sep 2024 — Jun 2025</span>
          </aside>

          <div className="p-6 md:p-8">
            <p className="glass-mono text-xs font-semibold uppercase tracking-[.16em] text-[var(--g-ink3)]">Computational neuroscience</p>
            <h3 style={inkStyle} className="mt-2 text-2xl font-medium tracking-[-.02em]">Research Assistant</h3>
            <p className="mt-5 max-w-3xl text-[15px] leading-[1.65] text-[var(--g-ink2)]">Contributed to computational neuroscience research in the Polk Lab, supporting analysis workflows and building Python tooling for navigating large master CSV datasets, organizing variable hierarchies, filtering rows and columns, and exporting focused research sheets for analysis.</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {researchMethods.map(({ icon: Icon, title, text }) => (
                <div key={title} className="glass-slot rounded-2xl p-4">
                  <Icon size={17} style={ink3Style} />
                  <h4 style={inkStyle} className="mt-4 text-sm font-semibold">{title}</h4>
                  <p className="mt-2 text-xs leading-5 text-[var(--g-ink4)]">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {['MATLAB', 'Python', 'Pandas', 'Git', 'Research Methods', 'CSV tooling'].map((skill) => <span key={skill} className="glass-mono rounded-full border px-2.5 py-1 text-[10.5px]" style={{ ...ink3Style, borderColor: 'var(--g-slotedge)' }}>{skill}</span>)}
              <a href="https://sites.lsa.umich.edu/polklab/" target="_blank" rel="noreferrer" style={inkStyle} className="inline-flex items-center gap-2 text-sm font-semibold">
                Polk Lab Website <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
