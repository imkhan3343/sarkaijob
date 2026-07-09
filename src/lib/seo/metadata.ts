import { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'

interface SeoProps {
  title?: string
  description?: string
  ogImage?: string
  noIndex?: boolean
  canonical?: string
  publishedAt?: string
  author?: string
}

export function generateMetadata({
  title,
  description,
  ogImage,
  noIndex,
  canonical,
  publishedAt,
  author,
}: SeoProps): Metadata {
  const siteName = SITE_NAME
  const metaTitle = title ? `${title} | ${siteName}` : siteName
  const metaDescription = description || 'Find latest government jobs, results, admit cards, answer keys and syllabus for Sarkari Naukri across India.'
  const url = canonical ? absoluteUrl(canonical) : absoluteUrl('/')

  return {
    title: metaTitle,
    description: metaDescription,
    ...(noIndex && { robots: { index: false, follow: false } }),
    ...(!noIndex && {
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    }),
    ...(canonical && { alternates: { canonical: url } }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      siteName,
      url,
      type: 'website',
      locale: 'hi_IN',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      ...(publishedAt && { publishedTime: publishedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
    ...(!noIndex && {
      other: {
        'hreflang-hi': absoluteUrl('/'),
        'hreflang-en': absoluteUrl('/en'),
      },
    }),
  }
}
