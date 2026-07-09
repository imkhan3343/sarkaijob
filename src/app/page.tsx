import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BADGE_STYLES, SITE_NAME } from '@/lib/constants'
import { generateMetadata } from '@/lib/seo/metadata'
import { itemListJsonLd } from '@/lib/seo/json-ld'
import JsonLd from '@/components/JsonLd'
import Disclaimer from '@/components/Disclaimer'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = generateMetadata({})

export const revalidate = 60

async function getHomeData() {
  const [categories, breakingPosts, states, settingsList] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      include: {
        posts: {
          where: { status: 'PUBLISHED' },
          orderBy: { publishedAt: 'desc' },
          take: 10,
          include: { category: { select: { name: true, slug: true, nameHindi: true } } },
        },
      },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.postItem.findMany({
      where: { status: 'PUBLISHED', isBreaking: true },
      include: { category: { select: { name: true, slug: true, nameHindi: true } } },
      orderBy: { publishedAt: 'desc' },
      take: 10,
    }),
    prisma.statePage.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.siteSetting.findMany(),
  ])

  const settings: Record<string, string> = {}
  settingsList.forEach((s) => { settings[s.key] = s.value || '' })

  return { categories, breakingPosts, states, settings }
}

const heroCards = [
  { title: '10th Pass Jobs', titleHi: '10वीं पास नौकरी', color: 'bg-primary', slug: '?q=10th' },
  { title: '12th Pass Jobs', titleHi: '12वीं पास नौकरी', color: 'bg-primary-container', slug: '?q=12th' },
  { title: 'Graduate Jobs', titleHi: 'स्नातक नौकरी', color: 'bg-tertiary', slug: '?q=graduate' },
  { title: 'All India Jobs', titleHi: 'अखिल भारतीय नौकरी', color: 'bg-secondary', slug: '/state/all-india' },
]

const primaryCategories = ['results', 'admit-card', 'latest-job']
const secondaryCategories = ['answer-key', 'syllabus', 'admission']

export default async function HomePage() {
  const { categories, breakingPosts, states, settings } = await getHomeData()

  const allPosts = categories.flatMap((c) => c.posts)

  return (
    <>
      <JsonLd data={itemListJsonLd(allPosts.slice(0, 20).map((p) => ({
        title: p.title,
        url: `/post/${p.slug}`,
        date: p.publishedAt?.toISOString(),
      })))} />

      <div className="min-h-screen bg-background">
        <TopNav settings={settings} />
        <FlashNews items={breakingPosts} />
        <div role="banner" aria-label="Quick links">
          <HeroCards />
        </div>

        <main id="main-content" className="max-w-container mx-auto px-3 md:px-6">
          <Breadcrumbs items={[]} />

          {settings.footer_disclaimer && (
            <div className="mb-4">
              <Disclaimer text={settings.footer_disclaimer} textHindi={settings.footer_disclaimer_hindi} />
            </div>
          )}

          <PrimaryGrid categories={categories} primaryCategories={primaryCategories} />
          <SecondaryGrid categories={categories} secondaryCategories={secondaryCategories} />

          {categories.find((c) => c.slug === 'documents') && (
            <DocumentsSection category={categories.find((c) => c.slug === 'documents')!} />
          )}
        </main>

        <Footer settings={settings} states={states} />
      </div>
    </>
  )
}

function TopNav({ settings }: { settings: Record<string, string> }) {
  return (
    <header className="bg-tertiary text-white" role="banner">
      <div className="max-w-container mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-12 md:h-14">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">work</span>
            <span className="font-extrabold text-lg md:text-xl tracking-tight">
              {settings.logo_text || SITE_NAME}
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded">Home</Link>
            <Link href="/category/latest-job" className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded">Latest Job</Link>
            <Link href="/category/admit-card" className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded">Admit Card</Link>
            <Link href="/category/result" className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded">Result</Link>
            <Link href="/category/answer-key" className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded">Answer Key</Link>
            <Link href="/category/syllabus" className="px-3 py-1.5 text-sm font-medium hover:bg-white/10 rounded">Syllabus</Link>
          </nav>

          <div role="search" className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-white/10 rounded px-3 py-1.5">
              <span className="material-symbols-outlined text-sm mr-1" aria-hidden="true">search</span>
              <input type="text" placeholder="Search..." aria-label="Search jobs" className="bg-transparent text-white text-sm placeholder-white/50 w-28 focus:w-40 transition-all outline-none" />
            </div>
            <button className="md:hidden p-1" aria-label="Menu">
              <span className="material-symbols-outlined" aria-hidden="true">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function FlashNews({ items }: { items: any[] }) {
  if (items.length === 0) return null

  return (
    <div className="bg-white border-b border-border-subtle" role="marquee" aria-label="Breaking news">
      <div className="max-w-container mx-auto px-3 md:px-6 flex items-center h-10 overflow-hidden">
        <span className="bg-error text-white text-label-bold px-2 py-0.5 rounded shrink-0 mr-3" aria-hidden="true">FLASH NEWS</span>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap">
            {items.map((item) => (
              <Link key={item.id} href={`/post/${item.slug}`} className="inline-block mr-8 text-body-md hover:text-secondary">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroCards() {
  return (
    <div className="max-w-container mx-auto px-3 md:px-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {heroCards.map((card) => (
          <Link
            key={card.title}
            href={card.slug}
            className={`${card.color} text-white rounded-lg p-4 md:p-6 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label={card.title}
          >
            <p className="font-bold text-sm md:text-base">{card.title}</p>
            <p className="text-xs md:text-sm mt-1 opacity-80" aria-hidden="true">View Details →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function PrimaryGrid({ categories, primaryCategories }: { categories: any[]; primaryCategories: string[] }) {
  return (
    <section aria-label="Primary categories" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {primaryCategories.map((slug) => {
        const cat = categories.find((c) => c.slug === slug)
        if (!cat || cat.posts.length === 0) return null
        return <CategoryColumn key={cat.id} category={cat} />
      })}
    </section>
  )
}

function SecondaryGrid({ categories, secondaryCategories }: { categories: any[]; secondaryCategories: string[] }) {
  return (
    <section aria-label="More categories" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {secondaryCategories.map((slug) => {
        const cat = categories.find((c) => c.slug === slug)
        if (!cat || cat.posts.length === 0) return null
        return <CategoryColumn key={cat.id} category={cat} />
      })}
    </section>
  )
}

function CategoryColumn({ category }: { category: any }) {
  const isPrimary = ['results', 'admit-card', 'latest-job'].includes(category.slug)
  const headerBg = isPrimary ? 'bg-primary' : 'bg-tertiary'

  return (
    <article className="bg-white rounded shadow-sm border border-border-subtle overflow-hidden">
      <div className={`${headerBg} text-on-primary px-4 py-2.5`}>
        <h2 className="font-bold text-sm md:text-base">{category.nameHindi || category.name}</h2>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        {category.posts.map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="flex items-start gap-2 px-4 py-2.5 border-b border-border-subtle last:border-0 hover:bg-background-alt transition-colors"
          >
            {post.badgeType && (
              <span className={`shrink-0 px-1.5 py-0.5 rounded text-label-bold ${BADGE_STYLES[post.badgeType] || 'bg-primary text-white'}`}>
                {post.badgeText || post.badgeType}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-body-sm text-secondary leading-snug line-clamp-2">{post.title}</p>
              {post.applicationEndDate && (
                <p className="text-label-md text-gray-500 mt-0.5">
                  Last Date: {formatDate(post.applicationEndDate)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={`/category/${category.slug}`}
        className="block text-center text-body-sm text-secondary font-medium py-2.5 border-t border-border-subtle hover:bg-gray-50"
      >
        View More »
      </Link>
    </article>
  )
}

function DocumentsSection({ category }: { category: any }) {
  return (
    <section aria-label="Documents" className="bg-white rounded shadow-sm border border-border-subtle overflow-hidden mb-6">
      <div className="bg-tertiary text-on-primary px-4 py-2.5">
        <h2 className="font-bold text-sm md:text-base">{category.nameHindi || category.name}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
        {category.posts?.slice(0, 8).map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="flex flex-col items-center gap-2 p-4 border border-border-subtle rounded hover:bg-background-alt transition-colors"
          >
            <span className="material-symbols-outlined text-3xl text-primary" aria-hidden="true">description</span>
            <span className="text-body-sm text-center text-secondary">{post.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Footer({ settings, states }: { settings: Record<string, string>; states: any[] }) {
  return (
    <footer className="bg-tertiary text-white mt-8" role="contentinfo">
      <div className="max-w-container mx-auto px-3 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3">{settings.logo_text || SITE_NAME}</h3>
            <p className="text-sm text-white/70">{settings.site_tagline || ''}</p>
          </div>
          <nav aria-label="Quick links">
            <h4 className="font-bold text-sm mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="/" className="block hover:text-white">Home</Link>
              <Link href="/category/latest-job" className="block hover:text-white">Latest Jobs</Link>
              <Link href="/category/result" className="block hover:text-white">Results</Link>
              <Link href="/category/admit-card" className="block hover:text-white">Admit Cards</Link>
              <Link href="/sitemap" className="block hover:text-white">Sitemap</Link>
            </div>
          </nav>
          <nav aria-label="States">
            <h4 className="font-bold text-sm mb-3">States</h4>
            <div className="space-y-2 text-sm text-white/70">
              {states.slice(0, 6).map((st) => (
                <Link key={st.id} href={`/state/${st.slug}`} className="block hover:text-white">{st.nameHindi || st.name}</Link>
              ))}
            </div>
          </nav>
          <nav aria-label="About">
            <h4 className="font-bold text-sm mb-3">About</h4>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="/about" className="block hover:text-white">About Us</Link>
              <Link href="/contact" className="block hover:text-white">Contact</Link>
              <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
              <Link href="/disclaimer" className="block hover:text-white">Disclaimer</Link>
              <Link href="/terms" className="block hover:text-white">Terms</Link>
            </div>
          </nav>
        </div>
        <div className="border-t border-white/10 mt-6 pt-6 text-center text-sm text-white/50">
          <p>{settings.footer_disclaimer || ''}</p>
          <p className="mt-2">© {settings.launch_year || '2024'} {settings.logo_text || SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
