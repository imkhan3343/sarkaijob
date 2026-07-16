import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const post = await prisma.postItem.findFirst({
    where: { slug: params.slug, status: 'PUBLISHED' },
    include: { category: { select: { name: true, nameHindi: true, slug: true } } },
  })
  if (!post) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: post })
}

export async function POST(_request: Request, { params }: { params: { slug: string } }) {
  try {
    await prisma.postItem.update({ where: { slug: params.slug }, data: { viewCount: { increment: 1 } } })
    return new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
