import type { Metadata } from 'next'
import type { HomepagePost } from '@/lib/homepage'

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

const title = 'SarkariJob - Latest Government Jobs, Results, Admit Cards'
const description =
  'सरकारी नौकरी, रिजल्ट, एडमिट कार्ड, उत्तर कुंजी और आधिकारिक अपडेट की नवीनतम जानकारी पाएं।'

export const homepageMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: '/',
    languages: { 'hi-IN': '/', en: '/?lang=en' },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'SarkariJob',
    title,
    description,
    locale: 'hi_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export function buildHomepageJsonLd(posts: HomepagePost[]) {
  const uniquePosts = [...new Map(posts.map((post) => [post.id, post])).values()].slice(0, 30)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SarkariJob',
      url: SITE_URL,
      inLanguage: ['hi-IN', 'en-IN'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SarkariJob',
      url: SITE_URL,
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Latest SarkariJob Updates',
      numberOfItems: uniquePosts.length,
      itemListElement: uniquePosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/post/${post.slug}`,
        name: post.titleHindi || post.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ],
    },
  ]
}
