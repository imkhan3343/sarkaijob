import type { Metadata } from 'next'
import { InfoPage } from '@/components/public/InfoPage'
export const metadata: Metadata = { title: 'SarkariJob के बारे में', description: 'SarkariJob के उद्देश्य और सूचना प्रक्रिया के बारे में जानें।', alternates: { canonical: '/about' } }
export default function Page() { return <InfoPage title="SarkariJob के बारे में"><p>SarkariJob भारत के सरकारी नौकरी अभ्यर्थियों के लिए नौकरी, रिजल्ट, एडमिट कार्ड, उत्तर कुंजी और पाठ्यक्रम की जानकारी एक जगह प्रस्तुत करता है।</p><p>हमारा उद्देश्य आधिकारिक स्रोतों से मिली जानकारी को सरल, हिंदी-प्रथम और मोबाइल-अनुकूल रूप में उपलब्ध कराना है।</p><p><strong>SarkariJob किसी सरकारी संस्था से संबद्ध नहीं है।</strong> आवेदन या निर्णय से पहले आधिकारिक अधिसूचना अवश्य देखें।</p></InfoPage> }
