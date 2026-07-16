import { revalidatePath, revalidateTag } from 'next/cache'

export function invalidatePostContent(slug?: string, categorySlug?: string, stateSlug?: string) {
  revalidateTag('posts')
  revalidateTag('search')
  if (slug) revalidateTag(`post-${slug}`)
  if (categorySlug) revalidateTag(`category-${categorySlug}`)
  if (stateSlug) revalidateTag(`state-${stateSlug}`)
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
  revalidatePath('/rss.xml')
}

export function invalidatePublicShell() {
  revalidateTag('settings')
  revalidateTag('states')
  revalidatePath('/', 'layout')
}
