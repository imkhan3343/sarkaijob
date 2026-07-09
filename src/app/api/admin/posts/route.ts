import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const categoryId = searchParams.get('categoryId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const skip = (page - 1) * limit

  const where: any = {}
  if (status) where.status = status
  if (categoryId) where.categoryId = categoryId

  const [posts, total] = await Promise.all([
    prisma.postItem.findMany({
      where,
      include: { category: { select: { name: true, slug: true, nameHindi: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.postItem.count({ where }),
  ])

  return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data: any = { ...body }

    if (data.applicationStartDate) data.applicationStartDate = new Date(data.applicationStartDate)
    if (data.applicationEndDate) data.applicationEndDate = new Date(data.applicationEndDate)
    if (data.examDate) data.examDate = new Date(data.examDate)
    if (data.resultDate) data.resultDate = new Date(data.resultDate)
    if (data.status === 'PUBLISHED') data.publishedAt = new Date()
    if (data.totalPosts) data.totalPosts = Number(data.totalPosts)

    const post = await prisma.postItem.create({ data })
    return NextResponse.json(post)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 400 })
  }
}
