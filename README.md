# Sun Artisans LLP — Landing page

React 19 + Vite 6 + Tailwind CSS 4.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

## Where things live
- `src/data/content.js` — all copy, contact details, categories, FAQs, gallery entries
- `src/components/` — one component per section
- `src/index.css` — colour/type tokens (`@theme`) and button/field styles
- `index.html` — SEO meta, Open Graph, LocalBusiness + FAQPage JSON-LD

## Before launch
- Photos: set `image` in `content.js` (categories, gallery) and pass `image` props to Hero, About, MandirCollection, Gifting. Until then a brass jali placeholder shows. Keep images under 200 KB.
- Add geo coordinates to the LocalBusiness schema in `index.html`.
- Instagram/Facebook URLs in `store` (links appear in footer once filled).
- Google Business Profile review link in `Reviews.jsx`; add real reviews only.
- GA4, Search Console and Meta Pixel snippets in `index.html`.
- Forms have no backend: they compose a WhatsApp message with the entered details.
- Open question for client: Paintings, Wall Murals, Flowers (on store signage, not in Phase 1 scope).
