import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { categories, waLink } from '../data/content'
import { Ornament, WhatsAppIcon } from './Icons'
import Lightbox, { SmartImg } from './Lightbox'

const PHOTOS_PER_CATEGORY = 12
const photoSrc = (catId, n) => `/photo/categories/${catId}/${n}.png`

const enquiry = (cat) => ({
  href: cat.link ?? waLink(`Hi Sun Artisans, I'd like to enquire about ${cat.name}.`),
  external: !cat.link,
})

/* ── Mobile: accordion — tap category name to open/close ── */
function MobileCategories({ onView }) {
  const [openId, setOpenId] = useState(categories[0].id)
  return (
    <div className="divide-y divide-brass/20 rounded-2xl border border-brass/20 lg:hidden">
      {categories.map((cat) => {
        const { href, external } = enquiry(cat)
        const isOpen = openId === cat.id
        return (
          <div key={cat.id}>
            {/* Accordion header */}
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : cat.id)}
              className="flex w-full items-center justify-between px-4 py-4 text-left"
            >
              <span className="font-display text-lg text-peacock-deep">{cat.name}</span>
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`h-5 w-5 shrink-0 text-brass transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Collapsible content */}
            {isOpen && (
              <div className="px-4 pb-5">
                <ul className="grid grid-cols-3 gap-2">
                  {Array.from({ length: PHOTOS_PER_CATEGORY }, (_, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => onView(cat, i)}
                        aria-label={`View ${cat.name} photo ${i + 1}`}
                        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#DCC8A6] ring-1 ring-ink/10"
                      >
                        <SmartImg
                          src={photoSrc(cat.id, i + 1)}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-center">
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} className="btn-primary">
                    {external && <WhatsAppIcon className="h-5 w-5" />}
                    Enquire about {cat.name}
                  </a>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Categories() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [viewing, setViewing] = useState(null)
  const [lightboxCat, setLightboxCat] = useState(categories[0])
  const tabRefs = useRef([])
  const [bar, setBar] = useState({ top: 0, height: 0 })
  const active = categories[activeIdx]
  const { href: enquireHref, external: enquireExternal } = enquiry(active)

  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activeIdx]
      if (el) setBar({ top: el.offsetTop, height: el.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeIdx])

  const onKeyDown = (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (!(e.key in keys) && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const n = categories.length
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (activeIdx + keys[e.key] + n) % n
    setActiveIdx(next)
    tabRefs.current[next]?.focus()
  }

  const step = useCallback(
    (d) => setViewing((v) => (v + d + PHOTOS_PER_CATEGORY) % PHOTOS_PER_CATEGORY),
    [],
  )

  const openMobilePhoto = (cat, idx) => {
    setLightboxCat(cat)
    setViewing(idx)
  }

  return (
    <section id="categories" aria-labelledby="categories-heading" className="relative bg-chandan-soft py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center lg:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass">Our Collection</p>
          <h2 id="categories-heading" className="mt-2 text-4xl text-peacock-deep sm:text-5xl">Shop by Category</h2>
          <Ornament className="mx-auto mt-4 h-5 w-auto text-brass" />
        </div>

        {/* ── Mobile: all categories stacked ── */}
        <MobileCategories onView={openMobilePhoto} />

        {/* ── Desktop: tab layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[340px_1fr] lg:gap-12">
          {/* Left: category list */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              role="tablist"
              aria-label="Product categories"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="relative flex flex-col gap-0 border-l border-ink/15"
            >
              <span
                aria-hidden="true"
                className="absolute -left-px w-0.5 bg-brass transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ top: bar.top, height: bar.height }}
              />
              {categories.map((c, i) => {
                const selected = i === activeIdx
                return (
                  <button
                    key={c.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    id={`cat-tab-${c.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="cat-panel"
                    tabIndex={selected ? 0 : -1}
                    onMouseEnter={() => setActiveIdx(i)}
                    onFocus={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    className={`relative flex cursor-pointer items-center gap-4 px-6 py-3.5 text-left transition-colors
                      ${selected ? 'text-peacock-deep' : 'text-ink-soft hover:text-peacock-deep'}`}
                  >
                    <span className={`w-6 font-display text-sm ${selected ? 'text-brass' : 'text-ink-soft/60'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-display text-[1.35rem] transition-transform duration-300 ${selected ? 'translate-x-1.5' : ''}`}>
                      {c.name}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
                      className={`ml-auto h-5 w-5 shrink-0 text-brass transition-all duration-300 ${selected ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                      <path d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                  </button>
                )
              })}
            </div>
            <div key={active.id} className="cat-fade mt-10">
              <div className="flex items-end gap-3">
                <span className="cat-numeral font-display text-7xl leading-none">{String(activeIdx + 1).padStart(2, '0')}</span>
                <span className="mb-2 text-sm uppercase tracking-[0.2em] text-ink-soft">/ {String(categories.length).padStart(2, '0')}</span>
              </div>
              <p className="mt-4 text-ink-soft">{active.blurb}</p>
              <a href={enquireHref} {...(enquireExternal ? { target: '_blank', rel: 'noopener' } : {})} className="btn-primary mt-5">
                {enquireExternal && <WhatsAppIcon className="h-5 w-5" />}
                Enquire about {active.name}
              </a>
            </div>
          </div>

          {/* Right: photo mosaic */}
          <div id="cat-panel" role="tabpanel" aria-labelledby={`cat-tab-${active.id}`}>
            <ul key={active.id} className="grid grid-cols-4 gap-3">
              {Array.from({ length: PHOTOS_PER_CATEGORY }, (_, i) => (
                <li key={i} className="cat-tile" style={{ animationDelay: `${i * 35}ms` }}>
                  <button
                    type="button"
                    onClick={() => { setLightboxCat(active); setViewing(i) }}
                    aria-label={`View ${active.name} photo ${i + 1}`}
                    className="group relative block aspect-square h-full w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#DCC8A6] ring-1 ring-ink/10"
                  >
                    <SmartImg
                      src={photoSrc(active.id, i + 1)}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Lightbox
        id={lightboxCat.id}
        title={lightboxCat.name}
        total={PHOTOS_PER_CATEGORY}
        srcFor={(n) => photoSrc(lightboxCat.id, n)}
        enquire={enquiry(lightboxCat)}
        index={viewing}
        onClose={() => setViewing(null)}
        onStep={step}
      />
    </section>
  )
}
