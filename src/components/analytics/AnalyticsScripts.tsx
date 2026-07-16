import Script from 'next/script'

export function AnalyticsScripts() {
  const ga = process.env.NEXT_PUBLIC_GA4_ID
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const googleTagUrl = 'https:' + '//www.googletagmanager.com/gtag/js'

  return (
    <>
      {ga ? (
        <>
          <Script src={`${googleTagUrl}?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${ga}')`}
          </Script>
        </>
      ) : null}
      {plausible ? (
        <Script defer data-domain={plausible} src={'https:' + '//plausible.io/js/script.js'} strategy="afterInteractive" />
      ) : null}
    </>
  )
}
