import type { CSSProperties } from 'react'

// `a { color: inherit }` in index.css is an unlayered rule, so it beats Tailwind's
// layered text-[...] utilities on anchors. Set anchor color inline instead, which
// always wins regardless of cascade-layer ordering.
const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const ink3Style: CSSProperties = { color: 'var(--g-ink3)' }
const pillinkStyle: CSSProperties = { color: 'var(--g-pillink)' }

export default function HomePage() {
  return (
    <div className="glass-root relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="glass-bloom" />
      <div aria-hidden="true" className="glass-bloom-2" />

      <div className="relative mx-auto max-w-[1180px] px-7 pb-[120px] pt-[110px]">
        <div className="glass-panel-strong glass-fadeup relative flex min-h-[clamp(300px,38vh,420px)] flex-col justify-end overflow-hidden p-11">
          <div aria-hidden="true" className="glass-specular" />
          <div className="relative z-[2]">
            <div className="glass-mono mb-[22px] text-[10.5px] uppercase tracking-[.24em] text-[var(--g-ink3)]">Machine learning &middot; distributed systems &middot; applied research</div>
            <h1 style={inkStyle} className="max-w-[26ch] text-balance text-[clamp(34px,3.6vw,54px)] font-normal leading-[1.04] tracking-[-.035em]">I build computer vision systems and the infrastructure that keeps them honest.</h1>
            <p className="mt-5 max-w-[44ch] text-pretty text-[16.5px] font-light leading-[1.6] text-[var(--g-ink2)]">Software engineer at AWS. M.S.E. in computer engineering from Michigan, computer vision concentration.</p>
          </div>
        </div>

        <div className="mt-[14px] grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-3">
          <div className="glass-panel glass-fadeup flex flex-col p-[30px_28px]" style={{ animationDelay: '.05s' }}>
            <div className="glass-mono mb-[14px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Now</div>
            <p className="text-[16px] font-light leading-[1.6] text-[var(--g-ink2)]">Building developer-insights platforms at AWS in New York &mdash; data pipelines in Python, S3, Glue and Athena, plus AI-assisted automation for task intake and code review.</p>
            <div className="glass-mono mt-auto flex flex-col gap-[10px] pt-[26px] text-[11px] tracking-[.1em] text-[var(--g-ink3)]">
              <span>NEW YORK, NY</span>
              <span>SDE I, AWS</span>
            </div>
          </div>

          <div className="glass-panel glass-fadeup flex flex-col p-[30px_28px]" style={{ animationDelay: '.12s' }}>
            <div className="glass-mono mb-[14px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Selected work</div>
            <div className="mt-auto flex flex-col pt-3">
              {['GeoGuessr AI', 'Search Engine', 'Computational Neuroscience'].map((item) => (
                <a key={item} href="/work" style={inkStyle} className="border-t border-[var(--g-rule)] py-[13px] text-[16px]">{item}</a>
              ))}
              <a href="/work" style={ink3Style} className="glass-mono border-b border-t border-[var(--g-rule)] py-[13px] text-[13px] uppercase tracking-[.1em]">All projects &rarr;</a>
            </div>
          </div>

          <div className="glass-panel glass-fadeup flex flex-col p-[30px_28px]" style={{ animationDelay: '.19s' }}>
            <div className="glass-mono mb-[14px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Background</div>
            <p className="text-[16px] font-light leading-[1.6] text-[var(--g-ink2)]">Michigan B.S.E. and M.S.E., computational neuroscience by way of the Polk Lab, now computer vision and the systems around it.</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-[26px]">
              <a href="/about" style={inkStyle} className="glass-mono rounded-full border border-[var(--g-slotedge)] bg-[var(--g-slot)] px-[18px] py-[13px] text-[11px] uppercase tracking-[.1em]">About</a>
              <a href="/contact" style={pillinkStyle} className="glass-mono rounded-full bg-[var(--g-pill)] px-[18px] py-[13px] text-[11px] uppercase tracking-[.1em]">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
