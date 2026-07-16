import { en } from './en'
import { hi } from './hi'

export type Lang = 'hi' | 'en'
type WidenStrings<T> = {
  [K in keyof T]: T[K] extends string ? string : WidenStrings<T[K]>
}
export type Messages = WidenStrings<typeof hi>

const messages: Record<Lang, Messages> = { hi, en }

export function getMessages(lang: Lang = 'hi'): Messages {
  return messages[lang] || hi
}

export function resolveLang(value?: string | null): Lang {
  return value?.toLowerCase().startsWith('en') ? 'en' : 'hi'
}

export { hi, en }
