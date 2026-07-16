import type { Metadata } from 'next'
import { InfoPage } from '@/components/public/InfoPage'
import { getPublicShellData } from '@/lib/site'
export const metadata: Metadata = { title: 'संपर्क करें', description: 'SarkariJob से प्रतिक्रिया, सुधार या सहायता के लिए संपर्क करें।', alternates: { canonical: '/contact' } }
export default async function Page() { const shell = await getPublicShellData(); const email = shell.settings.contact_email?.value || 'contact@sarkarijob.local'; return <InfoPage title="संपर्क करें"><p>प्रतिक्रिया, सुधार, कॉपीराइट या सहायता के लिए हमें ईमेल करें:</p><p><a href={`mailto:${email}`} className="font-bold text-secondary hover:underline">{email}</a></p><p>किसी नौकरी के आवेदन या परीक्षा से जुड़े प्रश्न के लिए संबंधित विभाग की आधिकारिक वेबसाइट से संपर्क करें।</p></InfoPage> }
