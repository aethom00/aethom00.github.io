import { type CSSProperties, type ReactNode } from 'react'

const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const resumeUrl = 'https://ashtonet.github.io/generated-pdfs/resume.pdf'
const cvUrl = 'https://ashtonet.github.io/generated-pdfs/cv.pdf'

type Entry = {
  title: string
  meta: string
  sub?: string
  body?: ReactNode
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <>
      {entries.map((entry, index) => (
        <div key={entry.title} className={`grid grid-cols-1 items-baseline gap-x-7 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto] ${index > 0 ? 'border-t' : ''}`} style={{ borderColor: 'var(--g-rule)' }}>
          <div style={inkStyle} className="text-[18px] font-medium tracking-[-.02em] sm:text-[20px]">{entry.title}</div>
          <div className="glass-mono whitespace-nowrap text-[10.5px] tracking-[.1em] text-[var(--g-ink3)] sm:text-right">{entry.meta}</div>
          {(entry.sub || entry.body) && (
            <div className="col-span-full flex flex-col gap-2.5">
              {entry.sub && <p className="glass-mono text-[11px] italic leading-[1.6] tracking-[.03em] text-[var(--g-ink4)]">{entry.sub}</p>}
              {entry.body && <div className="text-[14.5px] leading-[1.6] text-[var(--g-ink2)]">{entry.body}</div>}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

function ResumeSection({ label, children }: { label: string, children: ReactNode }) {
  return (
    <section className="glass-panel glass-fadeup p-[26px] sm:p-[30px_32px]">
      <div className="glass-mono mb-[10px] text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">{label}</div>
      {children}
    </section>
  )
}

function ChipRow({ label, items }: { label: string, items: string[] }) {
  return (
    <div className="grid grid-cols-1 items-start gap-3 border-t py-4 first:border-t-0 first:pt-0 sm:grid-cols-[170px_minmax(0,1fr)]" style={{ borderColor: 'var(--g-rule)' }}>
      <div className="glass-mono text-[11px] uppercase tracking-[.12em] text-[var(--g-ink3)]">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => <span key={item} className="glass-mono rounded-full border px-2.5 py-1 text-[10.5px]" style={{ color: 'var(--g-ink2)', borderColor: 'var(--g-slotedge)' }}>{item}</span>)}
      </div>
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="glass-root relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="glass-bloom" />
      <div aria-hidden="true" className="glass-bloom-2" />

      <div className="relative mx-auto max-w-[920px] px-6 pb-[120px] pt-[110px]">
        <div className="glass-panel glass-fadeup flex flex-col gap-6 p-[26px] sm:flex-row sm:items-end sm:justify-between sm:p-[34px_32px]">
          <div>
            <div className="glass-mono mb-4 text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Resume</div>
            <h1 style={inkStyle} className="text-[clamp(26px,2.4vw,34px)] font-normal tracking-[-.03em]">Ashton E. Thomas</h1>
            <p className="mt-3 max-w-[52ch] text-pretty text-[15px] leading-[1.62] text-[var(--g-ink2)]">Computer vision, artificial intelligence, machine learning, mapping algorithms and reliable software systems, with emphasis on practical systems for geolocation, neural data analysis and agentic engineering workflows.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a href={resumeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--g-pillink)', background: 'var(--g-pill)' }} className="glass-mono rounded-full px-[18px] py-[13px] text-[11px] uppercase tracking-[.1em]">Resume &middot; PDF</a>
            <a href={cvUrl} target="_blank" rel="noreferrer" style={{ ...inkStyle, borderColor: 'var(--g-slotedge)', background: 'var(--g-slot)' }} className="glass-mono rounded-full border px-[18px] py-[13px] text-[11px] uppercase tracking-[.1em]">Full CV &middot; PDF</a>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <ResumeSection label="Education">
            <EntryList entries={[
              {
                title: 'M.S.E. Computer Engineering',
                meta: 'UNIVERSITY OF MICHIGAN RACKHAM · 2025–2026',
                sub: 'Computer vision concentration · summa cum laude · GPA 4.00/4.00',
                body: 'Machine Learning, Robotic Kinematics & Dynamics, Applied Math for Robotics, Cryptography, Quantum Computing, Surveillance & Public Datasets, Statistics with R, Civil Engineering Directed Study.',
              },
              {
                title: 'B.S.E. Computer Science Engineering',
                meta: 'UNIVERSITY OF MICHIGAN · 2022–2025',
                sub: 'Minor in International Engineering · summa cum laude · GPA 3.8/4.00',
                body: 'Discrete Math, Data Structures & Algorithms, Computer Organization, Theoretical Computer Science, Extended Reality, Operating Systems, Web Systems, Probability, Data Analytics.',
              },
              {
                title: 'A.S.A. Liberal Arts',
                meta: 'NORTHWESTERN MICHIGAN COLLEGE, DUAL ENROLLMENT · 2020–2022',
                sub: 'Summa cum laude · GPA 3.96/4.00',
              },
              {
                title: 'High School Diploma',
                meta: 'TRAVERSE CITY WEST · 2018–2022',
              },
            ]} />
          </ResumeSection>

          <ResumeSection label="Research experience">
            <EntryList entries={[{
              title: 'Computational Neuroscience Research Assistant',
              meta: 'POLK LAB, UNIVERSITY OF MICHIGAN · 09/2024–06/2025',
              body: (
                <ul className="flex flex-col gap-2.5">
                  <li>Processed fMRI data using FS-FAST and Makefiles to study age-related neural dedifferentiation and its effects on neurocognition in healthy aging and Alzheimer&rsquo;s disease.</li>
                  <li>Contributed to machine learning workflows measuring how different languages affected neural distinctiveness in the human brain, using speech-versus-background-noise separation to support the analysis, and connecting computational models with human-like auditory processing.</li>
                  <li>Built Python data-processing tools with Prof. Thad Polk for CSV datasets with 1,000+ columns, including wildcard column filtering, demographic parsing, node-hierarchy operations, and reproducible row filtration.</li>
                </ul>
              ),
            }]} />
          </ResumeSection>

          <ResumeSection label="Professional experience">
            <EntryList entries={[
              {
                title: 'Software Development Engineer I',
                meta: 'AMAZON WEB SERVICES, NEW YORK, NY · 06/2025–PRESENT',
                body: (
                  <ul className="flex flex-col gap-2.5">
                    <li>Build developer-insights platforms for software delivery health, observability, and engineering analytics across large-scale internal software systems as part of a 12+ person AWS team.</li>
                    <li>Design and operate AWS data pipelines using Python, S3, Glue, Athena, CloudWatch, and infrastructure-as-code workflows for analytics and reporting.</li>
                    <li>Develop privacy-aware data availability and access-control validation, including integration tests for row-level and column-level security across analytics datasets.</li>
                    <li>Designed AI-assisted engineering automation that coordinates task intake, code generation, code review lifecycle management, reliability checks, and operational observability.</li>
                    <li>Support production operations through canary checks, alarms, dashboarding, bug investigation, on-call readiness, and incident-driven reliability improvements.</li>
                    <li>Managed Amazon company-wide employee data for 100,000s of employees as part of a 10-engineer team, including collection, processing, and executive-level inferences.</li>
                  </ul>
                ),
              },
              {
                title: 'Software Development Engineer Intern',
                meta: 'AMAZON, BOSTON, MA · 09/2024–11/2024',
                body: (
                  <ul className="flex flex-col gap-2.5">
                    <li>Worked on Alexa endpoint experiences with a team of more than 20 engineers, designing, testing, and optimizing customer-facing device functionality.</li>
                    <li>Implemented software features using React Native, Kotlin, TypeScript, and related technologies that shipped into Alexa+, applying production engineering and responsive design practices.</li>
                  </ul>
                ),
              },
              {
                title: 'Software Development Intern',
                meta: 'GROUND VEHICLE SYSTEMS CENTER, WARREN, MI · 05/2024–07/2024',
                body: (
                  <ul className="flex flex-col gap-2.5">
                    <li>Leveraged MagicDraw & Excel to design databases for Jira tickets and hardware, leading to improved efficiency.</li>
                    <li>Created Python scripts to parse large CSVs with 1000s of datapoints to update integrated networks in Jira.</li>
                  </ul>
                ),
              },
              {
                title: 'Full Stack Developer',
                meta: 'MADI TAYLOR PHOTO, TRAVERSE CITY, MI · 06/2022–07/2024',
                body: (
                  <ul className="flex flex-col gap-2.5">
                    <li>Developed and maintained the corporate website, crafting a cohesive user interface with HTML, CSS, and JS.</li>
                    <li>Implemented robust back-end payment solutions and form validation to streamline user transactions.</li>
                  </ul>
                ),
              },
            ]} />
          </ResumeSection>

          <ResumeSection label="Selected projects">
            <EntryList entries={[
              { title: 'Geoguessr AI', meta: 'COMPUTER VISION · 2023–2024', body: 'Designed and implemented a modified ResNet-50 architecture for geographic location identification from images, fine-tuned on 61,000 images against lighting and seasonal variation, reaching approximately 90% accuracy on U.S. regions.' },
              { title: 'Google Search Engine', meta: 'WEB SYSTEMS · 2024', body: 'A scalable search engine built on a segmented inverted index in MapReduce, combining tf-idf text analysis with PageRank link analysis, served through a REST API and a user-friendly interface.' },
              { title: 'Study Group Coordinator', meta: 'QUANTUM COMPUTING · 2024', body: 'Scheduling under CNF constraints searched with Grover’s algorithm — bitflip and phase oracles translating the constraints into quantum operations, plus a quantum counting circuit estimating the number of feasible solutions.' },
              { title: 'Virtual Memory Pager', meta: 'OPERATING SYSTEMS · 2025', body: 'Per-process arenas, page tables, physical frames, swap-backed pages and shared file-backed mappings, with page-fault handling, copy-on-write, dirty and reference tracking, eviction, and a clock-style replacement policy.' },
              { title: 'Networked File Server', meta: 'OPERATING SYSTEMS · 2025', body: 'A socket-based file server over a block disk abstraction supporting read, write, create and delete, with validation and concurrency logic for ownership, permissions, capacity limits, shared and exclusive locks, and threaded request handling.' },
              { title: 'Invariant Learning Experiments', meta: 'MACHINE LEARNING · 2025', body: 'Compared empirical risk minimization, invariant risk minimization and IRM-Games under distribution shift on Colored MNIST, synthetic chain-equation data, and financial time series with spurious correlations, trend regimes and volatility shifts.' },
            ]} />
          </ResumeSection>

          <ResumeSection label="Selected papers">
            <div className="grid grid-cols-1 items-baseline gap-x-7 gap-y-3 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div style={inkStyle} className="text-[17px] font-medium tracking-[-.02em]">Geoguessr AI: A Look into AI Geolocation Accuracy</div>
              <div className="glass-mono text-[10.5px] tracking-[.1em] text-[var(--g-ink3)] sm:text-right">2024</div>
              <div className="col-span-full">
                <a href="https://aethom00.github.io/EECS_442_Final_Project.pdf" target="_blank" rel="noreferrer" style={{ ...inkStyle, borderColor: 'var(--g-slotedge)', background: 'var(--g-slot)' }} className="glass-mono inline-block rounded-full border px-[16px] py-[11px] text-[11px] uppercase tracking-[.1em]">Read the paper</a>
              </div>
            </div>
          </ResumeSection>

          <ResumeSection label="Technical skills">
            <ChipRow label="Coding languages" items={['ARM', 'C/C++', 'CSS', 'HTML', 'Java', 'JavaScript', 'Kotlin', 'LaTeX', 'MATLAB', 'Python', 'SQL', 'TypeScript']} />
            <ChipRow label="Cloud & data" items={['AWS', 'Lambda', 'S3', 'Glue', 'Athena', 'Redshift', 'CloudWatch', 'CDK']} />
            <ChipRow label="AI/ML & research" items={['Computer vision', 'Machine learning', 'Neural data analysis', 'Mapping algorithms', 'PyTorch', 'Keras', 'TensorFlow']} />
            <ChipRow label="Frameworks" items={['Flask', 'React', 'React Native']} />
            <ChipRow label="Libraries" items={['Jinja', 'NumPy', 'Pandas', 'Qiskit']} />
            <ChipRow label="Developer tools" items={['Git', 'VSCode', 'CI/CD pipelines']} />
            <ChipRow label="Engineering & mapping" items={['AutoCAD', 'ArcGIS', 'Excel', 'Jira', 'MagicDraw']} />
          </ResumeSection>

          <ResumeSection label="Certifications">
            <div className="flex flex-col">
              {[
                ['Engineering Across Cultures — Michigan College of Engineering', '02/2024'],
                ['Understanding and Visualizing Data with Python — Coursera', '08/2023'],
                ['Advanced Styling with Responsive Design — Coursera', '08/2023'],
              ].map(([label, date], index) => (
                <div key={label} className={`flex items-baseline justify-between gap-5 py-3.5 ${index > 0 ? 'border-t' : ''}`} style={{ borderColor: 'var(--g-rule)' }}>
                  <div className="text-[14.5px] text-[var(--g-ink2)]">{label}</div>
                  <div className="glass-mono shrink-0 whitespace-nowrap text-[10.5px] tracking-[.1em] text-[var(--g-ink3)]">{date}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection label="Languages">
            <div className="grid grid-cols-3 gap-4">
              {[['English', 'NATIVE'], ['German', 'B1'], ['Spanish', 'A2']].map(([lang, level]) => (
                <div key={lang}>
                  <div style={inkStyle} className="text-[16px] font-medium tracking-[-.02em]">{lang}</div>
                  <div className="glass-mono mt-1.5 text-[10.5px] tracking-[.1em] text-[var(--g-ink3)]">{level}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection label="Leadership & activities">
            <div className="flex flex-col">
              {[
                ['Michigan Data Science Team', '2024'],
                ['University of Michigan EV & Mobility Scholars', '2023–2025'],
                ['MHackers', '2022–2024'],
                ['First Robotics', '2021–2022'],
              ].map(([label, date], index) => (
                <div key={label} className={`flex items-baseline justify-between gap-5 py-3.5 ${index > 0 ? 'border-t' : ''}`} style={{ borderColor: 'var(--g-rule)' }}>
                  <div className="text-[14.5px] text-[var(--g-ink2)]">{label}</div>
                  <div className="glass-mono shrink-0 whitespace-nowrap text-[10.5px] tracking-[.1em] text-[var(--g-ink3)]">{date}</div>
                </div>
              ))}
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}
