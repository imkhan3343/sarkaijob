import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { parsePostData } from '@/lib/post-data'
import { invalidatePostContent } from '@/lib/cache-invalidation'

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
    const data: any = parsePostData(body, true)
    const existing = await prisma.postItem.findUnique({
      where: { id: params.id },
      select: { status: true },
    })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED') {
      data.publishedAt = new Date()
    }

    const post = await prisma.postItem.update({
      where: { id: params.id },
      data,
    })
    invalidatePostContent(post.slug)
    return NextResponse.json(post)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 400 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.postItem.delete({ where: { id: params.id } })
    invalidatePostContent()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Post not found or could not be deleted' }, { status: 404 })
  }
}
