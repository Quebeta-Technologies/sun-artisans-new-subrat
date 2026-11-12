import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Categories from './components/Categories'
import MandirCollection from './components/MandirCollection'
import Gifting from './components/Gifting'
import TradePartner from './components/TradePartner'
import Gallery from './components/Gallery'
import WhyUs from './components/WhyUs'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { waLink } from './data/content'
import { WhatsAppIcon } from './components/Icons'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-chandan focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Categories />
        <MandirCollection />
        <Gifting />
        <TradePartner />
        <Gallery />
        <WhyUs />
        <Reviews />
        <Contact />
        <FAQ />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        aria-label="Chat with Sun Artisans on WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-colors hover:bg-[#1ebe5d]"
      >
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-[wa-glow_2s_ease-out_infinite]" />
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-[wa-glow_2s_ease-out_1s_infinite]" />
        <WhatsAppIcon className="relative h-7 w-7" />
        <style>{`@keyframes wa-glow { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.9); opacity: 0; } }`}</style>
      </a>
    </>
  )
}
