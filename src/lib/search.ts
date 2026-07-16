import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 20

function pageNumber(value: number) {
  return Number.isFinite(value) ? Math.max(Math.floor(value), 1) : 1
}

export async function searchPosts(query: string, requestedPage = 1) {
  const q = query.trim().slice(0, 120)
  const page = pageNumber(requestedPage)
  if (q.length < 2) return { posts: [], total: 0, page, totalPages: 0 }

  return unstable_cache(async () => {
    const where = {
      status: 'PUBLISHED' as const,
      OR: [
        { title: { contains: q } }, { titleHindi: { contains: q } },
        { excerpt: { contains: q } }, { excerptHindi: { contains: q } },
        { content: { contains: q } }, { contentHindi: { contains: q } },
        { organization: { contains: q } },
      ],
    }
    const [posts, total] = await Promise.all([
      prisma.postItem.findMany({ where, include: { category: true }, orderBy: { publishedAt: 'desc' }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
      prisma.postItem.count({ where }),
    ])
    return { posts, total, page, totalPages: Math.ceil(total / PAGE_SIZE) }
  }, ['search-posts', q, String(page)], { revalidate: 60, tags: ['posts', 'search'] })()
}

export async function autocompletePosts(query: string) {
  const q = query.trim().slice(0, 80)
  if (q.length < 2) return []
  return prisma.postItem.findMany({
    where: { status: 'PUBLISHED', OR: [
      { title: { contains: q } }, { titleHindi: { contains: q } }, { organization: { contains: q } },
    ] },
    select: { title: true, titleHindi: true, slug: true, organization: true },
    orderBy: [{ viewCount: 'desc' }, { publishedAt: 'desc' }],
    take: 10,
  })
}
