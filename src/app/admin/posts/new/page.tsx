'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'

export default function NewPostPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({
    title: '',
    titleHindi: '',
    slug: '',
    excerpt: '',
    excerptHindi: '',
    content: '',
    contentHindi: '',
    categoryId: '',
    status: 'DRAFT',
    badgeText: '',
    badgeType: '',
    organization: '',
    state: '',
    qualification: '',
    totalPosts: '',
    applicationStartDate: '',
    applicationEndDate: '',
    examDate: '',
    resultDate: '',
    officialWebsite: '',
    applyLink: '',
    notificationLink: '',
    admitCardLink: '',
    answerKeyLink: '',
    isFeatured: false,
    isBreaking: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then(setCategories)
  }, [])

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: slugify(title) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const body: any = { ...form }
    if (body.totalPosts) body.totalPosts = parseInt(body.totalPosts)
    if (!body.badgeType) delete body.badgeType

    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Failed to create post')
      setLoading(false)
      return
    }

    router.push('/admin/posts')
    router.refresh()
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000] text-sm'

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label>
            <input value={form.titleHindi} onChange={(e) => setForm((f) => ({ ...f, titleHindi: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} className={inputClass} required>
              <option value="">Select category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
            <input value={form.organization} onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={inputClass}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input value={form.qualification} onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Posts</label>
            <input type="number" value={form.totalPosts} onChange={(e) => setForm((f) => ({ ...f, totalPosts: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Type</label>
            <select value={form.badgeType} onChange={(e) => setForm((f) => ({ ...f, badgeType: e.target.value }))} className={inputClass}>
              <option value="">None</option>
              <option value="NEW">NEW</option>
              <option value="HOT">HOT</option>
              <option value="LAST_DATE">LAST DATE</option>
              <option value="RESULT">RESULT</option>
              <option value="UPDATE">UPDATE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply Start</label>
            <input type="date" value={form.applicationStartDate} onChange={(e) => setForm((f) => ({ ...f, applicationStartDate: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply End</label>
            <input type="date" value={form.applicationEndDate} onChange={(e) => setForm((f) => ({ ...f, applicationEndDate: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
            <input type="date" value={form.examDate} onChange={(e) => setForm((f) => ({ ...f, examDate: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Result Date</label>
            <input type="date" value={form.resultDate} onChange={(e) => setForm((f) => ({ ...f, resultDate: e.target.value }))} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
            <input value={form.applyLink} onChange={(e) => setForm((f) => ({ ...f, applyLink: e.target.value }))} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Website</label>
            <input value={form.officialWebsite} onChange={(e) => setForm((f) => ({ ...f, officialWebsite: e.target.value }))} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} className={inputClass} rows={2} />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isBreaking} onChange={(e) => setForm((f) => ({ ...f, isBreaking: e.target.checked }))} />
                Breaking
              </label>
            </div>
          </div>
        </div>
        <button type="submit" disabled={loading} className="bg-[#870000] text-white px-6 py-2 rounded hover:bg-[#b30000] disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}
