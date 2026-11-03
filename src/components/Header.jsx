import { useState } from 'react'
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
  return (
    <header className="sticky top-0 z-40 border-b border-brass-light/15 bg-white/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center" aria-label={`${store.legalName} home`}>
          <img
            src="/photo/SUN Artisans LLP - Logo Design - FINAL - 18-3-26    1.png"
            alt={store.legalName}
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-7 text-[0.95rem] lg:flex" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-ink/70 hover:text-brass">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telLink} className="hidden text-sm text-ink/70 hover:text-brass md:block">
            {store.phoneDisplay}
          </a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn-primary hidden !py-2 sm:inline-flex">
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

      {open && (
        <nav id="mobile-nav" className="border-t border-ink/10 px-5 pb-5 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-ink/10 py-3 text-ink/80">
              {n.label}
            </a>
          ))}
        </nav>
      )}
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
