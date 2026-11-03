import { store, waLink, telLink } from '../data/content'
import { Sun } from './Header'

export default function Footer() {
  return (
    <footer className="bg-peacock text-chandan/75">
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
        <p className="mx-auto max-w-7xl px-5 py-5 text-sm text-chandan/50 lg:px-8">
          © {new Date().getFullYear()} {store.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
