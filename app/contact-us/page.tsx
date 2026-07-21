import ContactForm from '@/components/business/contact-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact RustFS | Deployment & Migration Review",
  description: 'Share your workload, topology, migration, and support context with the RustFS team.',
  openGraph: {
    title: "Contact RustFS | Deployment & Migration Review",
    description: 'Share your workload, topology, migration, and support context with the RustFS team.',
    type: "website",
    locale: 'en_US',
  },
}

export default function ContactUsPage() {
  return (
    <main className="flex-1 relative">
      <div className="relative z-10">
        <ContactForm />
      </div>
    </main>
  )
}
