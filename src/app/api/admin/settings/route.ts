import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { siteSettingSchema } from '@/lib/validations'
import { invalidatePublicShell } from '@/lib/cache-invalidation'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } })
  return NextResponse.json(settings)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = siteSettingSchema.parse(body)
    const setting = await prisma.siteSetting.create({ data })
    invalidatePublicShell()
    return NextResponse.json(setting, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create setting' }, { status: 400 })
  }
}
