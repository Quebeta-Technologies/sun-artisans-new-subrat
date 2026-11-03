import { useEffect, useRef, useState } from 'react'
import { waLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

const items = [
  {
    id: 'home-mandirs',
    name: 'Home Mandirs',
    tag: 'Sacred Spaces',
    text: 'Choose from a range of sizes and finishes — from compact wall-mount to grand floor mandirs. Each piece brings peace and devotion into your home.',
    cta: 'Enquire about Mandirs',
    img: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=900&q=85',
  },
  {
    id: 'god-murtis',
    name: 'God Murtis',
    tag: 'Timeless Faith',
    text: 'Traditional and modern styles across marble, brass, and resin. From small pooja shelf murtis to statement pieces crafted with care and devotion.',
    cta: 'Enquire about Murtis',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85',
  },
  {
    id: 'brass-items',
    name: 'Brass Items',
    tag: 'Heritage Craft',
    text: 'Diyas, kalash, incense holders, bells and more — each handcrafted piece adds warmth, tradition and character to any pooja space or living room.',
    cta: 'Enquire about Brass',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=85',
  },
]

export default function MandirCollection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const prevIndex = useRef(0)
  const panelRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      panelRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elMid = rect.top + rect.height / 2
        const dist = Math.abs(elMid - mid)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      prevIndex.current = activeIndex
      setActiveIndex(best)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── DESKTOP sticky scroll ── */}
      <div id="mandir" className="hidden lg:block relative"
        style={{ background: '#0a2e2b' }}>

        <style>{`
        .mandir-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 1.5rem; opacity: 0; transition: opacity 0.6s ease; }
        .mandir-img.active { opacity: 1; }
        .mandir-cta-btn {
          position: relative;
          overflow: hidden;
          z-index: 0;
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .mandir-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #C9973A;
          transform: translateX(-100%);
          transition: transform 0.35s ease;
          z-index: -1;
          border-radius: inherit;
        }
        .mandir-cta-btn:hover::before { transform: translateX(0); }
        .mandir-cta-btn:hover { color: #0a2e2b; border-color: #C9973A; }
      `}</style>

      {/* Subtle diagonal line pattern */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
          <defs>
            <pattern id="mandir-diag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#C9973A" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandir-diag)"/>
        </svg>

        {/* Section header — top center */}
        <div className="relative flex flex-col items-center pt-10 pb-6 z-10 text-center px-8">
          <div className="flex items-center gap-3 rounded-full px-5 py-2 mb-5"
            style={{ border: '1px solid rgba(201,151,58,0.3)', background: 'rgba(201,151,58,0.07)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: '#C9973A' }}>Mandir Collection</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A]" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight" style={{ color: '#f5ede0' }}>
            Mandir, Murti &amp; Brass Collection<br />
            <span style={{ color: '#C9973A' }}>Crafted for Everyday Worship</span>
          </h2>
        </div>

        {/* Main sticky layout */}
        <div className="relative flex mx-auto max-w-7xl px-8">

          {/* Vertical progress bar — far left */}
          <div className="flex flex-col items-center gap-0 mr-8 flex-shrink-0 pt-[calc(50vh-60px)]"
            style={{ alignSelf: 'flex-start', position: 'sticky', top: '80px', height: 'calc(100vh - 80px)', justifyContent: 'center' }}>
            {items.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="rounded-full transition-all duration-500 cursor-default"
                  style={{
                    width: i === activeIndex ? 10 : 6,
                    height: i === activeIndex ? 10 : 6,
                    background: i === activeIndex ? '#C9973A' : 'rgba(201,151,58,0.3)',
                    boxShadow: i === activeIndex ? '0 0 8px #C9973A88' : 'none',
                  }} />
                {i < items.length - 1 && (
                  <div style={{ width: 1, height: 48, background: 'rgba(201,151,58,0.2)' }} />
                )}
              </div>
            ))}
          </div>

          {/* LEFT — sticky image (60% width) */}
          <div className="flex-shrink-0" style={{
            width: '56%',
            alignSelf: 'flex-start',
            position: 'sticky',
            top: '80px',
            height: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '2rem',
          }}>
            <div className="relative w-full" style={{ height: '82vh' }}>
              {/* Images stacked, slide between them */}
              {items.map((item, i) => {
                const isActive = i === activeIndex
                const isAbove = i < activeIndex
                return (
                  <img
                    key={item.id}
                    src={item.img}
                    alt={item.name}
                    className={`mandir-img${isActive ? ' active' : ''}`}
                    style={{ zIndex: isActive ? 1 : 0 }}
                  />
                )
              })}

              {/* Subtle dark gradient at bottom of image */}
              <div className="absolute inset-x-0 bottom-0 h-32 rounded-b-3xl z-10"
                style={{ background: 'linear-gradient(to top, rgba(10,46,43,0.7) 0%, transparent 100%)' }} />

              {/* Gold corner accents */}
              <div className="pointer-events-none absolute inset-0 z-20">
                <svg viewBox="0 0 100 100" className="absolute top-4 left-4 h-10 w-10" fill="none" stroke="#C9973A" strokeWidth="2"><path d="M2 22 L2 2 L22 2"/></svg>
                <svg viewBox="0 0 100 100" className="absolute top-4 right-4 h-10 w-10" fill="none" stroke="#C9973A" strokeWidth="2"><path d="M98 22 L98 2 L78 2"/></svg>
                <svg viewBox="0 0 100 100" className="absolute bottom-4 left-4 h-10 w-10" fill="none" stroke="#C9973A" strokeWidth="2"><path d="M2 78 L2 98 L22 98"/></svg>
                <svg viewBox="0 0 100 100" className="absolute bottom-4 right-4 h-10 w-10" fill="none" stroke="#C9973A" strokeWidth="2"><path d="M98 78 L98 98 L78 98"/></svg>
              </div>

            </div>
          </div>

          {/* RIGHT — scrollable panels (40% width) */}
          <div style={{ width: '44%' }}>
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (panelRefs.current[i] = el)}
                className="flex flex-col justify-center"
                style={{ height: '100vh', paddingLeft: '1rem' }}
              >
                {/* Tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.35em] mb-4 px-3 py-1 rounded-full self-start"
                  style={{ color: '#C9973A', border: '1px solid rgba(201,151,58,0.35)', background: 'rgba(201,151,58,0.07)' }}>
                  {item.tag}
                </span>

                {/* Title */}
                <h2 className="font-display leading-[1.1] mb-5"
                  style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)', color: '#f5ede0' }}>
                  {item.name}
                </h2>

                {/* Gold divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9973A, transparent)' }} />
                  <span style={{ color: '#C9973A', fontSize: 12 }}>✦</span>
                </div>

                {/* Body */}
                <p className="text-[1.05rem] leading-relaxed mb-10" style={{ color: '#c8b89a', maxWidth: '38ch' }}>
                  {item.text}
                </p>

                {/* CTA */}
                <a
                  href={waLink(`Hi Sun Artisans, I'd like to enquire about ${item.name}.`)}
                  target="_blank" rel="noopener"
                  className="group inline-flex items-center gap-3 self-start"
                >
                  <span className="mandir-cta-btn inline-block rounded-xl border px-6 py-3 text-sm font-semibold"
                    style={{ color: '#f5ede0', borderColor: 'rgba(201,151,58,0.5)' }}>
                    {item.cta}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── MOBILE: stacked cards ── */}
      <div id="mandir-mobile" className="lg:hidden relative overflow-hidden py-12 px-5"
        style={{ background: '#0a2e2b' }}>
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ border: '1px solid rgba(201,151,58,0.3)', background: 'rgba(201,151,58,0.07)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: '#C9973A' }}>Mandir Collection</span>
          </div>
        </div>
        <div className="space-y-6 max-w-xl mx-auto">
          {items.map((item, i) => (
            <a key={item.id}
              href={waLink(`Hi Sun Artisans, I'd like to enquire about ${item.name}.`)}
              target="_blank" rel="noopener"
              className="group block rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(201,151,58,0.2)' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={item.img} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 60%)' }} />
              </div>
              <div className="p-5" style={{ background: 'rgba(15,60,55,0.95)' }}>
                <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: '#C9973A' }}>{item.tag}</span>
                <h3 className="font-display text-2xl mb-3" style={{ color: '#f5ede0' }}>{item.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#c8b89a' }}>{item.text}</p>
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                  style={{ background: '#25D366', color: '#fff' }}>
                  {item.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 leading-[0]">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full" style={{ height: 40, display: 'block' }}>
            <path d="M0,40 L0,20 Q60,40 120,20 Q180,0 240,20 Q300,40 360,20 Q420,0 480,20 Q540,40 600,20 Q660,0 720,20 Q780,40 840,20 Q900,0 960,20 Q1020,40 1080,20 Q1140,0 1200,20 Q1260,40 1320,20 Q1380,0 1440,20 L1440,40 Z" fill="#faf5ee" />
          </svg>
        </div>
      </div>
    </>
  )
}
