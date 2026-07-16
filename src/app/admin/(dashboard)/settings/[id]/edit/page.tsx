'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditSettingPage() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({ value: '', valueHindi: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((settings) => {
        const s = settings.find((s: any) => s.id === params.id)
        if (s) {
          setForm({ value: s.value || '', valueHindi: s.valueHindi || '' })
        }
        setFetching(false)
      })
      .catch(() => { setError('Failed to load'); setFetching(false) })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch(`/api/admin/settings/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Failed to update')
      setLoading(false)
      return
    }

    router.push('/admin/settings')
    router.refresh()
  }

  if (fetching) return <div className="text-gray-500">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Setting</h1>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <textarea
            value={form.value}
            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#870000]"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value (Hindi)</label>
          <textarea
            value={form.valueHindi}
            onChange={(e) => setForm((f) => ({ ...f, valueHindi: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        <button type="submit" disabled={loading} className="bg-[#870000] text-white px-4 py-2 rounded hover:bg-[#b30000] disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
