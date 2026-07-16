import type { Metadata } from 'next'
import { CategoryHub } from '@/components/public/CategoryHub'
import type { ListingSearchParams } from '@/lib/listing'
export const revalidate = 300
export const metadata: Metadata = { title: 'सरकारी योजना', description: 'केंद्र और राज्य सरकार की नवीनतम योजनाएं, पात्रता और आवेदन लिंक।', alternates: { canonical: '/yojana' } }
export default function Page({ searchParams }: { searchParams: ListingSearchParams }) { return <CategoryHub slug="sarkari-yojana" title="सरकारी योजना" description="सरकारी योजनाओं की पात्रता, लाभ और आधिकारिक आवेदन जानकारी।" searchParams={searchParams} /> }
