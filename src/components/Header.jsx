import { useEffect, useState } from 'react'
import { store, waLink, telLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

const nav = [
  { href: '#categories', label: 'Shop' },
  { href: '#mandir', label: 'Mandirs & Murtis' },
  { href: '#gifting', label: 'Gifting' },
  { href: '#trade', label: 'Trade partners' },
  { href: '#visit', label: 'Visit us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0) // 0 = top of page, 1 = scrolled past FADE_PX

  // White background fades in gradually over the first FADE_PX of scrolling
  useEffect(() => {
    const FADE_PX = 220
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setProgress(Math.min(1, Math.max(0, window.scrollY / FADE_PX))))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const p = open ? 1 : progress
  const solid = p > 0.55 // switch text/logo to dark once the background is mostly white

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 ${solid ? 'text-ink' : 'text-white'}`}
      style={{
        backgroundColor: `rgb(255 255 255 / ${0.96 * p})`,
        boxShadow: `0 1px 12px rgb(0 0 0 / ${0.08 * p})`,
        backdropFilter: p > 0.05 ? `blur(${8 * p}px)` : undefined,
      }}
    >
      {/* Dark fade for legibility over the video — disappears as the white comes in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 to-transparent"
        style={{ opacity: 1 - p }}
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center" aria-label={`${store.legalName} home`}>
          <img
            src="/photo/SUN Artisans LLP - Logo Design - FINAL - 18-3-26    1.png"
            alt={store.legalName}
            className={`h-12 w-auto object-contain transition-[filter] duration-500 ${solid ? '' : 'brightness-0 invert'}`}
          />
        </a>

        <nav className="hidden items-center gap-7 text-[0.95rem] lg:flex" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={`transition-colors duration-300 ${solid ? 'text-black hover:text-brass' : 'text-white/90 hover:text-brass-light'}`}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telLink} className={`hidden text-sm transition-colors duration-300 md:block ${solid ? 'text-black hover:text-brass' : 'text-white/90 hover:text-brass-light'}`}>
            {store.phoneDisplay}
          </a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn hidden bg-[#25D366] !py-2 text-[#0B2A17] hover:bg-[#1EBE5D] sm:inline-flex">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
          </a>
          <button
            className="rounded-md p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile slide-in drawer (right to left) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        {/* Drawer panel */}
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] flex flex-col
            ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <img
              src="/photo/SUN Artisans LLP - Logo Design - FINAL - 18-3-26    1.png"
              alt={store.legalName}
              className="h-10 w-auto object-contain"
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-ink/60 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center border-b border-ink/10 py-4 text-base font-medium text-ink/80 hover:text-peacock-deep"
              >
                {n.label}
                <svg viewBox="0 0 24 24" className="ml-auto h-4 w-4 text-brass" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ))}
          </div>
          {/* Bottom CTA */}
          <div className="border-t border-ink/10 px-5 py-5">
            <a href={waLink()} target="_blank" rel="noopener" className="btn w-full justify-center bg-[#25D366] text-[#0B2A17] hover:bg-[#1EBE5D]">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export function Sun({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="20" cy="20" r="7" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6
        const r1 = 10.5, r2 = i % 2 ? 15 : 18
        return <line key={i} x1={20 + r1 * Math.cos(a)} y1={20 + r1 * Math.sin(a)} x2={20 + r2 * Math.cos(a)} y2={20 + r2 * Math.sin(a)} />
      })}
    </svg>
  )
}
