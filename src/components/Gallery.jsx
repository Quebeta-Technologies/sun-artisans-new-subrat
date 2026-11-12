const galleryImages = [
  { src: '/photo/gallery/1.webp', alt: 'Inside the Sun Artisans store, Udhyamnagar, Pimpri' },
  { src: '/photo/gallery/2.webp', alt: 'Bronze-finish face sculptures on display' },
  { src: '/photo/gallery/3.webp', alt: 'Lit display shelves of figurines and artifacts' },
  { src: '/photo/gallery/4.webp', alt: 'Store aisle with decor and frames' },
  { src: '/photo/gallery/5.webp', alt: 'Brass temple model' },
  { src: '/photo/gallery/6.webp', alt: 'Brass Radha Krishna jhula' },
  { src: '/photo/gallery/7.webp', alt: 'Abstract ceramic vase' },
  { src: '/photo/gallery/8.webp', alt: 'Floral ceramic vase on glass shelf' },
  { src: '/photo/gallery/9.webp', alt: 'Decor and artificial flower displays in store' },
  { src: '/photo/gallery/10.webp', alt: 'White abstract sculpture' },
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
