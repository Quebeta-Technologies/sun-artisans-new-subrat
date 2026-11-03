import { store, waLink, telLink, directionsLink, mapEmbed } from '../data/content'
import { WhatsAppIcon, PhoneIcon, PinIcon } from './Icons'
import EnquiryForm from './EnquiryForm'

const fields = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', wide: true, autoComplete: 'email' },
  { name: 'message', label: 'Message', type: 'textarea', wide: true, required: true },
]

const satelliteEmbed = mapEmbed.includes('output=embed')
  ? mapEmbed.replace('output=embed', 'output=embed&t=k')
  : mapEmbed + '&t=k'

export default function Contact() {
  return (
    <section id="visit" className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0b3330 0%,#0f4a44 60%,#0b3330 100%)' }}>

      {/* triangle pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="contact-tri" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,2 38,38 2,38" fill="none" stroke="#C9973A" strokeWidth="0.7"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-tri)"/>
      </svg>

      {/* gold top border */}
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: 'linear-gradient(90deg,transparent,#C9973A,transparent)' }} />

      {/* Top: enquiry form + contact info side by side */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">

        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-[#C9973A]" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9973A]">Visit Us</span>
          <span className="h-px w-8 bg-[#C9973A]" />
        </div>
        <h2 className="text-4xl sm:text-5xl mb-12" style={{ color: '#f5ede0' }}>Visit Sun Artisans</h2>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-stretch">

          {/* LEFT — enquiry form */}
          <div className="rounded-2xl p-4 sm:p-6" style={{ background: '#faf5ee' }}>
            <h3 className="text-2xl text-[#0b3330]">Send us an enquiry</h3>
            <p className="mt-2 mb-7 text-ink-soft">Ask about a product, price or availability — we'll reply on WhatsApp.</p>
            <EnquiryForm fields={fields} intro="Hi Sun Artisans, I have an enquiry." submitLabel="Send enquiry" />
          </div>

          {/* RIGHT — contact details */}
          <div className="text-chandan rounded-2xl p-6 sm:p-9 flex flex-col justify-center" style={{ border: '1px solid rgba(201,151,58,0.2)', background: 'rgba(255,255,255,0.04)' }}>
            <dl className="grid gap-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm mb-1.5" style={{ color: '#C9973A' }}>Address</dt>
                <dd className="font-display text-xl leading-snug" style={{ color: '#f5ede0' }}>
                  {store.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                </dd>
              </div>
              <div>
                <dt className="text-sm mb-1.5" style={{ color: '#C9973A' }}>Store timings</dt>
                <dd className="text-lg" style={{ color: '#d4c5b0' }}>{store.hours}</dd>
              </div>
              <div>
                <dt className="text-sm mb-1.5" style={{ color: '#C9973A' }}>Phone</dt>
                <dd className="text-lg"><a href={telLink} className="hover:text-[#C9973A]" style={{ color: '#d4c5b0' }}>{store.phoneDisplay}</a></dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm mb-1.5" style={{ color: '#C9973A' }}>Email</dt>
                <dd className="text-lg"><a href={`mailto:${store.email}`} className="break-all hover:text-[#C9973A]" style={{ color: '#d4c5b0' }}>{store.email}</a></dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noopener" className="btn-primary"><WhatsAppIcon /> WhatsApp us</a>
              <a href={telLink} className="btn-ghost-dark"><PhoneIcon /> Call now</a>
              <a href={directionsLink} target="_blank" rel="noopener" className="btn-ghost-dark"><PinIcon /> Get directions</a>
            </div>
          </div>

        </div>
      </div>

      {/* Full-width satellite map */}
      <div className="w-full" style={{ height: 420 }}>
        <iframe
          title="Map to Sun Artisans, Udhyamnagar, Pimpri"
          src={satelliteEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
          style={{ display: 'block' }}
        />
      </div>

    </section>
  )
}
