import { prisma } from '@/lib/prisma'

export default async function ScrapeRunsPage() {
  const runs = await prisma.scrapeRunLog.findMany({
    include: { source: { select: { name: true } } },
    orderBy: { startedAt: 'desc' },
    take: 50,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Scrape Run Logs</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Source</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Type</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Found</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">New</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Duration</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Started</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{r.source?.name || 'Unknown'}</td>
                <td className="px-4 py-3 text-sm">{r.runType}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    r.status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                    r.status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-center">{r.entriesFound}</td>
                <td className="px-4 py-3 text-center">{r.entriesNew}</td>
                <td className="px-4 py-3 text-sm">{r.durationMs ? `${(r.durationMs / 1000).toFixed(1)}s` : '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{r.startedAt.toISOString().slice(0, 16)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
