import EnquiryForm from './EnquiryForm'

const benefits = [
  { title: 'Full catalogue access', text: 'Artifacts, décor and brass pieces for every client brief.' },
  { title: 'Trade pricing', text: 'Partner rates on project and bulk orders.' },
  { title: 'A dedicated contact', text: 'One person who handles your bulk and project orders.' },
]

const fields = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'firm', label: 'Firm / studio name', required: true, autoComplete: 'organization' },
  { name: 'phone', label: 'Contact number', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'requirement', label: 'Project requirement', type: 'textarea', wide: true },
]

export default function TradePartner() {
  return (
    <section id="trade" className="relative overflow-hidden pt-16 pb-12 lg:pt-20 lg:pb-16 text-chandan" style={{ background: 'linear-gradient(135deg,#0b3330 0%,#0f4a44 60%,#0b3330 100%)' }}>

      {/* Scallop top — dark green bites down into cream */}
      <div className="absolute inset-x-0 top-0 leading-[0]" style={{ marginTop: -48 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" style={{ height: 48, display: 'block' }}>
          <path d="M0,0 L1440,0 L1440,20 Q1380,40 1320,20 Q1260,0 1200,20 Q1140,40 1080,20 Q1020,0 960,20 Q900,40 840,20 Q780,0 720,20 Q660,40 600,20 Q540,0 480,20 Q420,40 360,20 Q300,0 240,20 Q180,40 120,20 Q60,0 0,20 Z" fill="#0b3330" />
        </svg>
      </div>

      {/* grid line pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="trade-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0 L0 0 L0 60" fill="none" stroke="#C9973A" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trade-grid)"/>
      </svg>

      {/* gold side lines */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-1" style={{ background: 'linear-gradient(180deg,transparent,#C9973A,transparent)' }} />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-1" style={{ background: 'linear-gradient(180deg,transparent,#C9973A,transparent)' }} />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:items-center">
        <div>
          {/* subtitle */}
          <div className="flex items-center gap-2 mb-5 sm:gap-3">
            <span className="h-px w-5 bg-[#C9973A] sm:w-8" />
            <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.15em] text-[#C9973A] sm:text-xs sm:tracking-[0.3em]">For Architects &amp; Designers</span>
            <span className="h-px w-5 bg-[#C9973A] sm:w-8" />
          </div>
          <h2 className="mt-3 whitespace-nowrap text-[clamp(1.5rem,7.8vw,2.25rem)] leading-tight sm:max-w-[16ch] sm:whitespace-normal sm:text-5xl" style={{ color: '#f5ede0' }}>Trade partner program</h2>
          <p className="mt-6 max-w-[56ch]" style={{ color: '#d4c5b0' }}>
            Sun Artisans works closely with architects and interior designers across Pune and PCMC to source
            artifacts, décor and brass pieces for client projects.
          </p>
          <ul className="mt-10 space-y-6">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rotate-45 bg-[#C9973A]" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl" style={{ color: '#C9973A' }}>{b.title}</p>
                  <p className="mt-1" style={{ color: '#d4c5b0' }}>{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* form card */}
        <div className="rounded-2xl p-6 sm:p-9" style={{ background: '#faf5ee' }}>
          <h3 className="text-2xl text-[#0b3330]">Become a trade partner</h3>
          <p className="mt-2 mb-7 text-ink-soft">Tell us about your studio and current project, and we'll get in touch.</p>
          <EnquiryForm
            fields={fields}
            intro="Hi Sun Artisans, I'd like to become a trade partner."
            submitLabel="Become a trade partner"
          />
        </div>
      </div>

      {/* scallop bottom into light */}
      {/* -bottom-px overlaps the next section so sub-pixel rounding can't leave a dark seam; min-width keeps waves gentle on mobile */}
      <div className="absolute inset-x-0 -bottom-px h-7 overflow-hidden leading-[0] sm:h-10">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="h-full w-full min-w-[720px]" style={{ display: 'block' }}>
          <path d="M0,40 L0,20 Q60,40 120,20 Q180,0 240,20 Q300,40 360,20 Q420,0 480,20 Q540,40 600,20 Q660,0 720,20 Q780,40 840,20 Q900,0 960,20 Q1020,40 1080,20 Q1140,0 1200,20 Q1260,40 1320,20 Q1380,0 1440,20 L1440,40 Z" fill="#faf5ee" />
        </svg>
      </div>
    </section>
  )
}
