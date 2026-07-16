import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

const FALLBACK_DISCLAIMER =
  'SarkariJob एक स्वतंत्र सूचना पोर्टल है और किसी सरकारी निकाय से संबद्ध नहीं है। किसी भी कार्रवाई से पहले आधिकारिक अधिसूचना से जानकारी सत्यापित करें।'

export const getPublicShellData = unstable_cache(
  async () => {
    const [settingsList, states] = await Promise.all([
      prisma.siteSetting.findMany(),
      prisma.statePage.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        take: 30,
      }),
    ])
    const settings = Object.fromEntries(settingsList.map((setting) => [setting.key, setting]))
    return {
      settings,
      states,
      logoText: settings.logo_text?.valueHindi || settings.logo_text?.value || 'SarkariJob',
      launchYear: settings.launch_year?.value,
      disclaimer:
        settings.footer_disclaimer?.valueHindi ||
        settings.footer_disclaimer?.value ||
        FALLBACK_DISCLAIMER,
    }
  },
  ['public-shell'],
  { revalidate: 300, tags: ['settings', 'states'] },
)
