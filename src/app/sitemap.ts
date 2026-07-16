import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, states] = await Promise.all([
    prisma.postItem.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true }, take: 50000 }),
    prisma.category.findMany({ where: { isActive: true }, select: { slug: true } }),
    prisma.statePage.findMany({ where: { isActive: true }, select: { slug: true } }),
  ])
  const now = new Date()
  const staticPaths = ['', '/search', '/syllabus', '/calendar', '/tools', '/yojana', '/scholarship', '/notice', '/about', '/contact', '/privacy', '/disclaimer', '/terms', '/faq']
  return [
    ...staticPaths.map((path, index) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: (index === 0 ? 'hourly' : 'weekly') as 'hourly' | 'weekly', priority: index === 0 ? 1 : 0.5 })),
    ...posts.map((post) => ({ url: `${SITE_URL}/post/${post.slug}`, lastModified: post.updatedAt, changeFrequency: 'daily' as const, priority: 0.8 })),
    ...categories.map((category) => ({ url: `${SITE_URL}/category/${category.slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.7 })),
    ...states.map((state) => ({ url: `${SITE_URL}/state/${state.slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.7 })),
  ]
}
