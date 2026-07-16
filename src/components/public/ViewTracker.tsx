'use client'
import { useEffect } from 'react'
export function ViewTracker({ slug }: { slug: string }) { useEffect(() => { fetch(`/api/posts/${encodeURIComponent(slug)}`, { method: 'POST', keepalive: true }).catch(() => null) }, [slug]); return null }
