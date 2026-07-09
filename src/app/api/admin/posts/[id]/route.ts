import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.postItem.findUnique({
    where: { id: params.id },
    include: { category: true },
  })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data: any = { ...body }

    if (data.applicationStartDate) data.applicationStartDate = new Date(data.applicationStartDate)
    if (data.applicationEndDate) data.applicationEndDate = new Date(data.applicationEndDate)
    if (data.examDate) data.examDate = new Date(data.examDate)
    if (data.resultDate) data.resultDate = new Date(data.resultDate)
    if (data.totalPosts) data.totalPosts = Number(data.totalPosts)

    if (data.status === 'PUBLISHED' && !data.publishedAt) {
      data.publishedAt = new Date()
    }

    delete data.id
    delete data.category

    const post = await prisma.postItem.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(post)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 400 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.postItem.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
