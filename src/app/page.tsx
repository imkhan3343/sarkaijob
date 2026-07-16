import type { Metadata } from 'next'
import { CategorySection } from '@/components/public/CategorySection'
import { DocumentsSection } from '@/components/public/DocumentsSection'
import { FeaturedGrid } from '@/components/public/FeaturedGrid'
import { FlashNews } from '@/components/public/FlashNews'
import { Footer } from '@/components/public/Footer'
import { Header } from '@/components/public/Header'
import { QuickLinks } from '@/components/public/QuickLinks'
import { SiteDisclaimer } from '@/components/public/SiteDisclaimer'
import { StateLinks } from '@/components/public/StateLinks'
import JsonLd from '@/components/JsonLd'
import { getHomepageData } from '@/lib/homepage'
import { getMessages, resolveLang } from '@/lib/i18n'
import { buildHomepageJsonLd, homepageMetadata } from '@/lib/seo/homepage'
import { AdSlot } from '@/components/ads/AdSlot'
import { TelegramCTA } from '@/components/retention/TelegramCTA'

export const revalidate = 60
export const metadata: Metadata = homepageMetadata

type PageProps = { searchParams?: { lang?: string } }

export default async function HomePage({ searchParams }: PageProps) {
  const messages = getMessages(resolveLang(searchParams?.lang))
  const data = await getHomepageData()
  const jsonLd = buildHomepageJsonLd([
    ...data.featured,
    ...data.latestJobs,
    ...data.results,
    ...data.admitCards,
  ])
  const logoText = data.settings.logo_text?.valueHindi || data.settings.logo_text?.value
  const launchYear = data.settings.launch_year?.value

  return (
    <>
      {jsonLd.map((block, index) => <JsonLd key={index} data={block} />)}
      <div className="min-h-screen bg-background">
        <Header messages={messages} logoText={logoText} />
        <FlashNews posts={data.breaking.length ? data.breaking : data.featured} messages={messages} />
        <div className="mx-auto max-w-container px-3 md:px-6"><AdSlot slotKey="home-inline" pageType="home" /></div>
        <QuickLinks messages={messages} />

        <main id="main-content" className="mx-auto max-w-container px-3 md:px-6">
          <FeaturedGrid posts={data.featured} messages={messages} />
          <SiteDisclaimer text={data.disclaimer} messages={messages} />

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <CategorySection title={messages.sections.results} slug="results" posts={data.results} messages={messages} />
            <CategorySection title={messages.sections.admitCards} slug="admit-card" posts={data.admitCards} messages={messages} />
            <CategorySection title={messages.sections.latestJobs} slug="latest-job" posts={data.latestJobs} messages={messages} />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <CategorySection title={messages.sections.answerKey} slug="answer-key" posts={data.answerKeys} messages={messages} tone="tertiary" />
            <CategorySection title={messages.sections.syllabus} slug="syllabus" posts={data.syllabus} messages={messages} tone="tertiary" />
            <CategorySection title={messages.sections.admission} slug="admission" posts={data.admission} messages={messages} tone="tertiary" />
          </div>

          <DocumentsSection posts={data.documents} messages={messages} />
          <StateLinks states={data.states} messages={messages} />
          <div className="mb-6"><TelegramCTA /></div>
        </main>

        <Footer disclaimer={data.disclaimer} states={data.states} messages={messages} logoText={logoText} launchYear={launchYear} />
      </div>
    </>
  )
}
