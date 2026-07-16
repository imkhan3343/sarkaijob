import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { InfoPage } from '@/components/public/InfoPage'
export const metadata: Metadata = { title: 'अक्सर पूछे जाने वाले प्रश्न', description: 'SarkariJob, आवेदन लिंक और सूचना सत्यापन के सामान्य प्रश्न।', alternates: { canonical: '/faq' } }
const faqs = [
  { q: 'SarkariJob क्या है?', a: 'यह सरकारी नौकरी, रिजल्ट, एडमिट कार्ड, उत्तर कुंजी और पाठ्यक्रम की जानकारी देने वाला स्वतंत्र पोर्टल है।' },
  { q: 'क्या SarkariJob सरकारी वेबसाइट है?', a: 'नहीं। SarkariJob किसी सरकारी निकाय या संगठन से संबद्ध नहीं है।' },
  { q: 'नौकरी के लिए आवेदन कैसे करें?', a: 'पोस्ट पर दिए “ऑनलाइन आवेदन” लिंक से आधिकारिक पोर्टल खोलें और आधिकारिक निर्देशों का पालन करें।' },
  { q: 'जानकारी की पुष्टि कैसे करें?', a: 'आवेदन से पहले पोस्ट में दिए आधिकारिक अधिसूचना और विभाग की वेबसाइट से सभी विवरण सत्यापित करें।' },
]
export default function Page() { const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) }; return <><JsonLd data={jsonLd} /><InfoPage title="अक्सर पूछे जाने वाले प्रश्न">{faqs.map((faq) => <section key={faq.q}><h2 className="font-extrabold text-slate-900">{faq.q}</h2><p className="mt-1">{faq.a}</p></section>)}</InfoPage></> }
