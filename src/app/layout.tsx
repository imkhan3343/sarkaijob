import type { Metadata } from 'next'
import './globals.css'
import SkipLink from '@/components/SkipLink'
import { homepageMetadata } from '@/lib/seo/homepage'
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts'
import { ReportWebVitals } from '@/app/report-web-vitals'
import { AdProviderScript } from '@/components/ads/AdProviderScript'
import { ServiceWorkerRegister } from '@/components/owned-channels/ServiceWorkerRegister'

export const metadata: Metadata = homepageMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" dir="ltr">
      <body className="font-sans antialiased">
        <SkipLink />
        <AnalyticsScripts />
        <AdProviderScript />
        <ReportWebVitals />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}
