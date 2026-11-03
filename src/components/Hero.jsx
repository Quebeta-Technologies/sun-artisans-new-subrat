const YT_ID = 'UKnzajIc9s4'

export default function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
          title="Hero background video"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
