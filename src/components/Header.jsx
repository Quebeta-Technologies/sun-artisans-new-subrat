import { useEffect, useState } from 'react'
import { store, waLink, telLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

// Leading "/" so the links also work from the legal pages
const nav = [
  { href: '/#categories', label: 'Shop' },
  { href: '/#mandir', label: 'Mandirs & Murtis' },
  { href: '/#gifting', label: 'Gifting' },
  { href: '/#trade', label: 'Trade partners' },
  { href: '/#visit', label: 'Visit us' },
]

// `solid`: always white (pages without the hero video behind the header)
export default function Header({ solid: forceSolid = false }) {
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

  const p = open || forceSolid ? 1 : progress
  const solid = p > 0.55 // switch text/logo to dark once the background is mostly white

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 ${solid ? 'text-ink' : 'text-white'}`}
      style={{
        backgroundColor: `rgb(255 255 255 / ${0.96 * p})`,
        boxShadow: `0 1px 12px rgb(0 0 0 / ${0.08 * p})`,
        // Fixed radius: animating the blur amount every scroll frame is very expensive on phones
        backdropFilter: p > 0.05 ? 'blur(8px)' : undefined,
      }}
    >
      {/* Dark fade for legibility over the video — disappears as the white comes in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 to-transparent"
        style={{ opacity: 1 - p }}
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/#top" className="flex items-center" aria-label={`${store.legalName} home`}>
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
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise clip this fixed overlay to the header's height */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div
            className="absolute left-0 top-0 bottom-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto shadow-2xl"
            style={{ backgroundColor: '#ffffff', animation: 'slideInLeft 0.3s ease forwards' }}
          >
            <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <img src="/photo/SUN Artisans LLP - Logo Design - FINAL - 18-3-26    1.png" alt={store.legalName} className="h-10 w-auto object-contain" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-md p-2 text-gray-500">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            {/* Nav links */}
            <nav id="mobile-nav" aria-label="Mobile" className="px-5 py-2">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 py-4 text-base font-medium text-gray-700 hover:text-peacock-deep"
                >
                  {n.label}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-brass" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              ))}
            </nav>
            {/* WhatsApp CTA */}
            <div className="mt-auto border-t border-gray-100 px-5 py-5">
              <a href={waLink()} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-semibold text-[#0B2A17] hover:bg-[#1EBE5D]">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
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
