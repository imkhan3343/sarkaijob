import Link from 'next/link'
import type { HomepageState } from '@/lib/homepage'
import type { Messages } from '@/lib/i18n'
import { EmailCapture } from '@/components/retention/EmailCapture'

export function Footer({ disclaimer, states, messages, logoText, launchYear }: { disclaimer: string; states: HomepageState[]; messages: Messages; logoText?: string | null; launchYear?: string | null }) {
  return (
    <footer className="mt-8 bg-tertiary text-white">
      <div className="mx-auto grid max-w-container gap-8 px-3 py-8 md:grid-cols-4 md:px-6">
        <div>
          <p className="text-xl font-extrabold">{logoText || messages.siteName}</p>
          <p className="mt-2 text-sm leading-6 text-white/75">{messages.siteTagline}</p>
          <EmailCapture />
        </div>
        <nav aria-label={messages.footer.quickLinks}>
          <h2 className="text-sm font-bold">{messages.footer.quickLinks}</h2>
          <div className="mt-3 space-y-2 text-sm text-white/75">
            <Link href="/category/latest-job" className="block hover:text-white">{messages.nav.latestJobs}</Link>
            <Link href="/category/results" className="block hover:text-white">{messages.nav.result}</Link>
            <Link href="/category/admit-card" className="block hover:text-white">{messages.nav.admitCard}</Link>
            <Link href="/sitemap.xml" className="block hover:text-white">Sitemap</Link>
          </div>
        </nav>
        <nav aria-label={messages.footer.states}>
          <h2 className="text-sm font-bold">{messages.footer.states}</h2>
          <div className="mt-3 space-y-2 text-sm text-white/75">
            {states.slice(0, 6).map((state) => <Link key={state.id} href={`/state/${state.slug}`} className="block hover:text-white">{state.nameHindi || state.name}</Link>)}
          </div>
        </nav>
        <nav aria-label={messages.footer.about}>
          <h2 className="text-sm font-bold">{messages.footer.about}</h2>
          <div className="mt-3 space-y-2 text-sm text-white/75">
            <Link href="/about" className="block hover:text-white">About</Link>
            <Link href="/contact" className="block hover:text-white">Contact</Link>
            <Link href="/privacy" className="block hover:text-white">Privacy</Link>
            <Link href="/disclaimer" className="block hover:text-white">Disclaimer</Link>
            <Link href="/terms" className="block hover:text-white">Terms</Link>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-container px-3 py-5 text-center text-xs leading-5 text-white/60 md:px-6">
          <p>{disclaimer}</p>
          <p className="mt-2">© {launchYear || new Date().getFullYear()} {logoText || 'SarkariJob'}. {messages.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
