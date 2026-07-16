import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import { Pagination } from '@/components/public/Pagination'
import { PostResultList } from '@/components/public/PostResultList'
import { PublicPage } from '@/components/public/PublicPage'
import { getCategoryListing, type ListingSearchParams } from '@/lib/listing'

export async function CategoryHub({ slug, title, description, searchParams }: { slug: string; title: string; description: string; searchParams: ListingSearchParams }) {
  const data = await getCategoryListing(slug, searchParams)
  return (
    <PublicPage width="max-w-5xl">
      <Breadcrumbs items={[{ name: 'होम', href: '/' }, { name: title, href: `/${slug}` }]} />
      <h1 className="text-3xl font-black">{title}</h1>
      <p className="mt-2 text-slate-600">{description}</p>
      <p className="my-5 text-sm text-slate-500">{data.total} अपडेट</p>
      <PostResultList posts={data.posts} />
      <Pagination page={data.page} totalPages={data.totalPages} basePath={`/${slug}`} searchParams={searchParams} />
    </PublicPage>
  )
}
