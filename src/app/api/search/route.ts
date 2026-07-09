import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = 20

  if (!query || query.length < 2) {
    return NextResponse.json({ posts: [], total: 0 })
  }

  const where = {
    status: 'PUBLISHED' as const,
    OR: [
      { title: { contains: query } },
      { titleHindi: { contains: query } },
      { excerpt: { contains: query } },
      { excerptHindi: { contains: query } },
      { organization: { contains: query } },
    ],
  }

  const [posts, total] = await Promise.all([
    prisma.postItem.findMany({
      where,
      select: {
        id: true, title: true, titleHindi: true, slug: true,
        excerpt: true, organization: true, publishedAt: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.postItem.count({ where }),
  ])

  return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) })
}
