import LegalPage from '../components/LegalPage'
import { store, telLink } from '../data/content'

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      description="How Sun Artisans LLP, Pimpri, Pune collects, uses and protects the personal information you share through our website enquiry forms."
      updated="12 November 2026"
    >
      <p>
        {store.legalName} (“Sun Artisans”, “we”, “us”) respects your privacy. This policy explains what personal
        information we collect through this website, why we collect it, and the choices you have. It is published in
        line with the Information Technology Act, 2000 and its rules, and the Digital Personal Data Protection Act, 2023.
      </p>

      <h2>1. Information we collect</h2>
      <p>We only collect information that you choose to give us when you fill in a form on this website:</p>
      <ul>
        <li><strong>Contact enquiry form:</strong> your name, phone number, email address (optional) and your message.</li>
        <li><strong>Trade partner form:</strong> your name, firm or studio name, phone number, email address (optional) and project requirement.</li>
      </ul>
      <p>
        If you contact us on WhatsApp, by phone or by email, we will also have the details you share through that channel.
      </p>
      <p>
        This website does not use advertising or analytics cookies, and we do not track you across other websites.
      </p>

      <h2>2. Why we use your information</h2>
      <ul>
        <li>To reply to your enquiry and share product details, prices or availability.</li>
        <li>To discuss trade partnerships, bulk gifting or project orders you have asked about.</li>
        <li>To keep a record of our conversation so we can serve you better if you contact us again.</li>
      </ul>
      <p>
        By submitting a form you consent to us using your details for these purposes. We do not sell, rent or trade your
        personal information, and we will not send you marketing messages unless you ask us to.
      </p>

      <h2>3. Who we share it with</h2>
      <p>We share your information only with service providers that help us run this website:</p>
      <ul>
        <li><strong>Resend</strong>, which delivers form submissions to our email inbox.</li>
        <li><strong>Vercel</strong>, which hosts this website.</li>
        <li><strong>WhatsApp (Meta)</strong>, if you choose to message us on WhatsApp.</li>
        <li><strong>Google Maps</strong>, which displays our store location on the contact section.</li>
      </ul>
      <p>
        These providers may process data outside India. We may also disclose information if required by law or by a
        government authority.
      </p>

      <h2>4. How long we keep it</h2>
      <p>
        We keep enquiry details only as long as needed to respond to you and for our normal business records, after
        which they are deleted.
      </p>

      <h2>5. Keeping it safe</h2>
      <p>
        Form submissions are sent over an encrypted (HTTPS) connection and stored in a password-protected mailbox. No
        method of transmission or storage is completely secure, but we take reasonable steps to protect your information.
      </p>

      <h2>6. Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>tell you what personal information we hold about you;</li>
        <li>correct or update it;</li>
        <li>delete it, or stop using it;</li>
        <li>withdraw the consent you gave when submitting a form.</li>
      </ul>
      <p>Write to us using the contact details below and we will respond within a reasonable time.</p>

      <h2>7. Children</h2>
      <p>This website is not intended for children under 18, and we do not knowingly collect their information.</p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The “Last updated” date at the top shows when it was last changed.
      </p>

      <h2>9. Contact and grievances</h2>
      <p>
        For any question, request or complaint about your personal information, contact our Grievance Officer:
      </p>
      <p>
        <strong>Grievance Officer, {store.legalName}</strong><br />
        {store.addressLines.map((l) => <span key={l}>{l}<br /></span>)}
        Email: <a href={`mailto:${store.email}`}>{store.email}</a><br />
        Phone: <a href={telLink}>{store.phoneDisplay}</a>
      </p>
    </LegalPage>
  )
}
