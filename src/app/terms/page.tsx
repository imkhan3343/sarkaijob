import type { Metadata } from 'next'
import { InfoPage } from '@/components/public/InfoPage'
export const metadata: Metadata = { title: 'नियम एवं शर्तें', description: 'SarkariJob उपयोग की नियम एवं शर्तें।', alternates: { canonical: '/terms' } }
export default function Page() { return <InfoPage title="नियम एवं शर्तें"><p>SarkariJob का उपयोग करके आप इन शर्तों से सहमत होते हैं। यह सामग्री केवल सामान्य सूचना के लिए है।</p><p>आवेदन, शुल्क भुगतान या दस्तावेज़ जमा करने से पहले आधिकारिक वेबसाइट और अधिसूचना की पुष्टि करना उपयोगकर्ता की जिम्मेदारी है।</p><p>बिना लिखित अनुमति साइट की सामग्री का व्यावसायिक पुनर्प्रकाशन या वितरण अनुमत नहीं है।</p><p>सेवा या जानकारी के उपयोग से होने वाली अप्रत्यक्ष हानि के लिए SarkariJob जिम्मेदार नहीं होगा।</p></InfoPage> }
