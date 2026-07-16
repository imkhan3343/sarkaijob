import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { Pagination } from '@/components/public/Pagination'
import { PostResultList } from '@/components/public/PostResultList'
import { PublicPage } from '@/components/public/PublicPage'
import { SearchBox } from '@/components/public/SearchBox'
import { searchPosts } from '@/lib/search'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'सरकारी नौकरी खोजें',
  description: 'सरकारी नौकरी, रिजल्ट, एडमिट कार्ड और उत्तर कुंजी खोजें।',
  alternates: { canonical: '/search' },
}

type PageProps = { searchParams: { q?: string; page?: string } }

export default async function SearchPage({ searchParams }: PageProps) {
  const q = (searchParams.q || '').trim()
  const parsed = Number.parseInt(searchParams.page || '1', 10)
  const page = Number.isFinite(parsed) ? Math.max(parsed, 1) : 1
  const data = await searchPosts(q, page)

  return (
    <PublicPage width="max-w-5xl">
      <Breadcrumbs items={[{ name: 'होम', href: '/' }, { name: 'खोज', href: '/search' }]} />
      <h1 className="text-3xl font-black">सरकारी नौकरी खोजें</h1>
      <div className="mt-6"><SearchBox defaultValue={q} placeholder="नौकरी, रिजल्ट, संगठन या योग्यता..." /></div>
      <div className="mt-3 flex flex-wrap gap-2 text-sm"><span className="text-slate-500">लोकप्रिय खोज:</span>{['SSC', 'Railway', 'UP Police', '10th Pass'].map((term) => <a key={term} href={`/search?q=${encodeURIComponent(term)}`} className="text-secondary hover:underline">{term}</a>)}</div>
      {q ? <p className="my-5 text-sm text-slate-600">“{q}” के लिए {data.total} परिणाम</p> : <p className="my-5 text-sm text-slate-600">कम से कम 2 अक्षर लिखकर खोजें।</p>}
      <PostResultList posts={data.posts} query={q} />
      <Pagination page={data.page} totalPages={data.totalPages} basePath="/search" searchParams={{ q }} />
    </PublicPage>
  )
}
