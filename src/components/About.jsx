
const images = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', alt: 'Home decor artifacts' },
  { src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80', alt: 'Elegant home interior' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', alt: 'Brass decor pieces' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', alt: 'Living room decor' },
  { src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&q=80', alt: 'Mandir and pooja items' },
  { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', alt: 'Gifting collection' },
]

const row = [...images, ...images, ...images]
const IMG = 220
const GAP = 6

function VerticalCarousel({ direction = 'up', size = IMG }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, animation: `about-scroll-${direction} 22s linear infinite` }}>
        {row.map((img, i) => (
          <div key={i} className="flex-shrink-0 overflow-hidden rounded-xl shadow-lg" style={{ width: size, height: size }}>
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const sectionH = IMG * 2.5 + GAP * 4

  const textBlock = (
    <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 md:py-0 md:h-full md:justify-center">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-[#C9973A]" />
        <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#C9973A' }}>About Us</span>
        <span className="h-px w-8 bg-[#C9973A]" />
      </div>

      <h2 className="text-2xl leading-tight sm:text-4xl lg:text-5xl font-display" style={{ color: '#f5ede0' }}>
        <span className="whitespace-nowrap">Pimpri-Chinchwad's trusted</span><br />
        <span style={{ color: '#C9973A' }}>art &amp; craft gallery</span>
      </h2>

      <div className="my-4 flex items-center gap-2 opacity-60">
        <span className="h-px w-10 bg-[#C9973A]" />
        <span style={{ color: '#C9973A', fontSize: 18 }}>✦</span>
        <span className="h-px w-10 bg-[#C9973A]" />
      </div>

      <p className="text-base md:text-[1.02rem] leading-relaxed max-w-[36ch] md:max-w-[48ch]" style={{ color: '#ffffff' }}>
        Sun Artisans LLP is a trusted home decor and art gallery in Udhyamnagar, Pimpri — your one-stop destination
        for artifacts, photo frames, artificial plants, home mandirs, brass décor and more.
        Every piece we curate reflects our promise: trustworthy, luxury, and modern.
      </p>

      <div className="mt-6 flex gap-3 flex-wrap justify-center">
        {['Trustworthy', 'Luxury', 'Modern'].map((w) => (
          <span key={w} className="rounded-full border px-4 py-1.5 text-sm md:text-sm font-display tracking-wide"
            style={{ borderColor: '#C9973A55', color: '#C9973A' }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes about-scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(calc(-100% / 3)); }
        }
        @keyframes about-scroll-down {
          0%   { transform: translateY(calc(-100% / 3)); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* ── MOBILE: images behind, text in front ── */}
      <section id="about" className="relative overflow-hidden md:hidden"
        style={{ background: 'linear-gradient(135deg, #0b3330 0%, #0f4a44 50%, #0b3330 100%)' }}>

        {/* Both carousels full-height behind everything */}
        <div className="absolute inset-0 flex gap-1" style={{ zIndex: 0 }}>
          <div className="relative flex-1 overflow-hidden">
            <VerticalCarousel direction="up" size={200} />
          </div>
          <div className="relative flex-1 overflow-hidden">
            <VerticalCarousel direction="down" size={200} />
          </div>
        </div>

        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0" style={{ background: 'rgba(11,51,48,0.88)', zIndex: 1 }} />

        {/* Gold borders */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9973A] to-transparent opacity-60" style={{ zIndex: 2 }} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9973A] to-transparent opacity-60" style={{ zIndex: 2 }} />

        {textBlock}
      </section>

      {/* ── DESKTOP: vertical side carousels ── */}
      <section id="about-desktop" className="relative overflow-hidden hidden md:block"
        style={{ height: sectionH, background: 'linear-gradient(135deg, #0b3330 0%, #0f4a44 50%, #0b3330 100%)' }}>

        {/* Mandala */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <circle cx="50%" cy="50%" r="280" fill="none" stroke="#C9973A" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="220" fill="none" stroke="#C9973A" strokeWidth="0.6" />
          <circle cx="50%" cy="50%" r="160" fill="none" stroke="#C9973A" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="100" fill="none" stroke="#C9973A" strokeWidth="0.6" />
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#C9973A" strokeWidth="0.5" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#C9973A" strokeWidth="0.5" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#C9973A" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C9973A" strokeWidth="0.5" />
        </svg>

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9973A] to-transparent opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9973A] to-transparent opacity-60" />

        <div className="absolute left-0 top-0 overflow-hidden" style={{ width: IMG, height: sectionH, zIndex: 1 }}>
          <VerticalCarousel direction="up" />
        </div>
        <div className="absolute right-0 top-0 overflow-hidden" style={{ width: IMG, height: sectionH, zIndex: 1 }}>
          <VerticalCarousel direction="down" />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center text-center z-20"
          style={{ paddingLeft: IMG + 32, paddingRight: IMG + 32 }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#C9973A]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#C9973A' }}>About Us</span>
            <span className="h-px w-10 bg-[#C9973A]" />
          </div>
          <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl font-display" style={{ color: '#f5ede0' }}>
            Pimpri-Chinchwad's trusted<br />
            <span style={{ color: '#C9973A' }}>art &amp; craft gallery</span>
          </h2>
          <div className="my-5 flex items-center gap-2 opacity-60">
            <span className="h-px w-12 bg-[#C9973A]" />
            <span style={{ color: '#C9973A', fontSize: 18 }}>✦</span>
            <span className="h-px w-12 bg-[#C9973A]" />
          </div>
          <p className="text-[1.02rem] leading-relaxed max-w-[72ch]" style={{ color: '#ffffff' }}>
            Sun Artisans LLP is a trusted home decor and art and craft gallery located in Udhyamnagar, Pimpri.
            We're the destination families across PCMC and Pune turn to for artifacts, photo frames, artificial plants,
            home mandirs, god murtis, brass décor and more — all curated under one roof. Trustworthy, luxury and modern
            are the three words that guide everything we stock, and every piece in our gallery reflects that promise.
            Whether you're furnishing a new home, choosing a gift, or sourcing decor for a client project,
            Sun Artisans is your one-stop shop for home decor needs.
          </p>
          <div className="mt-8 flex gap-6">
            {['Trustworthy', 'Luxury', 'Modern'].map((w) => (
              <span key={w} className="rounded-full border px-5 py-1.5 text-sm font-display tracking-wide"
                style={{ borderColor: '#C9973A55', color: '#C9973A' }}>{w}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
