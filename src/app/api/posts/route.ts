import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const parsedPage = Number.parseInt(searchParams.get('page') || '1', 10)
  const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1
  const category = searchParams.get('category')
  const state = searchParams.get('state')

  const where: any = { status: 'PUBLISHED' }
  if (category) where.category = { slug: category }
  if (state) where.state = state

  const [posts, total] = await Promise.all([
    prisma.postItem.findMany({
      where,
      select: {
        id: true, title: true, slug: true, excerpt: true, organization: true,
        state: true, totalPosts: true, applicationEndDate: true,
        publishedAt: true, viewCount: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * 20,
      take: 20,
    }),
    prisma.postItem.count({ where }),
  ])

  return NextResponse.json({
    success: true,
    data: posts,
    pagination: { page, total, totalPages: Math.ceil(total / 20) },
  })
}
