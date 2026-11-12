import { useEffect, useState } from 'react'
import { Ornament, WhatsAppIcon } from './Icons'
import { waLink, store, categories } from '../data/content'

// Brass strip of all category names scrolling left → right
function CategoryMarquee() {
  const Row = ({ hidden }) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {categories.map((c) => (
        <li key={c.id} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-lg tracking-wide text-peacock-deep sm:text-xl">{c.name}</span>
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-kumkum" fill="currentColor" aria-hidden="true">
            <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6Z" />
          </svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee relative overflow-hidden border-y border-brass bg-brass-light py-3">
      <p className="sr-only">Our categories: {categories.map((c) => c.name).join(', ')}</p>
      <div className="marquee-track flex w-max" aria-hidden="true">
        <Row /><Row hidden /><Row hidden /><Row hidden />
      </div>
    </div>
  )
}

// Carousel photos — the store's own product cut-outs (square 900 × 900, transparent background) in public/photo
const slides = [
  { src: '/photo/IMG_3729_900x900_full.png', alt: 'Hand-painted Ganesha wall art with carved floral frame' },
  { src: '/photo/IMG_3953_900x900_full.png', alt: 'Pale blue ceramic vase with raised purple flowers' },
  { src: '/photo/IMG_3975_900x900_full.png', alt: 'Lord Krishna bust playing the flute, with peacock-feather crown' },
  { src: '/photo/IMG_3954_900x900_full.png', alt: 'Cream ceramic vase with a sculpted maroon flower' },
  { src: '/photo/sculpture_cutout_900x900.png', alt: 'Smiling baby monk sculpture resting on its hands' },
]

const AUTOPLAY_MS = 4000

// Where each slide sits relative to the active one: main in front, one peeking behind on each side
const POSITIONS = {
  main: 'z-30 translate-x-0 scale-[1.15] opacity-100',
  right: 'z-20 translate-x-[44%] scale-[0.58] opacity-45',
  left: 'z-20 -translate-x-[44%] scale-[0.58] opacity-45',
  hidden: 'z-10 translate-x-0 scale-[0.6] opacity-0',
}

function ArchCarousel() {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)

  // Respect reduced-motion: never autoplay
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = (e) => setReduced(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const running = !hovering && !reduced
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [running, n])

  const placeOf = (i) => {
    const d = (i - active + n) % n
    if (d === 0) return 'main'
    if (d === 1) return 'right'
    if (d === n - 1) return 'left'
    return 'hidden'
  }

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sun Artisans gallery"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div className="absolute inset-x-[6%] inset-y-0">
        {slides.map((s, i) => {
          const place = placeOf(i)
          return (
            <div
              key={s.src}
              aria-hidden={place !== 'main'}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              className={`absolute top-[56%] left-[14%] aspect-square w-[72%] -translate-y-1/2 origin-center transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${POSITIONS[place]}`}
            >
              {/* Inner layer swings when this slide becomes main */}
              {/* No backdrop — the transparent product cut-out floats directly on the sunburst */}
              <div className={`relative h-full w-full ${place === 'main' ? 'swing-in' : ''}`}>
                <img
                  src={s.src}
                  alt={s.alt}
                  loading={i < 3 || i === n - 1 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_18px_18px_rgb(42_31_20/0.45)]"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const pillars = [
  {
    title: 'Trustworthy',
    icon: (
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Zm-3.2 9.2 2.2 2.2 4.4-4.6" />
    ),
  },
  {
    title: 'Luxury',
    icon: <path d="M6 4h12l3 5-9 11L3 9l3-5Zm-3 5h18M9.5 4 12 20M14.5 4 12 20" />,
  },
  {
    title: 'Modern',
    icon: <path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6M4 20h16" />,
  },
]

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-peacock text-chandan"
    >
      <CategoryMarquee />

      {/* Brass hairline framing the section bottom */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brass-light/70 to-transparent" />

      {/* Faint mandala behind the photo cluster */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-170 w-170 -translate-y-1/2 text-brass-light opacity-[0.07]"
        viewBox="0 0 200 200" fill="none" stroke="currentColor"
      >
        {[95, 78, 60, 42, 24].map((r) => <circle key={r} cx="100" cy="100" r={r} strokeWidth="0.6" />)}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="100" y1="5" x2="100" y2="195" strokeWidth="0.4" transform={`rotate(${i * 15} 100 100)`} />
        ))}
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-8 sm:px-8 md:py-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch lg:gap-20 lg:py-10">
        {/* ── Arch carousel on a brass sunburst panel; on desktop it stretches to the text column's height ── */}
        <div className="sunburst arch relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden shadow-2xl shadow-black/30 ring-1 ring-brass-light/40 lg:aspect-auto lg:h-full lg:min-h-130 lg:max-w-none">
          <ArchCarousel />
        </div>

        {/* ── Story ── */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass-light">About Sun Artisans</p>

          {/* Two fixed lines; size scales with viewport so line 1 always fits its column */}
          <h2 id="about-heading" className="mt-4 text-[clamp(1.45rem,6.4vw,2.6rem)] leading-[1.2] lg:text-[2.1rem] xl:text-[2.4rem]">
            <span className="block whitespace-nowrap">Pimpri-Chinchwad’s trusted</span>
            <span className="block whitespace-nowrap text-brass-light">art &amp; craft gallery</span>
          </h2>

          <Ornament className="mx-auto mt-6 h-5 w-auto text-brass-light/70 lg:mx-0" />

          <div className="mx-auto mt-6 max-w-[60ch] space-y-4 text-[1.05rem] leading-relaxed text-white lg:mx-0">
            <p>
              {store.legalName} is a home decor and art gallery in Udhyamnagar, Pimpri — the place families across
              PCMC and Pune turn to for god murtis, brass items, photo frames, artificial plants, abstract showpieces,
              dining platters and clocks.
            </p>
            <p>
              Furnishing a new home, choosing a gift, or sourcing for a client project? Everything is curated under one roof.
            </p>
          </div>

          {/* Pillars */}
          <ul className="mt-10 grid grid-cols-3 gap-2 text-left">
            {pillars.map((p) => (
              <li key={p.title} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-brass-light/20 bg-peacock-deep/50 px-2 py-4">
                <svg
                  aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="h-6 w-6 shrink-0 text-brass-light"
                >
                  {p.icon}
                </svg>
                <h3 className="text-center text-sm font-medium text-chandan sm:text-base">{p.title}</h3>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href={waLink()} target="_blank" rel="noopener" className="btn bg-[#25D366] text-[#0B2A17] hover:bg-[#1EBE5D]">
              <WhatsAppIcon className="h-5 w-5" />
              Chat with us
            </a>
            <a href="#visit" className="btn-ghost-dark">Visit the store</a>
          </div>
        </div>
      </div>
    </section>
  )
}
