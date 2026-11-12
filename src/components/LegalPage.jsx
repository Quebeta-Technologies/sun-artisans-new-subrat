import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Ornament } from './Icons'

export default function LegalPage({ title, updated, children }) {
  useEffect(() => {
    document.title = `${title} | Sun Artisans LLP`
  }, [title])

  return (
    <>
      <Header solid />
      <main id="main" className="bg-chandan-soft pt-28 pb-16 lg:pt-32 lg:pb-24">
        <article className="mx-auto max-w-3xl px-5 lg:px-8">
          <a href="/" className="text-sm font-semibold text-brass hover:underline">← Back to home</a>
          <h1 className="mt-6 text-4xl text-peacock-deep sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-ink-soft">Last updated: {updated}</p>
          <Ornament className="mt-5 h-5 w-auto text-brass" />
          <div
            className="mt-8 text-[1rem] leading-relaxed text-ink
              [&_a]:text-peacock [&_a]:underline [&_a]:underline-offset-2
              [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-peacock-deep
              [&_li]:mt-1.5 [&_p]:mt-3
              [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6"
          >
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
