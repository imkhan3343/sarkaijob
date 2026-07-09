import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const metadata = genMeta({ title: 'Privacy Policy', canonical: '/privacy' })

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full"><Link href="/" className="font-bold">SarkariJob</Link></div>
      </header>
      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-8">
        <h1 className="text-headline-lg mb-4">Privacy Policy</h1>
        <div className="bg-white rounded shadow-sm border border-border-subtle p-6 text-body-md leading-relaxed space-y-3">
          <p>We value your privacy. This policy outlines how we collect, use, and protect your information.</p>
          <p>We may collect non-personal data such as browser type, pages visited, and time spent on site to improve our services. This data is anonymized and used for analytics only.</p>
          <p>We do not sell, trade, or share your personal information with third parties except as required by law.</p>
          <p>Third-party services (e.g., Google AdSense) may use cookies to serve ads based on your visits. You can opt out via Google Ad Settings.</p>
          <p>By using this site, you consent to this privacy policy.</p>
        </div>
      </main>
    </div>
  )
}
