import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { PublicPage } from '@/components/public/PublicPage'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
export const revalidate = 300
export const metadata: Metadata = { title: 'सरकारी परीक्षा कैलेंडर', description: 'आगामी सरकारी परीक्षा, आवेदन और रिजल्ट तिथियां।', alternates: { canonical: '/calendar' } }
export default async function Page() {
  const events = await prisma.examEvent.findMany({ where: { isActive: true }, orderBy: [{ examDate: 'asc' }, { applyEnd: 'asc' }], take: 100 })
  return <PublicPage width="max-w-5xl"><Breadcrumbs items={[{ name: 'होम', href: '/' }, { name: 'परीक्षा कैलेंडर', href: '/calendar' }]} /><h1 className="text-3xl font-black">सरकारी परीक्षा कैलेंडर</h1><p className="mt-2 text-slate-600">आगामी आवेदन, परीक्षा और रिजल्ट तिथियां।</p><div className="mt-6 overflow-x-auto rounded border bg-white"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-tertiary text-white"><tr><th className="p-3">परीक्षा</th><th className="p-3">संगठन</th><th className="p-3">आवेदन अंतिम तिथि</th><th className="p-3">परीक्षा तिथि</th><th className="p-3">रिजल्ट</th></tr></thead><tbody>{events.map((event) => <tr key={event.id} className="border-t"><td className="p-3 font-semibold">{event.title}</td><td className="p-3">{event.organization || '—'}</td><td className="p-3">{event.applyEnd ? formatDate(event.applyEnd) : '—'}</td><td className="p-3">{event.examDate ? formatDate(event.examDate) : '—'}</td><td className="p-3">{event.resultDate ? formatDate(event.resultDate) : '—'}</td></tr>)}</tbody></table>{!events.length ? <p className="p-5 text-sm text-slate-500">अभी कोई परीक्षा इवेंट उपलब्ध नहीं है।</p> : null}</div></PublicPage>
}
