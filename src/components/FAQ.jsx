import { useState } from 'react'
import { faqs } from '../data/content'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden py-10 lg:py-14" style={{ background: '#faf5ee' }}>

      {/* Large decorative quote mark */}
      <div className="pointer-events-none absolute top-8 right-8 font-display text-[20rem] leading-none select-none hidden lg:block"
        style={{ color: 'rgba(201,151,58,0.06)', lineHeight: 1 }}>"</div>

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">

        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-20">

          {/* LEFT — sticky label */}
          <div className="lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#C9973A]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#C9973A]">FAQ</span>
            </div>
            <h2 className="font-display whitespace-nowrap text-4xl sm:text-5xl leading-[1.05] text-[#0b3330] mb-6">
              Got questions?
            </h2>
            <p className="text-[0.95rem] leading-relaxed max-w-[28ch]" style={{ color: '#7a6a58' }}>
              Everything you need to know before visiting Sun Artisans or placing an order.
            </p>
            {/* Gold accent line */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 w-12 rounded-full" style={{ background: '#C9973A' }} />
              <div className="h-1 w-4 rounded-full" style={{ background: 'rgba(201,151,58,0.3)' }} />
            </div>
          </div>

          {/* RIGHT — accordion */}
          <div className="flex flex-col">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}
                  className="group border-b cursor-pointer"
                  style={{ borderColor: 'rgba(11,51,48,0.12)' }}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {/* Question */}
                  <div className="flex items-start justify-between gap-6 py-4">
                    <div className="flex items-start gap-4">
                      {/* Number */}
                      <span className="font-display text-sm mt-1 flex-shrink-0 tabular-nums"
                        style={{ color: '#C9973A' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-xl leading-snug text-[#0b3330] transition-colors duration-200 group-hover:text-[#C9973A]">
                        {f.q}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isOpen ? '#0b3330' : 'rgba(11,51,48,0.08)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}>
                      <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke={isOpen ? '#C9973A' : '#0b3330'} strokeWidth="2.5">
                        <path d="M7 2v10M2 7h10"/>
                      </svg>
                    </div>
                  </div>

                  {/* Answer */}
                  <div style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                  }}>
                    <div className="pl-10 pb-4">
                      <p className="text-[0.95rem] leading-relaxed" style={{ color: '#5a4a3a' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
