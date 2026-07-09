'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'

export default function NewCategoryPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    nameHindi: '',
    description: '',
    icon: '',
    sortOrder: 0,
  })
  const [autoSlug, setAutoSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(name: string) {
    setForm((f) => ({ ...f, name }))
    setAutoSlug(slugify(name))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        slug: autoSlug || slugify(form.name),
        sortOrder: Number(form.sortOrder),
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Failed to create category')
      setLoading(false)
      return
    }

    router.push('/admin/categories')
    router.refresh()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Category</h1>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            value={autoSlug}
            onChange={(e) => setAutoSlug(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hindi Name</label>
          <input
            value={form.nameHindi}
            onChange={(e) => setForm((f) => ({ ...f, nameHindi: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#870000] text-white px-4 py-2 rounded hover:bg-[#b30000] disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  )
}
