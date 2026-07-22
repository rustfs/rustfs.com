import ContactForm from '@/components/business/contact-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | RustFS | The High-Performance, Apache 2.0 Alternative to MinIO",
  description: 'Get in touch with the RustFS team. Contact us for questions, support, or partnership opportunities.',
  openGraph: {
    title: "Contact Us | RustFS | The High-Performance, Apache 2.0 Alternative to MinIO",
    description: 'Get in touch with the RustFS team. Contact us for questions, support, or partnership opportunities.',
    type: "website",
    locale: 'en_US',
  },
}

export default function ContactPage() {
  return (
    <main className="flex-1 relative">
      <div className="relative z-10">
        <ContactForm />
      </div>
    </main>
  )
}
