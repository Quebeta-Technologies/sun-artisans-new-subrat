import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Canonical site address. On Vercel this is the project's production domain (the vercel.app address today,
// sunartisans.com automatically once that domain is connected); elsewhere it falls back to the planned domain.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://sunartisans.com'

const PAGES = ['/', '/privacy-policy', '/terms']

function seo() {
  return {
    name: 'seo',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL) },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          PAGES.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
          '\n</urlset>\n',
      })
    },
  }
}

// `npm run build` → normal multi-file production build in /dist.
// `SINGLE=1 npm run build` → one self-contained index.html (used for quick previews).
export default defineConfig({
  define: { __SITE_URL__: JSON.stringify(SITE_URL) },
  plugins: [seo(), react(), tailwindcss(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
})
