// Vercel serverless function: emails website enquiries to the store via Resend.
// Needs RESEND_API_KEY set in Vercel → Project → Settings → Environment Variables.
const TO = process.env.ENQUIRY_TO || 'prabhu.artisans@gmail.com'
const FROM = process.env.RESEND_FROM || 'Sun Artisans Website <onboarding@resend.dev>'

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'Email is not configured' })

  const { subject, fields } = req.body || {}
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
      subject: `Website enquiry: ${subject.slice(0, 120)}`,
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
