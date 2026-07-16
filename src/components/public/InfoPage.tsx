import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { PublicPage } from '@/components/public/PublicPage'

export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PublicPage width="max-w-4xl">
      <Breadcrumbs items={[{ name: 'होम', href: '/' }, { name: title, href: '#' }]} />
      <h1 className="text-3xl font-black text-slate-950">{title}</h1>
      <div className="mt-5 space-y-4 rounded border border-border-subtle bg-white p-5 text-base leading-7 text-slate-700 shadow-sm md:p-7">{children}</div>
    </PublicPage>
  )
}
