// Vercel serverless function: emails website enquiries to the store via Resend.
// Needs RESEND_API_KEY set in Vercel → Project → Settings → Environment Variables.
const TO = process.env.ENQUIRY_TO || 'prabhu.artisans@gmail.com'
const FROM = process.env.RESEND_FROM || 'Sun Artisans Website <onboarding@resend.dev>'

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ')

// Best-effort per-IP limit. Memory is per serverless instance, so this slows a flood rather than
// guaranteeing a hard cap; for a strict limit add a Vercel Firewall rate-limit rule on /api/enquiry.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Browsers always send Origin on POST; only accept submissions from this site's own pages
  let originHost = null
  try { originHost = new URL(req.headers.origin).host } catch { /* missing or "null" origin */ }
  if (originHost !== req.headers.host) return res.status(403).json({ error: 'Forbidden' })

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many enquiries, please try again later' })

  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'Email is not configured' })

  const { subject, fields, website } = req.body || {}
  // Honeypot: a hidden field real visitors never fill. Pretend success so bots don't adapt.
  if (website) return res.status(200).json({ ok: true })

  if (typeof subject !== 'string' || !Array.isArray(fields) || fields.length === 0 || fields.length > 20) {
    return res.status(400).json({ error: 'Invalid enquiry' })
  }
  const rows = fields.map((f) => ({
    label: String(f?.label ?? '').slice(0, 100),
    value: String(f?.value ?? '').slice(0, 2000),
  }))
  const replyTo = rows.find((r) => /email/i.test(r.label) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value))?.value

  const html = `
    <h2 style="font-family:sans-serif;color:#0b3330">${escapeHtml(subject.slice(0, 200))}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows.map((r) => `<tr><td style="padding:6px 12px 6px 0;color:#7a6a58;vertical-align:top">${escapeHtml(r.label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(r.value || '-')}</td></tr>`).join('')}
    </table>`
  const text = `${subject}\n\n${rows.map((r) => `${r.label}: ${r.value || '-'}`).join('\n')}`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `Website enquiry: ${oneLine(subject).slice(0, 120)}`,
      html,
      text,
      ...(replyTo && { reply_to: replyTo }),
    }),
  })
  if (!r.ok) {
    console.error('Resend error', r.status, await r.text())
    return res.status(502).json({ error: 'Could not send email' })
  }
  return res.status(200).json({ ok: true })
}
