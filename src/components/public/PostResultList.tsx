import Link from 'next/link'
import { formatDate } from '@/lib/utils'

type ResultPost = {
  id: string; title: string; titleHindi: string | null; slug: string; excerpt: string | null; excerptHindi: string | null;
  organization: string | null; publishedAt: Date | null; applicationEndDate: Date | null;
  category: { name: string; nameHindi: string | null; slug: string }
}
function highlighted(text: string, query?: string) {
  if (!query?.trim()) return text
  const needle = query.trim()
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.split(new RegExp(`(${escaped})`, 'ig')).map((part, index) => part.toLowerCase() === needle.toLowerCase() ? <mark key={index} className="bg-yellow-200">{part}</mark> : part)
}
export function PostResultList({ posts, query }: { posts: ResultPost[]; query?: string }) {
  if (!posts.length) return <p className="rounded border border-border-subtle bg-white p-5 text-sm text-slate-600">कोई पोस्ट नहीं मिली। फिल्टर बदलकर दोबारा कोशिश करें।</p>
  return <div className="grid gap-3">{posts.map((post) => <article key={post.id} className="rounded border border-border-subtle bg-white p-4 shadow-sm"><Link href={`/post/${post.slug}`} className="text-base font-bold text-secondary hover:underline md:text-lg">{highlighted(post.titleHindi || post.title, query)}</Link>{post.excerptHindi || post.excerpt ? <p className="mt-1 line-clamp-2 text-sm text-slate-600">{post.excerptHindi || post.excerpt}</p> : null}<div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500"><span>{post.category.nameHindi || post.category.name}</span>{post.organization ? <><span aria-hidden="true">•</span><span>{post.organization}</span></> : null}{post.publishedAt ? <><span aria-hidden="true">•</span><time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time></> : null}{post.applicationEndDate ? <><span aria-hidden="true">•</span><span className="font-semibold text-error">अंतिम तिथि: {formatDate(post.applicationEndDate)}</span></> : null}</div></article>)}</div>
}
