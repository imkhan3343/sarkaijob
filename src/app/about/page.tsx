import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const metadata = genMeta({ title: 'About Us', canonical: '/about' })

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full">
          <Link href="/" className="font-bold">SarkariJob</Link>
        </div>
      </header>
      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-8">
        <h1 className="text-headline-lg mb-4">About SarkariJob</h1>
        <div className="bg-white rounded shadow-sm border border-border-subtle p-6 text-body-md leading-relaxed space-y-4">
          <p>SarkariJob is a comprehensive information portal dedicated to providing the latest government job opportunities, results, admit cards, answer keys, and syllabus information for job seekers across India.</p>
          <p>Our mission is to simplify the job search process for millions of aspiring candidates who seek government employment. We aggregate data from official sources and present it in a user-friendly, accessible format.</p>
          <p>SarkariJob is an independent platform and is not affiliated with any government body or organization. Users are advised to verify all details from the official notification before applying.</p>
        </div>
      </main>
    </div>
  )
}
