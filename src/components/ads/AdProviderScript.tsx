import Script from 'next/script'

export function AdProviderScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  if (!client) return null
  const adsUrl = 'https:' + '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  return <Script async strategy="afterInteractive" src={`${adsUrl}?client=${client}`} crossOrigin="anonymous" />
}
