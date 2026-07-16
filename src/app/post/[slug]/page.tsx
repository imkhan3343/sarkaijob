import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/public/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { PostActions } from '@/components/public/PostActions'
import { PostMetaTable } from '@/components/public/PostMetaTable'
import { PublicPage } from '@/components/public/PublicPage'
import { RelatedPosts } from '@/components/public/RelatedPosts'
import { ViewTracker } from '@/components/public/ViewTracker'
import { getPostDetail } from '@/lib/post-detail'
import { buildBreadcrumbJsonLd, buildPostJsonLd } from '@/lib/structured-data'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { SavedPostButton } from '@/components/owned-channels/SavedPostButton'
import { internalLinks } from '@/lib/internal-linking'

export const revalidate = 300

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { post } = await getPostDetail(params.slug)
  const title = post.seoTitle || post.titleHindi || post.title
  const description = post.seoDescription || post.excerptHindi || post.excerpt || post.title
  return {
    title, description,
    alternates: { canonical: `/post/${post.slug}`, languages: { 'hi-IN': `/post/${post.slug}`, en: `/post/${post.slug}?lang=en` } },
    openGraph: { title, description, type: 'article', url: `/post/${post.slug}`, publishedTime: post.publishedAt?.toISOString(), modifiedTime: post.updatedAt.toISOString() },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { post, relatedPosts } = await getPostDetail(params.slug)
  const breadcrumbs = [
    { name: 'होम', href: '/' },
    { name: post.category.nameHindi || post.category.name, href: `/category/${post.category.slug}` },
    { name: post.titleHindi || post.title, href: `/post/${post.slug}` },
  ]
  const links = internalLinks({ organization: post.organization, qualification: post.qualification, state: post.state, categorySlug: post.category.slug })

  return (
    <PublicPage width="max-w-4xl">
      <ViewTracker slug={post.slug} />
      <JsonLd data={buildPostJsonLd(post)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <article>
        <p className="text-sm font-bold text-primary">{post.category.nameHindi || post.category.name}</p>
        <h1 className="mt-2 text-2xl font-black leading-tight text-slate-950 md:text-4xl">{post.titleHindi || post.title}</h1>
        {post.excerptHindi || post.excerpt ? <p className="mt-3 text-base leading-7 text-slate-700 md:text-lg">{post.excerptHindi || post.excerpt}</p> : null}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>प्रकाशित: {formatDate(post.publishedAt || post.createdAt)}</span><span aria-hidden="true">•</span><span>{post.viewCount} views</span>
        </div>

        <PostActions post={post} />
        <div className="mt-3"><SavedPostButton slug={post.slug} /></div>
        <PostMetaTable post={post} />

        <section aria-labelledby="details-heading" className="mt-8 rounded border border-border-subtle bg-white p-5 shadow-sm">
          <h2 id="details-heading" className="text-xl font-extrabold">विस्तृत जानकारी</h2>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700 md:text-base">{post.contentHindi || post.content || 'विस्तृत जानकारी जल्द अपडेट की जाएगी।'}</div>
        </section>
        <RelatedPosts posts={relatedPosts} />
        {links.length ? <nav aria-label="Related topics" className="mt-8 flex flex-wrap gap-2">{links.map((item) => <Link key={item.href} href={item.href} className="rounded border bg-white px-3 py-2 text-sm text-secondary">{item.label}</Link>)}</nav> : null}
      </article>
    </PublicPage>
  )
}
