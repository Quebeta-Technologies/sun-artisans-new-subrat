import LegalPage from '../components/LegalPage'
import { store, telLink } from '../data/content'

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="12 November 2026">
      <p>
        These terms apply to your use of this website, operated by {store.legalName} (“Sun Artisans”, “we”, “us”). By
        using the website you agree to them. If you do not agree, please do not use the website.
      </p>

      <h2>1. About this website</h2>
      <p>
        This website showcases the products available at our store in Udhyamnagar, Pimpri, Pune. We do not currently sell
        products or accept payments online. Purchases are made at our store or arranged directly with our team.
      </p>

      <h2>2. Products, photos and prices</h2>
      <ul>
        <li>
          Product photos are for illustration. Handcrafted items such as brass, marble and resin pieces may vary slightly
          in colour, finish, size and detail from the photos.
        </li>
        <li>Products shown may not always be in stock. Please confirm availability with us before visiting.</li>
        <li>Prices are confirmed at the store or in writing by our team, and may change without notice.</li>
      </ul>

      <h2>3. Enquiries are not orders</h2>
      <p>
        Submitting a form, or messaging us on WhatsApp, is an enquiry only. It does not create an order or a binding
        contract. An order is confirmed only when we agree the product, price and payment with you.
      </p>

      <h2>4. Trade partners and bulk orders</h2>
      <p>
        Trade pricing for architects and interior designers, and pricing for bulk or corporate gifting orders, is offered
        at our discretion. Quantities, customisation, delivery timelines, payment terms and any returns for such orders
        will be agreed separately in writing.
      </p>

      <h2>5. Store purchases</h2>
      <p>
        Returns, exchanges and refunds for purchases made at the store follow the store policy explained at the time of
        purchase. Please check your item before taking it home.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The text, photos, logo and design of this website belong to {store.legalName} or are used with permission. You
        may not copy, reproduce or use them for commercial purposes without our written consent.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        This website links to services run by others, such as WhatsApp and Google Maps. We are not responsible for their
        content or how they handle your information; their own terms and privacy policies apply.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        We try to keep the information on this website accurate and up to date, but we do not guarantee that it is
        complete or error-free. To the extent permitted by law, we are not liable for any loss arising from your use of
        this website or reliance on its content.
      </p>

      <h2>9. Privacy</h2>
      <p>
        How we handle the personal information you share with us is explained in our{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The “Last updated” date at the top shows when they were last changed.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the
        courts in Pune, Maharashtra.
      </p>

      <h2>12. Contact us</h2>
      <p>
        <strong>{store.legalName}</strong><br />
        {store.addressLines.map((l) => <span key={l}>{l}<br /></span>)}
        Email: <a href={`mailto:${store.email}`}>{store.email}</a><br />
        Phone: <a href={telLink}>{store.phoneDisplay}</a>
      </p>
    </LegalPage>
  )
}
