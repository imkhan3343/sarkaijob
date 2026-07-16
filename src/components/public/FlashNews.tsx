import Link from 'next/link'
import type { HomepagePost } from '@/lib/homepage'
import type { Messages } from '@/lib/i18n'

export function FlashNews({ posts, messages }: { posts: HomepagePost[]; messages: Messages }) {
  if (!posts.length) return null

  return (
    <section className="border-b border-border-subtle bg-white" aria-label={messages.accessibility.breakingNews}>
      <div className="mx-auto flex h-11 max-w-container items-center overflow-hidden px-3 md:px-6">
        <strong className="mr-3 shrink-0 rounded bg-error px-2 py-1 text-xs font-bold text-white">{messages.sections.flashNews}</strong>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap motion-reduce:animate-none motion-reduce:whitespace-normal">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="mr-8 inline-block text-sm font-medium text-secondary hover:underline focus-visible:underline">
                {post.titleHindi || post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
