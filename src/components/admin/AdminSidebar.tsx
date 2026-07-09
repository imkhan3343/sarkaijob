'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_NAME } from '@/lib/constants'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: 'grid_view' },
  { label: 'Categories', href: '/admin/categories', icon: 'category' },
  { label: 'Posts', href: '/admin/posts', icon: 'article' },
  { label: 'States', href: '/admin/states', icon: 'map' },
  { label: 'Sources', href: '/admin/sources', icon: 'rss_feed' },
  { label: 'Candidates', href: '/admin/candidates', icon: 'fact_check' },
  { label: 'Scrape Runs', href: '/admin/scrape-runs', icon: 'history' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#003f80] text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-white/10">
        <Link href="/admin" className="text-xl font-bold">
          {SITE_NAME}
        </Link>
        <p className="text-xs text-white/60 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
