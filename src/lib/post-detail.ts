import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function getPostDetail(slug: string) {
  return unstable_cache(async () => {
    const post = await prisma.postItem.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: { category: true },
    })
    if (!post) notFound()
    const [relatedPosts, shellSettings] = await Promise.all([
      prisma.postItem.findMany({
        where: { status: 'PUBLISHED', categoryId: post.categoryId, id: { not: post.id } },
        include: { category: true }, orderBy: { publishedAt: 'desc' }, take: 8,
      }),
      prisma.siteSetting.findMany({ where: { key: { in: ['footer_disclaimer', 'logo_text', 'launch_year'] } } }),
    ])
    return { post, relatedPosts, shellSettings }
  }, ['post-detail', slug], { revalidate: 300, tags: ['posts', `post-${slug}`] })()
}

export type PostDetailData = Awaited<ReturnType<typeof getPostDetail>>
export type PostWithCategory = PostDetailData['post']
export type RelatedPost = PostDetailData['relatedPosts'][number]
