import { prisma } from '@/lib/prisma'

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const posts = await prisma.postItem.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: { select: { name: true } } },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SarkariJob - Latest Government Jobs</title>
    <link>${baseUrl}</link>
    <description>Latest government jobs, results, admit cards, answer keys and syllabus</description>
    <language>hi-in</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/post/${post.slug}</link>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      <category>${post.category.name}</category>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date(post.createdAt).toUTCString()}</pubDate>
      <guid>${baseUrl}/post/${post.slug}</guid>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
