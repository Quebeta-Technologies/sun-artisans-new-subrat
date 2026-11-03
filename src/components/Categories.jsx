import { categories, waLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

const catImages = {
  'artifacts':         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'photo-frames':      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
  'artificial-plants': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  'home-decor':        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'home-mandirs':      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
  'god-murtis':        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'brass-items':       'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
}

// 3-col bento: fills perfectly with 7 items
// Row 1+2: [0: 2×2 hero] [1: 1×1] [2: 1×1]
// Row 3:   [3: 1×1]      [4: 1×1] [5: 1×1]
// Row 4:   [6: 3×1 full-width]
const layout = [
  { span: 'col-span-2 row-span-2', minH: 420 }, // Artifacts — big hero
  { span: 'col-span-1 row-span-1', minH: 200 }, // Photo Frames
  { span: 'col-span-1 row-span-1', minH: 200 }, // Artificial Plants
  { span: 'col-span-1 row-span-1', minH: 200 }, // Home Decor
  { span: 'col-span-1 row-span-1', minH: 200 }, // Home Mandirs
  { span: 'col-span-1 row-span-1', minH: 200 }, // God Murtis
  { span: 'col-span-3 row-span-1', minH: 220 }, // Brass Items — full width
]

function CategoryCard({ cat, span, minH }) {
  const img = cat.image || catImages[cat.id]
  const href = cat.link ?? waLink(`Hi Sun Artisans, I'd like to enquire about ${cat.name}.`)
  const isExternal = !cat.link

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
      aria-label={`Enquire about ${cat.name}`}
      className={`group relative overflow-hidden rounded-2xl ${span}`}
      style={{ minHeight: minH }}
    >
      {/* Background image */}
      <img
        src={img}
        alt={cat.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay — strong at bottom only */}
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 65%)' }} />


      {/* Gold top-left accent bar */}
      <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500 rounded-br-full"
        style={{ background: '#C9973A' }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-10 group-hover:translate-y-0 lg:translate-y-16 lg:group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-display text-xl leading-tight text-white mb-1">{cat.name}</h3>
        <p className="text-[0.78rem] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-1.5"
          style={{ color: '#d4c5b0' }}>
          {cat.blurb}
        </p>
        <span className="cat-enquire-btn inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ background: '#C9973A', color: '#fff' }}>
          Enquire
        </span>
      </div>
    </a>
  )
}

export default function Categories() {
  return (
    <section id="categories" className="relative overflow-hidden pt-6 pb-14 lg:pt-8 lg:pb-20" style={{ background: '#faf5ee' }}>
      <style>{`
        .cat-enquire-btn { position: relative; overflow: hidden; }
        .cat-enquire-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.4s ease;
        }
        .group:hover .cat-enquire-btn::after { left: 150%; }
      `}</style>

      {/* Subtle dot pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
        <defs>
          <pattern id="cat-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C9973A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cat-dots)" />
      </svg>

      {/* Gold top border */}
      <div className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, #C9973A 30%, #C9973A 70%, transparent)' }} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#C9973A]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9973A]">Our Collection</span>
              <span className="h-px w-8 bg-[#C9973A]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-display text-[#0b3330]">Shop by Category</h2>
          </div>
        </div>

        {/* ── Desktop Bento Grid ── */}
        <div className="hidden lg:grid grid-cols-3 gap-3 auto-rows-[minmax(180px,auto)]">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} span={layout[i]?.span ?? 'col-span-1 row-span-1'} minH={layout[i]?.minH ?? 200} />
          ))}
        </div>

        {/* ── Mobile: 2-col grid, text outside card ── */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 lg:hidden [&>*:last-child:nth-child(odd)]:col-span-2 [&>*:last-child:nth-child(odd)]:mx-auto [&>*:last-child:nth-child(odd)]:w-1/2">
          {categories.map((cat) => {
            const img = cat.image || catImages[cat.id]
            const href = cat.link ?? waLink(`Hi Sun Artisans, I'd like to enquire about ${cat.name}.`)
            const isExternal = !cat.link
            return (
              <a key={cat.id} href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
                className="group flex flex-col gap-2">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
                  <img src={img} alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy" />
                </div>
                {/* Text below image */}
                <h3 className="font-display text-[0.95rem] leading-snug text-[#0b3330] text-center">{cat.name}</h3>
              </a>
            )
          })}
        </div>

      </div>

    </section>
  )
}
