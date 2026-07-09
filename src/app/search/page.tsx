import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'

export const revalidate = 60

export const metadata = genMeta({ title: 'Search Jobs', canonical: '/search' })

interface PageProps { searchParams: { q?: string; page?: string } }

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || ''
  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 20
  const skip = (page - 1) * limit

  let posts: any[] = []
  let total = 0
  let totalPages = 0

  if (query) {
    const where = {
      status: 'PUBLISHED' as const,
      OR: [
        { title: { contains: query } },
        { titleHindi: { contains: query } },
        { excerpt: { contains: query } },
        { organization: { contains: query } },
      ],
    }

    const [results, count] = await Promise.all([
      prisma.postItem.findMany({
        where,
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.postItem.count({ where }),
    ])

    posts = results
    total = count
    totalPages = Math.ceil(total / limit)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-tertiary text-white h-12 flex items-center">
        <div className="max-w-container mx-auto px-3 md:px-6 w-full flex items-center">
          <Link href="/" className="font-bold mr-4">SarkariJob</Link>
          <form action="/search" method="GET" className="flex-1 max-w-md" role="search">
            <div className="flex">
              <input type="text" name="q" defaultValue={query} placeholder="Search jobs..." aria-label="Search" className="flex-1 px-3 py-1.5 text-sm text-black rounded-l focus:outline-none" />
              <button type="submit" className="bg-primary text-white px-4 py-1.5 text-sm rounded-r hover:bg-primary-container">Search</button>
            </div>
          </form>
        </div>
      </header>

      <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-4">
        <h1 className="text-headline-lg mb-4">Search Results{query ? `: "${query}"` : ''}</h1>

        {!query && (
          <p className="text-gray-400 text-center py-8">Enter a search term to find jobs, results, admit cards, etc.</p>
        )}

        {query && posts.length === 0 && (
          <p className="text-gray-400 text-center py-8">No results found for &ldquo;{query}&rdquo;. Try a different search term.</p>
        )}

        <div className="space-y-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="block bg-white rounded shadow-sm border border-border-subtle px-4 py-3 hover:bg-background-alt">
              <p className="text-body-sm text-secondary">{post.title}</p>
              <div className="flex gap-3 mt-1 text-label-md text-gray-400">
                <span>{post.category.name}</span>
                {post.organization && <span>{post.organization}</span>}
                <span>{post.publishedAt ? formatDate(post.publishedAt) : ''}</span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Search pagination" className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`/search?q=${query}&page=${p}`} className={`px-3 py-1.5 rounded text-sm ${p === page ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</Link>
            ))}
          </nav>
        )}
      </main>
    </div>
  )
}
