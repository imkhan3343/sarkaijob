import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const exams = await prisma.examEvent.findMany({
    where: { isActive: true },
    orderBy: { examDate: 'asc' },
    take: 50,
  })
  return NextResponse.json({ success: true, data: exams })
}
