import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const metadata = genMeta({ title: 'Disclaimer', canonical: '/disclaimer' })

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full"><Link href="/" className="font-bold">SarkariJob</Link></div>
      </header>
      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-8">
        <h1 className="text-headline-lg mb-4">Disclaimer</h1>
        <div className="bg-white rounded shadow-sm border border-border-subtle p-6 text-body-md leading-relaxed space-y-3">
          <p>SarkariJob is an independent information portal and is <strong>not affiliated</strong> with any government body or organization.</p>
          <p>All job, result, admit card, and exam data is aggregated for convenience. Users must verify every detail from the <strong>official notification</strong> before acting.</p>
          <p>We strive to keep information accurate and up-to-date, but we cannot guarantee completeness or timeliness. Use this site at your own discretion.</p>
        </div>
      </main>
    </div>
  )
}
