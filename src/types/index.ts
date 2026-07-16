export interface AdminSession {
  id: string
  email: string
  name: string | null
  role: string
}

export interface HomePageData {
  categories: (CategoryWithPosts & { primaryLink?: string })[]
  featuredPosts: PostItemWithCategory[]
  breakingPosts: PostItemWithCategory[]
  states: StatePage[]
  settings: Record<string, string>
}

export interface CategoryWithPosts {
  id: string
  name: string
  slug: string
  nameHindi: string | null
  description: string | null
  icon: string | null
  sortOrder: number
  posts: PostItemWithCategory[]
}

export interface PostItemWithCategory {
  id: string
  title: string
  titleHindi: string | null
  slug: string
  excerpt: string | null
  categoryId: string
  category: { name: string; slug: string; nameHindi: string | null }
  badgeText: string | null
  badgeType: string | null
  organization: string | null
  state: string | null
  status: string
  isFeatured: boolean
  isBreaking: boolean
  viewCount: number
  createdAt: Date
  publishedAt: Date | null
  applicationEndDate: Date | null
  resultDate: Date | null
  admitCardLink: string | null
  applyLink: string | null
  answerKeyLink: string | null
  notificationLink: string | null
}

export interface StatePage {
  id: string
  name: string
  slug: string
  nameHindi: string | null
  description: string | null
  sortOrder: number
}
