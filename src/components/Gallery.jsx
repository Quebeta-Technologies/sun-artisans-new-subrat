const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', alt: 'Styled living room corner' },
  { src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&q=80', alt: 'Elegant home interior' },
  { src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=500&q=80', alt: 'Mandir and pooja items' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', alt: 'Living room decor' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80', alt: 'Brass decor pieces' },
  { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80', alt: 'Gifting collection' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', alt: 'Artifacts display' },
  { src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80', alt: 'Photo frames wall' },
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80', alt: 'Artificial plants' },
]

const row1 = [...galleryImages, ...galleryImages, ...galleryImages]
const row2 = [...galleryImages.slice(3), ...galleryImages.slice(0, 3), ...galleryImages.slice(3), ...galleryImages.slice(0, 3), ...galleryImages.slice(3), ...galleryImages.slice(0, 3)]

const IMG_H = 200
const IMG_W = 280

function MarqueeRow({ images, direction = 'left', speed = 35 }) {
  const dur = `${speed}s`
  return (
    <div className="overflow-hidden w-full" style={{ height: IMG_H }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          width: 'max-content',
          animation: `gallery-${direction} ${dur} linear infinite`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden rounded-xl"
            style={{ width: IMG_W, height: IMG_H, border: '1px solid rgba(201,151,58,0.2)' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden py-3 lg:py-4"
      style={{ background: '#faf5ee' }}>

      <style>{`
        @keyframes gallery-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes gallery-right {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-[#C9973A]" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9973A]">Gallery</span>
          <span className="h-px w-8 bg-[#C9973A]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-[18ch] text-4xl leading-tight sm:text-5xl" style={{ color: '#0b3330' }}>
            Inside Sun Artisans, gallery &amp; lookbook
          </h2>
          <p className="max-w-[54ch] lg:justify-self-end" style={{ color: '#5a4a3a' }}>
            Take a look inside our Udhyamnagar store and see how customers have styled their homes with pieces from Sun Artisans.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-3">
        <MarqueeRow images={row1} direction="left" speed={38} />
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <MarqueeRow images={row2} direction="right" speed={42} />
      </div>

    </section>
  )
}
