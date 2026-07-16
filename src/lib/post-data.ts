import { postSchema } from './validations'

const nullableStringFields = [
  'titleHindi',
  'excerpt',
  'excerptHindi',
  'content',
  'contentHindi',
  'badgeText',
  'badgeType',
  'organization',
  'state',
  'qualification',
  'applicationStartDate',
  'applicationEndDate',
  'examDate',
  'resultDate',
  'officialWebsite',
  'applyLink',
  'notificationLink',
  'admitCardLink',
  'answerKeyLink',
  'seoTitle',
  'seoDescription',
  'seoKeywords',
] as const

const dateFields = [
  'applicationStartDate',
  'applicationEndDate',
  'examDate',
  'resultDate',
] as const

/** Normalize form JSON and return data safe to pass to Prisma. */
export function parsePostData(input: unknown, partial = false): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Invalid post payload')
  }

  const normalized: Record<string, unknown> = { ...(input as Record<string, unknown>) }

  for (const field of nullableStringFields) {
    if (normalized[field] === '') normalized[field] = null
  }

  if (normalized.totalPosts === '' || normalized.totalPosts === undefined) {
    if (!partial || normalized.totalPosts === '') normalized.totalPosts = null
  } else if (normalized.totalPosts !== null) {
    normalized.totalPosts = Number(normalized.totalPosts)
  }

  const schema = partial ? postSchema.partial() : postSchema
  const parsed = schema.parse(normalized) as Record<string, unknown>
  const data: Record<string, unknown> = { ...parsed }

  for (const field of dateFields) {
    if (!(field in data)) continue
    const value = data[field]
    data[field] = typeof value === 'string' ? new Date(`${value}T00:00:00.000Z`) : null
  }

  return data
}
