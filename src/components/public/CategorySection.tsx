import Link from 'next/link'
import type { HomepagePost } from '@/lib/homepage'
import type { Messages } from '@/lib/i18n'
import { BADGE_STYLES } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

export function CategorySection({ title, slug, posts, messages, tone = 'primary' }: { title: string; slug: string; posts: HomepagePost[]; messages: Messages; tone?: 'primary' | 'tertiary' }) {
  const headingId = `${slug}-heading`

  return (
    <section className="overflow-hidden rounded border border-border-subtle bg-white shadow-sm" aria-labelledby={headingId}>
      <div className={`flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 text-white ${tone === 'primary' ? 'bg-primary' : 'bg-tertiary'}`}>
        <h2 id={headingId} className="font-bold">{title}</h2>
        <Link href={`/category/${slug}`} className="shrink-0 text-xs font-semibold underline-offset-4 hover:underline">{messages.sections.viewMore}</Link>
      </div>

      <ul className="max-h-[600px] divide-y divide-border-subtle overflow-y-auto">
        {!posts.length ? (
          <li className="p-4 text-sm text-slate-500">{messages.sections.noPosts}</li>
        ) : posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`} className="flex min-h-14 items-start gap-2 px-4 py-3 hover:bg-background-alt focus-visible:bg-background-alt focus-visible:outline-none">
              {post.badgeType ? (
                <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold ${BADGE_STYLES[post.badgeType] || 'bg-primary text-white'}`}>{post.badgeText || post.badgeType}</span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 text-sm font-medium leading-snug text-secondary">{post.titleHindi || post.title}</span>
                {post.applicationEndDate ? <span className="mt-1 block text-xs text-slate-500">अंतिम तिथि: {formatDate(post.applicationEndDate)}</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
