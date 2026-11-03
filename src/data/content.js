// All site copy lives here so the client team can edit text without touching components.

export const store = {
  name: 'Sun Artisans',
  legalName: 'Sun Artisans LLP',
  phone: '9372830261',
  phoneDisplay: '+91 93728 30261',
  whatsapp: '919372830261',
  email: 'prabhu.artisans@gmail.com',
  addressLines: [
    'Plot No. 106, Ground Floor, Shruthi Enclave',
    'Annasaheb Magar Stadium Road, Udhyamnagar',
    'Pimpri, Pune – 411018',
  ],
  hours: '10:30 AM – 8:30 PM',
  mapsQuery: 'Sun Artisans, Shruthi Enclave, Annasaheb Magar Stadium Road, Udhyamnagar, Pimpri, Pune 411018',
  // TODO: confirm handles with client
  instagram: '',
  facebook: '',
}

export const waLink = (message = 'Hi Sun Artisans, I would like to know more about your collection.') =>
  `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`

export const telLink = `tel:+91${store.phone}`
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.mapsQuery)}`
export const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(store.mapsQuery)}&output=embed`

// Replace `image: null` with an imported photo (e.g. import artifacts from '../assets/artifacts.jpg')
export const categories = [
  { id: 'artifacts', name: 'Artifacts', blurb: 'Unique decorative artifacts to elevate every corner of your home', image: null },
  { id: 'photo-frames', name: 'Photo Frames', blurb: 'Premium frames for family photos and wall art', image: null },
  { id: 'artificial-plants', name: 'Artificial Plants', blurb: 'Low-maintenance greenery that never fades', image: null },
  { id: 'home-decor', name: 'Home Decor Items', blurb: 'Curated pieces to style every room', image: null },
  { id: 'home-mandirs', name: 'Home Mandirs', blurb: 'Elegant mandirs crafted for everyday worship', image: null, link: '#mandir' },
  { id: 'god-murtis', name: 'God Murtis', blurb: 'Traditional and modern murtis in a range of sizes', image: null, link: '#mandir' },
  { id: 'brass-items', name: 'Brass Items', blurb: 'Handcrafted brass décor and pooja essentials', image: null, link: '#mandir' },
]

export const whyUs = [
  { title: 'Wide range under one roof', text: 'Artifacts, frames, plants, mandirs, murtis and brass — no need to visit multiple stores.' },
  { title: 'Premium quality', text: 'Every piece is chosen for craftsmanship and lasting quality.' },
  { title: 'Styling guidance', text: 'Our team helps you choose pieces that fit your space and style.' },
  { title: 'Trusted local store', text: 'A name PCMC and Pune families have relied on for their home decor needs.' },
]

export const gallery = [
  { alt: 'Styled living room corner featuring Sun Artisans decor, Pimpri-Chinchwad', label: 'Styled corner', tall: true, image: null },
  { alt: 'Store interior at Sun Artisans, Udhyamnagar, Pimpri', label: 'In the store', image: null },
  { alt: 'Customer home pooja room featuring Sun Artisans mandir, Pimpri-Chinchwad', label: 'Customer home', image: null },
  { alt: 'Brass decor display featuring Sun Artisans pieces, Pimpri-Chinchwad', label: 'Brass display', image: null },
  { alt: 'Customer home entrance featuring Sun Artisans artifacts, Pimpri-Chinchwad', label: 'Customer home', tall: true, image: null },
  { alt: 'Photo frame wall featuring Sun Artisans frames, Pimpri-Chinchwad', label: 'Frame wall', image: null },
]

export const faqs = [
  { q: 'Where is Sun Artisans located?', a: 'Sun Artisans is located at Plot No. 106, Ground Floor, Shruthi Enclave, Annasaheb Magar Stadium Road, Udhyamnagar, Pimpri, Pune – 411018.' },
  { q: 'What products does Sun Artisans sell?', a: 'Sun Artisans offers artifacts, photo frames, artificial plants, home decor items, home mandirs, god murtis and brass items, all under one roof.' },
  { q: 'Does Sun Artisans work with architects and interior designers?', a: 'Yes — Sun Artisans has a dedicated trade partner program for architects and interior designers, offering trade pricing and project support.' },
  { q: 'Does Sun Artisans offer bulk gifting orders?', a: 'Yes, Sun Artisans offers a curated gifting collection for housewarmings, weddings, festivals and corporate occasions, with bulk-order enquiry support.' },
  { q: "What are Sun Artisans' store timings?", a: 'Sun Artisans is open from 10:30 AM to 8:30 PM.' },
  { q: 'Does Sun Artisans have an online store?', a: 'Not yet — Sun Artisans currently operates from its Pimpri store, with ecommerce planned as a future phase.' },
]
