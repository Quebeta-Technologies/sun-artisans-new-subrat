const YT_ID = 'UKnzajIc9s4'

export default function Hero() {
  return (
    <section id="top" className="bg-white pb-3 sm:pb-4">
      {/* Full-bleed video from the very top (the header floats over it); curved bottom corners */}
      <div className="relative h-dvh min-h-130 w-full overflow-hidden rounded-b-2xl bg-peacock-deep shadow-xl shadow-black/15 sm:rounded-b-3xl">
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
          title="Hero background video"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-[1.12] border-0"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </section>
  )
}
