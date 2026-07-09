import { format, formatDistanceToNow } from 'date-fns'
import { hi } from 'date-fns/locale'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

export function formatDate(date: Date | string, fmt = 'dd MMM yyyy'): string {
  return format(new Date(date), fmt)
}

export function formatDateHindi(date: Date | string): string {
  return format(new Date(date), 'dd MMM yyyy', { locale: hi })
}

export function timeAgo(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return `${base}${path.startsWith('/') ? path : '/' + path}`
}
