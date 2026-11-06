import { useEffect, useRef, useState } from 'react'
import { WhatsAppIcon } from './Icons'
import Photo from './Photo'

/**
 * Image that tries `src`, then optional `fallbackSrc` (demo image),
 * then shows the brass lattice placeholder.
 */
export function SmartImg({ src, fallbackSrc, alt, className = '', tone }) {
  const [stage, setStage] = useState(0) // 0 = src, 1 = fallbackSrc, 2 = placeholder
  const current = stage === 0 ? src : stage === 1 ? fallbackSrc : null
  if (!current) return <Photo alt={alt} tone={tone} />
  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setStage((s) => (s === 0 && fallbackSrc ? 1 : 2))}
      className={className}
    />
  )
}

/**
 * Full-screen photo viewer (native <dialog>: Esc closes, focus is trapped).
 * index = open photo (0-based) or null when closed.
 */
export default function Lightbox({ id, title, total, srcFor, fallbackFor, enquire, index, onClose, onStep }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (index != null && !d.open) d.showModal()
    if (index == null && d.open) d.close()
  }, [index])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') onStep(1)
    if (e.key === 'ArrowLeft') onStep(-1)
  }
  const n = index != null ? index + 1 : 1

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={`${title} photo ${n} of ${total}`}
      className="lightbox m-auto w-[min(92vw,960px)] max-w-none overflow-visible bg-transparent p-0 text-peacock-deep backdrop:bg-white/80 backdrop:backdrop-blur-md"
    >
      {index != null && (
        <div className="relative">
          <div key={`${id}-${n}`} className="lightbox-img mx-auto aspect-square max-h-[78vh] overflow-hidden rounded-2xl bg-peacock-deep ring-1 ring-brass-light/30">
            <SmartImg src={srcFor(n)} fallbackSrc={fallbackFor?.(n)} alt={`${title} at Sun Artisans — photo ${n}`} tone="dark" className="h-full w-full object-contain" />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-xl">
              {title} <span className="ml-2 text-base text-brass">{String(n).padStart(2, '0')} / {total}</span>
            </p>
            <a
              href={enquire.href}
              {...(enquire.external ? { target: '_blank', rel: 'noopener' } : {})}
              className="btn bg-[#25D366] text-[#0B2A17] hover:bg-[#1EBE5D]"
            >
              {enquire.external && <WhatsAppIcon className="h-5 w-5" />}
              Enquire about this
            </a>
          </div>

          {[
            { d: -1, label: 'Previous photo', cls: 'left-2 sm:-left-16', path: 'm15 6-6 6 6 6' },
            { d: 1, label: 'Next photo', cls: 'right-2 sm:-right-16', path: 'm9 6 6 6-6 6' },
          ].map((b) => (
            <button
              key={b.d}
              type="button"
              onClick={() => onStep(b.d)}
              aria-label={b.label}
              className={`absolute top-[40%] grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-peacock text-chandan shadow-lg ring-1 ring-brass-light/40 transition-colors hover:bg-brass hover:text-peacock-deep ${b.cls}`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={b.path} /></svg>
            </button>
          ))}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute -top-3 -right-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-peacock-deep text-chandan shadow-lg transition-transform hover:rotate-90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
      )}
    </dialog>
  )
}
