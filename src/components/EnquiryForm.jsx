import { useState } from 'react'
import { waLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

// Emails the enquiry via /api/enquiry (Resend); if that fails, falls back to a pre-filled WhatsApp message.
export default function EnquiryForm({ fields, intro, submitLabel, dark = false }) {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [sentUrl, setSentUrl] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const body = fields.map((f) => `${f.label}: ${values[f.name] || '-'}`).join('\n')
    setStatus('sending')
    try {
      const r = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: e.target.elements.website?.value || '',
          subject: intro,
          fields: fields.map((f) => ({ label: f.label, value: values[f.name] || '' })),
        }),
      })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      setValues({})
      setStatus('sent')
    } catch {
      setSentUrl(waLink(`${intro}\n\n${body}`))
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className={`rounded-md p-6 ${dark ? 'bg-white/5' : 'bg-chandan'}`} role="status">
        <p className="font-display text-2xl">Thank you! Your enquiry has been sent</p>
        <p className={`mt-2 ${dark ? 'text-chandan/75' : 'text-ink-soft'}`}>
          Our team will get back to you shortly, usually within store hours.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className={`mt-5 ${dark ? 'btn-ghost-dark' : 'btn-ghost'}`}>
          Send another enquiry
        </button>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className={`rounded-md p-6 ${dark ? 'bg-white/5' : 'bg-chandan'}`} role="status">
        <p className="font-display text-2xl">We couldn't send that by email</p>
        <p className={`mt-2 ${dark ? 'text-chandan/75' : 'text-ink-soft'}`}>
          Please send it on WhatsApp instead — your details are already filled in.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={sentUrl} target="_blank" rel="noopener" className="btn-primary">
            <WhatsAppIcon /> Send on WhatsApp
          </a>
          <button type="button" onClick={() => setStatus('idle')} className={dark ? 'btn-ghost-dark' : 'btn-ghost'}>
            Edit details
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot: hidden from people, but spam bots fill it in and get silently dropped by the API */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      {fields.map((f) => (
        <label key={f.name} className={`block ${f.wide ? 'sm:col-span-2' : ''}`}>
          <span className={`mb-1.5 block text-sm font-medium ${dark ? 'text-chandan/80' : 'text-ink-soft'}`}>
            {f.label}{f.required && <span aria-hidden="true"> *</span>}
          </span>
          {f.type === 'textarea' ? (
            <textarea
              name={f.name}
              rows={2}
              required={f.required}
              className="field resize-y"
              value={values[f.name] || ''}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
            />
          ) : (
            <input
              name={f.name}
              type={f.type || 'text'}
              required={f.required}
              autoComplete={f.autoComplete}
              inputMode={f.type === 'tel' ? 'tel' : undefined}
              pattern={f.type === 'tel' ? '[0-9+\\s-]{10,15}' : undefined}
              title={f.type === 'tel' ? 'Enter a 10-digit mobile number' : undefined}
              className="field"
              value={values[f.name] || ''}
              onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
            />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : submitLabel}
        </button>
        <p className={`mt-3 text-xs ${dark ? 'text-chandan/60' : 'text-ink-soft'}`}>
          By submitting, you agree to our{' '}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-brass">Privacy Policy</a>.
        </p>
      </div>
    </form>
  )
}
