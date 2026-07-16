import { SITE_NAME } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description: 'Government Jobs, Results, Admit Cards portal for Indian job seekers.',
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

export function itemListJsonLd(items: { title: string; url: string; date?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
      url: absoluteUrl(item.url),
    })),
  }
}

export function jobPostingJsonLd(data: {
  title: string
  description: string
  organization: string
  qualification?: string | null
  totalPosts?: number | null
  applicationStartDate?: string | null
  applicationEndDate?: string | null
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: data.title,
    description: data.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: data.organization,
    },
    ...(data.qualification && { qualifications: data.qualification }),
    ...(data.totalPosts && { totalPositions: data.totalPosts }),
    ...(data.applicationStartDate && { datePosted: data.applicationStartDate }),
    ...(data.applicationEndDate && { validThrough: data.applicationEndDate }),
    url: absoluteUrl(data.url),
  }
}

export function jsonLdScript(data: any) {
  return {
    __html: JSON.stringify(data),
  }
}
