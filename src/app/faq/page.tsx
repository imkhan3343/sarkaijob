import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const metadata = genMeta({ title: 'FAQ', canonical: '/faq' })

const faqs = [
  { q: 'What is SarkariJob?', a: 'SarkariJob is a portal that provides information about government jobs, results, admit cards, answer keys, and syllabus across India.' },
  { q: 'Is SarkariJob a government website?', a: 'No. SarkariJob is an independent information portal not affiliated with any government body.' },
  { q: 'How can I apply for a job listed on SarkariJob?', a: 'Click the "Apply Online" link on the job post page. This will redirect you to the official application portal.' },
  { q: 'Is the information on SarkariJob accurate?', a: 'We strive for accuracy, but always verify details from the official notification before applying.' },
  { q: 'How can I contact SarkariJob?', a: 'Visit our Contact page or email us at contact@sarkarijob.local.' },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full"><Link href="/" className="font-bold">SarkariJob</Link></div>
      </header>
      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-8">
        <h1 className="text-headline-lg mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded shadow-sm border border-border-subtle p-4">
              <h2 className="font-bold text-body-md mb-2">{faq.q}</h2>
              <p className="text-body-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
