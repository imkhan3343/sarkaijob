import type { ReactNode } from 'react'
import { Footer } from '@/components/public/Footer'
import { Header } from '@/components/public/Header'
import { getMessages } from '@/lib/i18n'
import { getPublicShellData } from '@/lib/site'
import { AdSlot } from '@/components/ads/AdSlot'

export async function PublicPage({ children, width = 'max-w-container' }: { children: ReactNode; width?: string }) {
  const shell = await getPublicShellData()
  const messages = getMessages('hi')
  return (
    <div className="min-h-screen bg-background">
      <Header messages={messages} logoText={shell.logoText} />
      <div className="mx-auto max-w-container px-3 md:px-6"><AdSlot slotKey="below-nav" pageType="public" /></div>
      <main id="main-content" className={`mx-auto min-h-[60vh] ${width} px-3 py-6 md:px-6 md:py-8`}>{children}</main>
      <Footer disclaimer={shell.disclaimer} states={shell.states} messages={messages} logoText={shell.logoText} launchYear={shell.launchYear} />
    </div>
  )
}
