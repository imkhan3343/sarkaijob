import type { Metadata } from 'next'
import { InfoPage } from '@/components/public/InfoPage'
export const metadata: Metadata = { title: 'अस्वीकरण', description: 'SarkariJob की स्वतंत्र स्थिति और सूचना सत्यापन संबंधी अस्वीकरण।', alternates: { canonical: '/disclaimer' } }
export default function Page() { return <InfoPage title="अस्वीकरण"><p><strong>SarkariJob एक स्वतंत्र सूचना पोर्टल है और किसी सरकारी निकाय या संगठन से संबद्ध नहीं है।</strong></p><p>नौकरी, रिजल्ट, एडमिट कार्ड और परीक्षा की जानकारी सुविधा के लिए एकत्र की जाती है। उपयोगकर्ता किसी भी कार्रवाई से पहले आधिकारिक अधिसूचना से प्रत्येक विवरण सत्यापित करें।</p><p>हम जानकारी को सही और नवीनतम रखने का प्रयास करते हैं, लेकिन पूर्णता या समयबद्धता की गारंटी नहीं दे सकते।</p></InfoPage> }
