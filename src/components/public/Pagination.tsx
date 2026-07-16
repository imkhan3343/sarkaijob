import Link from 'next/link'
export function Pagination({ page, totalPages, basePath, searchParams = {} }: { page: number; totalPages: number; basePath: string; searchParams?: Record<string, string | undefined> }) {
  if (totalPages <= 1) return null
  const href = (nextPage: number) => { const params = new URLSearchParams(); Object.entries(searchParams).forEach(([key, value]) => { if (value && key !== 'page') params.set(key, value) }); params.set('page', String(nextPage)); return `${basePath}?${params.toString()}` }
  return <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-3">{page > 1 ? <Link href={href(page - 1)} className="flex min-h-11 items-center rounded border bg-white px-4 text-sm font-semibold hover:bg-slate-50">पिछला</Link> : <span className="min-h-11 px-4" />}<span className="text-center text-sm text-slate-600">पेज {page} / {totalPages}</span>{page < totalPages ? <Link href={href(page + 1)} className="flex min-h-11 items-center rounded border bg-white px-4 text-sm font-semibold hover:bg-slate-50">अगला</Link> : <span className="min-h-11 px-4" />}</nav>
}
