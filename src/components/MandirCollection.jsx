import { useEffect, useRef, useState } from 'react'
import { waLink } from '../data/content'
import { Ornament, WhatsAppIcon } from './Icons'
import Lightbox, { SmartImg } from './Lightbox'

/*
 * Photos: put 6 images per item in public/photo/mandir/<id>/1.webp … 6.webp
 * e.g. public/photo/mandir/home-mandirs/1.webp
 * Ids: home-mandirs, god-murtis, brass-items
 * Size: 800 × 800 px (square). Until a file exists, the DEMO image below is shown instead.
 */
const PHOTOS = 6
const photoSrc = (id, n) => `/photo/mandir/${id}/${n}.webp`

// Demo images (Unsplash) — shown only while the real photo file is missing. Delete once real photos are in.
const u = (id) => `https://images.unsplash.com/photo-${id}?w=700&h=700&fit=crop&q=75`
const DEMO = {
  'god-murtis': ['1600618528240-fb9fc964b853', '1600585154340-be6161a56a0c', '1540518614846-7eded433c457', '1513519245088-0e12902e5a38', '1558618666-fcd25c85cd64', '1604014237800-1c9102c219da'].map(u),
  'brass-items': ['1606293926075-69a00dbfde81', '1416879595882-3373a0480b5b', '1586023492125-27b2c045efd7', '1567767292278-a4f21aa2d36e', '1616046229478-9901c5536a45', '1540518614846-7eded433c457'].map(u),
}
const demoSrc = (id, n) => DEMO[id]?.[n - 1]

const items = [
  {
    id: 'god-murtis',
    name: 'God Murtis',
    tag: 'Timeless Faith',
    chips: ['Marble', 'Brass', 'Resin', 'Traditional & modern'],
    text: 'Traditional and modern styles across marble, brass and resin. From small pooja-shelf murtis to statement pieces crafted with care and devotion.',
    icon: <path d="M12 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM8 21c0-3 .5-6 1.5-8.5L12 10l2.5 2.5C15.5 15 16 18 16 21M5 21h14M7.5 12 5 10m11.5 2L19 10" />,
  },
  {
    id: 'brass-items',
    name: 'Brass Items',
    tag: 'Heritage Craft',
    chips: ['Diyas', 'Kalash', 'Incense holders', 'Bells'],
    text: 'Diyas, kalash, incense holders, bells and more — each handcrafted piece adds warmth, tradition and character to any pooja space or living room.',
    icon: <path d="M12 3c1.6 2 2.4 3.4 2.4 4.6A2.4 2.4 0 0 1 12 10a2.4 2.4 0 0 1-2.4-2.4C9.6 6.4 10.4 5 12 3ZM4 13h16c-.6 3.6-3.8 6-8 6s-7.4-2.4-8-6ZM9 19l-1 2h8l-1-2" />,
  },
]

const enquire = (item) => ({
  href: waLink(`Hi Sun Artisans, I'd like to enquire about ${item.name}.`),
  external: true,
})

/*
 * Infinite photo carousel: shows 2 / 3 / 5 photos (mobile / tablet / desktop)
 * and moves one photo at a time. The first few photos are cloned at the end so
 * the loop wraps around without a visible jump. Pauses on hover; no autoplay with reduced motion.
 */
const STEP_MS = 2500
const MAX_VISIBLE = 5

function PhotoCarousel({ item, dir, onOpen }) {
  const slides = [...Array(PHOTOS).keys(), ...Array(MAX_VISIBLE).keys()] // 0..5 + clones 0..4
  const [k, setK] = useState(0) // how many photos the track has moved
  const [instant, setInstant] = useState(false) // true while snapping back from clones to the start
  const [hover, setHover] = useState(false)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Auto-advance one photo at a time
  useEffect(() => {
    if (hover || reduced) return
    const t = setInterval(() => setK((v) => v + 1), STEP_MS)
    return () => clearInterval(t)
  }, [hover, reduced])

  // After the slide onto the first clone finishes, jump (without animation) back to the real first photo
  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (k >= PHOTOS) {
      setInstant(true)
      setK((v) => v - PHOTOS)
    }
  }
  // Safety net if transitionend didn't fire (e.g. background tab)
  useEffect(() => {
    if (k > PHOTOS) { setInstant(true); setK((v) => v % PHOTOS) }
  }, [k])
  // Re-enable the animation on the next frame after an instant snap
  useEffect(() => {
    if (!instant) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)))
    return () => cancelAnimationFrame(id)
  }, [instant])

  return (
    <div
      className="overflow-hidden [--g:0.5rem] [--v:2] sm:[--g:0.75rem] sm:[--v:3] lg:[--v:5]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ul
        onTransitionEnd={onTransitionEnd}
        className={`flex gap-(--g) ${instant ? '' : 'transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]'}`}
        style={{ transform: `translateX(calc(${-k} * (100% + var(--g)) / var(--v)))` }}
      >
        {slides.map((n, i) => {
          const clone = i >= PHOTOS
          return (
            <li
              key={i}
              aria-hidden={clone || undefined}
              className={`shrink-0 ${dir > 0 ? 'mandir-in-right' : 'mandir-in-left'}`}
              style={{ flexBasis: 'calc((100% - (var(--v) - 1) * var(--g)) / var(--v))', animationDelay: `${Math.min(i, MAX_VISIBLE) * 70}ms` }}
            >
              <button
                type="button"
                tabIndex={clone ? -1 : undefined}
                onClick={() => onOpen(n)}
                aria-label={`View ${item.name} photo ${n + 1}`}
                className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-peacock ring-1 ring-brass-light/25"
              >
                <SmartImg
                  src={photoSrc(item.id, n + 1)}
                  fallbackSrc={demoSrc(item.id, n + 1)}
                  alt=""
                  tone="dark"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function MandirCollection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [viewing, setViewing] = useState(null)
  const tabRefs = useRef([])
  const active = items[activeIdx]

  // Direction of the last tab change, so new photos slide in from that side
  const [dir, setDir] = useState(1)

  const select = (next) => {
    if (next === activeIdx) return
    setDir(next > activeIdx ? 1 : -1)
    setActiveIdx(next)
  }

  const onKeyDown = (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!d) return
    e.preventDefault()
    const next = (activeIdx + d + items.length) % items.length
    select(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="mandir" aria-labelledby="mandir-heading" className="relative overflow-hidden bg-peacock-deep pt-8 pb-12 text-chandan lg:pt-10 lg:pb-16">
      {/* Faint mandala, top right */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-130 w-130 text-brass-light opacity-[0.06]"
        viewBox="0 0 200 200" fill="none" stroke="currentColor"
      >
        {[95, 78, 60, 42, 24].map((r) => <circle key={r} cx="100" cy="100" r={r} strokeWidth="0.6" />)}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="100" y1="5" x2="100" y2="195" strokeWidth="0.4" transform={`rotate(${i * 15} 100 100)`} />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass-light">Mandir Collection</p>
          <h2 id="mandir-heading" className="mt-2 text-4xl sm:text-5xl">
            Mandir, Murti &amp; Brass
          </h2>
          <p className="mt-2 font-display text-xl text-brass-light sm:text-2xl">Crafted for everyday worship</p>
          <Ornament className="mx-auto mt-4 h-5 w-auto text-brass-light/70" />
        </div>

        {/* ── 3 tabs on top ── */}
        <div
          role="tablist"
          aria-label="Mandir collection"
          onKeyDown={onKeyDown}
          className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-2 sm:gap-4 lg:mt-8"
        >
          {items.map((it, i) => {
            const selected = i === activeIdx
            return (
              <button
                key={it.id}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`mandir-tab-${it.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="mandir-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-4 text-center transition-all duration-300 sm:flex-row sm:gap-3 sm:px-5 sm:text-left
                  ${selected
                    ? 'border-brass-light bg-brass-light text-peacock-deep shadow-lg shadow-black/30'
                    : 'border-brass-light/25 bg-peacock/40 text-chandan hover:border-brass-light/60 hover:bg-peacock/70'}`}
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors ${selected ? 'bg-peacock-deep text-brass-light' : 'bg-brass-light/10 text-brass-light'}`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {it.icon}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base leading-tight sm:text-xl">{it.name}</span>
                  <span className={`mt-0.5 hidden text-xs uppercase tracking-[0.2em] sm:block ${selected ? 'text-peacock-deep/70' : 'text-chandan/60'}`}>
                    {it.tag}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Panel: details + 6 photos ── */}
        <div
          id="mandir-panel"
          role="tabpanel"
          aria-labelledby={`mandir-tab-${active.id}`}
          className="mt-8 lg:mt-10"
        >
          {/* Details — centred editorial, on top */}
          <div key={active.id} className="cat-fade mx-auto max-w-3xl text-center">
            <p className="mx-auto max-w-[56ch] text-lg leading-relaxed text-white">{active.text}</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label={`${active.name} highlights`}>
              {active.chips.map((c) => (
                <li key={c} className="flex items-center gap-2 text-brass-light">
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                    <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6Z" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Photos — infinite carousel, one photo at a time */}
          <div className="mt-8 sm:mt-10">
            <PhotoCarousel key={active.id} item={active} dir={dir} onOpen={setViewing} />
          </div>
          <div className="mt-8 text-center">
              <a
                href={enquire(active).href}
                target="_blank"
                rel="noopener"
                className="btn bg-[#25D366] text-[#0B2A17] hover:bg-[#1EBE5D]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enquire about {active.name}
              </a>
          </div>
        </div>
      </div>

      <Lightbox
        id={active.id}
        title={active.name}
        total={PHOTOS}
        srcFor={(n) => photoSrc(active.id, n)}
        fallbackFor={(n) => demoSrc(active.id, n)}
        enquire={enquire(active)}
        index={viewing}
        onClose={() => setViewing(null)}
        onStep={(d) => setViewing((v) => (v + d + PHOTOS) % PHOTOS)}
      />
    </section>
  )
}
