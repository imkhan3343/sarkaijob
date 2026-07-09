import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  const posts = await prisma.postItem.findMany({
    where: {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query } },
        { organization: { contains: query } },
      ],
    },
    select: { title: true },
    orderBy: { viewCount: 'desc' },
    take: 8,
  })

  const suggestions = Array.from(new Set(posts.map((p) => p.title)))
  return NextResponse.json({ suggestions })
}
