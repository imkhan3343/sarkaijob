import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { PublicPage } from '@/components/public/PublicPage'
export const metadata: Metadata = { title: 'सरकारी नौकरी टूल्स', description: 'सरकारी नौकरी खोज, परीक्षा कैलेंडर और दस्तावेज़ सेवाएं।', alternates: { canonical: '/tools' } }
const tools = [
  { title: 'नौकरी खोजें', description: 'पद, संगठन या योग्यता के अनुसार अपडेट खोजें।', href: '/search' },
  { title: 'परीक्षा कैलेंडर', description: 'आगामी परीक्षा और आवेदन तिथियां देखें।', href: '/calendar' },
  { title: 'दस्तावेज़ सेवाएं', description: 'PAN, Aadhaar और Voter ID जानकारी।', href: '/category/documents' },
  { title: 'राज्यवार नौकरी', description: 'अपने राज्य की सरकारी नौकरी देखें।', href: '/state/all-india' },
]
export default function Page() { return <PublicPage width="max-w-5xl"><Breadcrumbs items={[{ name: 'होम', href: '/' }, { name: 'टूल्स', href: '/tools' }]} /><h1 className="text-3xl font-black">सरकारी नौकरी टूल्स</h1><div className="mt-6 grid gap-4 sm:grid-cols-2">{tools.map((tool) => <Link key={tool.href} href={tool.href} className="rounded border border-border-subtle bg-white p-5 shadow-sm hover:border-secondary"><h2 className="text-lg font-extrabold text-secondary">{tool.title}</h2><p className="mt-2 text-sm text-slate-600">{tool.description}</p></Link>)}</div></PublicPage> }
