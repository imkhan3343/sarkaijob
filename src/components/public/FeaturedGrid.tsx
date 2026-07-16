import Link from 'next/link'
import type { HomepagePost } from '@/lib/homepage'
import type { Messages } from '@/lib/i18n'

export function FeaturedGrid({ posts, messages }: { posts: HomepagePost[]; messages: Messages }) {
  if (!posts.length) return null

  return (
    <section aria-labelledby="featured-heading" className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="featured-heading" className="text-xl font-extrabold text-slate-900">{messages.sections.featured}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="group min-h-32 rounded-lg border border-red-950/20 bg-primary p-4 text-white shadow-sm transition-colors hover:bg-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
            <p className="text-xs font-bold uppercase tracking-wide text-white/75">{post.category.nameHindi || post.category.name}</p>
            <h3 className="mt-2 line-clamp-3 text-base font-bold leading-snug group-hover:underline">{post.titleHindi || post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
