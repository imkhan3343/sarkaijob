import type { RelatedPost } from '@/lib/post-detail'
import { PostResultList } from '@/components/public/PostResultList'
export function RelatedPosts({ posts }: { posts: RelatedPost[] }) { if (!posts.length) return null; return <section aria-labelledby="related-heading" className="mt-8"><h2 id="related-heading" className="mb-4 text-xl font-extrabold">संबंधित पोस्ट</h2><PostResultList posts={posts} /></section> }
