import type { Metadata } from 'next'
import './globals.css'
import SkipLink from '@/components/SkipLink'
import JsonLd from '@/components/JsonLd'
import { websiteJsonLd, organizationJsonLd } from '@/lib/seo/json-ld'

export const metadata: Metadata = {
  title: {
    default: 'SarkariJob - Government Jobs, Results, Admit Cards',
    template: '%s | SarkariJob',
  },
  description: 'Find latest government jobs, results, admit cards, answer keys and syllabus for Sarkari Naukri across India.',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    siteName: 'SarkariJob',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" dir="ltr">
      <body className="font-sans antialiased">
        <SkipLink />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        {children}
      </body>
    </html>
  )
}
