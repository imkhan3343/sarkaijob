import type { PostWithCategory } from '@/lib/post-detail'
export function PostActions({ post }: { post: PostWithCategory }) {
  const actions = [
    { label: 'ऑनलाइन आवेदन', href: post.applyLink, show: post.category.slug === 'latest-job' },
    { label: 'एडमिट कार्ड डाउनलोड', href: post.admitCardLink, show: post.category.slug === 'admit-card' },
    { label: 'रिजल्ट देखें', href: post.officialWebsite, show: post.category.slug === 'results' },
    { label: 'उत्तर कुंजी डाउनलोड', href: post.answerKeyLink, show: post.category.slug === 'answer-key' },
    { label: 'अधिसूचना PDF', href: post.notificationLink, show: Boolean(post.notificationLink) },
    { label: 'आधिकारिक वेबसाइट', href: post.officialWebsite, show: Boolean(post.officialWebsite) },
  ].filter((action) => action.show && action.href)
  if (!actions.length) return null
  return <div className="mt-6 flex flex-wrap gap-3" aria-label="Post actions">{actions.map((action) => <a key={`${action.label}-${action.href}`} href={action.href || '#'} target="_blank" rel="nofollow noopener noreferrer" className="flex min-h-11 items-center rounded bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">{action.label}</a>)}</div>
}
