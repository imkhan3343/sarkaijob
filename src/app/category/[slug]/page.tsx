import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { FilterBar } from '@/components/public/FilterBar'
import JsonLd from '@/components/JsonLd'
import { Pagination } from '@/components/public/Pagination'
import { PostResultList } from '@/components/public/PostResultList'
import { PublicPage } from '@/components/public/PublicPage'
import { getCategoryListing, type ListingSearchParams } from '@/lib/listing'
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from '@/lib/structured-data'

export const revalidate = 120

type PageProps = { params: { slug: string }; searchParams: ListingSearchParams }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await prisma.category.findFirst({ where: { slug: params.slug, isActive: true } })
  if (!category) return {}
  const title = category.nameHindi || category.name
  return {
    title, description: `${title} से जुड़ी नवीनतम सरकारी अपडेट, आवेदन तिथि और आधिकारिक लिंक।`,
    alternates: { canonical: `/category/${category.slug}`, languages: { 'hi-IN': `/category/${category.slug}`, en: `/category/${category.slug}?lang=en` } },
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const data = await getCategoryListing(params.slug, searchParams)
  const title = data.category.nameHindi || data.category.name
  const breadcrumbs = [{ name: 'होम', href: '/' }, { name: title, href: `/category/${data.category.slug}` }]

  return (
    <PublicPage width="max-w-5xl">
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={buildItemListJsonLd(title, data.posts)} />
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="text-3xl font-black text-slate-950">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{data.total} अपडेट मिले</p>
      <div className="mt-6">
        <FilterBar params={searchParams} states={data.availableStates} organizations={data.availableOrganizations} />
        <PostResultList posts={data.posts} />
        <Pagination page={data.page} totalPages={data.totalPages} basePath={`/category/${data.category.slug}`} searchParams={searchParams} />
      </div>
    </PublicPage>
  )
}
