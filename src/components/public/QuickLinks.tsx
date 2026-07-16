import Link from 'next/link'
import type { Messages } from '@/lib/i18n'

export function QuickLinks({ messages }: { messages: Messages }) {
  const cards = [
    { title: messages.quickLinks.tenth, href: '/search?q=10th', color: 'bg-primary' },
    { title: messages.quickLinks.twelfth, href: '/search?q=12th', color: 'bg-primary-container' },
    { title: messages.quickLinks.graduate, href: '/search?q=graduate', color: 'bg-tertiary' },
    { title: messages.quickLinks.allIndia, href: '/state/all-india', color: 'bg-secondary' },
  ]

  return (
    <section aria-label={messages.accessibility.quickLinks} className="mx-auto max-w-container px-3 py-4 md:px-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={`${card.color} min-h-28 rounded-lg p-4 text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary motion-reduce:transform-none md:p-5`}>
            <h2 className="text-base font-extrabold leading-snug md:text-lg">{card.title}</h2>
            <p className="mt-2 text-sm text-white/80">{messages.quickLinks.action} →</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
