export const hi = {
  siteName: 'सरकारीजॉब',
  siteTagline: 'सरकारी नौकरी, रिजल्ट और एडमिट कार्ड की भरोसेमंद जानकारी',
  nav: {
    home: 'होम',
    latestJobs: 'नवीनतम भर्ती',
    admitCard: 'एडमिट कार्ड',
    result: 'रिजल्ट',
    answerKey: 'उत्तर कुंजी',
    syllabus: 'पाठ्यक्रम',
  },
  sections: {
    flashNews: 'फ्लैश न्यूज़',
    featured: 'महत्वपूर्ण अपडेट',
    results: 'रिजल्ट',
    admitCards: 'एडमिट कार्ड',
    latestJobs: 'नवीनतम भर्ती',
    answerKey: 'उत्तर कुंजी',
    syllabus: 'पाठ्यक्रम',
    admission: 'प्रवेश',
    documents: 'दस्तावेज़ सेवाएं',
    states: 'राज्यवार नौकरी',
    disclaimer: 'जरूरी सूचना',
    viewMore: 'और देखें »',
    noPosts: 'अभी कोई पोस्ट उपलब्ध नहीं है।',
  },
  search: {
    placeholder: 'नौकरी खोजें...',
    action: 'खोजें',
  },
  quickLinks: {
    tenth: '10वीं पास नौकरी',
    twelfth: '12वीं पास नौकरी',
    graduate: 'स्नातक नौकरी',
    allIndia: 'अखिल भारतीय नौकरी',
    action: 'जानकारी देखें',
  },
  footer: {
    quickLinks: 'त्वरित लिंक',
    states: 'राज्य',
    about: 'जानकारी',
    rights: 'सर्वाधिकार सुरक्षित।',
  },
  accessibility: {
    skipToContent: 'मुख्य सामग्री पर जाएं',
    primaryNavigation: 'मुख्य नेविगेशन',
    mobileNavigation: 'मोबाइल नेविगेशन',
    searchLabel: 'सरकारी नौकरी खोजें',
    quickLinks: 'लोकप्रिय नौकरी श्रेणियां',
    breakingNews: 'ताज़ा अपडेट',
  },
} as const

export type HiStrings = typeof hi
