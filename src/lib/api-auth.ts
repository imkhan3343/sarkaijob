import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const hashApiKey = (k: string) => crypto.createHash('sha256').update(k).digest('hex')

export async function validateApiKey(r: Request, scope: string) {
  const raw = r.headers.get('x-api-key')
  if (!raw) return { ok: false as const, response: NextResponse.json({ error: 'Missing API key' }, { status: 401 }) }

  const hash = hashApiKey(raw)
  const rec = await prisma.apiKey.findFirst({
    where: { isActive: true, keyHash: hash },
  })

  const scopes = (rec?.scopes || rec?.permissions || '').split(',').map(x => x.trim())
  if (!rec || !(scopes.includes(scope) || scopes.includes('*'))) {
    return { ok: false as const, response: NextResponse.json({ error: 'Invalid API key or scope' }, { status: 403 }) }
  }

  await prisma.apiKey.update({ where: { id: rec.id }, data: { lastUsedAt: new Date() } })

  return { ok: true as const, apiKey: rec }
}
