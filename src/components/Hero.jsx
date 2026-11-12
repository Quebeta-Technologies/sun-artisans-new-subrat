export default function Hero() {
  return (
    <section id="top" className="bg-white pb-3 sm:pb-4">
      {/* The design has no visible headline over the video; this gives search engines and screen readers the page's main heading */}
      <h1 className="sr-only">Sun Artisans – Home Decor, God Murtis, Brass Items &amp; Gifting Store in Pimpri-Chinchwad, Pune</h1>
      {/* Full-bleed video from the very top (the header floats over it); curved bottom corners */}
      <div className="relative h-svh min-h-130 w-full overflow-hidden rounded-b-2xl bg-peacock-deep shadow-xl shadow-black/15 sm:rounded-b-3xl">
        <video
          poster="/video/hero-poster.jpg"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          {/* Full 1080p for larger screens, a lighter 720p for phones. Browsers that ignore `media` take the first (1080p) source. */}
          <source src="/video/hero-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/video/hero-720.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
