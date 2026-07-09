import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const metadata = genMeta({ title: 'Contact Us', canonical: '/contact' })

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full">
          <Link href="/" className="font-bold">SarkariJob</Link>
        </div>
      </header>
      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-8">
        <h1 className="text-headline-lg mb-4">Contact Us</h1>
        <div className="bg-white rounded shadow-sm border border-border-subtle p-6 text-body-md space-y-4">
          <p>For inquiries, feedback, or support, please email us at:</p>
          <p className="font-medium text-secondary">contact@sarkarijob.local</p>
          <p className="text-gray-500 text-sm">We will respond to your query as soon as possible.</p>
        </div>
      </main>
    </div>
  )
}
