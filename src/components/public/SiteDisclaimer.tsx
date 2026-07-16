import type { Messages } from '@/lib/i18n'

export function SiteDisclaimer({ text, messages }: { text: string; messages: Messages }) {
  return (
    <aside aria-labelledby="site-disclaimer-heading" className="mb-6 rounded border border-amber-300 bg-amber-50 p-4 text-amber-950">
      <h2 id="site-disclaimer-heading" className="font-extrabold">{messages.sections.disclaimer}</h2>
      <p className="mt-1 text-sm leading-6">{text}</p>
    </aside>
  )
}
