import Link from 'next/link'
import type { Messages } from '@/lib/i18n'
import { SearchBox } from '@/components/public/SearchBox'

const navItems = [
  ['home', '/'],
  ['latestJobs', '/category/latest-job'],
  ['admitCard', '/category/admit-card'],
  ['result', '/category/results'],
  ['answerKey', '/category/answer-key'],
  ['syllabus', '/category/syllabus'],
] as const

export function Header({ messages, logoText }: { messages: Messages; logoText?: string | null }) {
  return (
    <header className="border-b border-white/10 bg-tertiary text-white">
      <div className="mx-auto max-w-container px-3 md:px-6">
        <div className="flex min-h-14 items-center justify-between gap-3">
          <Link href="/" className="flex min-h-11 items-center gap-2 font-extrabold tracking-tight" aria-label="SarkariJob home">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">work</span>
            <span className="text-lg md:text-xl">{logoText || messages.siteName}</span>
          </Link>

          <nav aria-label={messages.accessibility.primaryNavigation} className="hidden items-center gap-1 lg:flex">
            {navItems.map(([key, href]) => (
              <Link key={href} href={href} className="flex min-h-11 items-center rounded px-3 text-sm font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                {messages.nav[key]}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block"><SearchBox compact placeholder={messages.search.placeholder} /></div>

          <details className="relative lg:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded hover:bg-white/10" aria-label={messages.accessibility.mobileNavigation}>
              <span className="material-symbols-outlined" aria-hidden="true">menu</span>
            </summary>
            <nav aria-label={messages.accessibility.mobileNavigation} className="absolute right-0 z-30 mt-2 w-64 rounded border border-slate-200 bg-white p-2 text-slate-900 shadow-lg">
              {navItems.map(([key, href]) => (
                <Link key={href} href={href} className="flex min-h-11 items-center rounded px-3 text-sm font-semibold hover:bg-slate-100">
                  {messages.nav[key]}
                </Link>
              ))}
              <form action="/search" method="GET" className="mt-2 border-t border-slate-200 pt-2 sm:hidden">
                <label className="sr-only" htmlFor="mobile-search">{messages.accessibility.searchLabel}</label>
                <input id="mobile-search" name="q" type="search" placeholder={messages.search.placeholder} className="h-11 w-full rounded border border-slate-300 px-3 text-sm" />
              </form>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
