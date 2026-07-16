import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function PostsPage() {
  const posts = await prisma.postItem.findMany({
    include: { category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-[#870000] text-white px-4 py-2 rounded text-sm hover:bg-[#b30000]"
        >
          Add Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Title</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Organization</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-500">Views</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Created</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No posts yet. Create your first post.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 max-w-xs truncate font-medium">{post.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{post.category.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{post.organization || '-'}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                    post.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm">{post.viewCount}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-[#3557bc] hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
