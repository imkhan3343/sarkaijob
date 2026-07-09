import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { generateMetadata as genMeta } from '@/lib/seo/metadata'
import { breadcrumbJsonLd, jobPostingJsonLd } from '@/lib/seo/json-ld'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import Disclaimer from '@/components/Disclaimer'

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await prisma.postItem.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
    take: 100,
  })
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.postItem.findUnique({
    where: { slug: params.slug },
    select: { title: true, excerpt: true, seoTitle: true, seoDescription: true, publishedAt: true },
  })
  if (!post) return {}
  return genMeta({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    canonical: `/post/${params.slug}`,
    publishedAt: post.publishedAt?.toISOString(),
  })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.postItem.findUnique({
    where: { slug: params.slug },
    include: { category: { select: { name: true, slug: true, nameHindi: true } } },
  })

  if (!post || post.status !== 'PUBLISHED') notFound()

  const relatedPosts = await prisma.postItem.findMany({
    where: { categoryId: post.categoryId, id: { not: post.id }, status: 'PUBLISHED' },
    select: { title: true, slug: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
    take: 5,
  })

  await prisma.postItem.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {})

  const settings = await prisma.siteSetting.findMany()
  const settingsMap: Record<string, string> = {}
  settings.forEach((s) => { settingsMap[s.key] = s.value || '' })

  const breadcrumbItems = [
    { label: post.category.nameHindi || post.category.name, href: `/category/${post.category.slug}` },
    { label: post.title },
  ]

  const isJob = ['latest-job', 'results'].includes(post.category.slug)

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', url: '/' },
        ...breadcrumbItems.map((b) => ({
          name: b.label,
          url: b.href || `/post/${post.slug}`,
        })),
      ])} />
      {isJob && post.organization && (
        <JsonLd data={jobPostingJsonLd({
          title: post.title,
          description: post.excerpt || post.title,
          organization: post.organization,
          qualification: post.qualification,
          totalPosts: post.totalPosts,
          applicationStartDate: post.applicationStartDate?.toISOString() || null,
          applicationEndDate: post.applicationEndDate?.toISOString() || null,
          url: `/post/${post.slug}`,
        })} />
      )}

      <div className="min-h-screen bg-background">
        <header className="bg-tertiary text-white h-12 flex items-center">
          <div className="max-w-container mx-auto px-3 md:px-6 w-full">
            <Link href="/" className="font-bold">{settingsMap.logo_text || 'SarkariJob'}</Link>
          </div>
        </header>

        <main id="main-content" className="max-w-container mx-auto px-3 md:px-6 py-4">
          <Breadcrumbs items={breadcrumbItems} />

          <article className="bg-white rounded shadow-sm border border-border-subtle p-4 md:p-6">
            <h1 className="text-headline-lg md:text-display-lg mb-4">{post.titleHindi || post.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6 text-body-sm text-gray-600">
              {post.organization && (
                <div><span className="font-medium">Organization:</span> {post.organization}</div>
              )}
              {post.totalPosts && (
                <div><span className="font-medium">Total Posts:</span> {post.totalPosts}</div>
              )}
              {post.qualification && (
                <div><span className="font-medium">Qualification:</span> {post.qualification}</div>
              )}
              {post.state && (
                <div><span className="font-medium">State:</span> {post.state}</div>
              )}
            </div>

            {(post.applicationStartDate || post.applicationEndDate || post.examDate || post.resultDate) && (
              <div className="bg-gray-50 rounded p-4 mb-6 space-y-1 text-body-sm">
                <h3 className="font-bold mb-2">Important Dates</h3>
                {post.applicationStartDate && <p>Apply Start: {formatDate(post.applicationStartDate)}</p>}
                {post.applicationEndDate && <p className="text-error font-medium">Apply End: {formatDate(post.applicationEndDate)}</p>}
                {post.examDate && <p>Exam Date: {formatDate(post.examDate)}</p>}
                {post.resultDate && <p>Result Date: {formatDate(post.resultDate)}</p>}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-6">
              {post.applyLink && (
                <a href={post.applyLink} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-container">
                  Apply Online
                </a>
              )}
              {post.admitCardLink && (
                <a href={post.admitCardLink} target="_blank" rel="noopener noreferrer" className="bg-tertiary text-white px-4 py-2 rounded text-sm hover:bg-blue-800">
                  Download Admit Card
                </a>
              )}
              {post.answerKeyLink && (
                <a href={post.answerKeyLink} target="_blank" rel="noopener noreferrer" className="bg-success-green text-white px-4 py-2 rounded text-sm hover:bg-green-800">
                  Download Answer Key
                </a>
              )}
              {post.notificationLink && (
                <a href={post.notificationLink} target="_blank" rel="noopener noreferrer" className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                  Notification
                </a>
              )}
              {post.officialWebsite && (
                <a href={post.officialWebsite} target="_blank" rel="noopener noreferrer" className="border border-secondary text-secondary px-4 py-2 rounded text-sm hover:bg-blue-50">
                  Official Website
                </a>
              )}
            </div>

            {post.content && (
              <div className="prose max-w-none mb-6 text-body-md leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
            {post.contentHindi && (
              <div className="prose max-w-none mb-6 text-body-md leading-relaxed" dangerouslySetInnerHTML={{ __html: post.contentHindi }} />
            )}

            <div className="text-body-sm text-gray-400 border-t border-border-subtle pt-4 mt-4">
              Published: {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)} | Views: {post.viewCount}
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <section aria-label="Related Posts" className="mt-6">
              <h2 className="text-headline-md mb-3">Related Posts</h2>
              <div className="space-y-2">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/post/${rp.slug}`} className="block bg-white rounded shadow-sm border border-border-subtle px-4 py-3 hover:bg-background-alt text-secondary text-body-sm">
                    {rp.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {settingsMap.footer_disclaimer && (
            <div className="mt-6">
              <Disclaimer text={settingsMap.footer_disclaimer} textHindi={settingsMap.footer_disclaimer_hindi} />
            </div>
          )}
        </main>
      </div>
    </>
  )
}
