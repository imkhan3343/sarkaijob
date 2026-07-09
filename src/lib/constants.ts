export const SITE_NAME = 'SarkariJob'
export const SITE_TAGLINE = 'सरकारी नौकरी, रिजल्ट, एडमिट कार्ड'

export const NAV_ITEMS = [
  { label: 'Home', href: '/', labelHi: 'होम' },
  { label: 'Latest Job', href: '/category/latest-job', labelHi: 'नवीनतम भर्ती' },
  { label: 'Admit Card', href: '/category/admit-card', labelHi: 'एडमिट कार्ड' },
  { label: 'Result', href: '/category/result', labelHi: 'रिजल्ट' },
  { label: 'Answer Key', href: '/category/answer-key', labelHi: 'उत्तर कुंजी' },
  { label: 'Syllabus', href: '/category/syllabus', labelHi: 'पाठ्यक्रम' },
]

export const CATEGORY_SLUGS = {
  RESULTS: 'results',
  ADMIT_CARD: 'admit-card',
  LATEST_JOB: 'latest-job',
  ANSWER_KEY: 'answer-key',
  SYLLABUS: 'syllabus',
  ADMISSION: 'admission',
  DOCUMENTS: 'documents',
  SARKARI_YOJANA: 'sarkari-yojana',
  SCHOLARSHIP: 'scholarship',
  CAREER_NEWS: 'career-news',
  NOTICE: 'notice',
  TOOLS: 'tools',
} as const

export const BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-error text-white',
  HOT: 'bg-orange-600 text-white',
  LAST_DATE: 'bg-amber-600 text-white',
  RESULT: 'bg-success-green text-white',
  UPDATE: 'bg-blue-600 text-white',
}
