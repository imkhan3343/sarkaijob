import { NextResponse } from 'next/server'
import { autocompletePosts } from '@/lib/search'

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q') || ''
  const suggestions = await autocompletePosts(q)
  return NextResponse.json({ suggestions }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } })
}
