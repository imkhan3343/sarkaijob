import { prisma } from '@/lib/prisma'

async function getStats() {
  const [totalPosts, totalCategories, totalStates, publishedPosts, draftPosts] =
    await Promise.all([
      prisma.postItem.count(),
      prisma.category.count({ where: { isActive: true } }),
      prisma.statePage.count({ where: { isActive: true } }),
      prisma.postItem.count({ where: { status: 'PUBLISHED' } }),
      prisma.postItem.count({ where: { status: 'DRAFT' } }),
    ])
  return { totalPosts, totalCategories, totalStates, publishedPosts, draftPosts }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Posts', value: stats.totalPosts, color: 'bg-blue-500' },
    { label: 'Published', value: stats.publishedPosts, color: 'bg-green-500' },
    { label: 'Drafts', value: stats.draftPosts, color: 'bg-amber-500' },
    { label: 'Categories', value: stats.totalCategories, color: 'bg-purple-500' },
    { label: 'States', value: stats.totalStates, color: 'bg-teal-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow p-5">
            <div className={`w-12 h-12 ${card.color} rounded-lg mb-3`} />
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
