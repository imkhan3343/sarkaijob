'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { slugify } from '@/lib/utils'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch(`/api/admin/posts/${params.id}`).then((r) => r.json()),
    ]).then(([cats, post]) => {
      setCategories(cats)
      setForm({
        title: post.title || '',
        titleHindi: post.titleHindi || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        excerptHindi: post.excerptHindi || '',
        content: post.content || '',
        contentHindi: post.contentHindi || '',
        categoryId: post.categoryId || '',
        status: post.status || 'DRAFT',
        badgeText: post.badgeText || '',
        badgeType: post.badgeType || '',
        organization: post.organization || '',
        state: post.state || '',
        qualification: post.qualification || '',
        totalPosts: post.totalPosts?.toString() || '',
        applicationStartDate: post.applicationStartDate ? post.applicationStartDate.slice(0, 10) : '',
        applicationEndDate: post.applicationEndDate ? post.applicationEndDate.slice(0, 10) : '',
        examDate: post.examDate ? post.examDate.slice(0, 10) : '',
        resultDate: post.resultDate ? post.resultDate.slice(0, 10) : '',
        officialWebsite: post.officialWebsite || '',
        applyLink: post.applyLink || '',
        notificationLink: post.notificationLink || '',
        admitCardLink: post.admitCardLink || '',
        answerKeyLink: post.answerKeyLink || '',
        isFeatured: post.isFeatured || false,
        isBreaking: post.isBreaking || false,
      })
      setFetching(false)
    }).catch(() => {
      setError('Failed to load post')
      setFetching(false)
    })
  }, [params.id])

  function handleTitleChange(title: string) {
    setForm((f: any) => ({ ...f, title, slug: slugify(title) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const body: any = { ...form }
    if (body.totalPosts) body.totalPosts = parseInt(body.totalPosts)
    if (!body.badgeType) delete body.badgeType

    const res = await fetch(`/api/admin/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Failed to update post')
      setLoading(false)
      return
    }

    router.push('/admin/posts')
    router.refresh()
  }

  if (fetching) return <div className="text-gray-500">Loading...</div>
  if (!form) return <div className="text-red-500">Post not found</div>

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000] text-sm'

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label>
            <input value={form.titleHindi} onChange={(e) => setForm((f: any) => ({ ...f, titleHindi: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f: any) => ({ ...f, slug: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select value={form.categoryId} onChange={(e) => setForm((f: any) => ({ ...f, categoryId: e.target.value }))} className={inputClass} required>
              <option value="">Select category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
            <input value={form.organization} onChange={(e) => setForm((f: any) => ({ ...f, organization: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm((f: any) => ({ ...f, status: e.target.value }))} className={inputClass}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input value={form.state} onChange={(e) => setForm((f: any) => ({ ...f, state: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input value={form.qualification} onChange={(e) => setForm((f: any) => ({ ...f, qualification: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Posts</label>
            <input type="number" value={form.totalPosts} onChange={(e) => setForm((f: any) => ({ ...f, totalPosts: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Type</label>
            <select value={form.badgeType} onChange={(e) => setForm((f: any) => ({ ...f, badgeType: e.target.value }))} className={inputClass}>
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
            <input type="date" value={form.applicationStartDate} onChange={(e) => setForm((f: any) => ({ ...f, applicationStartDate: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply End</label>
            <input type="date" value={form.applicationEndDate} onChange={(e) => setForm((f: any) => ({ ...f, applicationEndDate: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
            <input type="date" value={form.examDate} onChange={(e) => setForm((f: any) => ({ ...f, examDate: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Result Date</label>
            <input type="date" value={form.resultDate} onChange={(e) => setForm((f: any) => ({ ...f, resultDate: e.target.value }))} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link</label>
            <input value={form.applyLink} onChange={(e) => setForm((f: any) => ({ ...f, applyLink: e.target.value }))} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Website</label>
            <input value={form.officialWebsite} onChange={(e) => setForm((f: any) => ({ ...f, officialWebsite: e.target.value }))} className={inputClass} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f: any) => ({ ...f, isFeatured: e.target.checked }))} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isBreaking} onChange={(e) => setForm((f: any) => ({ ...f, isBreaking: e.target.checked }))} />
            Breaking
          </label>
        </div>
        <button type="submit" disabled={loading} className="bg-[#870000] text-white px-6 py-2 rounded hover:bg-[#b30000] disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
