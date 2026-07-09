import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SarkariJob - Government Jobs, Results, Admit Cards',
  description: 'Find latest government jobs, results, admit cards, answer keys and syllabus for Sarkari Naukri across India.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
