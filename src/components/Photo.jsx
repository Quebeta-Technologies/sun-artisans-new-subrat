import { useId } from 'react'

/**
 * Shows a real photo when `src` is given; otherwise a brass jali-lattice placeholder
 * so the layout reads finished until the client's photography arrives.
 */
export default function Photo({ src, alt, label, className = '', tone = 'light' }) {
  const id = useId().replace(/:/g, '')
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  }
  const dark = tone === 'dark'
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative h-full w-full ${dark ? 'bg-peacock-deep' : 'bg-[#DCC8A6]'} ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`jali-${id}`} width="44" height="44" patternUnits="userSpaceOnUse">
            <path
              d="M22 2 L42 22 L22 42 L2 22 Z M22 12 a10 10 0 1 0 0.01 0 Z"
              fill="none"
              stroke={dark ? '#D9B56A' : '#9A7230'}
              strokeOpacity={dark ? 0.22 : 0.28}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#jali-${id})`} />
      </svg>
      {label && (
        <span
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs ${
            dark ? 'bg-peacock/80 text-brass-light' : 'bg-chandan-soft/85 text-ink-soft'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  )
}
