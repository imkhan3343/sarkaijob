import { prisma } from '@/lib/prisma'

const POST_SELECT = {
  id: true,
  title: true,
  titleHindi: true,
  slug: true,
  excerpt: true,
  excerptHindi: true,
  badgeText: true,
  badgeType: true,
  organization: true,
  state: true,
  applicationEndDate: true,
  publishedAt: true,
  category: {
    select: {
      name: true,
      nameHindi: true,
      slug: true,
    },
  },
} as const

function getPostsByCategory(categorySlug: string, take = 12) {
  return prisma.postItem.findMany({
    where: {
      status: 'PUBLISHED',
      category: { slug: categorySlug, isActive: true },
    },
    select: POST_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    take,
  })
}

export async function getHomepageData() {
  const [
    categories,
    featured,
    breaking,
    results,
    admitCards,
    latestJobs,
    answerKeys,
    syllabus,
    documents,
    admission,
    states,
    settingsList,
  ] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    }),
    prisma.postItem.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      select: POST_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 8,
    }),
    prisma.postItem.findMany({
      where: { status: 'PUBLISHED', isBreaking: true },
      select: POST_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 10,
    }),
    getPostsByCategory('results'),
    getPostsByCategory('admit-card'),
    getPostsByCategory('latest-job'),
    getPostsByCategory('answer-key'),
    getPostsByCategory('syllabus'),
    getPostsByCategory('documents', 8),
    getPostsByCategory('admission'),
    prisma.statePage.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      take: 30,
    }),
    prisma.siteSetting.findMany(),
  ])

  const settings = Object.fromEntries(settingsList.map((setting) => [setting.key, setting]))
  const disclaimer =
    settings.footer_disclaimer?.valueHindi ||
    settings.footer_disclaimer?.value ||
    'यह वेबसाइट किसी सरकारी संस्था से संबंधित नहीं है। किसी भी कार्रवाई से पहले आधिकारिक अधिसूचना से जानकारी सत्यापित करें।'

  return {
    categories,
    featured,
    breaking,
    results,
    admitCards,
    latestJobs,
    answerKeys,
    syllabus,
    documents,
    admission,
    states,
    settings,
    disclaimer,
  }
}

export type HomepageData = Awaited<ReturnType<typeof getHomepageData>>
export type HomepagePost = HomepageData['latestJobs'][number]
export type HomepageState = HomepageData['states'][number]
