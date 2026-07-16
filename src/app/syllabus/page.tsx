import type { Metadata } from 'next'
import { CategoryHub } from '@/components/public/CategoryHub'
import type { ListingSearchParams } from '@/lib/listing'
export const revalidate = 300
export const metadata: Metadata = { title: 'सरकारी परीक्षा पाठ्यक्रम', description: 'SSC, रेलवे, बैंकिंग और राज्य परीक्षाओं का नवीनतम सिलेबस।', alternates: { canonical: '/syllabus' } }
export default function Page({ searchParams }: { searchParams: ListingSearchParams }) { return <CategoryHub slug="syllabus" title="सरकारी परीक्षा पाठ्यक्रम" description="परीक्षा पैटर्न और विषयवार पाठ्यक्रम देखें।" searchParams={searchParams} /> }
