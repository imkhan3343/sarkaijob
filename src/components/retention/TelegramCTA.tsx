export function TelegramCTA() {
  const url = process.env.TELEGRAM_CHANNEL_URL || 'https:' + '//t.me/'
  return (
    <aside className="rounded border bg-blue-50 p-4">
      <h2 className="font-black text-blue-950">Telegram पर तुरंत अपडेट पाएं</h2>
      <p className="mt-1 text-sm text-blue-900">नई नौकरी, रिजल्ट और एडमिट कार्ड अलर्ट पाएं।</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded bg-blue-700 px-4 py-2 text-sm font-bold text-white">Join Telegram</a>
    </aside>
  )
}
