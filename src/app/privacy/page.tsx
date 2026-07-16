import type { Metadata } from 'next'
import { InfoPage } from '@/components/public/InfoPage'
export const metadata: Metadata = { title: 'गोपनीयता नीति', description: 'SarkariJob की गोपनीयता, कुकी और डेटा उपयोग नीति।', alternates: { canonical: '/privacy' } }
export default function Page() { return <InfoPage title="गोपनीयता नीति"><p>हम सेवा सुधारने के लिए ब्राउज़र प्रकार, देखे गए पेज और सामान्य उपयोग आंकड़े जैसे गैर-व्यक्तिगत डेटा एकत्र कर सकते हैं।</p><p>हम व्यक्तिगत जानकारी बेचते नहीं हैं। कानून की आवश्यकता या स्पष्ट सहमति के बिना इसे साझा नहीं किया जाता।</p><p>Analytics और विज्ञापन सेवाएं कुकी का उपयोग कर सकती हैं। आप अपने ब्राउज़र या संबंधित सेवा की सेटिंग में कुकी नियंत्रित कर सकते हैं।</p><p>इस नीति में बदलाव होने पर इसी पेज पर अपडेट प्रकाशित किया जाएगा।</p></InfoPage> }
