import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { statePageSchema } from '@/lib/validations'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const states = await prisma.statePage.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json(states)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = statePageSchema.parse(body)
    const state = await prisma.statePage.create({ data })
    return NextResponse.json(state)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create state' }, { status: 400 })
  }
}
