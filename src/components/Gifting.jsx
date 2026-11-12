import { useEffect, useState } from 'react'
import { waLink } from '../data/content'

const occasions = ['Housewarmings', 'Weddings', 'Festivals', 'Corporate gifting']

// Needs 3+ images each: with only 2, the outgoing image would re-enter from the top
const leftSlides = [
  { src: '/photo/categories/dining-platters/1.webp', alt: 'Floral ceramic vase gift' },
  { src: '/photo/categories/god-items/6.webp', alt: 'Brass Ganesha gift' },
  { src: '/photo/categories/dining-platters/8.webp', alt: 'Floral ceramic bowl gift' },
  { src: '/photo/categories/other-items/1.webp', alt: 'Brass Radha Krishna jhula gift' },
]
const rightSlides = [
  { src: '/photo/categories/other-items/8.webp', alt: 'Metal vase gift' },
  { src: '/photo/categories/clocks/11.webp', alt: 'Classic table clock gift' },
  { src: '/photo/categories/abstract-showpieces/4.webp', alt: 'Brass tree of life gift' },
  { src: '/photo/categories/dining-platters/5.webp', alt: 'Gold ceramic vase gift' },
]

// One image visible at a time; every few seconds the next one rises up from below and pushes the current one out the top
function RisingSlides({ slides, delay = 0 }) {
  const [i, setI] = useState(0)
  const n = slides.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let interval
    const start = setTimeout(() => {
      setI((v) => (v + 1) % n)
      interval = setInterval(() => setI((v) => (v + 1) % n), 3600)
    }, 3600 + delay)
    return () => { clearTimeout(start); clearInterval(interval) }
  }, [n, delay])

  const prev = (i - 1 + n) % n
  return slides.map((s, k) => {
    const moving = k === i || k === prev
    const pos = k === i ? 'translate-y-0' : k === prev ? '-translate-y-full' : 'translate-y-full'
    return (
      <img
        key={s.src}
        src={s.src}
        alt={k === i ? s.alt : ''}
        aria-hidden={k !== i || undefined}
        className={`absolute inset-0 h-full w-full object-cover ${pos} ${moving ? 'transition-transform duration-1000 ease-[cubic-bezier(.65,0,.35,1)]' : ''}`}
      />
    )
  })
}

export default function Gifting({ image = null }) {
  // -mt-px tucks under the dark section above so sub-pixel rounding can't leave a cream seam
  return (
    <section id="gifting" className="relative -mt-px overflow-hidden pt-0 pb-6 lg:pb-8" style={{ background: '#faf5ee' }}>

      {/* diagonal stripe pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
        <defs>
          <pattern id="gift-stripe" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="10" height="20" fill="#C9973A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gift-stripe)" />
      </svg>

      {/* Scallop top — green flows into cream pattern */}
      {/* Dark backing on the top of the strip: the SVG's anti-aliased top edge blends into dark, not cream, so no light seam shows */}
      <div className="relative h-8 w-full overflow-hidden leading-[0] sm:h-12" style={{ background: 'linear-gradient(#09302F 30%, transparent 30%)' }}>
        {/* min-width keeps each wave ~120px wide, so narrow screens show fewer, gentler waves instead of squashed ones */}
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="h-full w-full min-w-[720px]" style={{ display: 'block' }}>
          <path d="M0,0 L0,28 Q60,48 120,28 Q180,8 240,28 Q300,48 360,28 Q420,8 480,28 Q540,48 600,28 Q660,8 720,28 Q780,48 840,28 Q900,8 960,28 Q1020,48 1080,28 Q1140,8 1200,28 Q1260,48 1320,28 Q1380,8 1440,28 L1440,0 Z" fill="#09302F" />
        </svg>
      </div>



      {/* large decorative circle — top right */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border-2 opacity-10" style={{ borderColor: '#C9973A' }} />
      <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full border opacity-10" style={{ borderColor: '#C9973A' }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        <div>
          {/* subtitle */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#C9973A]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9973A]">Gifting</span>
            <span className="h-px w-8 bg-[#C9973A]" />
          </div>
          <h2 className="text-[clamp(1.4rem,6.6vw,2.25rem)] leading-tight text-[#0b3330] sm:max-w-[18ch] sm:text-5xl">
            <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">Thoughtful gifting,</span>{' '}
            <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">curated for every occasion</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-ink-soft">
            Looking for the perfect gift? Sun Artisans' gifting collection covers housewarmings, weddings, festivals
            and corporate occasions. From elegant artifacts to brass décor pieces, every gift is chosen to feel personal and premium.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {occasions.map((o) => (
              <li key={o} className="rounded-full border px-4 py-1.5 text-sm font-medium" style={{ borderColor: '#C9973A', color: '#0b3330', background: '#C9973A15' }}>{o}</li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl p-6" style={{ background: 'linear-gradient(135deg,#0b3330,#0f4a44)', borderLeft: '4px solid #C9973A' }}>
            <p className="font-display text-xl" style={{ color: '#C9973A' }}>Planning a bulk order?</p>
            <p className="mt-2 max-w-[54ch]" style={{ color: '#d4c5b0' }}>
              For wedding favours or a corporate gifting event, reach out for bulk-order pricing and customisation.
            </p>
            <a href={waLink('Hi Sun Artisans, I would like to enquire about a bulk gifting order.')} target="_blank" rel="noopener" className="btn-primary mt-5">
              Enquire for bulk gifting orders
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="arch relative aspect-[3/5] overflow-hidden bg-[#DCC8A6] ring-1 ring-[#C9973A]/30">
            <RisingSlides slides={leftSlides} />
          </div>
          <div className="arch relative mt-16 aspect-[3/5] overflow-hidden bg-[#DCC8A6] ring-1 ring-[#C9973A]/30">
            <RisingSlides slides={rightSlides} delay={1800} />
          </div>
        </div>
      </div>

    </section>
  )
}
