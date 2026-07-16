import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  nameHindi: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
})

const optionalDate = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date')
  .optional()
  .nullable()

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  titleHindi: z.string().optional().nullable(),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().optional().nullable(),
  excerptHindi: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  contentHindi: z.string().optional().nullable(),
  categoryId: z.string().min(1, 'Category is required'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  badgeText: z.string().optional().nullable(),
  badgeType: z.enum(['NEW', 'HOT', 'LAST_DATE', 'RESULT', 'UPDATE']).optional().nullable(),
  organization: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  qualification: z.string().optional().nullable(),
  totalPosts: z.number().int().optional().nullable(),
  applicationStartDate: optionalDate,
  applicationEndDate: optionalDate,
  examDate: optionalDate,
  resultDate: optionalDate,
  officialWebsite: z.string().optional().nullable(),
  applyLink: z.string().optional().nullable(),
  notificationLink: z.string().optional().nullable(),
  admitCardLink: z.string().optional().nullable(),
  answerKeyLink: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isBreaking: z.boolean().default(false),
})

export const statePageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  nameHindi: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const siteSettingSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().optional().nullable(),
  valueHindi: z.string().optional().nullable(),
  group: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type PostInput = z.infer<typeof postSchema>
export type StatePageInput = z.infer<typeof statePageSchema>
export type SiteSettingInput = z.infer<typeof siteSettingSchema>
