import { hi, type HiStrings } from './hi'
import { en, type EnStrings } from './en'

type Lang = 'hi' | 'en'

const strings: Record<Lang, HiStrings | EnStrings> = { hi, en }

export function t(key: keyof HiStrings, lang: Lang = 'hi'): string {
  return strings[lang][key] || strings['hi'][key] || key
}

export function getLang(headers?: Headers): Lang {
  const accept = headers?.get('accept-language') || ''
  if (accept.startsWith('hi')) return 'hi'
  return 'en'
}

export type { Lang, HiStrings, EnStrings }
