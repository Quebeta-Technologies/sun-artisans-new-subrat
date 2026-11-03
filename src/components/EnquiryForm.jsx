import { useState } from 'react'
import { waLink } from '../data/content'
import { WhatsAppIcon } from './Icons'

/**
 * No backend in Phase 1: the form validates, then hands the enquiry to WhatsApp
 * with the details pre-filled. Swap `onSend` for an API/email service later if needed.
 */
export default function EnquiryForm({ fields, intro, submitLabel, dark = false }) {
  const [values, setValues] = useState({})
  const [sentUrl, setSentUrl] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const body = fields.map((f) => `${f.label}: ${values[f.name] || '-'}`).join('\n')
    setSentUrl(waLink(`${intro}\n\n${body}`))
  }

  if (sentUrl) {
    return (
      <div className={`rounded-md p-6 ${dark ? 'bg-white/5' : 'bg-chandan'}`} role="status">
        <p className="font-display text-2xl">Your enquiry is ready to send</p>
        <p className={`mt-2 ${dark ? 'text-chandan/75' : 'text-ink-soft'}`}>
          Open WhatsApp to send it to our team. We usually reply within store hours.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={sentUrl} target="_blank" rel="noopener" className="btn-primary">
            <WhatsAppIcon /> Send on WhatsApp
          </a>
          <button type="button" onClick={() => setSentUrl(null)} className={dark ? 'btn-ghost-dark' : 'btn-ghost'}>
            Edit details
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
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
        <button type="submit" className="btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}
