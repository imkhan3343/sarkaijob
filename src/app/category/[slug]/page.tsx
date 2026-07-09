import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo/json-ld'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 120

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { slug: true },
  })
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = await prisma.category.findUnique({ where: { slug: params.slug } })
  if (!cat) return {}
  return genMeta({
    title: `${cat.nameHindi || cat.name} - SarkariJob`,
    description: `Latest ${cat.name} - government jobs, results, admit cards, answer keys.`,
    canonical: `/category/${params.slug}`,
  })
}

interface PageProps {
  params: { slug: string }
  searchParams: { state?: string; qualification?: string; org?: string; sort?: string; page?: string }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug, isActive: true },
  })

  if (!category) notFound()

  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 20
  const skip = (page - 1) * limit

  const where: any = { categoryId: category.id, status: 'PUBLISHED' }
  if (searchParams.state) where.state = searchParams.state
  if (searchParams.qualification) where.qualification = { contains: searchParams.qualification }
  if (searchParams.org) where.organization = { contains: searchParams.org }

  const orderBy: any = { publishedAt: 'desc' }
  if (searchParams.sort === 'oldest') orderBy.publishedAt = 'asc'
  if (searchParams.sort === 'views') orderBy.viewCount = 'desc'
  if (searchParams.sort === 'last-date') orderBy.applicationEndDate = 'asc'

  const [posts, total, states, allOrgs] = await Promise.all([
    prisma.postItem.findMany({
      where,
      include: { category: { select: { name: true, slug: true, nameHindi: true } } },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.postItem.count({ where }),
    prisma.postItem.findMany({
      where: { categoryId: category.id, status: 'PUBLISHED' },
      select: { state: true },
      distinct: ['state'],
    }),
    prisma.postItem.findMany({
      where: { categoryId: category.id, status: 'PUBLISHED' },
      select: { organization: true },
      distinct: ['organization'],
    }),
  ])

  const totalPages = Math.ceil(total / limit)
  const availableStates = [...new Set(states.map((s) => s.state).filter(Boolean))] as string[]
  const availableOrgs = [...new Set(allOrgs.map((o) => o.organization).filter(Boolean))] as string[]

  const breadcrumbItems = [{ label: category.nameHindi || category.name }]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: category.nameHindi || category.name, url: `/category/${category.slug}` },
      ])} />
      <JsonLd data={itemListJsonLd(posts.map((p) => ({
        title: p.title,
        url: `/post/${p.slug}`,
        date: p.publishedAt?.toISOString(),
      })))} />

      <div className="min-h-screen bg-background">
        <header className="bg-tertiary text-white h-12 flex items-center">
          <div className="max-w-container mx-auto px-3 md:px-6 w-full">
            <Link href="/" className="font-bold">SarkariJob</Link>
          </div>
        </header>

        <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-4">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="text-headline-lg md:text-display-lg mb-4">
            {category.nameHindi || category.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <Link href={`/category/${category.slug}`} className={`px-3 py-1 rounded text-sm ${!searchParams.state && !searchParams.sort ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All</Link>
            {availableStates.map((st) => (
              <Link key={st} href={`/category/${category.slug}?state=${st}`} className={`px-3 py-1 rounded text-sm ${searchParams.state === st ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{st}</Link>
            ))}
          </div>

          <div className="flex gap-2 mb-4 text-sm">
            <Link href={`/category/${category.slug}?sort=latest`} className={`px-3 py-1 rounded ${searchParams.sort === 'latest' || !searchParams.sort ? 'bg-gray-200 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Latest</Link>
            <Link href={`/category/${category.slug}?sort=oldest`} className={`px-3 py-1 rounded ${searchParams.sort === 'oldest' ? 'bg-gray-200 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Oldest</Link>
            <Link href={`/category/${category.slug}?sort=views`} className={`px-3 py-1 rounded ${searchParams.sort === 'views' ? 'bg-gray-200 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Most Viewed</Link>
            <Link href={`/category/${category.slug}?sort=last-date`} className={`px-3 py-1 rounded ${searchParams.sort === 'last-date' ? 'bg-gray-200 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>Last Date</Link>
          </div>

          <div className="space-y-2 mb-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="block bg-white rounded shadow-sm border border-border-subtle px-4 py-3 hover:bg-background-alt transition-colors">
                <div className="flex items-start gap-2">
                  {post.badgeType && (
                    <span className={`shrink-0 px-1.5 py-0.5 rounded text-label-bold ${post.badgeType === 'NEW' ? 'bg-error text-white' : post.badgeType === 'RESULT' ? 'bg-success-green text-white' : 'bg-amber-600 text-white'}`}>
                      {post.badgeText || post.badgeType}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-secondary line-clamp-2">{post.title}</p>
                    <div className="flex gap-3 mt-1 text-label-md text-gray-400">
                      {post.organization && <span>{post.organization}</span>}
                      {post.applicationEndDate && <span>Last Date: {formatDate(post.applicationEndDate)}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex justify-center gap-2">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/category/${category.slug}?page=${p}${searchParams.state ? `&state=${searchParams.state}` : ''}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
                  className={`px-3 py-1.5 rounded text-sm ${p === page ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {p}
                </Link>
              ))}
            </nav>
          )}
        </main>
      </div>
    </>
  )
}
