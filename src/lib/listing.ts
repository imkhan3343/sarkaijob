import { BadgeType, Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export type ListingSearchParams = {
  state?: string
  qualification?: string
  organization?: string
  badge?: string
  from?: string
  to?: string
  sort?: string
  page?: string
  cat?: string
}

const PAGE_SIZE = 20
const BADGES = new Set(Object.values(BadgeType))

function clean(value?: string) {
  return value?.trim() || undefined
}

function validDate(value?: string) {
  if (!value) return undefined
  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export function getPagination(params: ListingSearchParams) {
  const parsed = Number.parseInt(params.page || '1', 10)
  const page = Number.isFinite(parsed) ? Math.max(parsed, 1) : 1
  return { page, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }
}

export function buildPostWhere(params: ListingSearchParams): Prisma.PostItemWhereInput {
  const where: Prisma.PostItemWhereInput = { status: 'PUBLISHED' }
  const state = clean(params.state)
  const qualification = clean(params.qualification)
  const organization = clean(params.organization)
  if (state) where.state = state
  if (qualification) where.qualification = { contains: qualification }
  if (organization) where.organization = { contains: organization }
  if (params.badge && BADGES.has(params.badge as BadgeType)) where.badgeType = params.badge as BadgeType

  const from = validDate(params.from)
  const to = validDate(params.to)
  if (from || to) where.publishedAt = { gte: from, lte: to }
  return where
}

export function buildSort(sort?: string): Prisma.PostItemOrderByWithRelationInput {
  switch (sort) {
    case 'oldest': return { publishedAt: 'asc' }
    case 'most-viewed': return { viewCount: 'desc' }
    case 'alphabetical': return { title: 'asc' }
    case 'nearest-last-date': return { applicationEndDate: 'asc' }
    default: return { publishedAt: 'desc' }
  }
}

function stableParams(params: ListingSearchParams) {
  return {
    state: clean(params.state), qualification: clean(params.qualification),
    organization: clean(params.organization), badge: clean(params.badge),
    from: clean(params.from), to: clean(params.to), sort: clean(params.sort),
    page: clean(params.page), cat: clean(params.cat),
  }
}

export async function getCategoryListing(slug: string, input: ListingSearchParams) {
  const params = stableParams(input)
  return unstable_cache(async () => {
    const category = await prisma.category.findFirst({ where: { slug, isActive: true } })
    if (!category) notFound()
    const pagination = getPagination(params)
    const where: Prisma.PostItemWhereInput = { ...buildPostWhere(params), categoryId: category.id }
    const filterWhere = { categoryId: category.id, status: 'PUBLISHED' as const }
    const [posts, total, states, organizations] = await Promise.all([
      prisma.postItem.findMany({ where, include: { category: true }, orderBy: buildSort(params.sort), skip: pagination.skip, take: pagination.take }),
      prisma.postItem.count({ where }),
      prisma.postItem.findMany({ where: filterWhere, select: { state: true }, distinct: ['state'] }),
      prisma.postItem.findMany({ where: filterWhere, select: { organization: true }, distinct: ['organization'] }),
    ])
    return {
      category, posts, total, page: pagination.page, pageSize: pagination.take,
      totalPages: Math.ceil(total / pagination.take),
      availableStates: states.map((item) => item.state).filter(Boolean) as string[],
      availableOrganizations: organizations.map((item) => item.organization).filter(Boolean) as string[],
    }
  }, ['category-listing', slug, JSON.stringify(params)], { revalidate: 120, tags: ['posts', `category-${slug}`] })()
}

export async function getStateListing(slug: string, input: ListingSearchParams) {
  const params = stableParams(input)
  return unstable_cache(async () => {
    const state = await prisma.statePage.findFirst({ where: { slug, isActive: true } })
    if (!state) notFound()
    const pagination = getPagination(params)
    const where: Prisma.PostItemWhereInput = { ...buildPostWhere(params) }
    if (slug !== 'all-india') where.state = state.name
    if (params.cat) where.category = { slug: params.cat, isActive: true }

    const [posts, total, stats, categories] = await Promise.all([
      prisma.postItem.findMany({ where, include: { category: true }, orderBy: buildSort(params.sort), skip: pagination.skip, take: pagination.take }),
      prisma.postItem.count({ where }),
      prisma.postItem.groupBy({ by: ['categoryId'], where, _count: { _all: true } }),
      prisma.category.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
    ])
    return { state, posts, total, stats, categories, page: pagination.page, pageSize: pagination.take, totalPages: Math.ceil(total / pagination.take) }
  }, ['state-listing', slug, JSON.stringify(params)], { revalidate: 300, tags: ['posts', `state-${slug}`] })()
}
