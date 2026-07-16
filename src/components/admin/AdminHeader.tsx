'use client'

import { signOut } from 'next-auth/react'

interface AdminHeaderProps {
  user: { name?: string | null; email?: string | null } | undefined
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name || user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="text-sm text-gray-500 hover:text-[#870000] transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
