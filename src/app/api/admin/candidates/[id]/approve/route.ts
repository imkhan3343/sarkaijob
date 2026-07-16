import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { invalidatePostContent } from '@/lib/cache-invalidation'

function generateSlug(title: string, id: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'update'
  const suffix = crypto.createHash('md5').update(id).digest('hex').slice(0, 8)
  return `${base}-${suffix}`
}

export async function POST(_r: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const candidate = await prisma.scrapeCandidate.findUnique({
    where: { id: params.id },
    include: { rawEntry: true },
  })
  if (!candidate) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (candidate.reviewStatus !== 'PENDING') return NextResponse.json({ error: 'Already reviewed' }, { status: 409 })

  const categorySlug = (candidate.extractedCategory || 'latest-job')
    .replace('latest-jobs', 'latest-job')
    .replace('admit-cards', 'admit-card')
  const category = await prisma.category.findFirst({ where: { slug: categorySlug, isActive: true } })
    ?? await prisma.category.findFirst({ where: { slug: 'latest-job' } })
  if (!category) return NextResponse.json({ error: 'Category missing' }, { status: 400 })

  const title = candidate.normalizedTitle || candidate.rawEntry.rawTitle
  const slug = generateSlug(title, candidate.id)

  const post = await prisma.postItem.create({
    data: {
      title,
      slug,
      content: candidate.normalizedContent,
      categoryId: category.id,
      status: 'PUBLISHED',
      organization: candidate.extractedOrg,
      state: candidate.extractedState,
      qualification: candidate.extractedQualification,
      totalPosts: candidate.extractedTotalPosts,
      applicationStartDate: candidate.extractedStartDate,
      applicationEndDate: candidate.extractedEndDate,
      examDate: candidate.extractedExamDate,
      resultDate: candidate.extractedResultDate,
      applyLink: candidate.extractedApplyLink,
      notificationLink: candidate.extractedNotifyLink,
      admitCardLink: candidate.extractedAdmitLink,
      answerKeyLink: candidate.extractedAnswerLink,
      officialWebsite: candidate.extractedWebsite,
      publishedAt: new Date(),
    },
  })

  await prisma.scrapeCandidate.update({
    where: { id: candidate.id },
    data: {
      reviewStatus: 'APPROVED',
      postId: post.id,
      reviewedAt: new Date(),
      reviewedBy: session.user?.email || 'admin',
    },
  })

  await prisma.contentAuditLog.create({
    data: {
      action: 'APPROVE_CANDIDATE',
      entityType: 'ScrapeCandidate',
      entityId: candidate.id,
      after: JSON.stringify({ postId: post.id }),
    },
  })

  invalidatePostContent(post.slug, category.slug)

  return NextResponse.json({ post })
}
