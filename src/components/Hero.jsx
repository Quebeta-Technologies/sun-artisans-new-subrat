export default function Hero() {
  return (
    <section id="top" className="bg-white pb-3 sm:pb-4">
      {/* Full-bleed video from the very top (the header floats over it); curved bottom corners */}
      <div className="relative h-dvh min-h-130 w-full overflow-hidden rounded-b-2xl bg-peacock-deep shadow-xl shadow-black/15 sm:rounded-b-3xl">
        <video
          src="/photo/Landscape video 90 MB.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>
    </section>
  )
}
