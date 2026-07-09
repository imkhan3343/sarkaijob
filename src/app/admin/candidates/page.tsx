import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function CandidatesPage() {
  const candidates = await prisma.scrapeCandidate.findMany({
    where: { reviewStatus: 'PENDING' },
    include: { rawEntry: { select: { rawTitle: true, sourceUrl: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Queue ({candidates.length})</h1>
      {candidates.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No pending candidates to review.</p>
      ) : (
        <div className="space-y-2">
          {candidates.map((c) => (
            <div key={c.id} className="bg-white rounded shadow-sm border border-border-subtle px-4 py-3">
              <p className="font-medium text-sm">{c.rawEntry?.rawTitle || c.normalizedTitle}</p>
              <p className="text-label-md text-gray-400 mt-1">Source: {c.rawEntry?.sourceUrl || 'N/A'}</p>
              {c.dedupScore && <p className="text-label-md text-gray-400">Dedup Score: {c.dedupScore}</p>}
              <div className="flex gap-2 mt-2">
                <Link href={`/admin/candidates/${c.id}/review`} className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary-container">Review</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
