import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type WheelEvent as ReactWheelEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type TimelineEvent = {
  dateLabel: string
  sortDate: string
  title: string
  text: string
  kind: 'photo' | 'milestone'
  image?: string
  imagePosition?: string
  place?: string
  meta?: string
}

const inkStyle: CSSProperties = { color: 'var(--g-ink)' }
const ink2Style: CSSProperties = { color: 'var(--g-ink2)' }
const ink3Style: CSSProperties = { color: 'var(--g-ink3)' }

type TimelineWheelIntent = {
  amount: number
  direction: 1 | -1 | null
  lastAt: number
}

const timelineWheelLineDelta = 16
const timelineWheelPageDelta = 800
const timelineWheelMaxDelta = 120
const timelineWheelStepThreshold = 90
const timelineWheelCooldownMs = 560
const timelineWheelResetMs = 180
const timelineWheelMinDelta = 1.5

function normalizedTimelineWheelDelta(event: ReactWheelEvent<HTMLElement>) {
  const delta = event.deltaMode === 1
    ? event.deltaY * timelineWheelLineDelta
    : event.deltaMode === 2
      ? event.deltaY * timelineWheelPageDelta
      : event.deltaY
  return Math.min(Math.max(delta, -timelineWheelMaxDelta), timelineWheelMaxDelta)
}

const photoEvents: TimelineEvent[] = [
  {
    dateLabel: 'May 7, 2025',
    sortDate: '2025-05-07T00:00:00',
    title: 'Gibraltar',
    text: 'A high overlook across Gibraltar, with the harbor, runway, and Mediterranean opening out below the Rock.',
    kind: 'photo',
    image: '/images/hero-landscape/Gibraltar.JPG',
    imagePosition: 'center 48%',
    place: 'GIBRALTAR',
  },
  {
    dateLabel: 'May 19, 2025',
    sortDate: '2025-05-19T00:00:00',
    title: 'Malbun',
    text: 'A green alpine valley in Liechtenstein, with snow still tucked into the ridges above the village.',
    kind: 'photo',
    image: '/images/hero-landscape/Malbun.JPG',
    imagePosition: 'center 48%',
    place: 'MALBUN',
  },
  {
    dateLabel: 'March 1, 2023',
    sortDate: '2023-03-01T23:15:00',
    title: 'Gros Piton',
    text: 'A tall ship passing beneath Gros Piton, framed by the sharp volcanic peak and bright Caribbean water.',
    kind: 'photo',
    image: '/images/hero-landscape/Gros_Piton.jpeg',
    imagePosition: 'center 48%',
    place: 'GROS PITON',
  },
  {
    dateLabel: 'March 4, 2023',
    sortDate: '2023-03-04T01:09:00',
    title: 'Marigot',
    text: 'A hillside cross above Marigot, with stone ruins, dry brush, and clouds rolling over the ridge.',
    kind: 'photo',
    image: '/images/hero-landscape/Marigot.jpeg',
    imagePosition: 'center 48%',
    place: 'MARIGOT',
  },
  {
    dateLabel: 'June 9, 2023',
    sortDate: '2023-06-09T15:46:00',
    title: 'Vienna',
    text: 'An ornate church interior in Vienna, all carved stone, high windows, and theatrical Baroque light.',
    kind: 'photo',
    image: '/images/hero-portrait/Vienna.jpeg',
    imagePosition: 'center 42%',
    place: 'VIENNA',
  },
  {
    dateLabel: 'May 3, 2024',
    sortDate: '2024-05-03T19:22:00',
    title: 'Tokyo',
    text: 'A lantern and striped awning caught in a tight Tokyo street scene, bright and close to the sidewalk.',
    kind: 'photo',
    image: '/images/hero-portrait/Tokyo.jpeg',
    imagePosition: 'center 42%',
    place: 'TOKYO',
  },
  {
    dateLabel: 'May 5, 2024',
    sortDate: '2024-05-05T03:37:00',
    title: 'Fuji',
    text: 'Mount Fuji rising cleanly across the water, the snow line catching a clear blue day.',
    kind: 'photo',
    image: '/images/hero-landscape/Fuji.jpeg',
    imagePosition: 'center 48%',
    place: 'FUJI',
  },
  {
    dateLabel: 'May 6, 2024',
    sortDate: '2024-05-06T04:59:00',
    title: 'Sapporo',
    text: 'A rain-glossed Sapporo street at blue hour, with tram tracks pulling the eye through the city.',
    kind: 'photo',
    image: '/images/hero-portrait/Sapporo.jpeg',
    imagePosition: 'center 42%',
    place: 'SAPPORO',
  },
  {
    dateLabel: 'May 6, 2024',
    sortDate: '2024-05-06T05:02:00',
    title: 'Sapporo',
    text: 'A wider night view of Sapporo streets, neon, and traffic lights reflected on the rails.',
    kind: 'photo',
    image: '/images/hero-landscape/Sapporo.jpeg',
    imagePosition: 'center 48%',
    place: 'SAPPORO',
  },
  {
    dateLabel: 'May 7, 2024',
    sortDate: '2024-05-07T15:13:00',
    title: 'Hill of the Buddha',
    text: 'Looking up through the circular opening at the Hill of the Buddha, where concrete frames the quiet statue.',
    kind: 'photo',
    image: '/images/hero-portrait/Hill_of_the_Buddha.jpeg',
    imagePosition: 'center 42%',
    place: 'HILL OF THE BUDDHA',
  },
  {
    dateLabel: 'May 10, 2024',
    sortDate: '2024-05-10T04:47:00',
    title: 'Osaka',
    text: 'A red delivery van cutting through an Osaka crosswalk, turning an ordinary street moment into motion.',
    kind: 'photo',
    image: '/images/hero-landscape/Osaka.jpeg',
    imagePosition: 'center 48%',
    place: 'OSAKA',
  },
  {
    dateLabel: 'May 11, 2024',
    sortDate: '2024-05-11T02:12:00',
    title: 'Kyoto',
    text: 'A corridor of vermilion torii gates in Kyoto, glowing with warm light and repeating shadows.',
    kind: 'photo',
    image: '/images/hero-portrait/Kyoto.jpeg',
    imagePosition: 'center 42%',
    place: 'KYOTO',
  },
  {
    dateLabel: 'May 12, 2024',
    sortDate: '2024-05-12T01:56:00',
    title: 'Matsuyama',
    text: 'A quiet Matsuyama side street, dense with bikes, signs, and everyday city texture.',
    kind: 'photo',
    image: '/images/hero-landscape/Matsuyama.jpeg',
    imagePosition: 'center 48%',
    place: 'MATSUYAMA',
  },
  {
    dateLabel: 'December 12, 2024',
    sortDate: '2024-12-12T22:48:00',
    title: 'Sydney Zoo',
    text: 'A cassowary portrait from Sydney Zoo, vivid blue and green against the leafy enclosure.',
    kind: 'photo',
    image: '/images/hero-portrait/Sydney_Zoo.jpeg',
    imagePosition: 'center 42%',
    place: 'SYDNEY ZOO',
  },
  {
    dateLabel: 'December 13, 2024',
    sortDate: '2024-12-13T05:55:00',
    title: 'Sydney',
    text: 'The Sydney Opera House glowing at night from the harbor walk, with crowds moving through the foreground.',
    kind: 'photo',
    image: '/images/hero-landscape/Sydney.jpeg',
    imagePosition: 'center 48%',
    place: 'SYDNEY',
  },
  {
    dateLabel: 'December 13, 2024',
    sortDate: '2024-12-13T05:55:01',
    title: 'Sydney',
    text: 'A closer vertical view of the Opera House sails, lit gold against the night sky.',
    kind: 'photo',
    image: '/images/hero-portrait/Sydney.jpeg',
    imagePosition: 'center 42%',
    place: 'SYDNEY',
  },
  {
    dateLabel: 'May 12, 2024',
    sortDate: '2024-05-12T00:00:00',
    title: 'Downtown Matsuyama',
    text: 'A warm night storefront in downtown Matsuyama, glowing against the dark street.',
    kind: 'photo',
    image: '/images/hero-landscape/Downtown_Matsuyama.jpg',
    imagePosition: 'center 48%',
    place: 'DOWNTOWN MATSUYAMA',
  },
  {
    dateLabel: 'December 11, 2024',
    sortDate: '2024-12-11T00:00:00',
    title: 'Honolulu',
    text: 'Palm silhouettes against a saturated Honolulu sunset, the sky turning orange and pink over the beach.',
    kind: 'photo',
    image: '/images/hero-landscape/Honolulu.jpg',
    imagePosition: 'center 48%',
    place: 'HONOLULU',
  },
  {
    dateLabel: 'May 26, 2024',
    sortDate: '2024-05-26T00:00:00',
    title: 'Singapore',
    text: 'Singapore Supertrees rising into the sky, part garden, part sci-fi skyline.',
    kind: 'photo',
    image: '/images/hero-portrait/Singapore.jpeg',
    imagePosition: 'center 42%',
    place: 'SINGAPORE',
  },
  {
    dateLabel: 'July 1, 2023',
    sortDate: '2023-07-01T00:00:00',
    title: 'Vatican',
    text: 'A ceiling detail from the Vatican Museums, packed with figures, frescoes, and impossible scale.',
    kind: 'photo',
    image: '/images/hero-landscape/Vatican.jpeg',
    imagePosition: 'center 48%',
    place: 'VATICAN',
  },
  {
    dateLabel: 'May 19, 2024',
    sortDate: '2024-05-19T00:00:00',
    title: 'Hanoi',
    text: 'A rain-soaked Hanoi entrance under deep green trees, red signage glowing through the mist.',
    kind: 'photo',
    image: '/images/hero-portrait/Hanoi.png',
    imagePosition: 'center 42%',
    place: 'HANOI',
  },
  {
    dateLabel: 'July 7, 2023',
    sortDate: '2023-07-07T00:00:00',
    title: 'San Marino',
    text: 'A San Marino tower at sunset, perched above the clouds with orange light on the horizon.',
    kind: 'photo',
    image: '/images/hero-portrait/San_Marino.jpeg',
    imagePosition: 'center 42%',
    place: 'SAN MARINO',
  },
  {
    dateLabel: 'July 3, 2023',
    sortDate: '2023-07-03T00:00:00',
    title: 'Victoria',
    text: 'Stone walkways and clocktower lines in Victoria, all sunlit walls and old-city geometry.',
    kind: 'photo',
    image: '/images/hero-portrait/Victoria.jpeg',
    imagePosition: 'center 42%',
    place: 'VICTORIA',
  },
]

function normalizeTarget(value?: string) {
  return (value ?? '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim()
}

function getRequestedPhotoTarget() {
  const params = new URLSearchParams(window.location.search)
  return {
    photo: params.get('photo') ?? '',
    place: params.get('place') ?? '',
  }
}

function findRequestedPhotoIndex(events: TimelineEvent[], target: { photo: string, place: string }) {
  if (target.photo) {
    const exactPhotoIndex = events.findIndex((event) => event.image === target.photo)
    if (exactPhotoIndex >= 0) return exactPhotoIndex

    const normalizedPhoto = normalizeTarget(target.photo)
    const fuzzyPhotoIndex = events.findIndex((event) => normalizeTarget(event.image) === normalizedPhoto)
    if (fuzzyPhotoIndex >= 0) return fuzzyPhotoIndex
  }

  if (target.place) {
    const normalizedPlace = normalizeTarget(target.place)
    return events.findIndex((event) => normalizeTarget(event.place) === normalizedPlace || normalizeTarget(event.title) === normalizedPlace)
  }

  return -1
}

export default function Timeline() {
  const events = useMemo(() => [...photoEvents].sort((a, b) => a.sortDate.localeCompare(b.sortDate)), [])
  const imageEvents = useMemo(() => events.filter((event) => event.image), [events])
  const [activeIndex, setActiveIndex] = useState(0)
  const [fullscreenEvent, setFullscreenEvent] = useState<TimelineEvent | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const eventRefs = useRef<Array<HTMLDivElement | null>>([])
  const activeIndexRef = useRef(0)
  const suppressViewportSelectionUntil = useRef(0)
  const lastWheelStepAt = useRef(0)
  const wheelIntent = useRef<TimelineWheelIntent>({ amount: 0, direction: null, lastAt: 0 })
  const wheelCorrectionTimeout = useRef<number | null>(null)
  const activeEvent = events[activeIndex] ?? events[0]
  const nextImage = useMemo(() => events.slice(activeIndex + 1).find((event) => event.image)?.image, [activeIndex, events])
  const fullscreenImageIndex = fullscreenEvent ? imageEvents.findIndex((event) => event.image === fullscreenEvent.image && event.sortDate === fullscreenEvent.sortDate) : -1

  const [prevEventsLength, setPrevEventsLength] = useState(events.length)
  if (events.length !== prevEventsLength) {
    setPrevEventsLength(events.length)
    if (activeIndex >= events.length) setActiveIndex(0)
  }

  // Refs can't be written during render, so keep this as a backstop that mirrors
  // activeIndex into the ref shortly after; interactive handlers below also set
  // the ref synchronously themselves for same-tick reads.
  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => () => {
    if (wheelCorrectionTimeout.current !== null) window.clearTimeout(wheelCorrectionTimeout.current)
  }, [])

  const showFullscreenNeighbor = useCallback((direction: 1 | -1) => {
    if (!fullscreenEvent || imageEvents.length === 0) return
    const currentIndex = fullscreenImageIndex >= 0 ? fullscreenImageIndex : 0
    const nextIndex = (currentIndex + direction + imageEvents.length) % imageEvents.length
    setFullscreenEvent(imageEvents[nextIndex])
  }, [fullscreenEvent, imageEvents, fullscreenImageIndex])

  useEffect(() => {
    if (!fullscreenEvent) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenEvent(null)
      if (event.key === 'ArrowLeft') showFullscreenNeighbor(-1)
      if (event.key === 'ArrowRight') showFullscreenNeighbor(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [fullscreenEvent, showFullscreenNeighbor])

  const centerSelectedEvent = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const node = eventRefs.current[activeIndexRef.current]
    if (!node) return
    node.focus({ preventScroll: true })
    node.scrollIntoView({ behavior, block: 'center' })
  }, [])

  const scheduleWheelCorrection = () => {
    if (wheelCorrectionTimeout.current !== null) window.clearTimeout(wheelCorrectionTimeout.current)
    wheelCorrectionTimeout.current = window.setTimeout(() => {
      suppressViewportSelectionUntil.current = window.performance.now() + 450
      centerSelectedEvent('smooth')
    }, 180)
  }

  const selectEvent = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const boundedIndex = Math.min(Math.max(index, 0), events.length - 1)
    activeIndexRef.current = boundedIndex
    suppressViewportSelectionUntil.current = window.performance.now() + 650
    setActiveIndex(boundedIndex)
    window.requestAnimationFrame(() => {
      centerSelectedEvent(behavior)
    })
  }, [events.length, centerSelectedEvent])

  useEffect(() => {
    const selectRequestedPhoto = (behavior: ScrollBehavior = 'smooth') => {
      const targetIndex = findRequestedPhotoIndex(events, getRequestedPhotoTarget())
      if (targetIndex < 0) return
      window.requestAnimationFrame(() => selectEvent(targetIndex, behavior))
    }

    const handlePopState = () => selectRequestedPhoto('smooth')

    selectRequestedPhoto('auto')
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [events, selectEvent])

  const getKeyTargetIndex = (key: string, index: number) => {
    const keyActions: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      PageDown: index + 3,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      PageUp: index - 3,
      Home: 0,
      End: events.length - 1,
    }

    return keyActions[key]
  }

  const handleTimelineKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, index: number) => {
    const nextIndex = getKeyTargetIndex(event.key, index)
    if (nextIndex === undefined) return
    event.preventDefault()
    event.stopPropagation()
    selectEvent(nextIndex)
  }

  const handleTimelineWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

    const delta = normalizedTimelineWheelDelta(event)
    if (Math.abs(delta) < timelineWheelMinDelta) return

    const direction = delta > 0 ? 1 : -1
    const nextIndex = activeIndexRef.current + direction
    if (nextIndex < 0 || nextIndex >= events.length) {
      wheelIntent.current = { amount: 0, direction: null, lastAt: 0 }
      return
    }

    event.preventDefault()
    scheduleWheelCorrection()
    const now = window.performance.now()

    if (now - lastWheelStepAt.current < timelineWheelCooldownMs) {
      wheelIntent.current = { amount: 0, direction, lastAt: now }
      return
    }

    if (wheelIntent.current.direction !== direction || now - wheelIntent.current.lastAt > timelineWheelResetMs) {
      wheelIntent.current = { amount: 0, direction, lastAt: now }
    }

    wheelIntent.current.amount += Math.abs(delta)
    wheelIntent.current.direction = direction
    wheelIntent.current.lastAt = now
    if (wheelIntent.current.amount < timelineWheelStepThreshold) return

    wheelIntent.current = { amount: 0, direction, lastAt: now }
    lastWheelStepAt.current = now
    selectEvent(nextIndex, 'auto')
  }

  return (
    <div id="timeline" className="glass-root timeline-section-photos relative min-h-screen overflow-hidden" ref={sectionRef} onWheel={handleTimelineWheel}>
      <div aria-hidden="true" className="glass-bloom" />
      <div aria-hidden="true" className="glass-bloom-2" />
      <div className="relative mx-auto max-w-[1480px] px-7 pb-[120px] pt-[110px]">
        <div className="glass-mono text-[10px] uppercase tracking-[.22em] text-[var(--g-ink3)]">Photo Timeline</div>
        <h1 style={inkStyle} className="mt-3 max-w-[26ch] text-[clamp(30px,3.2vw,46px)] font-normal tracking-[-.03em]">Places, frame by frame.</h1>

        <div className="timeline-journey mt-14">
          <div className="relative">
            <div className="timeline-line absolute bottom-0 left-[5.95rem] top-0 w-px sm:left-[7.95rem]" />
            {events.map((event, i) => (
              <motion.div
                key={`${event.sortDate}-${event.title}-${event.image ?? event.kind}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: .72 }}
                transition={{ delay: Math.min(i, 4) * .04 }}
                onViewportEnter={() => {
                  if (window.performance.now() < suppressViewportSelectionUntil.current) return
                  activeIndexRef.current = i
                  setActiveIndex(i)
                }}
                onMouseEnter={() => {
                  activeIndexRef.current = i
                  setActiveIndex(i)
                }}
                onFocus={() => {
                  activeIndexRef.current = i
                  setActiveIndex(i)
                }}
                onKeyDown={(event) => handleTimelineKeyDown(event, i)}
                ref={(node) => { eventRefs.current[i] = node }}
                tabIndex={0}
                role="button"
                aria-label={`${event.dateLabel}: ${event.title}. Use arrow keys to move through the timeline.`}
                className={`timeline-event relative grid grid-cols-[5.5rem_1fr] gap-8 pb-12 sm:grid-cols-[7.5rem_1fr] ${activeIndex === i ? 'timeline-event-active' : ''}`}
              >
                <div style={ink3Style} className="pt-1 text-right text-sm font-medium">{event.dateLabel}</div>
                <div className="relative pl-4">
                  <span className="timeline-dot absolute -left-[.46rem] top-1.5 h-3 w-3 rounded-full border-2" style={{ borderColor: 'var(--g-edge2)', background: 'var(--g-bg)' }} />
                  <div className="timeline-event-card">
                    {event.image && (
                      <div className="timeline-mobile-photo mb-4 overflow-hidden rounded-2xl border border-white/10 md:hidden">
                        <img
                          src={event.image}
                          alt={`${event.place ?? event.title} timeline photograph`}
                          loading="lazy"
                          decoding="async"
                          className="h-44 w-full object-cover"
                          style={{ objectPosition: event.imagePosition }}
                        />
                        <button
                          type="button"
                          className="timeline-photo-expand timeline-photo-expand-mobile"
                          onClick={(clickEvent) => {
                            clickEvent.stopPropagation()
                            setFullscreenEvent(event)
                          }}
                          aria-label={`View ${event.place ?? event.title} photo fullscreen`}
                        >
                          <Maximize2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                    <div className="mb-3 inline-flex rounded-full border px-2.5 py-1 text-[.62rem] font-bold uppercase tracking-[.18em]" style={{ ...ink3Style, borderColor: 'var(--g-slotedge)', background: 'var(--g-slot)' }}>{event.kind === 'photo' ? 'Photo' : event.meta}</div>
                    <h3 style={inkStyle} className="font-semibold">{event.title}</h3>
                    <p style={ink2Style} className="mt-2 leading-6">{event.text}</p>
                    <div style={ink3Style} className="mt-4 text-[.65rem] font-bold uppercase tracking-[.24em]">{event.meta ?? event.place}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <aside className="timeline-photo-rail" aria-label="Timeline photograph">
            <div className={`timeline-photo-frame ${activeEvent.image ? '' : 'timeline-photo-frame-empty'}`}>
              <AnimatePresence mode="wait">
                {activeEvent.image ? (
                  <motion.div
                    key={activeEvent.image}
                    className="timeline-photo-stage"
                    initial={{ opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: .985 }}
                    transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={activeEvent.image}
                      alt={`${activeEvent.place ?? activeEvent.title} timeline photograph`}
                      loading="lazy"
                      decoding="async"
                      className="timeline-photo"
                      style={{ objectPosition: activeEvent.imagePosition }}
                    />
                    <button
                      type="button"
                      className="timeline-photo-expand"
                      onClick={() => setFullscreenEvent(activeEvent)}
                      aria-label={`View ${activeEvent.place ?? activeEvent.title} photo fullscreen`}
                    >
                      <Maximize2 size={17} aria-hidden="true" />
                      <span>View</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${activeEvent.sortDate}-${activeEvent.title}`}
                    className="timeline-photo-placeholder"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: .45 }}
                  >
                    <span>{activeEvent.meta}</span>
                    <strong>Photo coming later</strong>
                    <p>Add an image for this milestone whenever you want, and we can wire it in here.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {nextImage && <link rel="prefetch" as="image" href={nextImage} />}
              <div className="timeline-photo-glow" />
              <div className="timeline-photo-caption">
                <span>{activeEvent.dateLabel}</span>
                <strong>{activeEvent.place ?? activeEvent.title}</strong>
                <p>{activeEvent.text}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {fullscreenEvent?.image && (
          <motion.div
            className="timeline-fullscreen"
            role="dialog"
            aria-modal="true"
            aria-label={`${fullscreenEvent.place ?? fullscreenEvent.title} fullscreen timeline photo`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenEvent(null)}
          >
            <button
              type="button"
              className="timeline-fullscreen-close"
              onClick={() => setFullscreenEvent(null)}
              aria-label="Close fullscreen photo"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="timeline-fullscreen-nav timeline-fullscreen-nav-prev"
              onClick={(event) => {
                event.stopPropagation()
                showFullscreenNeighbor(-1)
              }}
              aria-label="Previous timeline photo"
            >
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="timeline-fullscreen-nav timeline-fullscreen-nav-next"
              onClick={(event) => {
                event.stopPropagation()
                showFullscreenNeighbor(1)
              }}
              aria-label="Next timeline photo"
            >
              <ChevronRight size={26} aria-hidden="true" />
            </button>
            <motion.img
              key={fullscreenEvent.image}
              src={fullscreenEvent.image}
              alt={`${fullscreenEvent.place ?? fullscreenEvent.title} fullscreen timeline photograph`}
              className="timeline-fullscreen-image"
              initial={{ opacity: 0, scale: .96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .98 }}
              transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            />
            <div className="timeline-fullscreen-caption">
              <span>{fullscreenEvent.dateLabel}</span>
              <strong>{fullscreenEvent.place ?? fullscreenEvent.title}</strong>
              <p>{fullscreenEvent.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
