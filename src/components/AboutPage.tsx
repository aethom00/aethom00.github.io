import { type CSSProperties } from 'react'
import { BrainCircuit, Camera, Code2, Database, Globe2, Map, Mountain } from 'lucide-react'

const skills = [
  { icon: Code2, title: 'Software Engineering', text: 'Building production software with Python, React, APIs, automation, data pipelines, and reliability-focused engineering practices.' },
  { icon: BrainCircuit, title: 'Machine Learning', text: 'Training and evaluating models with Python, TensorFlow, Keras, optimization methods, and experiment-driven workflows.' },
  { icon: Camera, title: 'Computer Vision', text: 'Working with image-based models, visual datasets, ResNet-style architectures, geolocation tasks, and perception-focused research.' },
  { icon: Database, title: 'Systems & Algorithms', text: 'Designing lower-level projects around C/C++, virtual memory, file servers, threading, graph search, and performance.' },
  { icon: Globe2, title: 'Geography', text: 'A lifelong interest in countries, territories, capitals, flags, borders, and the human context behind places.' },
  { icon: Map, title: 'Mapping', text: 'Building and thinking through map interfaces, globes, spatial data, coordinates, routes, and geolocation systems.' },
]

const facts = [
  { icon: Globe2, label: 'Travel', value: 'Visited 52 countries & territories' },
  { icon: Mountain, label: 'Outdoors', value: 'Backpacking and hiking' },
  { icon: Camera, label: 'Travel photography', value: 'Documenting the places and perspectives I find along the way' },
]

const inkStyle: CSSProperties = { color: 'var(--g-ink)' }

export default function AboutPage() {
  return (
    <div className="glass-root relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="glass-bloom" />
      <div aria-hidden="true" className="glass-bloom-2" />

      <div className="relative mx-auto max-w-[1180px] px-7 pb-[120px] pt-[110px]">
        <div className="grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-3">
          <div className="glass-panel glass-fadeup flex flex-col p-[26px]">
            <div className="glass-mono mb-[14px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">About</div>
            <p className="text-[16px] font-light leading-[1.6] text-[var(--g-ink2)]">I&rsquo;m a software engineer based in New Jersey, currently building large-scale systems at Amazon. My work sits where rigorous computer science meets production engineering.</p>
            <p className="mt-4 text-[15px] font-light leading-[1.6] text-[var(--g-ink3)]">My academic work at the University of Michigan spanned computer science, computer engineering, and international engineering. I&rsquo;m drawn to machine learning, computer vision, optimization, robotics, distributed systems, geography, and mapping.</p>
          </div>

          <div className="glass-panel glass-fadeup flex flex-col p-[26px]" style={{ animationDelay: '.07s' }}>
            <div className="glass-mono mb-[14px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Now</div>
            <p className="text-[16px] font-light leading-[1.6] text-[var(--g-ink2)]">Building developer-insights platforms at AWS in New York &mdash; data pipelines in Python, S3, Glue and Athena, plus AI-assisted automation for task intake and code review.</p>
            <div className="glass-mono mt-5 flex flex-col gap-[10px] text-[11px] tracking-[.1em] text-[var(--g-ink3)]">
              <span>NEW YORK, NY</span>
              <span>SDE I, AWS</span>
            </div>
          </div>

          <div className="glass-panel glass-fadeup flex flex-col p-[26px]" style={{ animationDelay: '.14s' }}>
            <div className="glass-mono mb-[14px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Away from the terminal</div>
            <p className="text-[16px] font-light leading-[1.6] text-[var(--g-ink2)]">Backpacking, hiking, travel photography, geopolitics, and mapping algorithms.</p>
            <a href="/ashton_pfp.jpg" target="_blank" rel="noreferrer" className="glass-slot mt-5 block aspect-[4/3] overflow-hidden" aria-label="View the full photograph of Ashton Thomas">
              <img src="/ashton_pfp.jpg" alt="Ashton Thomas" loading="lazy" className="h-full w-full object-cover" />
            </a>
          </div>
        </div>

        <div className="mt-[18px] grid grid-cols-1 gap-[14px] md:grid-cols-3">
          {facts.map((fact, index) => (
            <div key={fact.label} className="glass-panel glass-fadeup flex items-center gap-4 p-[22px]" style={{ animationDelay: `${.2 + index * .05}s` }}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--g-slotedge)] bg-[var(--g-slot)]" style={inkStyle}><fact.icon size={17} /></div>
              <div>
                <div className="glass-mono text-[10px] uppercase tracking-[.14em] text-[var(--g-ink3)]">{fact.label}</div>
                <div className="mt-1 text-[14px] text-[var(--g-ink2)]">{fact.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[46px]">
          <div className="glass-mono text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Skills &amp; interests</div>
          <h2 style={inkStyle} className="mt-3 text-[clamp(24px,2.2vw,32px)] font-normal tracking-[-.03em]">A broad technical toolkit.</h2>
          <div className="mt-7 grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div key={skill.title} className="glass-panel glass-fadeup p-[24px]" style={{ animationDelay: `${.1 + index * .04}s` }}>
                <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--g-slotedge)] bg-[var(--g-slot)]" style={inkStyle}><skill.icon size={17} /></div>
                <h3 style={inkStyle} className="mt-4 text-[16px] font-medium">{skill.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--g-ink3)]">{skill.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
