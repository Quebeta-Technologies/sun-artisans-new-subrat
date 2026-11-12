import { whyUs } from '../data/content'
import { waLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

const icons = [
  // Wide range
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  // Premium quality
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  // Styling guidance
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  // Trusted local
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
]

export default function WhyUs() {
  const left  = whyUs.slice(0, 2)
  const right = whyUs.slice(2, 4)

  return (
    <section id="why-us" className="relative overflow-hidden py-4 lg:py-6" style={{ background: '#faf5ee' }}>

      {/* Subtle dot pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.045]" aria-hidden="true">
        <defs>
          <pattern id="whydots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C9973A"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#whydots)"/>
      </svg>


      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">

        {/* Header — centered */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#C9973A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: '#C9973A' }}>Why Us</span>
            <span className="h-px w-8 bg-[#C9973A]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0b3330] mb-3">
            Why choose <em className="not-italic" style={{ color: '#C9973A' }}>Sun Artisans?</em>
          </h2>
          <p className="max-w-[44ch] mx-auto text-[0.95rem] leading-relaxed text-[#5a4a3a]">
            Families across PCMC and Pune have trusted us to bring beauty, tradition and quality into their homes.
          </p>
        </div>

        {/* 3-column: left features | center image | right features */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-center">

          {/* LEFT — 2 items */}
          <div className="flex flex-col gap-8">
            {left.map((w, i) => (
              <div key={w.title} className="group flex flex-col items-center text-center lg:items-end lg:text-right gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:bg-[#C9973A] group-hover:text-white"
                  style={{ background: 'rgba(201,151,58,0.1)', color: '#C9973A' }}>
                  {icons[i]}
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#0b3330] mb-1">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6a5a48] max-w-[28ch] lg:ml-auto">{w.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER — image */}
          <div className="hidden lg:block relative flex-shrink-0" style={{ width: 280 }}>
            {/* Gold offset shadow box */}
            <div className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3"
              style={{ background: 'rgba(201,151,58,0.25)' }} />
            <div className="relative overflow-hidden rounded-2xl"
              style={{ border: '2px solid rgba(201,151,58,0.4)' }}>
              <img
                src="/photo/why-us.jpg"
                alt="Sun Artisans store interior"
                className="w-full object-cover"
                style={{ height: 380 }}
                loading="lazy"
              />
              {/* Gold frame corners */}
              <div className="pointer-events-none absolute inset-3">
                <svg viewBox="0 0 100 100" className="absolute top-0 left-0 h-6 w-6" fill="none" stroke="#C9973A" strokeWidth="2.5"><path d="M2 16 L2 2 L16 2"/></svg>
                <svg viewBox="0 0 100 100" className="absolute top-0 right-0 h-6 w-6" fill="none" stroke="#C9973A" strokeWidth="2.5"><path d="M98 16 L98 2 L84 2"/></svg>
                <svg viewBox="0 0 100 100" className="absolute bottom-0 left-0 h-6 w-6" fill="none" stroke="#C9973A" strokeWidth="2.5"><path d="M2 84 L2 98 L16 98"/></svg>
                <svg viewBox="0 0 100 100" className="absolute bottom-0 right-0 h-6 w-6" fill="none" stroke="#C9973A" strokeWidth="2.5"><path d="M98 84 L98 98 L84 98"/></svg>
              </div>
            </div>
          </div>

          {/* RIGHT — 2 items */}
          <div className="flex flex-col gap-8">
            {right.map((w, i) => (
              <div key={w.title} className="group flex flex-col items-center text-center lg:items-start lg:text-left gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:bg-[#C9973A] group-hover:text-white"
                  style={{ background: 'rgba(201,151,58,0.1)', color: '#C9973A' }}>
                  {icons[i + 2]}
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#0b3330] mb-1">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6a5a48] max-w-[28ch]">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

    </section>
  )
}
