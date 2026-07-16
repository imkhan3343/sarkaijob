import Link from 'next/link'
import type { HomepagePost } from '@/lib/homepage'
import type { Messages } from '@/lib/i18n'

export function DocumentsSection({ posts, messages }: { posts: HomepagePost[]; messages: Messages }) {
  return (
    <section aria-labelledby="documents-heading" className="mb-6 overflow-hidden rounded border border-border-subtle bg-white shadow-sm">
      <div className="bg-tertiary px-4 py-3 text-white"><h2 id="documents-heading" className="font-bold">{messages.sections.documents}</h2></div>
      {!posts.length ? <p className="p-4 text-sm text-slate-500">{messages.sections.noPosts}</p> : (
        <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="flex min-h-28 flex-col items-center justify-center gap-2 rounded border border-border-subtle p-3 text-center hover:bg-background-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">
              <span className="material-symbols-outlined text-3xl text-primary" aria-hidden="true">description</span>
              <span className="line-clamp-2 text-sm font-semibold text-secondary">{post.titleHindi || post.title}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
