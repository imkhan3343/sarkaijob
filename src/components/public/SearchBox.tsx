'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Suggestion = { title: string; titleHindi: string | null; slug: string; organization: string | null }

export function SearchBox({ defaultValue = '', compact = false, placeholder = 'नौकरी खोजें...' }: { defaultValue?: string; compact?: boolean; placeholder?: string }) {
  const [query, setQuery] = useState(defaultValue)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    if (query.trim().length < 2) { setSuggestions([]); return }
    const controller = new AbortController()
    const timer = window.setTimeout(() => {
      fetch(`/api/search/autocomplete?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((response) => response.ok ? response.json() : { suggestions: [] })
        .then((data) => setSuggestions(data.suggestions || []))
        .catch(() => null)
    }, 250)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [query])

  return (
    <div className="relative">
      <form action="/search" method="GET" role="search" className={`flex ${compact ? 'rounded-full bg-white' : 'gap-2'}`}>
        <label className="sr-only" htmlFor={compact ? 'header-query' : 'search-query'}>सरकारी नौकरी खोजें</label>
        <input id={compact ? 'header-query' : 'search-query'} name="q" type="search" minLength={2} maxLength={120} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className={compact ? 'h-10 w-40 rounded-full bg-white px-4 text-sm text-slate-950 outline-none md:w-56' : 'min-h-12 min-w-0 flex-1 rounded border border-slate-300 bg-white px-4'} />
        {!compact ? <button className="min-h-12 rounded bg-primary px-5 font-bold text-white hover:bg-primary-container">खोजें</button> : null}
      </form>
      {suggestions.length ? (
        <div className="absolute left-0 right-0 z-40 mt-1 overflow-hidden rounded border border-slate-200 bg-white text-slate-900 shadow-lg" role="listbox">
          {suggestions.map((item) => (
            <Link key={item.slug} href={`/post/${item.slug}`} className="block border-b border-slate-100 px-3 py-2 text-sm last:border-0 hover:bg-slate-50" onClick={() => setSuggestions([])}>
              <span className="block font-semibold">{item.titleHindi || item.title}</span>
              {item.organization ? <span className="text-xs text-slate-500">{item.organization}</span> : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
