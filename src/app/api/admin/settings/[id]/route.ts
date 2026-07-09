import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const setting = await prisma.siteSetting.update({ where: { id: params.id }, data: body })
    return NextResponse.json(setting)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 400 })
  }
}
