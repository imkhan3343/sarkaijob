import { prisma } from '@/lib/prisma'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '')
const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
const cdata = (value: string) => value.replace(/]]>/g, ']]]]><![CDATA[>')
export async function GET() {
  const posts = await prisma.postItem.findMany({ where: { status: 'PUBLISHED' }, include: { category: true }, orderBy: { publishedAt: 'desc' }, take: 50 })
  const items = posts.map((post) => {
    const title = post.titleHindi || post.title
    const description = post.excerptHindi || post.excerpt || title
    const link = `${SITE_URL}/post/${post.slug}`
    return `<item><title><![CDATA[${cdata(title)}]]></title><description><![CDATA[${cdata(description)}]]></description><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><pubDate>${(post.publishedAt || post.createdAt).toUTCString()}</pubDate><category><![CDATA[${cdata(post.category.nameHindi || post.category.name)}]]></category></item>`
  }).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>SarkariJob</title><description>Latest government jobs, results, admit cards and official updates.</description><link>${escapeXml(SITE_URL)}</link><language>hi-IN</language><atom:link href="${escapeXml(`${SITE_URL}/rss.xml`)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } })
}
