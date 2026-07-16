import type { PostWithCategory } from '@/lib/post-detail'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '')

export function buildPostJsonLd(post: PostWithCategory) {
  const common = {
    '@context': 'https://schema.org',
    name: post.titleHindi || post.title,
    description: post.excerptHindi || post.excerpt || post.seoDescription || post.title,
    url: `${SITE_URL}/post/${post.slug}`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: post.titleHindi ? 'hi-IN' : 'en-IN',
  }

  if (post.category.slug === 'latest-job') {
    return {
      ...common,
      '@type': 'JobPosting',
      title: common.name,
      datePosted: post.publishedAt?.toISOString(),
      validThrough: post.applicationEndDate?.toISOString(),
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: post.organization || 'Government Organization',
        sameAs: post.officialWebsite || SITE_URL,
      },
      jobLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressRegion: post.state || 'India', addressCountry: 'IN' },
      },
      totalJobOpenings: post.totalPosts || undefined,
      qualifications: post.qualification || undefined,
    }
  }

  return { ...common, '@type': post.category.slug === 'results' ? 'Dataset' : 'CreativeWork' }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name,
      item: `${SITE_URL}${item.href.startsWith('/') ? item.href : `/${item.href}`}`,
    })),
  }
}

export function buildItemListJsonLd(name: string, posts: Array<{ title: string; titleHindi?: string | null; slug: string }>) {
  return {
    '@context': 'https://schema.org', '@type': 'ItemList', name,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem', position: index + 1, name: post.titleHindi || post.title,
      url: `${SITE_URL}/post/${post.slug}`,
    })),
  }
}
