const buckets = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, limit = 60, windowMs = 60000) {
  const now = Date.now()
  const b = buckets.get(key)

  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return true
  }

  b.count++
  return b.count <= limit
}

export const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://plausible.io",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://plausible.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')
