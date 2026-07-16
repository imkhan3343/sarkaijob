import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function SourcesPage() {
  const sources = await prisma.sourceRegistry.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Scrape Sources</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Type</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Schedule</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Health</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Active</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 text-sm">{s.sourceType} / {s.parserType}</td>
                <td className="px-4 py-3 text-center text-sm">Every {s.scheduleMin}m</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    s.healthStatus === 'HEALTHY' ? 'bg-green-100 text-green-700' :
                    s.healthStatus === 'WARNING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{s.healthStatus}</span>
                </td>
                <td className="px-4 py-3 text-center">{s.isActive ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/sources/${s.id}/edit`} className="text-[#3557bc] hover:underline text-sm">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
