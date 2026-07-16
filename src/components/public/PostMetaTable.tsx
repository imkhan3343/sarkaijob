import type { PostWithCategory } from '@/lib/post-detail'
import { formatDate } from '@/lib/utils'
export function PostMetaTable({ post }: { post: PostWithCategory }) {
  const date = (value: Date | null) => value ? formatDate(value) : null
  const rows = [
    ['संगठन', post.organization], ['कुल पद', post.totalPosts?.toString()], ['योग्यता', post.qualification], ['राज्य', post.state],
    ['आवेदन प्रारंभ', date(post.applicationStartDate)], ['अंतिम तिथि', date(post.applicationEndDate)], ['परीक्षा तिथि', date(post.examDate)], ['रिजल्ट तिथि', date(post.resultDate)],
  ].filter((row): row is string[] => Boolean(row[1]))
  if (!rows.length) return null
  return <section aria-labelledby="post-meta-heading" className="mt-7"><h2 id="post-meta-heading" className="text-xl font-extrabold">महत्वपूर्ण विवरण</h2><div className="mt-3 overflow-x-auto rounded border border-border-subtle bg-white"><table className="w-full min-w-[520px] text-left text-sm"><tbody>{rows.map(([label, value]) => <tr key={label} className="border-t border-border-subtle first:border-t-0"><th scope="row" className="w-48 bg-slate-50 p-3 font-semibold">{label}</th><td className="p-3">{value}</td></tr>)}</tbody></table></div></section>
}
