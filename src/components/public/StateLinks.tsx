import Link from 'next/link'
import type { HomepageState } from '@/lib/homepage'
import type { Messages } from '@/lib/i18n'

export function StateLinks({ states, messages }: { states: HomepageState[]; messages: Messages }) {
  return (
    <section aria-labelledby="states-heading" className="mb-6 rounded border border-border-subtle bg-white p-4 shadow-sm">
      <h2 id="states-heading" className="text-lg font-extrabold text-slate-900">{messages.sections.states}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {states.map((state) => (
          <Link key={state.id} href={`/state/${state.slug}`} className="flex min-h-11 items-center rounded border border-slate-300 px-3 text-sm font-medium text-secondary hover:border-secondary hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">
            {state.nameHindi || state.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
