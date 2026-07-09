import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function StatesPage() {
  const states = await prisma.statePage.findMany({ orderBy: { sortOrder: 'asc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">States</h1>
        <Link
          href="/admin/states/new"
          className="bg-[#870000] text-white px-4 py-2 rounded text-sm hover:bg-[#b30000]"
        >
          Add State
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Slug</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Hindi Name</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Order</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Active</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {states.map((st) => (
              <tr key={st.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{st.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{st.slug}</td>
                <td className="px-4 py-3 text-sm">{st.nameHindi || '-'}</td>
                <td className="px-4 py-3 text-center text-sm">{st.sortOrder}</td>
                <td className="px-4 py-3 text-center">
                  {st.isActive ? (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">Yes</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/states/${st.id}/edit`} className="text-[#3557bc] hover:underline text-sm">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
