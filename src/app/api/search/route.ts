import { NextResponse } from 'next/server'
import { searchPosts } from '@/lib/search'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const parsed = Number.parseInt(url.searchParams.get('page') || '1', 10)
  const page = Number.isFinite(parsed) ? Math.max(parsed, 1) : 1
  const data = await searchPosts(q, page)
  return NextResponse.json(data, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } })
}
