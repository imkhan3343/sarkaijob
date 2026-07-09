import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const metadata = genMeta({ title: 'Terms & Conditions', canonical: '/terms' })

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full"><Link href="/" className="font-bold">SarkariJob</Link></div>
      </header>
      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-8">
        <h1 className="text-headline-lg mb-4">Terms & Conditions</h1>
        <div className="bg-white rounded shadow-sm border border-border-subtle p-6 text-body-md leading-relaxed space-y-3">
          <p>By accessing SarkariJob, you agree to these terms. If you do not agree, please do not use our services.</p>
          <p>All content is for informational purposes only. We reserve the right to modify or discontinue services at any time.</p>
          <p>Users may not reproduce, distribute, or exploit content from this site without prior written consent.</p>
          <p>We are not responsible for any loss or damage arising from the use of information on this site.</p>
        </div>
      </main>
    </div>
  )
}
