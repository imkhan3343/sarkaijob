import { hi } from '@/lib/i18n'

export default function SkipLink() {
  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-primary focus:shadow-lg">
      {hi.accessibility.skipToContent}
    </a>
  )
}
