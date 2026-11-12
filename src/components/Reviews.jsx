import { useState, useEffect } from 'react'

const reviews = [
  { name: 'Priya Sharma', location: 'Pimpri', rating: 5, text: 'Absolutely love the home mandir I bought here. The craftsmanship is beautiful and the team was so helpful in choosing the right size for our pooja room.', photo: 'https://images.unsplash.com/photo-1614091066321-c8a2a4f5b1a7?w=80&q=80' },
  { name: 'Rahul Deshmukh', location: 'Chinchwad', rating: 5, text: 'Bought brass diyas and a kalash for Diwali. The quality is outstanding — you can feel the difference from mass-market items. Highly recommend!', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80' },
  { name: 'Sunita Kulkarni', location: 'Akurdi', rating: 5, text: 'Visited the store for gifting ideas and left with the most gorgeous gift hamper. The staff curated it perfectly within my budget.', photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&q=80' },
  { name: 'Amit Joshi', location: 'Nigdi', rating: 5, text: 'The artifacts section is a treasure trove. I found a rare hand-painted piece that fits perfectly in my living room. Great store!', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80' },
  { name: 'Meera Patil', location: 'Wakad', rating: 5, text: 'Our office gifting order was handled so professionally. Beautiful packaging, on-time delivery, and each piece looked premium.', photo: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&q=80' },
  { name: 'Vijay Nair', location: 'Kothrud', rating: 5, text: "Sun Artisans is my go-to for every housewarming gift. Every family I've gifted to has asked me where I got it from.", photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80' },
]

const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query=Sun+Artisans+Udhyamnagar+Pimpri'

// triple for seamless loop
const track = [...reviews, ...reviews, ...reviews]
const OFFSET = reviews.length // start in the middle copy

export default function Reviews() {
  const [index, setIndex] = useState(OFFSET)
  const [transitioning, setTransitioning] = useState(true)

  const next = () => { setTransitioning(true); setIndex(i => i + 1) }
  const prev = () => { setTransitioning(true); setIndex(i => i - 1) }

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 3000)
    return () => clearInterval(t)
  }, [])

  // Seamless loop reset (no animation)
  useEffect(() => {
    if (index >= reviews.length * 2) {
      setTimeout(() => { setTransitioning(false); setIndex(OFFSET) }, 500)
    } else if (index < OFFSET) {
      setTimeout(() => { setTransitioning(false); setIndex(reviews.length * 2 - 1) }, 500)
    }
  }, [index])

  return (
    <section id="reviews" className="relative overflow-hidden py-12 lg:py-16" style={{ background: '#0b3330' }}>

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
        <defs>
          <pattern id="rev-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C9973A"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rev-dots)"/>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C9973A]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9973A]">Reviews</span>
              <span className="h-px w-8 bg-[#C9973A]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight" style={{ color: '#f5ede0' }}>
              What our customers say
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all duration-200 hover:bg-[#C9973A] hover:border-[#C9973A] hover:text-[#0b3330]"
              style={{ borderColor: 'rgba(201,151,58,0.4)', color: '#C9973A' }}>‹</button>
            <button onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all duration-200 hover:bg-[#C9973A] hover:border-[#C9973A] hover:text-[#0b3330]"
              style={{ borderColor: 'rgba(201,151,58,0.4)', color: '#C9973A' }}>›</button>
          </div>
        </div>

        {/* Track */}
        <div className="overflow-hidden [--per:1] sm:[--per:2] lg:[--per:3]">
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-${index} * (100% / var(--per))))`,
              transition: transitioning ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
            }}
          >
            {track.map((r, i) => (
              <div key={i} className="flex-shrink-0 px-2" style={{ width: 'calc(100% / var(--per))' }}>
                <div className="flex flex-col rounded-2xl p-6 h-full"
                  style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
                  <p className="text-base mb-3" style={{ color: '#C9973A' }}>{'★'.repeat(r.rating)}</p>
                  <span className="font-display text-5xl leading-none" style={{ color: 'rgba(201,151,58,0.2)' }}>"</span>
                  <blockquote className="flex-1 text-sm leading-relaxed text-[#3a2e22] mt-2 mb-6">{r.text}</blockquote>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(11,51,48,0.1)' }}>
                    <img src={r.photo} alt={r.name}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      style={{ border: '2px solid rgba(201,151,58,0.4)' }} />
                    <div>
                      <p className="text-sm font-semibold text-[#0b3330]">{r.name}</p>
                      <p className="text-xs text-[#7a6a58]">{r.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots + Google */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => { setTransitioning(true); setIndex(OFFSET + i) }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: (index - OFFSET + reviews.length) % reviews.length === i ? 24 : 8,
                  height: 8,
                  background: (index - OFFSET + reviews.length) % reviews.length === i ? '#C9973A' : 'rgba(201,151,58,0.3)',
                }} />
            ))}
          </div>
          <a href={googleReviewsUrl} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 hover:bg-[#C9973A] hover:border-[#C9973A] hover:text-[#0b3330]"
            style={{ borderColor: 'rgba(201,151,58,0.5)', color: '#C9973A' }}>
            ★ View all on Google
          </a>
        </div>

      </div>
    </section>
  )
}
