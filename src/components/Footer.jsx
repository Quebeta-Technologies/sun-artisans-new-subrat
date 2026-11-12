import { store, waLink, telLink } from '../data/content'
import { Sun } from './Header'

export default function Footer() {
  return (
    <footer className="text-chandan/75" style={{ backgroundColor: '#061F1E' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/photo/SUN Artisans LLP - Logo Design - FINAL - 18-3-26    1.png"
              alt="Sun Artisans LLP"
              className="h-14 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <p className="mt-4 max-w-[44ch] text-[0.95rem]">
            Home decor and art and craft gallery in Udhyamnagar, Pimpri. Artifacts, frames, plants, mandirs, murtis
            and brass, all under one roof.
          </p>
        </div>
        <div className="text-[0.95rem]">
          <p className="font-display text-lg text-chandan">Visit</p>
          {store.addressLines.map((l) => <p key={l} className="mt-1">{l}</p>)}
          <p className="mt-3">Open daily, {store.hours}</p>
        </div>
        <div className="text-[0.95rem]">
          <p className="font-display text-lg text-chandan">Talk to us</p>
          <a href={waLink()} target="_blank" rel="noopener" className="mt-1 block hover:text-brass-light">WhatsApp</a>
          <a href={telLink} className="mt-1 block hover:text-brass-light">{store.phoneDisplay}</a>
          <a href={`mailto:${store.email}`} className="mt-1 block break-all hover:text-brass-light">{store.email}</a>
          {store.instagram && <a href={store.instagram} target="_blank" rel="noopener" className="mt-1 block hover:text-brass-light">Instagram</a>}
          {store.facebook && <a href={store.facebook} target="_blank" rel="noopener" className="mt-1 block hover:text-brass-light">Facebook</a>}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-5 py-5 text-center text-sm text-chandan/50 sm:flex-row sm:justify-between sm:text-left lg:px-8">
          <p>© {new Date().getFullYear()} {store.legalName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-red-500" fill="currentColor" aria-label="love" role="img">
              <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21Z" />
            </svg>
            by <span className="font-semibold tracking-wider text-brass-light">QUEBETA</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
