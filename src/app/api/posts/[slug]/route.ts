import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const post = await prisma.postItem.findUnique({
    where: { slug: params.slug },
    include: { category: { select: { name: true, slug: true } } },
  })

  if (!post || post.status !== 'PUBLISHED') {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: post })
}
