import type { Metadata } from 'next'
import { CategoryHub } from '@/components/public/CategoryHub'
import type { ListingSearchParams } from '@/lib/listing'
export const revalidate = 120
export const metadata: Metadata = { title: 'सरकारी नोटिस', description: 'सरकारी भर्ती और परीक्षाओं के नवीनतम आधिकारिक नोटिस।', alternates: { canonical: '/notice' } }
export default function Page({ searchParams }: { searchParams: ListingSearchParams }) { return <CategoryHub slug="notice" title="सरकारी नोटिस" description="भर्ती, परीक्षा, रिजल्ट और आवेदन से जुड़े महत्वपूर्ण नोटिस।" searchParams={searchParams} /> }
