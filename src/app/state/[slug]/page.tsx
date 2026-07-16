import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { FilterBar } from '@/components/public/FilterBar'
import JsonLd from '@/components/JsonLd'
import { Pagination } from '@/components/public/Pagination'
import { PostResultList } from '@/components/public/PostResultList'
import { PublicPage } from '@/components/public/PublicPage'
import { getStateListing, type ListingSearchParams } from '@/lib/listing'
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from '@/lib/structured-data'

export const revalidate = 300

type PageProps = { params: { slug: string }; searchParams: ListingSearchParams }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const state = await prisma.statePage.findFirst({ where: { slug: params.slug, isActive: true } })
  if (!state) return {}
  const name = state.nameHindi || state.name
  return { title: `${name} सरकारी नौकरी`, description: `${name} की नवीनतम सरकारी नौकरी, रिजल्ट और एडमिट कार्ड अपडेट।`, alternates: { canonical: `/state/${state.slug}` } }
}

export default async function StatePage({ params, searchParams }: PageProps) {
  const data = await getStateListing(params.slug, searchParams)
  const name = data.state.nameHindi || data.state.name
  const breadcrumbs = [{ name: 'होम', href: '/' }, { name, href: `/state/${data.state.slug}` }]

  return (
    <PublicPage width="max-w-5xl">
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={buildItemListJsonLd(`${name} Updates`, data.posts)} />
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="text-3xl font-black text-slate-950">{name} सरकारी नौकरी</h1>
      <p className="mt-2 text-sm text-slate-600">{data.total} अपडेट मिले</p>

      <section aria-label="State statistics" className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded border bg-white p-4"><p className="text-sm text-slate-500">कुल अपडेट</p><p className="mt-1 text-2xl font-black">{data.total}</p></div>
        <div className="rounded border bg-white p-4"><p className="text-sm text-slate-500">सक्रिय श्रेणियां</p><p className="mt-1 text-2xl font-black">{data.stats.length}</p></div>
      </section>

      <FilterBar params={searchParams} showCategory categories={data.categories} />
      <PostResultList posts={data.posts} />
      <Pagination page={data.page} totalPages={data.totalPages} basePath={`/state/${data.state.slug}`} searchParams={searchParams} />
    </PublicPage>
  )
}
