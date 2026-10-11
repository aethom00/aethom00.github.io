import { type CSSProperties } from 'react'
import { ArrowUpRight, FileText, Link2 } from 'lucide-react'
import { GitHubLogo, InstagramLogo, LinkedInLogo } from './BrandIcons'

function FacebookLogo({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.3 8.1V6.6c0-.74.49-.91.84-.91h2.14V2.2L14.33 2.2c-3.28 0-4.03 2.46-4.03 4.03v1.87H7.72v3.6h2.58V22h4V11.7h3.02l.4-3.6h-3.42Z" /></svg>
}

function DiscordLogo({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.2 5.1A16.1 16.1 0 0 0 15.1 3.8l-.2.4c1.5.4 2.2 1 2.2 1s-1.9-1-5.1-1-5.1 1-5.1 1 .8-.6 2.3-1l-.3-.4A16.1 16.1 0 0 0 4.8 5.1C2.2 9 1.5 12.8 1.8 16.5A16.5 16.5 0 0 0 6.8 19c.4-.5.7-1 1-1.5-.6-.2-1.2-.5-1.8-.9l.4-.3c3.4 1.6 7.1 1.6 10.5 0l.4.3c-.6.4-1.2.7-1.8.9.3.5.6 1 1 1.5a16.4 16.4 0 0 0 5-2.5c.4-4.3-.7-8-2.3-11.4ZM8.6 14.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" /></svg>
}

const linkGroups = [
  {
    title: 'Work',
    links: [
      { icon: GitHubLogo, label: 'GitHub', value: '@aethom00', href: 'https://github.com/aethom00' },
      { icon: LinkedInLogo, label: 'LinkedIn', value: '/in/aethom', href: 'https://www.linkedin.com/in/aethom' },
    ],
  },
  {
    title: 'Personal',
    links: [
      { icon: InstagramLogo, label: 'Instagram', value: '@ashton.thomas_', href: 'https://www.instagram.com/ashton.thomas_/' },
      { icon: Link2, label: 'Linktree', value: 'thomasash00', href: 'https://linktr.ee/thomasash00' },
      { icon: FacebookLogo, label: 'Facebook', value: 'Ashton Thomas', href: 'https://www.facebook.com/ashton.thomas.125760/' },
    ],
  },
  {
    title: 'Documents',
    links: [
      { icon: FileText, label: 'Résumé', value: 'View résumé', href: 'https://ashtonet.github.io/generated-pdfs/resume.pdf' },
      { icon: FileText, label: 'CV', value: 'View CV', href: 'https://ashtonet.github.io/generated-pdfs/cv.pdf' },
    ],
  },
  {
    title: 'Chat',
    links: [
      { icon: DiscordLogo, label: 'Discord', value: 'greenbacon', href: 'https://discordapp.com/users/greenbacon' },
    ],
  },
]

const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const ink2Style: CSSProperties = { color: 'var(--g-ink2)' }

export default function ContactPage() {
  return (
    <div className="glass-root relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="glass-bloom" />
      <div aria-hidden="true" className="glass-bloom-2" />

      <div className="relative mx-auto max-w-[1180px] px-7 pb-[120px] pt-[110px]">
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[1fr_1.15fr]">
          <div className="glass-panel-strong glass-fadeup relative flex flex-col justify-between overflow-hidden p-[34px]">
            <div aria-hidden="true" className="glass-specular" />
            <div className="relative z-[2]">
              <div className="glass-mono mb-4 text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Contact</div>
              <div style={ink2Style} className="text-[21px] font-normal leading-[1.3] tracking-[-.02em]">aethom<wbr />@umich.edu</div>
              <p className="mt-4 text-[15px] leading-[1.55] text-[var(--g-ink2)]">Open to conversations about machine learning, computer vision, and systems work.</p>
            </div>
            <div className="relative z-[2] mt-8 flex items-center gap-4 border-t pt-6" style={{ borderColor: 'var(--g-rule)' }}>
              <img src="/ashton_pfp.jpg" alt="Ashton Thomas" loading="lazy" className="h-16 w-16 rounded-2xl border object-cover object-[50%_54%]" style={{ borderColor: 'var(--g-edge)' }} />
              <div>
                <div style={inkStyle} className="text-[13px] font-medium">Personal portfolio directory</div>
                <p className="mt-1 max-w-[26ch] text-[12px] leading-[1.5] text-[var(--g-ink3)]">No contact form, no friction — just the useful places.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel glass-fadeup p-[22px] sm:p-[26px]" style={{ animationDelay: '.08s' }}>
            {linkGroups.map((group) => (
              <div key={group.title} className="border-t py-4 first:border-t-0 first:pt-0" style={{ borderColor: 'var(--g-rule)' }}>
                <div className="glass-mono mb-1 px-1 text-[10px] uppercase tracking-[.16em] text-[var(--g-ink4)]">{group.title}</div>
                {group.links.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl px-1 py-2.5 transition hover:bg-[var(--g-hov)]">
                    <span style={{ ...inkStyle, borderColor: 'var(--g-slotedge)' }} className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border"><Icon size={16} /></span>
                    <span className="min-w-0 flex-1">
                      <span style={inkStyle} className="block text-[14px] font-medium">{label}</span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-[var(--g-ink4)]">{value}</span>
                    </span>
                    <ArrowUpRight size={14} style={{ color: 'var(--g-ink3)' }} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
