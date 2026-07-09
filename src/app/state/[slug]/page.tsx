import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'
import { breadcrumbJsonLd } from '@/lib/seo/json-ld'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 300

export async function generateStaticParams() {
  const states = await prisma.statePage.findMany({ where: { isActive: true }, select: { slug: true } })
  return states.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const state = await prisma.statePage.findUnique({ where: { slug: params.slug } })
  if (!state) return {}
  return genMeta({
    title: `${state.nameHindi || state.name} Government Jobs - SarkariJob`,
    description: `Latest government jobs, results, admit cards in ${state.name}.`,
    canonical: `/state/${params.slug}`,
  })
}

interface PageProps { params: { slug: string }; searchParams: { cat?: string } }

export default async function StatePage({ params, searchParams }: PageProps) {
  const state = await prisma.statePage.findUnique({ where: { slug: params.slug, isActive: true } })
  if (!state) notFound()

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true, nameHindi: true },
    orderBy: { sortOrder: 'asc' },
  })

  const activeCat = searchParams.cat || categories[0]?.slug

  const where: any = { state: state.name, status: 'PUBLISHED' }
  if (activeCat) {
    const cat = categories.find((c) => c.slug === activeCat)
    if (cat) where.categoryId = cat.id
  }

  const posts = await prisma.postItem.findMany({
    where,
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: state.nameHindi || state.name, url: `/state/${state.slug}` },
      ])} />

      <div className="min-h-screen bg-background">
        <header className="bg-tertiary text-white h-12 flex items-center">
          <div className="max-w-container mx-auto px-3 md:px-6 w-full">
            <Link href="/" className="font-bold">SarkariJob</Link>
          </div>
        </header>

        <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-4">
          <Breadcrumbs items={[{ label: state.nameHindi || state.name }]} />

          <h1 className="text-headline-lg md:text-display-lg mb-4">
            {state.nameHindi || state.name} - Government Jobs
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/state/${state.slug}?cat=${cat.slug}`} className={`px-3 py-1 rounded text-sm ${activeCat === cat.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat.nameHindi || cat.name}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="block bg-white rounded shadow-sm border border-border-subtle px-4 py-3 hover:bg-background-alt">
                <p className="text-body-sm text-secondary">{post.title}</p>
                {post.applicationEndDate && <p className="text-label-md text-gray-400 mt-1">Last Date: {formatDate(post.applicationEndDate)}</p>}
              </Link>
            ))}
            {posts.length === 0 && <p className="text-gray-400 text-center py-8">No posts found for this state.</p>}
          </div>
        </main>
      </div>
    </>
  )
}
