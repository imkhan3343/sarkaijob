import type { Metadata } from 'next'
import { CategoryHub } from '@/components/public/CategoryHub'
import type { ListingSearchParams } from '@/lib/listing'
export const revalidate = 300
export const metadata: Metadata = { title: 'सरकारी स्कॉलरशिप', description: 'राष्ट्रीय और राज्य छात्रवृत्ति आवेदन, पात्रता और अंतिम तिथि।', alternates: { canonical: '/scholarship' } }
export default function Page({ searchParams }: { searchParams: ListingSearchParams }) { return <CategoryHub slug="scholarship" title="सरकारी स्कॉलरशिप" description="छात्रवृत्ति योजनाएं, आवेदन तिथि और आधिकारिक लिंक।" searchParams={searchParams} /> }
