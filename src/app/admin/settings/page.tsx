import { prisma } from '@/lib/prisma'

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } })

  const grouped = settings.reduce<Record<string, typeof settings>>((acc, s) => {
    const group = s.group || 'general'
    if (!acc[group]) acc[group] = []
    acc[group].push(s)
    return acc
  }, {})

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-6">
          <h2 className="text-lg font-semibold capitalize mb-3 text-gray-700">{group}</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Key</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Value</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Hindi Value</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-sm">{s.key}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{s.value || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{s.valueHindi || '-'}</td>
                    <td className="px-4 py-3">
                      <a href={`/admin/settings/${s.id}/edit`} className="text-[#3557bc] hover:underline text-sm">Edit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
